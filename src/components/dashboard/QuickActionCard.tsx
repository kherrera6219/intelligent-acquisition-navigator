
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/universal/Card';

interface QuickActionCardProps { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  href: string; 
  color?: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title, 
  description, 
  icon: Icon, 
  href, 
  color = "text-blue-500" 
}) => (
  <Link to={href} className="block h-full">
    <Card 
      variant="glass" 
      hoverable={true}
      className="h-full flex flex-col p-4"
    >
      <div className={`w-12 h-12 rounded-full bg-white/10 ${color} flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  </Link>
);
