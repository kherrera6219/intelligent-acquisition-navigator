
import React, { ReactNode } from "react";

interface HeaderContainerProps {
  isScrolled: boolean;
  className?: string;
  children: ReactNode;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = ({
  isScrolled,
  className = "",
  children
}) => {
  return (
    <header 
      className={`w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-gray-900/90 backdrop-blur-md shadow-md" 
          : "bg-gray-900"
      } ${className}`}
    >
      <div className="container mx-auto">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </header>
  );
};
