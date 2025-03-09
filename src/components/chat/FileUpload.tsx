
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (files: FileList) => void;
  className?: string;
  conversationId?: string; // Added this prop to match usage in ChatPage.tsx
  onUploadComplete?: (documentId: any) => void; // Added to match usage in ChatPage.tsx
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  className,
  conversationId, // Add the prop here
  onUploadComplete // Add the prop here
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
      
      // If onUploadComplete callback is provided, call it with a mock document ID
      // In a real implementation, this would be the ID returned from the server
      if (onUploadComplete) {
        // Mock document ID for demonstration purposes
        const mockDocumentId = `doc-${Date.now()}`;
        onUploadComplete(mockDocumentId);
      }
      
      // Clear the file input after upload
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleButtonClick}
        className="hover:bg-background/50"
        title="Upload Document"
      >
        <Upload className="w-4 h-4" />
        <span className="sr-only">Upload Document</span>
      </Button>
    </div>
  );
};
