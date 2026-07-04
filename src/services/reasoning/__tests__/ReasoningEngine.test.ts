import { describe, it, expect, vi, beforeEach } from 'vitest';

// ----------------------------------------------------------------
// Mock all external dependencies for the integration test
// ----------------------------------------------------------------
vi.mock('@/services/reasoning/aiService', () => ({
  generateWithAI: vi.fn(),
}));

vi.mock('@/services/reasoning/reasoningDb', () => ({
  insertReasoningStep: vi.fn().mockResolvedValue('step-001'),
  insertComplianceCheck: vi.fn().mockResolvedValue('check-001'),
  insertReasoningResult: vi.fn().mockImplementation((result) =>
    Promise.resolve({ ...result, id: 'result-001' })
  ),
  getReasoningSteps: vi.fn().mockResolvedValue([]),
  getComplianceChecks: vi.fn().mockResolvedValue([]),
}));

vi.mock('@/hooks/use-toast', () => ({ toast: vi.fn() }));
vi.mock('@/lib/security/errorTracking', () => ({
  errorTracker: { trackError: vi.fn() },
}));

import { generateWithAI } from '@/services/reasoning/aiService';
import { ReasoningEngine } from '../ReasoningEngine';
import type { ComplianceRule, Context } from '@/types/reasoning';

const mockGenerate = vi.mocked(generateWithAI);

const mockRules: Record<string, ComplianceRule> = {
  FAR_6_301: {
    id: 'FAR_6_301',
    description: 'Full and open competition required',
    severity: 9,
    validation_logic: 'Verify competition documentation is present',
  },
};

const mockContext: Context = {
  reasoning_type: 'analytical',
  user_role: 'CONTRACTING_OFFICER',
  domain: 'source_selection',
};

describe('ReasoningEngine — orchestration integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerate.mockResolvedValue('Step analysis complete. Confidence: 0.88');
  });

  it('completes full reasoning pipeline and returns a result', async () => {
    const engine = new ReasoningEngine(mockRules, 'test-api-key');

    const result = await engine.processReasoning([], mockContext);

    expect(result).toHaveProperty('conclusion');
    expect(result).toHaveProperty('confidence_score');
    expect(result).toHaveProperty('reasoning_steps');
    expect(result).toHaveProperty('compliance_checks');
    expect(Array.isArray(result.reasoning_steps)).toBe(true);
    expect(Array.isArray(result.compliance_checks)).toBe(true);
  });

  it('calls generateWithAI at least once per reasoning step + compliance rule + conclusion', async () => {
    const engine = new ReasoningEngine(mockRules, 'test-api-key');
    await engine.processReasoning([], mockContext);

    // 'analytical' template has 6 steps + 1 compliance rule + 1 conclusion = 8 calls
    expect(mockGenerate).toHaveBeenCalledTimes(8);
  });

  it('extracts confidence from LLM response text', async () => {
    mockGenerate.mockResolvedValue('Analysis complete. Confidence: 0.95');
    const engine = new ReasoningEngine(mockRules, 'test-api-key');
    const result = await engine.processReasoning([], mockContext);
    // Should have parsed 0.95 from the response
    expect(result.confidence_score).toBeCloseTo(0.95, 2);
  });

  it('uses default reasoning template when type is unrecognised', async () => {
    const engine = new ReasoningEngine({}, 'test-api-key');
    const result = await engine.processReasoning([], { reasoning_type: 'unknown' });
    // Default template has 3 steps, no rules, 1 conclusion = 4 calls
    expect(mockGenerate).toHaveBeenCalledTimes(4);
    expect(result).toHaveProperty('conclusion');
  });

  it('propagates errors and tracks them', async () => {
    mockGenerate.mockRejectedValueOnce(new Error('Upstream provider 503'));
    const engine = new ReasoningEngine(mockRules, 'test-api-key');

    await expect(engine.processReasoning([], mockContext)).rejects.toThrow('Upstream provider 503');

    const { errorTracker } = await import('@/lib/security/errorTracking');
    expect(errorTracker.trackError).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'HIGH' })
    );
  });
});
