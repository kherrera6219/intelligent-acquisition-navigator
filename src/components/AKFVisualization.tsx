import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ChevronDown, 
  Globe, 
  Clock as ClockIcon,
  Shield as ShieldIcon,
  Activity as ActivityIcon,
  Zap, 
  Network, 
  Sparkles,
  Boxes,
  ArrowUpRight
} from 'lucide-react';

// Define sections outside of component to avoid recreation on each render
const sectionData = {
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
    icon: <ClockIcon className="w-6 h-6" />,
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
    icon: <ShieldIcon className="w-6 h-6" />,
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
    icon: <ActivityIcon className="w-6 h-6" />,
    components: [
      { name: 'KPI Weights (w)', description: 'Dynamic performance metric prioritization' },
      { name: 'ROI Calculation', description: 'Investment return optimization analysis' },
      { name: 'Effectiveness (E**)', description: 'Holistic system performance evaluation' },
      { name: 'ML Integration', description: 'AI-driven performance optimization' }
    ]
  }
};

// Define relationships outside component
const relationshipData = [
  { from: 'core', to: 'temporal', description: 'Knowledge evolution patterns' },
  { from: 'core', to: 'risk', description: 'Systemic risk integration' },
  { from: 'temporal', to: 'performance', description: 'Time-based performance dynamics' },
  { from: 'risk', to: 'performance', description: 'Risk-performance correlation' }
];

const AKFSection = ({ section, expanded, onToggle, relationships, sections }) => {
  const gradients = {
    core: 'from-violet-50 to-fuchsia-50 hover:to-fuchsia-100',
    temporal: 'from-sky-50 to-indigo-50 hover:to-indigo-100',
    risk: 'from-rose-50 to-orange-50 hover:to-orange-100',
    performance: 'from-emerald-50 to-teal-50 hover:to-teal-100'
  };

  const accentColors = {
    core: 'violet',
    temporal: 'sky',
    risk: 'rose',
    performance: 'emerald'
  };

  return (
    <div className={`border rounded-2xl transition-all duration-300 ${
      expanded 
        ? 'bg-white shadow-lg ring-1 ring-black/5' 
        : `bg-gradient-to-br ${gradients[section.key]}`
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center space-x-4">
          <div className={`p-2.5 rounded-xl backdrop-blur-sm transition-colors duration-300 ${
            expanded ? 'bg-gray-100 text-gray-600' : 'bg-white/50 text-gray-600'
          }`}>
            {section.icon}
          </div>
          <span className="font-semibold text-lg tracking-tight">{section.title}</span>
        </div>
        <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </button>
      
      {expanded && (
        <div className="px-5 pb-5">
          <div className="pl-8 border-l-2 border-dashed border-gray-200">
            <div className="bg-black rounded-xl p-4 font-mono text-sm text-emerald-400 overflow-x-auto
                          shadow-[0_0_15px_rgba(52,211,153,0.1)] backdrop-blur-xl">
              <Sparkles className="w-4 h-4 mb-2 text-emerald-500 inline-block mr-2" />
              {section.formula}
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {section.description}
            </p>
            
            <div className="mt-8 space-y-8">
              <div>
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <Boxes className="w-4 h-4" />
                  Core Components
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.components.map((comp, idx) => (
                    <div key={idx} 
                         className="group relative bg-white p-4 rounded-xl border border-gray-100 
                                  shadow-sm hover:shadow-md transition-all duration-300
                                  hover:border-transparent hover:-translate-y-0.5">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-50/50 to-white/50 
                                    group-hover:from-violet-50/50 group-hover:to-fuchsia-50/50 transition-colors duration-500"/>
                      <div className="relative">
                        <div className="font-medium text-gray-800 flex items-center gap-2">
                          {comp.name}
                          <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-violet-500 
                                                 transition-colors duration-300" />
                        </div>
                        <div className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                          {comp.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  System Relationships
                </h4>
                <div className="space-y-2.5">
                  {relationships
                    .filter(rel => rel.from === section.key || rel.to === section.key)
                    .map((rel, idx) => (
                      <div key={idx} 
                           className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100
                                    hover:border-violet-200 transition-colors duration-300
                                    hover:bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50">
                        <Zap className="w-4 h-4 text-violet-500" />
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium">
                            {rel.from === section.key ? '→' : '←'} {
                              rel.from === section.key 
                                ? sections[rel.to].title 
                                : sections[rel.from].title
                            }
                          </span>
                          <span className="mx-2 text-gray-400">|</span>
                          <span className="text-gray-600">{rel.description}</span>
                        </div>
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
            {Object.values(sectionData).map((section) => (
              <AKFSection
                key={section.key}
                section={section}
                expanded={expandedSection === section.key}
                onToggle={() => setExpandedSection(section.key === expandedSection ? '' : section.key)}
                relationships={relationshipData}
                sections={sectionData}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AKFVisualization;
