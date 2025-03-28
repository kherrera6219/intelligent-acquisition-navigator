
import React from "react";
import { MsGradientText } from "@/components/ui/universal/MsGradientText";

interface KnowledgeBaseHeaderProps {
  title: string;
  description: string;
}

export const KnowledgeBaseHeader: React.FC<KnowledgeBaseHeaderProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="mb-6">
      <MsGradientText className="text-2xl font-bold mb-2">{title}</MsGradientText>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
