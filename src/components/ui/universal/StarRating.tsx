
import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface StarRatingProps {
  score: number;
  showScore?: boolean;
  className?: string;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  score, 
  showScore = false,
  className,
  readOnly = false,
  onChange,
  size = 'md'
}) => {
  // Calculate the full and partial stars
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;

  // Determine star size based on the size prop
  const getStarSize = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-6 w-6';
      case 'md':
      default: return 'h-5 w-5';
    }
  };

  const starSize = getStarSize();
  
  const handleStarClick = (index: number) => {
    if (readOnly || !onChange) return;
    onChange(index + 1);
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("flex", readOnly ? "" : "cursor-pointer")}>
        {[...Array(5)].map((_, index) => {
          // Render a full star
          if (index < fullStars) {
            return (
              <Star 
                key={index}
                className={`text-amber-400 fill-amber-400 ${starSize}`}
                onClick={() => handleStarClick(index)}
              />
            );
          }
          // Render a half star
          else if (index === fullStars && hasHalfStar) {
            return (
              <span key={index} className="relative" onClick={() => handleStarClick(index)}>
                <Star className={`text-muted ${starSize}`} />
                <span className="absolute top-0 left-0 overflow-hidden w-[50%]">
                  <Star className={`text-amber-400 fill-amber-400 ${starSize}`} />
                </span>
              </span>
            );
          }
          // Render an empty star
          return (
            <Star 
              key={index} 
              className={`text-muted ${starSize}`} 
              onClick={() => handleStarClick(index)}
            />
          );
        })}
      </div>
      
      {showScore && (
        <span className="ml-2 text-sm font-medium">{score.toFixed(1)}</span>
      )}
    </div>
  );
};
