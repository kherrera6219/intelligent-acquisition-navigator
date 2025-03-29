
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, Star } from 'lucide-react';

interface TestimonialFiltersProps {
  filter: string;
  onFilterChange: (sector: string) => void;
  sortByRating: boolean;
  onSortChange: (sort: boolean) => void;
}

export const TestimonialFilters: React.FC<TestimonialFiltersProps> = ({
  filter,
  onFilterChange,
  sortByRating,
  onSortChange
}) => {
  return (
    <>
      {/* Hero Section with Filters */}
      <div className="bg-gradient-to-b from-background to-background/80 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">
              Our Customers <MsGradientText>Love</MsGradientText> What We Do
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Don't just take our word for it. See what government procurement professionals 
              have to say about how ProcurityIQ has transformed their acquisition processes.
            </p>
            <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
              <Badge 
                variant={filter === 'all' ? 'default' : 'outline'} 
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                onClick={() => onFilterChange('all')}
              >
                All Sectors
              </Badge>
              <Badge 
                variant={filter === 'federal' ? 'default' : 'outline'} 
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                onClick={() => onFilterChange('federal')}
              >
                Federal
              </Badge>
              <Badge 
                variant={filter === 'state' ? 'default' : 'outline'} 
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                onClick={() => onFilterChange('state')}
              >
                State
              </Badge>
              <Badge 
                variant={filter === 'local' ? 'default' : 'outline'} 
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                onClick={() => onFilterChange('local')}
              >
                Local
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      {/* Filter and Sort Controls */}
      <div className="py-4 bg-muted/10">
        <Container>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter & Sort</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onSortChange(!sortByRating)}
              className="flex items-center gap-1 text-xs"
            >
              <Star className="h-3 w-3" />
              {sortByRating ? "Highest Rated First" : "Default Order"}
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};
