import React from 'react';
import { ChevronDown, Boxes, Network, Zap, ArrowUpRight, Sparkles } from 'lucide-react';

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

interface AKFSectionProps {
  section: {
    key: string;
    title: string;
    formula: string;
    description: string;
    icon: React.ReactNode;
    components: Array<{
      name: string;
      description: string;
    }>;
  };
  expanded: boolean;
  onToggle: () => void;
  relationships: Array<{
    from: string;
    to: string;
    description: string;
  }>;
  sections: Record<string, any>;
}

export const AKFSection: React.FC<AKFSectionProps> = ({ 
  section, 
  expanded, 
  onToggle, 
  relationships, 
  sections 
}) => {
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
            expanded 
              ? `bg-${accentColors[section.key]}-100 text-${accentColors[section.key]}-600` 
              : 'bg-white/50 text-gray-600'
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