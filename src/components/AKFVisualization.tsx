import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Globe, Sparkles } from 'lucide-react';
import { AKFSection } from './AKFSection';

const AKFVisualization = () => {
  const [expandedSection, setExpandedSection] = useState('core');
  
  const sections = {
    core: {
      key: 'core',
      title: 'Core Function',
      formula: 'F**(AKF, t) = Ψ(P, L, B, N, R, C, M, Q, V, AI, S, G, T, RM, CT, PM, SC, VC, AT, ML)',
      description: 'Enhanced system integration incorporating multiple dimensions and adaptive capabilities',
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

  const relationships = [
    { from: 'core', to: 'temporal', description: 'Knowledge evolution patterns' },
    { from: 'core', to: 'risk', description: 'Systemic risk integration' },
    { from: 'temporal', to: 'performance', description: 'Time-based performance dynamics' },
    { from: 'risk', to: 'performance', description: 'Risk-performance correlation' }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-violet-50/30 to-fuchsia-50/30 rounded-2xl">
      <Card className="border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-white p-8 rounded-t-2xl">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <Globe className="w-8 h-8" />
              4D Acquisition Knowledge Framework
            </CardTitle>
            <p className="text-violet-100 leading-relaxed">
              Advanced Mathematical Model for Dynamic Acquisition Systems
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <Alert className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border-violet-200 
                           text-violet-900 mb-8 rounded-xl shadow-sm">
            <AlertDescription className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              Explore the interactive visualization of AKF's mathematical components and their dynamic relationships
            </AlertDescription>
          </Alert>
          
          <div className="space-y-5">
            {Object.values(sections).map((section) => (
              <AKFSection
                key={section.key}
                section={section}
                expanded={expandedSection === section.key}
                onToggle={() => setExpandedSection(section.key === expandedSection ? '' : section.key)}
                relationships={relationships}
                sections={sections}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AKFVisualization;
