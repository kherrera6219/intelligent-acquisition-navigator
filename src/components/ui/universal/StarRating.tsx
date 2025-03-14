
import React from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  score: number;
  showScore?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  score, 
  showScore = false, 
  className = '' 
}) => {
  // Ensure score is between 0 and 5
  const validScore = Math.min(5, Math.max(0, score));
  
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < validScore
              ? 'text-amber-400 fill-amber-400'
              : 'text-gray-400'
          }`}
        />
      ))}
      
      {showScore && (
        <span className="ml-2 text-sm font-medium text-amber-400">{validScore.toFixed(1)}</span>
      )}
    </div>
  );
};
