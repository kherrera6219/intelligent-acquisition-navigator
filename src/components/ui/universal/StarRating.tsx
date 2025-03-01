
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  value = 0,
  onChange,
  readOnly = false,
  size = 'md'
}) => {
  const maxStars = 5;
  
  const handleStarClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-3 w-3';
      case 'lg': return 'h-6 w-6';
      case 'md':
      default: return 'h-4 w-4';
    }
  };
  
  return (
    <div className="flex items-center">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= value;
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(starValue)}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} p-0.5 focus:outline-none`}
            aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
            disabled={readOnly}
          >
            <Star
              className={`${getSizeClass()} ${
                filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
