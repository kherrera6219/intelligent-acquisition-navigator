
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Tag, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BlogSidebar: React.FC = () => {
  const popularTags = [
    'Compliance', 'Policy', 'Technology', 'AI', 'Digital Transformation',
    'FAR', 'Small Business', 'Cybersecurity', 'Best Practices', 'Innovation'
  ];
  
  const popularPosts = [
    { id: 'blog1', title: 'New FAR Requirements for AI in Federal Procurement', date: 'May 15, 2023' },
    { id: 'blog3', title: 'Addressing Equity in Government Contracting', date: 'April 12, 2023' },
    { id: 'blog6', title: 'The Future of AI in Government Acquisition', date: 'February 28, 2023' },
    { id: 'blog4', title: 'Cybersecurity Requirements in Federal Acquisition', date: 'March 30, 2023' }
  ];

  return (
    <div className="space-y-6">
      {/* Newsletter Subscription */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Mail className="mr-2 h-5 w-5 text-primary" />
            Subscribe to Our Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest insights and updates delivered to your inbox.
          </p>
          <div className="space-y-3">
            <Input placeholder="Your email address" type="email" />
            <Button className="w-full">Subscribe</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Popular Posts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bookmark className="mr-2 h-5 w-5 text-primary" />
            Popular Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {popularPosts.map(post => (
              <li key={post.id}>
                <Link 
                  to={`/blog/${post.id}`}
                  className="block hover:bg-muted/50 rounded p-2 transition-colors"
                >
                  <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Tags */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Tag className="mr-2 h-5 w-5 text-primary" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
