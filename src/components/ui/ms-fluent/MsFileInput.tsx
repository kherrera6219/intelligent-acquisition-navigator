
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload, FileIcon, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface MsFileInputProps {
  children: React.ReactNode;
  className?: string;
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  disabled?: boolean;
}

export const MsFileInput: React.FC<MsFileInputProps> = ({
  children,
  className,
  value,
  onChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ['*/*'],
  disabled = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFiles = (files: FileList | File[]) => {
    setError(null);
    const fileArray = Array.from(files);
    
    // Validate file count
    if (value.length + fileArray.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    // Validate file types and sizes
    const validFiles = fileArray.filter(file => {
      // Check file type
      if (acceptedTypes[0] !== '*/*') {
        const fileType = file.type;
        const isValidType = acceptedTypes.some(type => {
          if (type.endsWith('/*')) {
            return fileType.startsWith(type.replace('/*', '/'));
          }
          return type === fileType;
        });
        
        if (!isValidType) {
          setError(`File type not accepted: ${file.name}`);
          return false;
        }
      }
      
      // Check file size
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}`);
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      onChange([...value, ...validFiles]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };
  
  const handleDragLeave = () => {
    setDragActive(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  return (
    <div 
      className={cn(
        'ms-file-input',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {error && (
        <div className="mb-3 text-sm text-destructive flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
      
      {children}
    </div>
  );
};

export const MsFileInputUploader: React.FC<{
  className?: string;
  prompt?: string;
  icon?: React.ReactNode;
}> = ({ className, prompt = "Drag files here or click to browse", icon }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div 
      className={cn(
        'ms-file-input-uploader flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/5 transition-colors',
        className
      )}
      onClick={() => inputRef.current?.click()}
    >
      {icon || <Upload className="h-10 w-10 text-primary/60 mb-2" />}
      <p className="text-sm text-muted-foreground">{prompt}</p>
      <input 
        ref={inputRef} 
        type="file" 
        className="hidden" 
        multiple 
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            // Find the parent MsFileInput component
            let parent = e.currentTarget.parentElement;
            while (parent && !parent.classList.contains('ms-file-input')) {
              parent = parent.parentElement;
            }
            
            if (parent && parent.dispatchEvent) {
              // Dispatch a custom event that the MsFileInput component can listen for
              const event = new CustomEvent('msFileSelected', {
                detail: { files: e.target.files }
              });
              parent.dispatchEvent(event);
            }
          }
        }}
      />
    </div>
  );
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const MsFileInputPreview: React.FC<{
  file: File;
  onRemove?: () => void;
  progress?: number;
  className?: string;
}> = ({ file, onRemove, progress, className }) => {
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';
  
  const getIconForFileType = () => {
    if (isPdf) return <FileIcon className="h-5 w-5 text-red-500" />;
    return <FileIcon className="h-5 w-5 text-primary" />;
  };
  
  return (
    <div 
      className={cn(
        'ms-file-input-preview flex items-center p-2 border rounded-md bg-card/50',
        className
      )}
    >
      <div className="flex-shrink-0 h-8 w-8 mr-3 flex items-center justify-center">
        {isImage ? (
          <div className="h-8 w-8 rounded bg-muted/30 overflow-hidden flex items-center justify-center">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-full w-full object-cover"
              onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
            />
          </div>
        ) : (
          getIconForFileType()
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
        
        {typeof progress === 'number' && (
          <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="flex-shrink-0 ml-3 flex items-center">
        {progress === 100 ? (
          <CheckCircle2 className="h-5 w-5 text-success" />
        ) : (
          onRemove && (
            <button 
              type="button" 
              onClick={onRemove}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Remove</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};
