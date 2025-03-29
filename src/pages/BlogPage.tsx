
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { Helmet } from 'react-helmet';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 'blog1',
      title: 'New FAR Requirements for AI in Federal Procurement',
      excerpt: 'The Federal Acquisition Regulation (FAR) has been updated with new requirements for artificial intelligence use in federal procurement processes.',
      author: 'Jane Smith',
      category: 'Compliance',
      date: 'May 15, 2023',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800',
      tags: ['FAR', 'AI', 'Compliance']
    },
    {
      id: 'blog2',
      title: 'Streamlining the RFP Process with ProcurityIQ',
      excerpt: 'Learn how government agencies are using ProcurityIQ to streamline their Request for Proposal (RFP) processes and improve vendor responses.',
      author: 'Michael Johnson',
      category: 'Best Practices',
      date: 'April 28, 2023',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800',
      tags: ['RFP', 'Process Improvement', 'Digital Transformation']
    },
    {
      id: 'blog3',
      title: 'Addressing Equity in Government Contracting',
      excerpt: 'How the latest procurement regulations are helping to level the playing field for small and disadvantaged businesses in government contracting.',
      author: 'Sophia Rodriguez',
      category: 'Policy',
      date: 'April 12, 2023',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800',
      tags: ['Equity', 'Small Business', 'Policy']
    },
    {
      id: 'blog4',
      title: 'Cybersecurity Requirements in Federal Acquisition',
      excerpt: 'An overview of CMMC 2.0 and how it's changing cybersecurity requirements for contractors in the defense industrial base.',
      author: 'Robert Chen',
      category: 'Security',
      date: 'March 30, 2023',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800',
      tags: ['Cybersecurity', 'CMMC', 'Defense']
    },
    {
      id: 'blog5',
      title: 'Texas State Procurement Modernization Initiative',
      excerpt: 'Texas is modernizing its procurement systems. Learn about the changes and how they affect state agencies and vendors.',
      author: 'Amanda Taylor',
      category: 'State Government',
      date: 'March 15, 2023',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800',
      tags: ['Texas', 'Modernization', 'State Government']
    },
    {
      id: 'blog6',
      title: 'The Future of AI in Government Acquisition',
      excerpt: 'Exploring how artificial intelligence is transforming government acquisition processes and what changes to expect in the next five years.',
      author: 'Daniel Williams',
      category: 'Technology',
      date: 'February 28, 2023',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800',
      tags: ['AI', 'Future Trends', 'Innovation']
    }
  ];

  return (
    <ExternalPageLayout
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>Blog | ProcurityIQ</title>
        <meta name="description" content="Insights, updates, and best practices for government acquisition professionals." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">ProcurityIQ Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Insights, updates, and best practices for government acquisition professionals.
          </p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search articles..." className="pl-9" />
          </div>
          
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="policy">Policy</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Posts - 2/3 width */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12">
              <BlogPagination currentPage={1} totalPages={5} />
            </div>
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div className="md:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
