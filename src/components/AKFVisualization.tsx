
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Globe, Sparkles } from 'lucide-react';
import { AKFSection } from './AKFSection';
import { sectionData, relationshipData } from '../data/sectionData';

const AKFVisualization = () => {
  const [expandedSection, setExpandedSection] = useState('core');

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-violet-50/30 to-fuchsia-50/30 rounded-2xl">
      <Card className="border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-white p-8 rounded-t-2xl">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <Globe className="w-8 h-8" />
              4D Acquisition Knowledge Framework v32.4
            </CardTitle>
            <p className="text-violet-100 leading-relaxed">
              Enterprise Knowledge Base with Azure Cloud and OpenAI Integration
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <Alert className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border-violet-200 
                           text-violet-900 mb-8 rounded-xl shadow-sm">
            <AlertDescription className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              FedRAMP High, CMMC Level 3, and NIST 800-53 Rev 5 Compliant System
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
