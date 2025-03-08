
import React from 'react';
import { cn } from "@/lib/utils";

export interface SettingsNavProps {
  tabs: Array<{
    value: string;
    label: string;
    icon: React.ReactNode;
  }>;
  activeTab: string;
  onChange: (value: string) => void;
}

export function SettingsNav({ tabs, activeTab, onChange }: SettingsNavProps) {
  return (
    <div className="flex flex-col space-y-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
            activeTab === tab.value
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
