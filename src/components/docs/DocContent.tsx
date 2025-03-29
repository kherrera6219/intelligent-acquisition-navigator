
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DocItem } from './docsData';

interface DocContentProps {
  doc: DocItem;
}

export const DocContentDisplay: React.FC<DocContentProps> = ({ doc }) => {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <p className="text-amber-100">
        This is a placeholder for the full content of the "{doc.title}" document.
        In a real application, this would contain the complete documentation with
        formatted text, code examples, images, and more.
      </p>
      
      <h2 className="text-cyan-400">Example Section</h2>
      <p className="text-amber-100">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
        Phasellus euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl,
        eget aliquam nisl nisl eget nisl.
      </p>
      
      <h3 className="text-fuchsia-400">Subsection Example</h3>
      <p className="text-amber-100">
        Phasellus euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl,
        eget aliquam nisl nisl eget nisl.
      </p>
      
      <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto">
        <code className="text-green-300">
          {`// Example code
const fetchData = async () => {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
};`}
        </code>
      </pre>
      
      <h2 className="text-cyan-400">Additional Resources</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-blue-400 hover:underline">
            Related Documentation
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-400 hover:underline">
            API Reference
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-400 hover:underline">
            Video Tutorials
          </a>
        </li>
      </ul>
      
      <Separator className="my-6" />
      
      <div className="bg-accent/20 p-4 rounded-md">
        <h4 className="text-lg font-medium mb-2 text-pink-400">Was this document helpful?</h4>
        <div className="flex gap-2">
          <Button className="bg-primary/10 hover:bg-primary/20 text-cyan-400">
            Yes
          </Button>
          <Button variant="outline" className="bg-muted hover:bg-muted/80 text-amber-300">
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
