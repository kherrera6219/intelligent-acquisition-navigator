
import React, { useState } from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Card } from '@/components/ui/card';
import { SearchIcon, FilterIcon, CalendarIcon, UserIcon, TagIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const blogPosts = [
  {
    id: 1,
    title: "Understanding Federal Acquisition Regulations",
    excerpt: "A deep dive into the complexities of FAR and how to navigate them effectively.",
    date: "May 15, 2023",
    author: "Sarah Johnson",
    category: "Federal",
    tags: ["FAR", "Compliance", "Acquisition"]
  },
  {
    id: 2,
    title: "State Procurement Best Practices",
    excerpt: "Examining successful procurement strategies implemented across various state governments.",
    date: "June 2, 2023",
    author: "Michael Chen",
    category: "State",
    tags: ["Best Practices", "Procurement", "Strategy"]
  },
  {
    id: 3,
    title: "AI-Powered Solutions in Government Procurement",
    excerpt: "How artificial intelligence is transforming the acquisition landscape for government agencies.",
    date: "June 28, 2023",
    author: "David Rodriguez",
    category: "Technology",
    tags: ["AI", "Innovation", "Digital Transformation"]
  },
  {
    id: 4,
    title: "Compliance Challenges in Local Government Procurement",
    excerpt: "Addressing the unique regulatory challenges faced by municipal procurement officers.",
    date: "July 10, 2023",
    author: "Jennifer Garcia",
    category: "Local",
    tags: ["Compliance", "Regulation", "Municipal"]
  },
  {
    id: 5,
    title: "Sustainable Procurement Strategies",
    excerpt: "Implementing environmentally conscious acquisition practices in government operations.",
    date: "August 5, 2023",
    author: "Robert Williams",
    category: "Sustainability",
    tags: ["Green Procurement", "Environment", "Sustainability"]
  }
];

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter blog posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  return (
    <ExternalPageLayout
      title="Blog"
      description="Insights and updates on government procurement"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background to-background/80 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Procurement <MsGradientText>Insights</MsGradientText> & Knowledge
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest trends, best practices, and regulatory changes in government procurement.
            </p>
          </div>
        </Container>
      </div>

      {/* Blog Content */}
      <div className="py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search articles..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
              
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"} 
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              {/* Blog Posts */}
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline">{post.category}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center text-sm">
                            <UserIcon className="h-3 w-3 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <Button variant="link" className="p-0">Read More</Button>
                        </div>
                        <div className="flex gap-2 mt-4">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Subscribe to Updates</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest procurement insights delivered to your inbox.
                </p>
                <Input placeholder="Your email address" className="mb-4" />
                <Button className="w-full">Subscribe</Button>
              </Card>
              
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Compliance</Badge>
                  <Badge variant="outline">FAR</Badge>
                  <Badge variant="outline">Acquisition</Badge>
                  <Badge variant="outline">Technology</Badge>
                  <Badge variant="outline">Best Practices</Badge>
                  <Badge variant="outline">AI</Badge>
                  <Badge variant="outline">Sustainability</Badge>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                      <h4 className="font-medium mb-1">{post.title}</h4>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span>{post.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-muted/30">
        <Container size="md">
          <div className="text-center p-8 border border-border/40 rounded-lg bg-card/60 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Have Knowledge to Share?</h2>
            <p className="text-muted-foreground mb-8">
              We welcome insights from procurement professionals. Share your expertise and experience with our community.
            </p>
            <Button size="lg">Submit an Article</Button>
          </div>
        </Container>
      </div>
    </ExternalPageLayout>
  );
};

export default BlogPage;
