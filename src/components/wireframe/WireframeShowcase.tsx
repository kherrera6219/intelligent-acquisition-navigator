
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardWireframe } from './DashboardWireframe';
import { DetailPageWireframe } from './DetailPageWireframe';
import { ListWireframe } from './ListWireframe';
import { SettingsWireframe } from './SettingsWireframe';
import { FormWizardWireframe } from './FormWizardWireframe';
import { Button } from '@/components/ui/button';

export const WireframeShowcase: React.FC = () => {
  const [showPlaceholders, setShowPlaceholders] = useState(true);
  
  return (
    <div className="wireframe-showcase space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Wireframe Layout Components</h1>
          <p className="text-muted-foreground">
            Reusable layout components following Microsoft Fluent UI design principles.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowPlaceholders(!showPlaceholders)}
        >
          {showPlaceholders ? 'Hide Placeholders' : 'Show Placeholders'}
        </Button>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="detail">Detail</TabsTrigger>
          <TabsTrigger value="list">List/Table</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="wizard">Wizard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <DashboardWireframe withPlaceholders={showPlaceholders} />
        </TabsContent>
        
        <TabsContent value="detail">
          <DetailPageWireframe withPlaceholders={showPlaceholders} />
        </TabsContent>
        
        <TabsContent value="list">
          <ListWireframe withPlaceholders={showPlaceholders} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsWireframe withPlaceholders={showPlaceholders} />
        </TabsContent>
        
        <TabsContent value="wizard">
          <FormWizardWireframe withPlaceholders={showPlaceholders} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
