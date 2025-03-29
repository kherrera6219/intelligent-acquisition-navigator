
import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface StarRatingProps {
  score: number;
  showScore?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  score, 
  showScore = false,
  className
}) => {
  // Calculate the full and partial stars
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          // Render a full star
          if (index < fullStars) {
            return (
              <Star 
                key={index}
                className="text-amber-400 fill-amber-400 h-4 w-4"
              />
            );
          }
          // Render a half star
          else if (index === fullStars && hasHalfStar) {
            return (
              <span key={index} className="relative">
                <Star className="text-muted h-4 w-4" />
                <span className="absolute top-0 left-0 overflow-hidden w-[50%]">
                  <Star className="text-amber-400 fill-amber-400 h-4 w-4" />
                </span>
              </span>
            );
          }
          // Render an empty star
          return <Star key={index} className="text-muted h-4 w-4" />;
        })}
      </div>
      
      {showScore && (
        <span className="ml-2 text-sm font-medium">{score.toFixed(1)}</span>
      )}
    </div>
  );
};
