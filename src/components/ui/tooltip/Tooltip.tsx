
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { TooltipContent } from "./TooltipContent";
import type { TooltipProps } from "./types";

export const Tooltip = ({ 
  children, 
  content, 
  side = "bottom", 
  align = "center",
  delayDuration = 300
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={delayDuration}>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipContent side={side} align={align}>
            {content}
          </TooltipContent>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
