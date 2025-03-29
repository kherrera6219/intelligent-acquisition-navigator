
import React from 'react';
import { Card } from '@/components/ui/card';
import { ContainerConstraint } from './ContainerConstraint';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';

export const TypographyDemo: React.FC = () => {
  return (
    <Section>
      <ContainerConstraint size="xl">
        <SectionTitle 
          title="Typography System" 
          subtitle="Microsoft Fluent UI Typography Standards" 
          align="center" 
        />
        
        <div className="grid gap-8">
          {/* Headings */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Headings</h3>
            <div className="space-y-4">
              <div>
                <h1 className="ms-heading-1">Heading 1</h1>
                <p className="ms-caption">var(--ms-font-size-5xl) with tight line height</p>
              </div>
              <div>
                <h2 className="ms-heading-2">Heading 2</h2>
                <p className="ms-caption">var(--ms-font-size-4xl) with tight line height</p>
              </div>
              <div>
                <h3 className="ms-heading-3">Heading 3</h3>
                <p className="ms-caption">var(--ms-font-size-3xl) with tight line height</p>
              </div>
              <div>
                <h4 className="ms-heading-4">Heading 4</h4>
                <p className="ms-caption">var(--ms-font-size-2xl) with tight line height</p>
              </div>
              <div>
                <h5 className="ms-heading-5">Heading 5</h5>
                <p className="ms-caption">var(--ms-font-size-xl) with snug line height</p>
              </div>
              <div>
                <h6 className="ms-heading-6">Heading 6</h6>
                <p className="ms-caption">var(--ms-font-size-lg) with normal line height</p>
              </div>
            </div>
          </Card>

          {/* Text Sizes */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Text Sizes</h3>
            <div className="space-y-4">
              <div>
                <p className="ms-text-xs">Extra Small Text (xs)</p>
                <p className="ms-caption">var(--ms-font-size-xs): clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)</p>
              </div>
              <div>
                <p className="ms-text-sm">Small Text (sm)</p>
                <p className="ms-caption">var(--ms-font-size-sm): clamp(0.875rem, 0.825rem + 0.25vw, 1rem)</p>
              </div>
              <div>
                <p className="ms-text-md">Base Text (md)</p>
                <p className="ms-caption">var(--ms-font-size-base): clamp(1rem, 0.95rem + 0.25vw, 1.125rem)</p>
              </div>
              <div>
                <p className="ms-text-lg">Large Text (lg)</p>
                <p className="ms-caption">var(--ms-font-size-lg): clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)</p>
              </div>
              <div>
                <p className="ms-text-xl">Extra Large Text (xl)</p>
                <p className="ms-caption">var(--ms-font-size-xl): clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)</p>
              </div>
              <div>
                <p className="ms-text-2xl">2XL Text</p>
                <p className="ms-caption">var(--ms-font-size-2xl): clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem)</p>
              </div>
            </div>
          </Card>
          
          {/* Font Weights */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Font Weights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="ms-font-thin">Thin (100) - For specialized display usage</p>
              </div>
              <div>
                <p className="ms-font-extralight">Extra Light (200) - For light display</p>
              </div>
              <div>
                <p className="ms-font-light">Light (300) - For secondary content</p>
              </div>
              <div>
                <p className="ms-font-normal">Normal (400) - Base font weight for body</p>
              </div>
              <div>
                <p className="ms-font-medium">Medium (500) - For important content</p>
              </div>
              <div>
                <p className="ms-font-semibold">Semi Bold (600) - For subheadings</p>
              </div>
              <div>
                <p className="ms-font-bold">Bold (700) - For headings and emphasis</p>
              </div>
              <div>
                <p className="ms-font-extrabold">Extra Bold (800) - For strong emphasis</p>
              </div>
              <div>
                <p className="ms-font-black">Black (900) - For very strong emphasis</p>
              </div>
            </div>
          </Card>
          
          {/* Line Heights */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Line Heights</h3>
            <div className="space-y-6">
              <div>
                <p className="ms-leading-none border border-dashed border-border p-2">Leading None (1) - Very tight spacing for special cases</p>
              </div>
              <div>
                <p className="ms-leading-tight border border-dashed border-border p-2">Leading Tight (1.25) - For headlines and compressed text</p>
              </div>
              <div>
                <p className="ms-leading-snug border border-dashed border-border p-2">Leading Snug (1.375) - Comfortable reading for shorter text</p>
              </div>
              <div>
                <p className="ms-leading-normal border border-dashed border-border p-2">Leading Normal (1.5) - Standard reading for body text</p>
              </div>
              <div>
                <p className="ms-leading-relaxed border border-dashed border-border p-2">Leading Relaxed (1.625) - More breathing room for readable paragraphs</p>
              </div>
              <div>
                <p className="ms-leading-loose border border-dashed border-border p-2">Leading Loose (2) - Very spacious reading, used for special cases</p>
              </div>
            </div>
          </Card>
          
          {/* Helper Text & Captions */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Helper Text & Captions</h3>
            
            <div className="space-y-6">
              <div>
                <p className="ms-text-base mb-1">Input Field</p>
                <div className="border rounded p-2 mb-1 w-full">Example input value</div>
                <p className="ms-helper-text">Helper text provides additional context or validation information</p>
              </div>
              
              <div>
                <div className="bg-muted/20 aspect-video flex items-center justify-center rounded-md">
                  Image Placeholder
                </div>
                <p className="ms-caption mt-2">Caption text for images, figures, and other media elements</p>
              </div>
            </div>
          </Card>
          
          {/* Text Variants */}
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Text Variants</h3>
            
            <div className="space-y-6">
              <div>
                <p className="ms-display mb-2">Display Text</p>
                <p className="ms-caption">Large, bold text for major page headlines and hero sections</p>
              </div>
              
              <div>
                <p className="ms-title mb-2">Title Text</p>
                <p className="ms-caption">For section titles and important headings</p>
              </div>
              
              <div>
                <p className="ms-subtitle mb-2">Subtitle Text</p>
                <p className="ms-caption">Supporting text for titles, often used in card headers</p>
              </div>
              
              <div>
                <p className="ms-paragraph">Paragraph Text - This is the standard paragraph text style used for content and documentation. It provides optimal readability with a relaxed line height and properly sized font.</p>
              </div>
            </div>
          </Card>
        </div>
      </ContainerConstraint>
    </Section>
  );
};

export default TypographyDemo;
