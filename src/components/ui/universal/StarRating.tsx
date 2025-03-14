
import React from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  score?: number;
  value?: number; // Added for backward compatibility
  showScore?: boolean;
  className?: string;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  score, 
  value, // Added for backward compatibility
  showScore = false, 
  className = '',
  readOnly = false,
  size = 'md',
  onChange
}) => {
  // Use value prop if score is not provided for backward compatibility
  const ratingValue = score !== undefined ? score : (value !== undefined ? value : 0);
  
  // Size mappings
  const sizeMap = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const starSize = sizeMap[size] || sizeMap.md;
  
  // Handle star click
  const handleStarClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`${starSize} ${
            index < ratingValue
              ? 'text-amber-400 fill-amber-400'
              : 'text-gray-400'
          } ${!readOnly && onChange ? 'cursor-pointer' : ''}`}
          onClick={() => handleStarClick(index)}
        />
      ))}
      
      {showScore && (
        <span className="ml-2 text-sm font-medium text-amber-400">{ratingValue.toFixed(1)}</span>
      )}
    </div>
  );
};
