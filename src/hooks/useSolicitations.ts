import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Maps the DB enum to the UI display status
export type SolicitationDbStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED";
export type SolicitationDocType = "RFI" | "RFP" | "RFQ" | "SOW" | "PWS";

export interface DbSolicitation {
  id: string;
  title: string;
  type: SolicitationDocType;
  status: SolicitationDbStatus;
  description: string | null;
  due_date: string | null;
  estimated_value: number | null;
  current_reviewer: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  version: number;
}

export const useSolicitations = () => {
  return useQuery({
    queryKey: ["solicitations"],
    queryFn: async (): Promise<DbSolicitation[]> => {
      const { data, error } = await supabase
        .from("solicitations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as DbSolicitation[]) ?? [];
    },
  });
};

export const useCreateSolicitation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (
      solicitation: Pick<DbSolicitation, "title" | "type" | "description" | "due_date" | "estimated_value" | "created_by">
    ) => {
      const { data, error } = await supabase
        .from("solicitations")
        .insert({ ...solicitation, status: "DRAFT", version: 1 })
        .select()
        .single();
      if (error) throw error;
      return data as DbSolicitation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solicitations"] });
      toast({ title: "Solicitation created" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create solicitation", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdateSolicitationStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: SolicitationDbStatus }) => {
      const { error } = await supabase
        .from("solicitations")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solicitations"] });
      toast({ title: "Status updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update status", description: error.message, variant: "destructive" });
    },
  });
};
