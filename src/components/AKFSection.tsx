import React, { useState, useEffect } from 'react';
import { ChevronDown, LineChart, BarChart, Settings, Network, Zap, Maximize2, Minimize2 } from 'lucide-react';
import { MetricsChart } from './MetricsChart';
import { FormulaDisplay } from './FormulaDisplay';
import { ComponentGrid } from './ComponentGrid';
import { performanceData } from '../data/performanceData';
import { AKFSection as AKFSectionType, Relationship, ChartType } from '../types/akf';

interface AKFSectionProps {
  section: AKFSectionType;
  expanded: boolean;
  onToggle: () => void;
  relationships: Relationship[];
  sections: Record<string, AKFSectionType>;
}

export const AKFSection: React.FC<AKFSectionProps> = ({ 
  section, 
  expanded, 
  onToggle, 
  relationships, 
  sections 
}) => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInfo, setShowInfo] = useState<Record<number, boolean>>({});

  const toggleInfo = (componentId: number) => {
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
    const handleEsc = (event: KeyboardEvent) => {
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
            <FormulaDisplay formula={section.formula} />

            <p className="mt-4 text-gray-600 leading-relaxed">
              {section.description}
            </p>
            
            <div className="mt-8 space-y-8">
              <ComponentGrid 
                components={section.components}
                showInfo={showInfo}
                toggleInfo={toggleInfo}
              />
              
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