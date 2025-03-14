
export interface TooltipProps {
  children: React.ReactNode;
  // Making content optional as it's now provided via TooltipContent
  content?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  delayDuration?: number;
}
