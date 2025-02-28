
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { Button } from '@/components/ui/button';
import { FileIcon, Download, Trash2 } from 'lucide-react';
import { Proposal } from '@/types/proposals';

interface AttachmentsTabProps {
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

export const AttachmentsTab: React.FC<AttachmentsTabProps> = ({
  attachments
}) => {
  return (
    <div className="pt-4">
      {attachments.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No attachments available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attachments.map((attachment) => (
            <Card key={attachment.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileIcon className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">{attachment.name}</p>
                  <p className="text-xs text-gray-400">{attachment.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => window.open(attachment.url, '_blank')}
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentsTab;
