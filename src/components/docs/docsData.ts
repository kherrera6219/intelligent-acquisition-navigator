
import { LucideIcon } from 'lucide-react';

export type DocLevel = 'beginner' | 'intermediate' | 'advanced';

export interface DocItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  icon: string;
  category: string;
  tags: string[];
  level: DocLevel;
  readTime: number;
  updatedAt: string;
}

export interface DocCategory {
  id: string;
  label: string;
  title: string;
  description: string;
  items: DocItem[];
}

// Sample documentation data
const gettingStartedDocs: DocItem[] = [
  {
    id: 'gs-1',
    title: 'Introduction to ProcurityIQ',
    slug: 'introduction',
    description: 'Learn the basics of using ProcurityIQ for procurement management',
    icon: 'book',
    category: 'getting-started',
    tags: ['basics', 'overview'],
    level: 'beginner',
    readTime: 5,
    updatedAt: '2023-10-15T10:00:00Z'
  },
  {
    id: 'gs-2',
    title: 'Quick Start Guide',
    slug: 'quick-start',
    description: 'Get started quickly with ProcurityIQ in just a few steps',
    icon: 'file-text',
    category: 'getting-started',
    tags: ['setup', 'basics'],
    level: 'beginner',
    readTime: 8,
    updatedAt: '2023-11-01T14:30:00Z'
  },
  {
    id: 'gs-3',
    title: 'Platform Navigation',
    slug: 'navigation',
    description: 'Learn how to navigate through different sections of the platform',
    icon: 'search',
    category: 'getting-started',
    tags: ['interface', 'navigation'],
    level: 'beginner',
    readTime: 4,
    updatedAt: '2023-10-22T09:15:00Z'
  }
];

const federalDocs: DocItem[] = [
  {
    id: 'fed-1',
    title: 'Federal Acquisition Regulation (FAR) Overview',
    slug: 'far-overview',
    description: 'Understand how the FAR is integrated into ProcurityIQ',
    icon: 'book',
    category: 'federal',
    tags: ['FAR', 'federal', 'regulation'],
    level: 'intermediate',
    readTime: 12,
    updatedAt: '2023-09-18T11:20:00Z'
  },
  {
    id: 'fed-2',
    title: 'Federal Compliance Checks',
    slug: 'federal-compliance',
    description: 'Learn how to run compliance checks against federal requirements',
    icon: 'list-ordered',
    category: 'federal',
    tags: ['compliance', 'federal', 'checks'],
    level: 'advanced',
    readTime: 15,
    updatedAt: '2023-11-05T16:40:00Z'
  }
];

const texasDocs: DocItem[] = [
  {
    id: 'tx-1',
    title: 'Texas Procurement Laws',
    slug: 'texas-laws',
    description: 'Overview of Texas-specific procurement regulations and requirements',
    icon: 'book',
    category: 'texas',
    tags: ['Texas', 'state', 'regulation'],
    level: 'intermediate',
    readTime: 10,
    updatedAt: '2023-10-08T13:20:00Z'
  },
  {
    id: 'tx-2',
    title: 'Texas DIR Contracts',
    slug: 'texas-dir',
    description: 'How to navigate and utilize Texas DIR contracts in ProcurityIQ',
    icon: 'file-text',
    category: 'texas',
    tags: ['Texas', 'DIR', 'contracts'],
    level: 'intermediate',
    readTime: 8,
    updatedAt: '2023-09-25T09:30:00Z'
  }
];

const apiDocs: DocItem[] = [
  {
    id: 'api-1',
    title: 'API Introduction',
    slug: 'api-intro',
    description: 'Getting started with the ProcurityIQ API',
    icon: 'book',
    category: 'api',
    tags: ['API', 'integration', 'developer'],
    level: 'intermediate',
    readTime: 7,
    updatedAt: '2023-11-10T14:00:00Z'
  },
  {
    id: 'api-2',
    title: 'Authentication Methods',
    slug: 'api-auth',
    description: 'Learn about the different authentication methods for the API',
    icon: 'file-text',
    category: 'api',
    tags: ['API', 'auth', 'security'],
    level: 'advanced',
    readTime: 12,
    updatedAt: '2023-10-30T11:45:00Z'
  },
  {
    id: 'api-3',
    title: 'API Endpoints Reference',
    slug: 'api-endpoints',
    description: 'Complete reference of all available API endpoints',
    icon: 'list',
    category: 'api',
    tags: ['API', 'reference', 'endpoints'],
    level: 'advanced',
    readTime: 20,
    updatedAt: '2023-11-15T08:30:00Z'
  }
];

// Export the categories
export const docCategories: DocCategory[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    title: 'Getting Started with ProcurityIQ',
    description: 'Learn the basics of using our platform for procurement management',
    items: gettingStartedDocs
  },
  {
    id: 'federal',
    label: 'Federal Acquisition',
    title: 'Federal Acquisition Resources',
    description: 'Resources for federal procurement compliance and best practices',
    items: federalDocs
  },
  {
    id: 'texas',
    label: 'Texas Acquisition',
    title: 'Texas Acquisition Resources',
    description: 'Texas-specific procurement guidelines and compliance information',
    items: texasDocs
  },
  {
    id: 'api',
    label: 'API Documentation',
    title: 'API Documentation',
    description: 'Technical documentation for developers integrating with our API',
    items: apiDocs
  }
];

// Helper function to get documents by category
export const getDocsByCategory = (categoryId: string, searchQuery: string = ''): DocItem[] => {
  if (categoryId === 'all') {
    const allDocs = docCategories.flatMap(category => category.items);
    if (!searchQuery) return allDocs;
    
    return allDocs.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  
  const category = docCategories.find(c => c.id === categoryId);
  if (!category) return [];
  
  if (!searchQuery) return category.items;
  
  return category.items.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};
