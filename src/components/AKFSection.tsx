import React, { useState, useEffect } from 'react';
import { ChevronDown, LineChart, BarChart, Settings, Info, Network, Zap, 
         Boxes, ArrowUpRight, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { MetricsChart } from './MetricsChart';
import { performanceData } from '../data/performanceData';

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
  const [chartType, setChartType] = useState('line');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInfo, setShowInfo] = useState({});

  const toggleInfo = (componentId) => {
    setShowInfo(prev => ({
      ...prev,
      [componentId]: !prev[componentId]
    }));
  };

  const gradients = {
    core: 'from-violet-50 to-fuchsia-50 hover:to-fuchsia-100',
    temporal: 'from-sky-50 to-indigo-50 hover:to-indigo-100',
    risk: 'from-rose-50 to-orange-50 hover:to-orange-100',
    performance: 'from-emerald-50 to-teal-50 hover:to-teal-100'
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className={`border rounded-2xl transition-all duration-500 ${
      isFullScreen ? 'fixed inset-4 z-50 overflow-auto' : ''
    } ${
      expanded 
        ? 'bg-white shadow-lg ring-1 ring-black/5' 
        : `bg-gradient-to-br ${gradients[section.key]}`
    }`}>
      <div className="relative">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-5 text-left"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-2.5 rounded-xl backdrop-blur-sm transition-colors duration-300 
                           ${expanded ? 'bg-gray-100 text-gray-600' : 'bg-white/50 text-gray-600'}
                           group-hover:bg-white/70`}>
              {section.icon}
            </div>
            <span className="font-semibold text-lg tracking-tight">{section.title}</span>
          </div>
          <div className="flex items-center gap-2">
            {expanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullScreen(!isFullScreen);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}
            <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </button>
      </div>
      
      {expanded && (
        <div className="px-5 pb-5">
          <div className="pl-8 border-l-2 border-dashed border-gray-200">
            {/* Formula Display with Copy Button */}
            <div className="relative bg-black rounded-xl p-4 font-mono text-sm text-emerald-400 
                          overflow-x-auto shadow-[0_0_15px_rgba(52,211,153,0.1)] backdrop-blur-xl
                          group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 
                            rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="w-4 h-4 mb-2 text-emerald-500 inline-block mr-2" />
              {section.formula}
              <button
                onClick={() => navigator.clipboard.writeText(section.formula)}
                className="absolute right-2 top-2 p-2 text-gray-500 hover:text-white 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {section.description}
            </p>
            
            <div className="mt-8 space-y-8">
              {/* Components Grid */}
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
                        <div className="font-medium text-gray-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {comp.name}
                            <button
                              onClick={() => toggleInfo(idx)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Info className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          </div>
                          <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-violet-500 
                                                 transition-colors duration-300" />
                        </div>
                        <div className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                          {comp.description}
                        </div>
                        {showInfo[idx] && (
                          <div className="mt-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-500">
                            Additional information about {comp.name} and its role in the framework...
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Metrics Visualization */}
              {section.key === 'performance' && (
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2">
                      <LineChart className="w-4 h-4" />
                      Performance Metrics
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChartType('line')}
                        className={`p-2 rounded-lg transition-colors ${
                          chartType === 'line' ? 'bg-violet-100 text-violet-600' : 'hover:bg-gray-100'
                        }`}
                      >
                        <LineChart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setChartType('bar')}
                        className={`p-2 rounded-lg transition-colors ${
                          chartType === 'bar' ? 'bg-violet-100 text-violet-600' : 'hover:bg-gray-100'
                        }`}
                      >
                        <BarChart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {}}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <MetricsChart data={performanceData} type={chartType} />
                </div>
              )}
              
              {/* Relationships */}
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
