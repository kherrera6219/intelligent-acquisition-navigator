
import { ChecklistItem } from '@/types/checklist';

export const initialChecklist: ChecklistItem[] = [
  {
    id: 1,
    title: "TypeScript Configuration",
    description: "Implement strict TypeScript settings and proper type definitions",
    completed: true
  },
  {
    id: 2,
    title: "Component Architecture",
    description: "Follow component-driven development with proper file structure",
    completed: true
  },
  {
    id: 3,
    title: "State Management",
    description: "Optimize React state management and Context API usage",
    completed: true
  },
  {
    id: 4,
    title: "Performance Optimization",
    description: "Implement React.memo, useCallback, and useMemo where needed",
    completed: true
  },
  {
    id: 5,
    title: "Code Quality",
    description: "Set up ESLint, Prettier, and consistent code formatting",
    completed: true
  },
  {
    id: 6,
    title: "Testing Infrastructure",
    description: "Configure Jest and React Testing Library with proper test coverage",
    completed: true
  },
  {
    id: 7,
    title: "Error Handling",
    description: "Implement comprehensive error boundaries and error recovery mechanisms",
    completed: true
  },
  {
    id: 8,
    title: "Form Validation",
    description: "Add client-side input validation with helpful feedback",
    completed: true
  },
  {
    id: 9,
    title: "Responsive Design",
    description: "Ensure proper display on all device sizes with adaptive layouts",
    completed: true
  },
  {
    id: 10,
    title: "API Integration",
    description: "Set up React Query for efficient API data fetching and caching",
    completed: true
  },
  {
    id: 11,
    title: "Accessibility Compliance",
    description: "Ensure WCAG 2.1 AA compliance with proper ARIA attributes",
    completed: false
  },
  {
    id: 12,
    title: "Search Functionality",
    description: "Implement robust search with filtering and pagination",
    completed: false
  },
  {
    id: 13,
    title: "Offline Support",
    description: "Add service workers and IndexedDB for offline functionality",
    completed: false
  },
  {
    id: 14,
    title: "Performance Monitoring",
    description: "Set up analytics and performance tracking with error reporting",
    completed: false
  },
  {
    id: 15,
    title: "Security Enhancements",
    description: "Implement security best practices including CSRF protection and input sanitization",
    completed: false
  }
];
