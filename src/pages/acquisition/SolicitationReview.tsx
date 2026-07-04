import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Filter, Clock, FolderOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Solicitation = {
  id: string;
  title: string;
  status: string;
  riskLevel: string;
  dueDate: string;
  department: string;
};

const getRiskBadgeColor = (risk: string) => {
  switch (risk) {
    case "low":
      return "bg-green-400/20 text-green-400";
    case "medium":
      return "bg-yellow-400/20 text-yellow-400";
    case "high":
      return "bg-red-400/20 text-red-400";
    default:
      return "bg-gray-400/20 text-gray-400";
  }
};

const SolicitationReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: solicitations = [] } = useQuery({
    queryKey: ["solicitations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("solicitations")
        .select("*")
        .order("dueDate", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return (data ?? []) as Solicitation[];
    },
  });

  const filtered = solicitations.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReviewClick = (id: string) => {
    const solicitation = solicitations.find((item) => item.id === id);
    toast({
      title: "Review Started",
      description: solicitation
        ? `Opening ${solicitation.title} review workspace...`
        : "Opening solicitation review workspace...",
    });
  };

  return (
    <Container>
      <PageHeader
        title="Solicitation Review"
        description="Review and approve procurement solicitations"
      />

      <Card className="mb-8">
        <div className="flex gap-4 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search solicitations..."
              className="pl-10 bg-white/5 border-white/10"
              aria-label="Search solicitations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-white/10" aria-label="Open filter options">
            <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
            Filters
          </Button>
        </div>
      </Card>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
          <FolderOpen className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-300 mb-1">No solicitations found</h3>
          <p className="text-sm text-gray-500">
            {searchTerm ? `No results for "${searchTerm}". Try adjusting your search.` : "No solicitations are available yet."}
          </p>
        </div>
      )}

      <Grid columns={1} gap="lg">
        {filtered.map((solicitation) => (
          <Card
            key={solicitation.id}
            className="hover:bg-white/5 transition-all duration-200"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                  <FileText className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {solicitation.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400">
                      {solicitation.department}
                    </span>
                    <span className="text-gray-600">•</span>
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs ${getRiskBadgeColor(
                        solicitation.riskLevel
                      )}`}
                      role="status"
                      aria-label={`Risk level: ${solicitation.riskLevel}`}
                    >
                      {solicitation.riskLevel.toUpperCase()} RISK
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">Due {solicitation.dueDate}</span>
                </div>
                <Button
                  onClick={() => handleReviewClick(solicitation.id)}
                  className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
                >
                  Review
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default SolicitationReview;
