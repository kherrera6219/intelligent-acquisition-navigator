import { IconName } from './Icons';

export interface DocItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: IconName;
  updatedAt: string;
  readTime: number;
  externalUrl?: string; // External acquisition resource URL
}

export interface CategoryItem {
  id: string;
  title: string;
  icon: IconName;
}

export interface DocCategory {
  id: string;
  label: string;
  title: string;
  description: string;
  items: DocItem[];
}

// Define document categories
export const docCategories: DocCategory[] = [
  {
    id: 'getting-started',
    label: 'Get Started',
    title: 'Getting Started',
    description: 'Everything you need to start your procurement journey',
    items: [
      {
        id: 'introduction',
        title: 'Introduction',
        icon: 'book',
        slug: 'welcome',
        category: 'introduction',
        level: 'beginner',
        updatedAt: '2023-11-15T10:30:00Z',
        readTime: 5,
        description: 'An introduction to the ProcurityIQ acquisition framework'
      },
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        icon: 'list',
        slug: 'quick-start',
        category: 'quick-start',
        level: 'beginner',
        updatedAt: '2023-11-05T09:15:00Z',
        readTime: 10,
        description: 'A rapid onboarding guide for procurement teams',
        externalUrl: 'https://acquisition.gov/browse/index/far'
      }
    ]
  },
  {
    id: 'federal',
    label: 'Federal Procurement',
    title: 'Federal Procurement',
    description: 'Federal acquisition regulations and processes',
    items: [
      {
        id: 'far',
        title: 'FAR Compliance',
        icon: 'file-text',
        slug: 'far-key-provisions',
        category: 'far',
        level: 'intermediate',
        updatedAt: '2023-10-28T16:45:00Z',
        readTime: 15,
        description: 'An in-depth guide to Federal Acquisition Regulations',
        externalUrl: 'https://www.acquisition.gov/'
      },
      {
        id: 'federal-acquisition',
        title: 'Federal Acquisition Process',
        icon: 'list-ordered',
        slug: 'federal-acquisition-overview',
        category: 'federal-acquisition',
        level: 'beginner',
        updatedAt: '2023-10-15T13:20:00Z',
        readTime: 20,
        description: 'A comprehensive overview of the federal acquisition process',
        externalUrl: 'https://www.gsa.gov/acquisition'
      }
    ]
  }
];

// All documents data - now defined within the categories

// Filter documents by category
export const getDocsByCategory = (categoryId: string, searchQuery?: string): DocItem[] => {
  let filteredDocs: DocItem[] = [];
  
  // Flatten all documents from all categories
  docCategories.forEach(category => {
    filteredDocs = [...filteredDocs, ...category.items];
  });
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    return filteredDocs.filter(doc => 
      doc.title.toLowerCase().includes(query) || 
      doc.description.toLowerCase().includes(query)
    );
  }
  
  if (categoryId === 'all') {
    return filteredDocs;
  }
  
  // Find the category that contains the categoryId as an item
  const parentCategory = docCategories.find(category => 
    category.items.some(item => item.id === categoryId)
  );
  
  if (parentCategory) {
    return filteredDocs.filter(doc => doc.category === categoryId);
  }
  
  return [];
};
