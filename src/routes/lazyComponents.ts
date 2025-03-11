
import { lazy } from "react";

export function lazyImport<T extends React.ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return {
    default: lazy(factory)
  };
}

// Helper function for importing default exports
export function importDefault<T>(module: Promise<{ default: T }>): Promise<{ default: T }> {
  return module;
}

// Wrapper for PageLoader component
export const { PageLoader } = {
  PageLoader: lazy(() => import("./PageLoader").then(module => ({ default: module.PageLoader })))
};

// Use this function to create lazy components for routing
export function createLazyComponent(path: string) {
  return lazy(() => import(path));
}
