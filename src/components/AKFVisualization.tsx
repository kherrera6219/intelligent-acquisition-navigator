import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronRight, ChevronDown, Link2, BookOpen, Shield, Clock, Activity, Globe, Zap, Network, Database } from 'lucide-react';

const AKFSection = ({ section, expanded, onToggle, relationships, sections }) => {
  return (
    <div className={`border rounded-lg transition-all duration-200 ${ expanded ? 'bg-white shadow-lg' : 'bg-gray-50 hover:bg-white'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${ expanded ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
            {section.icon}
          </div>
          <span className="font-semibold text-lg">{section.title}</span>
        </div>
        <div className={`transform transition-transform duration-200 ${ expanded ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </button>
      
      {expanded && (
        <div className="px-4 pb-4">
          <div className="pl-8 border-l-2 border-blue-200">
            <div className="font-mono bg-blue-50 p-3 rounded-lg text-blue-800 overflow-x-auto">
              {section.formula}
            </div>
            <p className="mt-3 text-gray-600">
              {section.description}
            </p>
            
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Core Components
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.components.map((comp, idx) => (
                    <div key={idx} 
                         className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      <div className="font-medium text-gray-800">{comp.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{comp.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  System Relationships
                </h4>
                <div className="space-y-2">
                  {relationships
                    .filter(rel => rel.from === section.key || rel.to === section.key)
                    .map((rel, idx) => (
                      <div key={idx} 
                           className="flex items-center gap-2 text-sm p-2 rounded-lg bg-gray-50 border border-gray-200">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700">
                          {rel.from === section.key ? '→' : '←'} {rel.from === section.key ? sections[rel.to].title : sections[rel.from].title}
                        </span>
                        <span className="text-gray-500"> | </span>
                        <span className="text-gray-600">{rel.description}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
      <Card className="border-none shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-xl">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Globe className="w-8 h-8" />
            4D Acquisition Knowledge Framework
          </CardTitle>
          <p className="text-blue-100 mt-2">
            Advanced Mathematical Model for Dynamic Acquisition Systems
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <Alert className="bg-blue-50 border-blue-200 text-blue-800 mb-6">
            <AlertDescription>
              Explore the interactive visualization of AKF's mathematical components and their dynamic relationships
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
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
