import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ProposalStatus = "draft" | "pending_review" | "in_review" | "approved" | "rejected";

export interface Proposal {
  id: string;
  title: string;
  vendor: string;
  amount: number;
  contract_type: string;
  status: ProposalStatus;
  assigned_to: string | null;
  due_date: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown> | null;
}

// Mock fallback used when the proposals table hasn't been created yet
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: "mock-1",
    title: "Office Supplies Procurement Q1",
    vendor: "SupplyTech Solutions",
    amount: 24500,
    contract_type: "Fixed Price",
    status: "pending_review",
    assigned_to: null,
    due_date: "2026-04-10",
    created_by: "system",
    created_at: "2026-03-10T10:00:00Z",
    updated_at: "2026-03-10T10:00:00Z",
    metadata: null,
  },
  {
    id: "mock-2",
    title: "IT Equipment Refresh",
    vendor: "TechVendor Pro",
    amount: 185000,
    contract_type: "IDIQ",
    status: "approved",
    assigned_to: null,
    due_date: "2026-04-20",
    created_by: "system",
    created_at: "2026-03-08T10:00:00Z",
    updated_at: "2026-03-15T10:00:00Z",
    metadata: null,
  },
  {
    id: "mock-3",
    title: "Facility Maintenance Services",
    vendor: "MaintenanceCorp",
    amount: 95000,
    contract_type: "T&M",
    status: "rejected",
    assigned_to: null,
    due_date: "2026-04-05",
    created_by: "system",
    created_at: "2026-03-05T10:00:00Z",
    updated_at: "2026-03-12T10:00:00Z",
    metadata: null,
  },
];

export const useProposals = () => {
  return useQuery({
    queryKey: ["proposals"],
    queryFn: async (): Promise<Proposal[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from("proposals")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        // Table may not exist yet — return mock data gracefully
        console.warn("[useProposals] proposals table not found, using mock data:", error.message);
        return MOCK_PROPOSALS;
      }
      return (data as Proposal[]) ?? MOCK_PROPOSALS;
    },
    retry: false,
  });
};

export const useCreateProposal = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (proposal: Omit<Proposal, "id" | "created_at" | "updated_at">) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from("proposals")
        .insert({ ...proposal, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .select()
        .single();
      if (error) throw error;
      return data as Proposal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      toast({ title: "Proposal created", description: "Your proposal has been saved successfully." });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create proposal", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdateProposalStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ProposalStatus }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from("proposals")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      toast({ title: "Status updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update status", description: error.message, variant: "destructive" });
    },
  });
};
