
import React from 'react';
import { Card } from '@/components/ui/card';
import { ImprovementChecklist } from '@/components/ui/checklist/ImprovementChecklist';
import { CodeReviewHeader } from './components/CodeReviewHeader';
import { CodeReviewStats } from './components/CodeReviewStats';
import { CodeReviewFilters } from './components/CodeReviewFilters';
import { IssueList } from './components/IssueList';
import { useCodeReviewState } from './hooks/useCodeReviewState';

// Initial state of issues
const initialIssues = [
  {
    id: 'TSC-001',
    category: 'TypeScript',
    title: 'Fix build errors in useRecentActivities.ts',
    description: 'The file has syntax errors causing build failures.',
    severity: 'critical' as const,
    status: 'completed' as const,
  },
  {
    id: 'TSC-002',
    category: 'Components',
    title: 'ThemeToggle component missing',
    description: 'ThemeToggle component was referenced but not implemented.',
    severity: 'high' as const,
    status: 'completed' as const,
  },
  {
    id: 'PERF-001',
    category: 'Performance',
    title: 'Code splitting and lazy loading',
    description: 'Implement code splitting and lazy loading for all page components.',
    severity: 'medium' as const,
    status: 'pending' as const,
  },
  {
    id: 'ACC-001',
    category: 'Accessibility',
    title: 'ARIA labels missing',
    description: 'Add appropriate ARIA labels to interactive elements.',
    severity: 'high' as const,
    status: 'pending' as const,
  },
  {
    id: 'UI-001',
    category: 'UI',
    title: 'Responsive design improvements',
    description: 'Ensure all components work well on mobile devices.',
    severity: 'medium' as const,
    status: 'pending' as const,
  },
  {
    id: 'ERR-001',
    category: 'Error Handling',
    title: 'Global error boundary',
    description: 'Implement a global error boundary for better error recovery.',
    severity: 'high' as const,
    status: 'in-progress' as const,
  },
  {
    id: 'SEC-001',
    category: 'Security',
    title: 'Input sanitization',
    description: 'Ensure all user inputs are properly sanitized.',
    severity: 'high' as const,
    status: 'pending' as const,
  },
  {
    id: 'TEST-001',
    category: 'Testing',
    title: 'Unit tests coverage',
    description: 'Improve unit test coverage for critical components.',
    severity: 'medium' as const,
    status: 'pending' as const,
  },
  {
    id: 'STATE-001',
    category: 'State Management',
    title: 'Optimize React Query usage',
    description: 'Ensure proper caching and error handling in React Query implementations.',
    severity: 'medium' as const,
    status: 'pending' as const,
  },
  {
    id: 'DOC-001',
    category: 'Documentation',
    title: 'Component documentation',
    description: 'Add better documentation for shared components.',
    severity: 'low' as const,
    status: 'pending' as const,
  },
  {
    id: 'MS-001',
    category: 'Microsoft Standards',
    title: 'Adopt Microsoft Fluent design system',
    description: 'Implement Microsoft Fluent UI design patterns for consistency.',
    severity: 'medium' as const,
    status: 'pending' as const,
  },
  {
    id: 'MS-002',
    category: 'Microsoft Standards',
    title: 'Azure monitoring integration',
    description: 'Add Azure Application Insights for monitoring and telemetry.',
    severity: 'high' as const,
    status: 'pending' as const,
  },
  {
    id: 'MS-003',
    category: 'Microsoft Standards',
    title: 'Microsoft Graph API integration',
    description: 'Implement Microsoft Graph API for user profiles and authentication.',
    severity: 'medium' as const,
    status: 'pending' as const,
  },
  {
    id: 'PERF-002',
    category: 'Performance',
    title: 'Web vitals optimization',
    description: 'Improve Core Web Vitals (LCP, FID, CLS) scores.',
    severity: 'high' as const,
    status: 'pending' as const,
  },
  {
    id: 'A11Y-001',
    category: 'Accessibility',
    title: 'WCAG 2.1 AA compliance',
    description: 'Ensure compliance with WCAG 2.1 AA standards for accessibility.',
    severity: 'high' as const,
    status: 'pending' as const,
  }
];

export const CodeReviewChecklist: React.FC = () => {
  const {
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    total,
    completed,
    inProgress,
    completionPercentage,
    categories,
    filteredIssues,
    updateIssueStatus,
    addIssue
  } = useCodeReviewState(initialIssues);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CodeReviewHeader addIssue={addIssue} />

        <CodeReviewStats 
          total={total}
          completed={completed}
          inProgress={inProgress}
          completionPercentage={completionPercentage}
        />

        <CodeReviewFilters
          filter={filter}
          setFilter={setFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />

        <IssueList 
          issues={filteredIssues}
          updateIssueStatus={updateIssueStatus}
        />
      </Card>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Project Improvement Checklist</h3>
        <ImprovementChecklist />
      </div>
    </div>
  );
};

export default CodeReviewChecklist;
