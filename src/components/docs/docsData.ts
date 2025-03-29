
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
  items: CategoryItem[];
}

// Define document categories
export const docCategories: DocCategory[] = [
  {
    id: 'getting-started',
    label: 'Get Started',
    title: 'Getting Started',
    description: 'Everything you need to start your procurement journey',
    items: [
      { id: 'introduction', title: 'Introduction', icon: 'book' },
      { id: 'quick-start', title: 'Quick Start Guide', icon: 'list' }
    ]
  },
  {
    id: 'federal',
    label: 'Federal Procurement',
    title: 'Federal Procurement',
    description: 'Federal acquisition regulations and processes',
    items: [
      { id: 'far', title: 'FAR Compliance', icon: 'file-text' },
      { id: 'federal-acquisition', title: 'Federal Acquisition Process', icon: 'list-ordered' }
    ]
  },
  {
    id: 'texas',
    label: 'Texas Procurement',
    title: 'Texas Procurement',
    description: 'Texas-specific acquisition guidelines and procedures',
    items: [
      { id: 'texas-statutes', title: 'Texas Statutes', icon: 'file-text' },
      { id: 'texas-process', title: 'Texas Acquisition Process', icon: 'list-ordered' }
    ]
  },
  {
    id: 'templates',
    label: 'Templates & Forms',
    title: 'Templates & Forms',
    description: 'Ready-to-use templates for acquisition documents',
    items: [
      { id: 'rfp-templates', title: 'RFP Templates', icon: 'file-text' },
      { id: 'contract-templates', title: 'Contract Templates', icon: 'file-text' }
    ]
  }
];

// All documents data
const allDocuments: DocItem[] = [
  {
    id: '1',
    title: 'Welcome to ProcurityIQ',
    description: 'An introduction to the ProcurityIQ acquisition framework and how it can help your procurement process',
    slug: 'welcome',
    category: 'introduction',
    level: 'beginner',
    icon: 'book',
    updatedAt: '2023-11-15T10:30:00Z',
    readTime: 5
  },
  {
    id: '2',
    title: 'Setting Up Your First Procurement Project',
    description: 'Learn how to set up and organize your first procurement project using our framework',
    slug: 'first-project',
    category: 'introduction',
    level: 'beginner',
    icon: 'book',
    updatedAt: '2023-11-10T14:20:00Z',
    readTime: 8
  },
  {
    id: '3',
    title: 'Quick Start Guide for Procurement Teams',
    description: 'A rapid onboarding guide for procurement teams to get up and running with ProcurityIQ',
    slug: 'quick-start',
    category: 'quick-start',
    level: 'beginner',
    icon: 'list',
    updatedAt: '2023-11-05T09:15:00Z',
    readTime: 10,
    externalUrl: 'https://acquisition.gov/browse/index/far'
  },
  {
    id: '4',
    title: 'Understanding the FAR: Key Provisions',
    description: 'An in-depth guide to the most important Federal Acquisition Regulation provisions',
    slug: 'far-key-provisions',
    category: 'far',
    level: 'intermediate',
    icon: 'file-text',
    updatedAt: '2023-10-28T16:45:00Z',
    readTime: 15,
    externalUrl: 'https://www.acquisition.gov/'
  },
  {
    id: '5',
    title: 'FAR Compliance Checklist',
    description: 'A step-by-step checklist to ensure your procurement process complies with Federal Acquisition Regulations',
    slug: 'far-compliance-checklist',
    category: 'far',
    level: 'intermediate',
    icon: 'list',
    updatedAt: '2023-10-20T11:30:00Z',
    readTime: 12,
    externalUrl: 'https://www.acquisition.gov/far/'
  },
  {
    id: '6',
    title: 'Federal Acquisition Process Overview',
    description: 'A comprehensive overview of the federal acquisition process from planning to contract completion',
    slug: 'federal-acquisition-overview',
    category: 'federal-acquisition',
    level: 'beginner',
    icon: 'list-ordered',
    updatedAt: '2023-10-15T13:20:00Z',
    readTime: 20,
    externalUrl: 'https://www.gsa.gov/acquisition'
  },
  {
    id: '7',
    title: 'Texas Procurement Statutes Guide',
    description: 'A guide to understanding Texas state procurement laws and regulations',
    slug: 'texas-statutes-guide',
    category: 'texas-statutes',
    level: 'intermediate',
    icon: 'file-text',
    updatedAt: '2023-10-10T10:15:00Z',
    readTime: 18,
    externalUrl: 'https://comptroller.texas.gov/purchasing/'
  },
  {
    id: '8',
    title: 'Texas Acquisition Process Walkthrough',
    description: 'A detailed walkthrough of the Texas state acquisition process with key milestones',
    slug: 'texas-process-walkthrough',
    category: 'texas-process',
    level: 'intermediate',
    icon: 'list-ordered',
    updatedAt: '2023-10-05T09:30:00Z',
    readTime: 25,
    externalUrl: 'https://comptroller.texas.gov/purchasing/publications/'
  },
  {
    id: '9',
    title: 'RFP Template for IT Services',
    description: 'A customizable Request for Proposal template specifically designed for IT service procurement',
    slug: 'rfp-it-services',
    category: 'rfp-templates',
    level: 'advanced',
    icon: 'file-text',
    updatedAt: '2023-09-28T15:45:00Z',
    readTime: 15,
    externalUrl: 'https://www.gsa.gov/buying-selling/products-services/information-technology'
  },
  {
    id: '10',
    title: 'Government Contract Templates Collection',
    description: 'A collection of standard government contract templates for various procurement needs',
    slug: 'contract-templates-collection',
    category: 'contract-templates',
    level: 'advanced',
    icon: 'file-text',
    updatedAt: '2023-09-20T14:10:00Z',
    readTime: 22,
    externalUrl: 'https://www.usa.gov/procurement'
  }
];

// Filter documents by category
export const getDocsByCategory = (categoryId: string, searchQuery?: string): DocItem[] => {
  let filteredDocs = [...allDocuments];
  
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
