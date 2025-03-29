
import React, { useState } from 'react';
import { BreakpointIndicator } from './Responsive';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const BreakpointDebugger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <>
      <div className="fixed bottom-16 right-4 z-50 flex flex-col gap-2 p-3 bg-card/90 backdrop-blur-lg rounded-lg border border-border shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">Breakpoint Indicator</span>
          <Switch 
            checked={isVisible}
            onCheckedChange={setIsVisible}
            size="sm"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">Grid Overlay</span>
          <Switch 
            checked={showGrid}
            onCheckedChange={setShowGrid}
            size="sm"
          />
        </div>
        
        <Button 
          variant="ghost" 
          className="text-xs h-6 px-2" 
          onClick={() => {
            setIsVisible(false);
            setShowGrid(false);
          }}
        >
          Reset
        </Button>
      </div>
      
      {isVisible && <BreakpointIndicator show={true} />}
      
      {showGrid && (
        <div 
          className={cn(
            "fixed inset-0 z-40 pointer-events-none",
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4 px-4 mx-auto",
            "max-w-screen-2xl h-full opacity-20"
          )}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full bg-blue-500"></div>
          ))}
        </div>
      )}
    </>
  );
};
