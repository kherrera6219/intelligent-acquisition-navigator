
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { MsFluentButton } from './MsFluentButton';
import { Progress } from '@/components/ui/progress';

interface MsFileInputProps {
  onChange: (files: File[]) => void;
  value: File[];
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  className?: string;
  children: React.ReactNode;
}

export const MsFileInput: React.FC<MsFileInputProps> = ({
  onChange,
  value,
  maxFiles = 1,
  maxSize,
  acceptedTypes,
  className,
  children,
}) => {
  return (
    <div className={cn("ms-file-input", className)}>
      {children}
    </div>
  );
};

interface MsFileInputUploaderProps {
  className?: string;
}

export const MsFileInputUploader: React.FC<MsFileInputUploaderProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "ms-file-input-uploader border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer",
        className
      )}
    >
      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-1">Drop files here or click to upload</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Upload files for processing (PDF, Images, Documents)
      </p>
      <MsFluentButton variant="primary">Select Files</MsFluentButton>
    </div>
  );
};

interface MsFileInputPreviewProps {
  file: File;
  onRemove: () => void;
  progress?: number;
  className?: string;
}

export const MsFileInputPreview: React.FC<MsFileInputPreviewProps> = ({
  file,
  onRemove,
  progress,
  className,
}) => {
  const isComplete = progress === 100;
  const isImage = file.type.startsWith('image/');
  
  const getFileIcon = () => {
    if (isImage) {
      return <img 
        src={URL.createObjectURL(file)} 
        alt={file.name} 
        className="h-10 w-10 object-cover rounded" 
      />;
    }
    
    return <File className="h-10 w-10 text-muted-foreground" />;
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  return (
    <div 
      className={cn(
        "ms-file-input-preview border border-border rounded-md p-3 flex items-center",
        className
      )}
    >
      <div className="flex-shrink-0 mr-3">
        {getFileIcon()}
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <div className="truncate">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
          </div>
          
          <button
            onClick={onRemove}
            className="ml-2 flex-shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {typeof progress === 'number' && (
          <div className="mt-2">
            <div className="flex justify-between items-center text-xs mb-1">
              <span>{isComplete ? 'Complete' : 'Uploading...'}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
      </div>
      
      {isComplete && (
        <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
      )}
    </div>
  );
};
