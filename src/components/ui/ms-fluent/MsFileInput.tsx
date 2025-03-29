
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload, File, X, Check } from 'lucide-react';
import { MsFluentButton } from '../MsFluentButton';

export interface MsFileInputProps {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  children: React.ReactNode;
  className?: string;
}

export const MsFileInput: React.FC<MsFileInputProps> = ({
  value,
  onChange,
  maxFiles = 1,
  maxSize = 5000000, // 5MB
  acceptedTypes,
  children,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    processFiles(Array.from(files));
    // Reset the input value so the same file can be selected again
    if (inputRef.current) inputRef.current.value = '';
  };

  const processFiles = (files: File[]) => {
    setError(null);
    
    // Check if adding these files would exceed the maximum
    if (value.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} file${maxFiles === 1 ? '' : 's'} allowed`);
      return;
    }
    
    // Validate size and file type
    const validFiles = files.filter(file => {
      // Validate file size
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`);
        return false;
      }
      
      // Validate file type if specified
      if (acceptedTypes && acceptedTypes.length > 0) {
        const fileType = file.type;
        const validType = acceptedTypes.some(type => {
          // Handle wildcard types like "image/*"
          if (type.endsWith('/*')) {
            const category = type.split('/')[0];
            return fileType.startsWith(`${category}/`);
          }
          return type === fileType;
        });
        
        if (!validType) {
          setError(`File "${file.name}" has an unsupported file type`);
          return false;
        }
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      onChange([...value, ...validFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processFiles(Array.from(event.dataTransfer.files));
    }
  };

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn('ms-file-input', className)}>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        multiple={maxFiles > 1}
        accept={acceptedTypes?.join(',')}
        onChange={handleFileChange}
      />
      
      {error && (
        <div className="text-destructive text-sm mb-2 bg-destructive/10 p-2 rounded-md">
          {error}
        </div>
      )}
      
      {children}
    </div>
  );
};

interface MsFileInputUploaderProps {
  className?: string;
  dragActiveClassName?: string;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const MsFileInputUploader: React.FC<MsFileInputUploaderProps> = ({
  className,
  dragActiveClassName,
  label = "Upload files",
  description = "Drag and drop files here or click to browse",
  icon = <Upload className="h-6 w-6" />,
}) => {
  const { isDragging, inputRef, handleDragOver, handleDragLeave, handleDrop } = 
    React.useContext(MsFileInputContext as React.Context<any>);
    
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'ms-file-input-uploader border-2 border-dashed rounded-lg p-6 text-center cursor-pointer',
        isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50',
        isDragging && dragActiveClassName,
        className
      )}
      onClick={() => inputRef.current?.click()}
    >
      <div className="mx-auto flex flex-col items-center justify-center gap-2">
        <div className="rounded-full bg-muted p-3">
          {icon}
        </div>
        <h3 className="font-medium mt-2">{label}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
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
  const isImage = file.type.startsWith('image/');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
    
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [file, isImage]);

  return (
    <div className={cn(
      'ms-file-input-preview flex items-center p-2 bg-muted/50 rounded-md',
      className
    )}>
      <div className="flex-shrink-0 mr-2">
        {isImage && previewUrl ? (
          <div className="h-10 w-10 rounded overflow-hidden">
            <img 
              src={previewUrl} 
              alt={file.name} 
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-10 w-10 flex items-center justify-center bg-muted rounded">
            <File className="h-5 w-5" />
          </div>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
            {formatFileSize(file.size)}
          </span>
        </div>
        
        {typeof progress === 'number' && (
          <div className="w-full bg-muted h-1.5 rounded-full mt-1 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                progress === 100 ? "bg-success" : "bg-primary"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center ml-4">
        {progress === 100 ? (
          <Check className="h-4 w-4 text-success mr-2" />
        ) : null}
        <MsFluentButton
          variant="ghost"
          size="xs"
          iconOnly={<X className="h-4 w-4" />}
          onClick={onRemove}
          aria-label="Remove file"
        />
      </div>
    </div>
  );
};

// Create a context to share state between the parent and child components
const MsFileInputContext = React.createContext<{
  isDragging: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: () => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
} | null>(null);

function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}
