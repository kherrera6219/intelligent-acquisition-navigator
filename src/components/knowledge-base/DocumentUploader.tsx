
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from "@/components/ui/universal/LoadingState";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/universal/Card";

interface DocumentUploaderProps {
  onUploadComplete?: (documentId: string) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  const [isUrlUpload, setIsUrlUpload] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Only PDF files are supported",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      if (!documentName) {
        // Use file name without extension as default document name
        setDocumentName(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };
  
  const uploadToStorage = async () => {
    if (!file) return null;
    
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `documents/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('knowledge_files')
      .upload(filePath, file);
    
    if (error) {
      throw new Error(`Storage upload failed: ${error.message}`);
    }
    
    const { data: urlData } = await supabase.storage
      .from('knowledge_files')
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  };
  
  const handleFileUpload = async () => {
    try {
      if (!isUrlUpload && !file) {
        toast({
          title: "Missing file",
          description: "Please select a PDF file to upload",
          variant: "destructive"
        });
        return;
      }
      
      if (isUrlUpload && !uploadUrl) {
        toast({
          title: "Missing URL",
          description: "Please enter a URL to a PDF file",
          variant: "destructive"
        });
        return;
      }
      
      if (!documentName) {
        toast({
          title: "Missing document name",
          description: "Please provide a name for this document",
          variant: "destructive"
        });
        return;
      }
      
      setUploading(true);
      
      // For file uploads, first upload to Supabase Storage
      let pdfUrl = uploadUrl;
      if (!isUrlUpload) {
        pdfUrl = await uploadToStorage();
        if (!pdfUrl) {
          toast({
            title: "Upload failed",
            description: "Failed to upload the file to storage",
            variant: "destructive"
          });
          setUploading(false);
          return;
        }
      }
      
      // Now process the PDF with OpenAI through our edge function
      const { data, error } = await supabase.functions.invoke('process-pdf', {
        body: {
          pdfUrl,
          documentName
        }
      });
      
      if (error) {
        throw new Error(`Processing failed: ${error.message}`);
      }
      
      toast({
        title: "Upload successful",
        description: "Your document has been processed and added to the knowledge base",
        variant: "default"
      });
      
      // Reset form
      setFile(null);
      setDocumentName('');
      setUploadUrl('');
      
      // Notify parent component
      if (onUploadComplete && data.documentId) {
        onUploadComplete(data.documentId);
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error processing your document",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Upload Document</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Document Name
        </label>
        <Input
          type="text"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          placeholder="Enter document name"
          disabled={uploading}
          className="w-full"
        />
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <button
            type="button"
            onClick={() => setIsUrlUpload(false)}
            className={`mr-4 px-3 py-1 text-sm rounded-md ${!isUrlUpload ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setIsUrlUpload(true)}
            className={`px-3 py-1 text-sm rounded-md ${isUrlUpload ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Enter URL
          </button>
        </div>
        
        {isUrlUpload ? (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              PDF URL
            </label>
            <Input
              type="url"
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
              placeholder="https://example.com/document.pdf"
              disabled={uploading}
              className="w-full"
            />
          </div>
        ) : (
          <div>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-400 mr-2" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-1 hover:bg-gray-800 rounded-full"
                    disabled={uploading}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400 mb-1">Drag and drop a PDF file here, or click to browse</p>
                  <p className="text-xs text-gray-500">PDF files only, max 10MB</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button
          onClick={handleFileUpload}
          disabled={uploading || (!file && !uploadUrl) || !documentName}
          className="flex items-center"
        >
          {uploading ? (
            <LoadingState variant="inline" size="sm" message="Processing..." />
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Upload Document
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
