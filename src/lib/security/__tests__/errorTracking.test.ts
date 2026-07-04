import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../audit', () => ({
  auditLogger: { log: vi.fn().mockResolvedValue(undefined) },
}));

import { auditLogger } from '../../audit';
import { errorTracker } from '../errorTracking';

const mockLog = vi.mocked(auditLogger.log);

describe('errorTracker.updateErrorStatus (code review Finding #5)', () => {
  beforeEach(() => {
    mockLog.mockClear();
  });

  it('logs the correct pre-mutation oldStatus, not the already-updated value', () => {
    errorTracker.trackError({
      message: 'Test error for status transition',
      severity: 'LOW',
      errorType: 'APPLICATION',
      status: 'NEW',
      errorCode: 'TEST_STATUS_TRANSITION',
    });

    mockLog.mockClear(); // ignore the ERROR_OCCURRED log from trackError above

    errorTracker.updateErrorStatus('TEST_STATUS_TRANSITION', 'INVESTIGATING');

    expect(mockLog).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'ERROR_STATUS_UPDATED',
        details: expect.objectContaining({ oldStatus: 'NEW', newStatus: 'INVESTIGATING' }),
      })
    );

    const recorded = errorTracker.getRecentErrors().find((e) => e.errorCode === 'TEST_STATUS_TRANSITION');
    expect(recorded?.status).toBe('INVESTIGATING');
  });

  it('reflects the actual prior status across multiple transitions', () => {
    errorTracker.trackError({
      message: 'Second transition test',
      severity: 'LOW',
      errorType: 'APPLICATION',
      status: 'NEW',
      errorCode: 'TEST_MULTI_TRANSITION',
    });

    errorTracker.updateErrorStatus('TEST_MULTI_TRANSITION', 'INVESTIGATING');
    mockLog.mockClear();

    errorTracker.updateErrorStatus('TEST_MULTI_TRANSITION', 'RESOLVED');

    expect(mockLog).toHaveBeenCalledWith(
      expect.objectContaining({
        details: expect.objectContaining({ oldStatus: 'INVESTIGATING', newStatus: 'RESOLVED' }),
      })
    );
  });
});
