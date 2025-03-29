
import React, { forwardRef, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { UploadCloud, X, File, Paperclip, Loader2 } from 'lucide-react';
import { MsButton } from './MsButton';

export interface MsFileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: File | File[];
  onChange?: (files: File | File[] | null) => void;
  onFileSelect?: (files: FileList) => void;
  multiple?: boolean;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  preview?: boolean;
  previewType?: 'image' | 'list' | 'grid';
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  loading?: boolean;
  dropzoneOnly?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
}

export const MsFileInput = forwardRef<HTMLInputElement, MsFileInputProps>(
  ({ 
    className,
    value,
    onChange,
    onFileSelect,
    multiple = false,
    acceptedTypes,
    maxSize,
    preview = true,
    previewType = 'list',
    placeholder = 'Drag and drop files here or click to browse',
    label,
    description,
    error,
    loading = false,
    dropzoneOnly = false,
    isUploading = false,
    uploadProgress,
    ...props 
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    
    const handleFiles = (files: FileList) => {
      if (files.length === 0) return;
      
      // Check file sizes if maxSize is provided
      if (maxSize) {
        const filesTooBig = Array.from(files).filter(file => file.size > maxSize * 1024 * 1024);
        if (filesTooBig.length > 0) {
          console.error('File size exceeds maximum limit');
          return;
        }
      }
      
      const fileArray = Array.from(files);
      const result = multiple ? fileArray : fileArray[0];
      
      if (onChange) {
        onChange(result);
      }
      
      if (onFileSelect) {
        onFileSelect(files);
      }
    };
    
    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    };
    
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    };
    
    const handleClick = () => {
      inputRef.current?.click();
    };
    
    const handleClearFile = (file?: File) => {
      if (!file && !multiple) {
        onChange?.(null);
        return;
      }
      
      if (file && multiple && Array.isArray(value)) {
        const newFiles = value.filter(f => f !== file);
        onChange?.(newFiles.length > 0 ? newFiles : null);
      }
    };
    
    const renderPreview = () => {
      if (!preview || !value) return null;
      
      if (multiple && Array.isArray(value)) {
        if (value.length === 0) return null;
        
        if (previewType === 'grid') {
          return (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
              {value.map((file, index) => (
                <div key={`${file.name}-${index}`} className="relative group rounded-md border border-border overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-24 object-cover"
                    />
                  ) : (
                    <div className="w-full h-24 bg-muted/30 flex flex-col items-center justify-center p-2">
                      <File className="h-8 w-8 text-muted-foreground mb-1" />
                      <div className="text-xs truncate w-full text-center">{file.name}</div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleClearFile(file)}
                    className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          );
        }
        
        return (
          <div className="space-y-2 mt-3">
            {value.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between py-1 px-3 rounded-md bg-muted/30"
              >
                <div className="flex items-center overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <div className="h-8 w-8 mr-2 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <File className="h-5 w-5 mr-2 text-muted-foreground" />
                  )}
                  <span className="text-sm truncate">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleClearFile(file)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        );
      }
      
      if (!multiple && !Array.isArray(value) && value) {
        return (
          <div className="mt-3">
            <div
              className="flex items-center justify-between py-1 px-3 rounded-md bg-muted/30"
            >
              <div className="flex items-center overflow-hidden">
                {value.type.startsWith('image/') ? (
                  <div className="h-8 w-8 mr-2 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={URL.createObjectURL(value)}
                      alt={value.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <File className="h-5 w-5 mr-2 text-muted-foreground" />
                )}
                <span className="text-sm truncate">{value.name}</span>
              </div>
              <button
                type="button"
                onClick={() => handleClearFile()}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      }
      
      return null;
    };
    
    return (
      <div className={cn("relative", className)}>
        {label && (
          <div className="mb-2 text-sm font-medium">{label}</div>
        )}
        
        <div
          className={cn(
            "relative border rounded-lg transition-colors",
            dragActive ? "border-primary/70 bg-primary/5" : "border-border bg-background/40",
            error ? "border-destructive/50" : ""
          )}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={mergeRefs(inputRef, ref)}
            type="file"
            className="sr-only"
            multiple={multiple}
            accept={acceptedTypes}
            onChange={handleChange}
            disabled={loading || isUploading}
            {...props}
          />
          
          <div className="flex flex-col items-center justify-center p-6 text-center">
            {isUploading ? (
              <div className="w-full">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
                {uploadProgress !== undefined && (
                  <div className="w-full mt-2 bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                {loading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                ) : (
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                )}
                <p className="text-sm text-muted-foreground">{placeholder}</p>
                {!dropzoneOnly && (
                  <MsButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClick}
                    className="mt-3"
                    disabled={loading || isUploading}
                    icon={<Paperclip className="h-4 w-4" />}
                  >
                    Browse files
                  </MsButton>
                )}
              </>
            )}
          </div>
        </div>
        
        {renderPreview()}
        
        {description && !error && (
          <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>
        )}
        
        {error && (
          <p className="mt-1.5 text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

MsFileInput.displayName = "MsFileInput";

// Helper function to merge refs
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = value;
      }
    });
  };
}
