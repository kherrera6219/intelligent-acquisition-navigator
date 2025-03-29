
import React from 'react';
import { Section } from './PageSections';
import { SectionTitle } from './SectionTitle';

export const TypographyDemo: React.FC = () => {
  return (
    <div className="space-y-12">
      <Section>
        <SectionTitle 
          title="Microsoft Fluent Typography System" 
          description="A comprehensive typography system following Microsoft Fluent design guidelines."
          align="center"
        />

        <div className="space-y-8 mt-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Headings</h3>
            <div className="space-y-3">
              <div>
                <div className="ms-heading-1">Heading 1</div>
                <div className="text-xs text-muted-foreground mt-1">ms-heading-1</div>
              </div>
              <div>
                <div className="ms-heading-2">Heading 2</div>
                <div className="text-xs text-muted-foreground mt-1">ms-heading-2</div>
              </div>
              <div>
                <div className="ms-heading-3">Heading 3</div>
                <div className="text-xs text-muted-foreground mt-1">ms-heading-3</div>
              </div>
              <div>
                <div className="ms-heading-4">Heading 4</div>
                <div className="text-xs text-muted-foreground mt-1">ms-heading-4</div>
              </div>
              <div>
                <div className="ms-heading-5">Heading 5</div>
                <div className="text-xs text-muted-foreground mt-1">ms-heading-5</div>
              </div>
              <div>
                <div className="ms-heading-6">Heading 6</div>
                <div className="text-xs text-muted-foreground mt-1">ms-heading-6</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Body Text</h3>
            <div className="space-y-3">
              <div>
                <div className="ms-text-lg">Large Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-lg</div>
              </div>
              <div>
                <div className="ms-text-base">Base Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-base</div>
              </div>
              <div>
                <div className="ms-text-sm">Small Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-sm</div>
              </div>
              <div>
                <div className="ms-text-xs">Extra Small Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-xs</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Text Variations</h3>
            <div className="space-y-3">
              <div>
                <div className="ms-text-muted">Muted Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-muted</div>
              </div>
              <div>
                <div className="ms-text-primary">Primary Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-primary</div>
              </div>
              <div>
                <div className="ms-text-success">Success Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-success</div>
              </div>
              <div>
                <div className="ms-text-warning">Warning Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-warning</div>
              </div>
              <div>
                <div className="ms-text-error">Error Text</div>
                <div className="text-xs text-muted-foreground mt-1">ms-text-error</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
