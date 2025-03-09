
import React, { useState } from 'react';
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeaderNotifications: React.FC = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/70 transition-colors"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
      {hasNotifications && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"
        />
      )}
    </Button>
  );
};
