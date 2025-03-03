
import { ReactElement } from "react";

export interface NavItem {
  href: string;
  label: string;
  minRole?: string;
  icon: React.ElementType;
  items?: NavItem[];
}
