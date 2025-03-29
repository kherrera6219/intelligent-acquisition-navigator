
import React, { useState } from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { TestimonialFilters } from '@/components/testimonials/TestimonialFilters';
import { FeaturedTestimonials } from '@/components/testimonials/FeaturedTestimonials';
import { TestimonialGrid } from '@/components/testimonials/TestimonialGrid';
import { TestimonialCta } from '@/components/testimonials/TestimonialCta';
import { testimonials } from '@/components/testimonials/TestimonialData';

const TestimonialsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sortByRating, setSortByRating] = useState<boolean>(false);

  const handleFilterChange = (sector: string) => {
    setFilter(sector);
  };

  return (
    <ExternalPageLayout
      title="Customer Testimonials | ProcurityIQ"
      description="Hear from our satisfied customers across government agencies"
    >
      {/* Testimonial Filters Component */}
      <TestimonialFilters 
        filter={filter}
        onFilterChange={handleFilterChange}
        sortByRating={sortByRating}
        onSortChange={setSortByRating}
      />

      {/* Featured Testimonials Component */}
      <FeaturedTestimonials testimonials={testimonials} />

      {/* All Testimonials Grid Component */}
      <TestimonialGrid 
        testimonials={testimonials} 
        filter={filter} 
        sortByRating={sortByRating}
      />

      {/* CTA Section Component */}
      <TestimonialCta />
    </ExternalPageLayout>
  );
};

export default TestimonialsPage;
