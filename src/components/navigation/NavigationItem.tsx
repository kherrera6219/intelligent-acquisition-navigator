
import { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  route: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavigationItem = ({
  icon: Icon,
  label,
  description,
  isActive,
  onClick
}: NavigationItemProps) => {
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      className="w-full justify-start gap-3"
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      aria-label={description}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </Button>
  );
};
