import React from 'react';
import { Boxes, Info, ArrowUpRight } from 'lucide-react';
import { AKFComponent } from '../types/akf';

interface ComponentGridProps {
  components: AKFComponent[];
  showInfo: Record<number, boolean>;
  toggleInfo: (idx: number) => void;
}

export const ComponentGrid: React.FC<ComponentGridProps> = ({ 
  components, 
  showInfo, 
  toggleInfo 
}) => {
  return (
    <div>
      <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
        <Boxes className="w-4 h-4" />
        Core Components
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {components.map((comp, idx) => (
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
  );
};