
import { ChangeEvent, useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  conversationId: string;
  onUploadComplete?: (documentId: string) => void;
}

export const FileUpload = ({ conversationId, onUploadComplete }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${supabase.auth.user()?.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('user_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document record in database
      const { data: document, error: dbError } = await supabase
        .from('user_documents')
        .insert({
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          conversation_id: conversationId,
          user_id: supabase.auth.user()?.id,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast({
        title: "File uploaded successfully",
        description: "Your document has been uploaded and will be processed shortly.",
      });

      if (onUploadComplete && document) {
        onUploadComplete(document.id);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt"
        disabled={isUploading}
      />
      <label
        htmlFor="file-upload"
        className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer
          ${isUploading 
            ? 'bg-gray-700 cursor-not-allowed' 
            : 'bg-gray-800 hover:bg-gray-700'}`}
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        <span className="text-sm">Upload Document</span>
      </label>
      <Button
        size="sm"
        variant="ghost"
        className="text-gray-400 hover:text-white"
        disabled={isUploading}
      >
        <FileText className="w-4 h-4" />
      </Button>
    </div>
  );
};
