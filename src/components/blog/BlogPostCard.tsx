
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
  };
}

export const BlogPostCard: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-3 right-3">{post.category}</Badge>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <div className="flex items-center mr-4">
            <Calendar className="mr-1 h-3.5 w-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3.5 w-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link 
          to={`/blog/${post.id}`} 
          className="text-sm text-primary font-medium flex items-center hover:underline"
        >
          Read Article <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};
