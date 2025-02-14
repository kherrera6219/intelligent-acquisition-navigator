
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { KnowledgeDomain } from "@/types/knowledge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export const KnowledgeDomainList = () => {
  const { toast } = useToast();
  
  const { data: domains, isLoading } = useQuery({
    queryKey: ['knowledge-domains'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_domains')
        .select('*')
        .order('name');
        
      if (error) {
        toast({
          variant: "destructive",
          title: "Error loading knowledge domains",
          description: error.message
        });
        throw error;
      }
      
      return data as KnowledgeDomain[];
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Knowledge Domains</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Domain
        </Button>
      </div>

      {domains?.map((domain) => (
        <Card key={domain.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{domain.name}</h3>
              <p className="text-sm text-muted-foreground">{domain.description}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10">
                  {domain.domain_type}
                </span>
                {domain.coordinates && (
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary/10">
                    {domain.coordinates}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {domains?.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No knowledge domains found</p>
        </Card>
      )}
    </div>
  );
};
