
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const DocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to upload documents");
      }

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('knowledge_docs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: dbError } = await supabase
        .from('user_documents')
        .insert({
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          user_id: user.id,
          processed_status: 'pending'
        });

      if (dbError) throw dbError;

      toast({
        title: "Document uploaded successfully",
        description: "The document will be processed and added to the knowledge graph.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt"
        disabled={isUploading}
      />
      <label
        htmlFor="file-upload"
        className="inline-flex items-center"
      >
        <Button 
          variant="outline" 
          disabled={isUploading}
          className="gap-2"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Upload Document
        </Button>
      </label>
      <p className="text-sm text-muted-foreground mt-2">
        Upload documents to expand the knowledge graph. Supported formats: PDF, DOC, DOCX, TXT
      </p>
    </div>
  );
};
