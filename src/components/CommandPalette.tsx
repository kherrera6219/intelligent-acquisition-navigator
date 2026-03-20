
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { navigationItems } from "@/config/navigationItems";
import {
  Home,
  MessageSquare,
  FileStack,
  BookOpen,
  FileText,
  Search,
  FileCheck,
  Map,
  LogOut,
  User,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const navigate = useNavigate();

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const coreRoutes = navigationItems.filter((_, i) => i <= 3);
  const acquisitionRoutes = navigationItems.filter((_, i) => i >= 4 && i <= 6);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, actions, documents…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {coreRoutes.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.route}
                value={item.label}
                onSelect={() => runCommand(() => navigate(item.route))}
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Acquisition">
          {acquisitionRoutes.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.route}
                value={item.label}
                onSelect={() => runCommand(() => navigate(item.route))}
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          <CommandItem
            value="profile"
            onSelect={() => runCommand(() => navigate("/profile"))}
          >
            <User className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>User Profile</span>
          </CommandItem>
          <CommandItem
            value="sitemap"
            onSelect={() => runCommand(() => navigate("/sitemap"))}
          >
            <Map className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Sitemap</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
