
import React, { useState } from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { TestimonialFilters } from '@/components/testimonials/TestimonialFilters';
import { FeaturedTestimonials } from '@/components/testimonials/FeaturedTestimonials';
import { TestimonialGrid } from '@/components/testimonials/TestimonialGrid';
import { TestimonialCta } from '@/components/testimonials/TestimonialCta';
import { testimonials } from '@/components/testimonials/TestimonialData';
import { TestimonialData } from '@/components/testimonials/types';

const TestimonialsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sortByRating, setSortByRating] = useState<boolean>(false);

  const handleFilterChange = (sector: string) => {
    setFilter(sector);
  };

  const hardcodedTestimonials: TestimonialData[] = [
    {
      name: "Sarah Johnson",
      role: "Procurement Director",
      organization: "California Department of Technology",
      content: "ProcurityIQ has revolutionized how we manage our IT acquisitions. The AI-powered insights have helped us identify over $2.3M in potential savings last quarter alone.",
      image: "/avatars/sarah-johnson.jpg",
      score: 4.9,
      sector: "state",
      featured: true
    },
    {
      name: "John Doe",
      role: "IT Manager",
      organization: "New York City Department of Information Technology",
      content: "ProcurityIQ's AI-driven solutions have been instrumental in streamlining our IT operations. We've saved over $1.5M in costs and improved our overall efficiency.",
      image: "/avatars/john-doe.jpg",
      score: 4.7,
      sector: "local",
      featured: false
    },
    {
      name: "Jane Smith",
      role: "IT Specialist",
      organization: "Los Angeles County Department of Public Works",
      content: "ProcurityIQ's AI-powered analytics have helped us identify and mitigate risks in our IT infrastructure. We've saved over $1.2M in costs and improved our security posture.",
      image: "/avatars/jane-smith.jpg",
      score: 4.8,
      sector: "local",
      featured: true
    },
    {
      name: "Emily Brown",
      role: "IT Director",
      organization: "Federal Aviation Administration",
      content: "ProcurityIQ's AI-driven solutions have been critical in supporting our operations during the pandemic. We've saved over $1.8M in costs and improved our response time.",
      image: "/avatars/emily-brown.jpg",
      score: 4.6,
      sector: "federal",
      featured: false
    },
    {
      name: "Michael Wilson",
      role: "IT Manager",
      organization: "Department of Defense",
      content: "ProcurityIQ's AI-powered insights have helped us identify and mitigate risks in our IT infrastructure. We've saved over $2.0M in costs and improved our security posture.",
      image: "/avatars/michael-wilson.jpg",
      score: 4.5,
      sector: "federal",
      featured: true
    }
  ];

  return (
    <ExternalPageLayout
      title="Customer Testimonials | ProcurityIQ"
      description="Hear from our satisfied customers across government agencies"
    >
      <TestimonialFilters 
        filter={filter}
        onFilterChange={handleFilterChange}
        sortByRating={sortByRating}
        onSortChange={setSortByRating}
      />

      <FeaturedTestimonials testimonials={testimonials} />

      <TestimonialGrid 
        testimonials={testimonials} 
        filter={filter} 
        sortByRating={sortByRating}
      />

      <TestimonialCta />
    </ExternalPageLayout>
  );
};

export default TestimonialsPage;
