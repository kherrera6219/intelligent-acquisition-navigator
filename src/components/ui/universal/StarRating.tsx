
import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  max?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readOnly = false,
  size = 'md',
  max = 5
}) => {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  const handleClick = (rating: number) => {
    if (readOnly || !onChange) return;
    onChange(rating);
  };
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-5 h-5';
      case 'lg': return 'w-6 h-6';
      default: return 'w-5 h-5';
    }
  };

  return (
    <div className="flex items-center">
      {stars.map((star) => {
        const isFilled = value >= star;
        const isHalfFilled = value >= star - 0.5 && value < star;
        
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            className={cn(
              "p-0.5 focus:outline-none",
              readOnly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"
            )}
            aria-label={`Rate ${star} stars out of ${max}`}
            disabled={readOnly}
          >
            {isFilled ? (
              <Star className={cn(getSizeClass(), "fill-yellow-400 text-yellow-400")} />
            ) : isHalfFilled ? (
              <StarHalf className={cn(getSizeClass(), "fill-yellow-400 text-yellow-400")} />
            ) : (
              <Star className={cn(getSizeClass(), "text-gray-300")} />
            )}
          </button>
        );
      })}
    </div>
  );
};
