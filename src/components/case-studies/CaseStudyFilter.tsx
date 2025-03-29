
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const CaseStudyFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const industries = [
    'All Industries',
    'Defense',
    'Healthcare',
    'Education',
    'Environmental',
    'Transportation',
    'Agriculture'
  ];
  
  const agencies = [
    'All Agencies',
    'Department of Defense',
    'Department of Health',
    'Department of Education',
    'Environmental Protection Agency',
    'Department of Transportation',
    'U.S. Department of Agriculture'
  ];

  return (
    <div className="bg-background/50 border border-border/50 rounded-lg p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search case studies..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="All Industries">
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select defaultValue="All Agencies">
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Agency" />
            </SelectTrigger>
            <SelectContent>
              {agencies.map((agency) => (
                <SelectItem key={agency} value={agency}>
                  {agency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
