
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (files: FileList) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
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
