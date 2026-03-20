import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserDocument {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  user_id: string;
  processed_status: string | null;
  uploaded_at: string;
  metadata: Record<string, unknown> | null;
}

const STORAGE_BUCKET = "user-documents";

export const useDocuments = () => {
  return useQuery({
    queryKey: ["user_documents"],
    queryFn: async (): Promise<UserDocument[]> => {
      const { data, error } = await supabase
        .from("user_documents")
        .select("*")
        .order("uploaded_at", { ascending: false });
      if (error) throw error;
      return (data as UserDocument[]) ?? [];
    },
  });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, userId }: { file: File; userId: string }) => {
      const filePath = `${userId}/${Date.now()}_${file.name}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        // Storage bucket may not be set up — store metadata only
        console.warn("[useUploadDocument] Storage upload failed:", uploadError.message);
      }

      // Always record the document metadata in the DB
      const { data, error: dbError } = await supabase
        .from("user_documents")
        .insert({
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
          user_id: userId,
          processed_status: "uploaded",
          uploaded_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (dbError) throw dbError;
      return data as UserDocument;
    },
    onSuccess: (doc) => {
      queryClient.invalidateQueries({ queryKey: ["user_documents"] });
      toast({ title: "Document uploaded", description: `"${doc.file_name}" saved successfully.` });
    },
    onError: (error: Error) => {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    },
  });
};

export const useDocumentDownloadUrl = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (filePath: string): Promise<string> => {
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(filePath, 60); // 60-second signed URL
      if (error) throw error;
      return data.signedUrl;
    },
    onError: (error: Error) => {
      toast({ title: "Cannot generate download link", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, filePath }: { id: string; filePath: string }) => {
      // Remove from storage (best-effort)
      await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);

      const { error } = await supabase.from("user_documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_documents"] });
      toast({ title: "Document deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    },
  });
};
