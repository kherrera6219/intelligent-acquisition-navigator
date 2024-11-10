import React from 'react';
import { Sparkles } from 'lucide-react';

interface FormulaDisplayProps {
  formula: string;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ formula }) => {
  return (
    <div className="relative bg-black rounded-xl p-4 font-mono text-sm text-emerald-400 
                    overflow-x-auto shadow-[0_0_15px_rgba(52,211,153,0.1)] backdrop-blur-xl
                    group">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 
                    rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Sparkles className="w-4 h-4 mb-2 text-emerald-500 inline-block mr-2" />
      {formula}
      <button
        onClick={() => navigator.clipboard.writeText(formula)}
        className="absolute right-2 top-2 p-2 text-gray-500 hover:text-white 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </button>
    </div>
  );
};