import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronRight, ChevronDown, Link2, Brain, Shield, Clock, Activity } from 'lucide-react';

const AKFVisualization = () => {
  const [expandedSection, setExpandedSection] = useState('core');
  
  const sections = {
    core: {
      title: 'Core Function',
      formula: 'F**(AKF, t) = Ψ(P, L, B, N, R, C, M, Q, V, AI, S, G, T, RM, CT, PM, SC, VC, AT, ML)',
      description: 'Enhanced system integration function over time',
      icon: <Brain className="w-6 h-6" />
    },
    temporal: {
      title: 'Temporal Evolution',
      formula: 'TE(AKF, t) = Σᵢ [F*(AKF)ᵢ * e^(-λt)]',
      description: 'System evolution with knowledge decay',
      icon: <Clock className="w-6 h-6" />
    },
    risk: {
      title: 'Risk-Adjusted Value',
      formula: 'RAV(RM) = Σᵢ [V*(N)ᵢ * (1 - RT(RMᵢ))]',
      description: 'Value calculation with risk adjustment',
      icon: <Shield className="w-6 h-6" />
    },
    performance: {
      title: 'Performance Index',
      formula: 'PI(PM) = Σᵢ [wᵢ * KPI(PMᵢ)] + ROI(PM)',
      description: 'Weighted performance metrics with ROI',
      icon: <Activity className="w-6 h-6" />
    }
  };

  const relationships = [
    { from: 'core', to: 'temporal', description: 'Time-based evolution' },
    { from: 'core', to: 'risk', description: 'Risk integration' },
    { from: 'temporal', to: 'performance', description: 'Time-performance correlation' },
    { from: 'risk', to: 'performance', description: 'Risk impact on performance' }
  ];

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            4D Acquisition Knowledge Framework (AKF)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertDescription>
              Interactive visualization of the AKF mathematical components and their relationships
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            {Object.entries(sections).map(([key, section]) => (
              <div key={key} className="border rounded-lg p-4 bg-white">
                <button
                  onClick={() => setExpandedSection(key)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    {section.icon}
                    <span className="font-semibold">{section.title}</span>
                  </div>
                  {expandedSection === key ? <ChevronDown /> : <ChevronRight />}
                </button>
                
                {expandedSection === key && (
                  <div className="mt-4 pl-8 border-l-2 border-blue-200">
                    <div className="font-mono bg-gray-50 p-2 rounded">
                      {section.formula}
                    </div>
                    <p className="mt-2 text-gray-600">
                      {section.description}
                    </p>
                    <div className="mt-4">
                      <div className="font-semibold flex items-center gap-2">
                        <Link2 className="w-4 h-4" />
                        Related Components:
                      </div>
                      <ul className="mt-2 space-y-1">
                        {relationships
                          .filter(rel => rel.from === key || rel.to === key)
                          .map((rel, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              {rel.from === key ? '→' : '←'} {rel.from === key ? sections[rel.to].title : sections[rel.from].title}: {rel.description}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AKFVisualization;