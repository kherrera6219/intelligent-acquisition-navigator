import { Globe, Clock, Shield, Activity } from 'lucide-react';
import React from 'react';

export const sectionData = {
  core: {
    key: 'core',
    title: 'Core Function',
    formula: 'F**(AKF, t) = Ψ(P, L, B, N, R, C, M, Q, V, AI, S, G, T, RM, CT, PM, SC, VC, AT, ML)',
    description: 'Enhanced system integration function incorporating multiple dimensions and adaptive capabilities',
    icon: <Globe className="w-6 h-6" />,
    components: [
      { name: 'Pillars (P)', description: 'Foundational knowledge domains and organizational structures' },
      { name: 'Levels (L)', description: 'Hierarchical organization of acquisition knowledge' },
      { name: 'Branches (B)', description: 'Specialized domain-specific categorizations' },
      { name: 'Nodes (N)', description: 'Atomic units of acquisition knowledge' },
      { name: 'AI Integration', description: 'Advanced machine learning and predictive capabilities' }
    ]
  },
  temporal: {
    key: 'temporal',
    title: 'Temporal Evolution',
    formula: 'TE(AKF, t) = Σᵢ [F*(AKF)ᵢ * e^(-λt)]',
    description: 'Dynamic system evolution accounting for knowledge lifecycle and temporal dependencies',
    icon: <Clock className="w-6 h-6" />,
    components: [
      { name: 'Knowledge Decay (λ)', description: 'Time-based information relevance degradation' },
      { name: 'State Transitions (τ)', description: 'Temporal system state transformations' },
      { name: 'Version Control (VC)', description: 'Historical knowledge state management' },
      { name: 'Update Frequency', description: 'Dynamic knowledge refresh mechanisms' }
    ]
  },
  risk: {
    key: 'risk',
    title: 'Risk-Adjusted Value',
    formula: 'RAV(RM) = Σᵢ [V*(N)ᵢ * (1 - RT(RMᵢ))]',
    description: 'Comprehensive risk assessment and value optimization framework',
    icon: <Shield className="w-6 h-6" />,
    components: [
      { name: 'Risk Threshold (RT)', description: 'Dynamic risk tolerance boundaries' },
      { name: 'Mitigation Impact (MI)', description: 'Effectiveness of risk control measures' },
      { name: 'Security Classification (SC)', description: 'Multilevel data protection framework' },
      { name: 'Compliance Tracking (CT)', description: 'Regulatory alignment monitoring' }
    ]
  },
  performance: {
    key: 'performance',
    title: 'Performance Index',
    formula: 'PI(PM) = Σᵢ [wᵢ * KPI(PMᵢ)] + ROI(PM)',
    description: 'Multifaceted performance evaluation and optimization system',
    icon: <Activity className="w-6 h-6" />,
    components: [
      { name: 'KPI Weights (w)', description: 'Dynamic performance metric prioritization' },
      { name: 'ROI Calculation', description: 'Investment return optimization analysis' },
      { name: 'Effectiveness (E**)', description: 'Holistic system performance evaluation' },
      { name: 'ML Integration', description: 'AI-driven performance optimization' }
    ]
  }
};

export const relationshipData = [
  { from: 'core', to: 'temporal', description: 'Knowledge evolution patterns' },
  { from: 'core', to: 'risk', description: 'Systemic risk integration' },
  { from: 'temporal', to: 'performance', description: 'Time-based performance dynamics' },
  { from: 'risk', to: 'performance', description: 'Risk-performance correlation' }
];
