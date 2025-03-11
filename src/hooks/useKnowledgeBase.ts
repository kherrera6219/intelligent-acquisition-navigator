
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type KnowledgeBaseEntry = {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  created_by: string;
};

export function useKnowledgeBase() {
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['knowledge-base-entries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_base_entries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as KnowledgeBaseEntry[];
    }
  });

  const createEntry = useMutation({
    mutationFn: async (entry: Omit<KnowledgeBaseEntry, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { data, error } = await supabase
        .from('knowledge_base_entries')
        .insert(entry)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-base-entries'] });
    }
  });

  return {
    entries,
    isLoading,
    createEntry
  };
}
