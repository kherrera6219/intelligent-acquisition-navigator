
import React from 'react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { cn } from '@/lib/utils';

interface KnowledgeBaseHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export const KnowledgeBaseHeader: React.FC<KnowledgeBaseHeaderProps> = ({
  title,
  description,
  className
}) => {
  return (
    <div className={cn("ms-motion-fadeIn", className)}>
      <h1 className="ms-title-large mb-2">
        <MsGradientText gradient="primary">{title}</MsGradientText>
      </h1>
      <p className="text-muted-foreground max-w-3xl">{description}</p>
    </div>
  );
};
