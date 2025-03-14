
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { TooltipContent } from "./TooltipContent";
import type { TooltipProps } from "./types";

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const Tooltip = ({ 
  children, 
  content, 
  side = "bottom", 
  align = "center",
  delayDuration = 300,
  className
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipPrimitive.Portal>
          <TooltipContent side={side} align={align} className={className ? className : "ms-motion-fadeIn ms-duration-2"}>
            {content}
          </TooltipContent>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
