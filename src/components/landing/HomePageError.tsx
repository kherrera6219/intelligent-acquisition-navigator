
import React from 'react';

interface HomePageErrorProps {
  error: Error;
}

export const HomePageError = ({ error }: HomePageErrorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1720]">
      <div className="glass-card p-8 text-center max-w-md mx-auto animate-fade-in">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Failed to load page</h1>
        <p className="text-gray-400 mb-6">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
