
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Filter, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const mockSolicitations = [
  {
    id: "1",
    title: "IT Services Support",
    status: "pending",
    riskLevel: "low",
    dueDate: "2024-03-15",
    department: "Information Technology",
  },
  {
    id: "2",
    title: "Office Equipment Procurement",
    status: "review",
    riskLevel: "medium",
    dueDate: "2024-03-20",
    department: "Facilities",
  },
  {
    id: "3",
    title: "Security Services Contract",
    status: "pending",
    riskLevel: "high",
    dueDate: "2024-03-25",
    department: "Security",
  },
];

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
  const { toast } = useToast();

  const handleReviewClick = (id: string) => {
    toast({
      title: "Review Started",
      description: "Opening solicitation review workspace...",
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
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search solicitations..."
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>
          <Button variant="outline" className="border-white/10">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>
      </Card>

      <Grid columns={1} gap="lg">
        {mockSolicitations.map((solicitation) => (
          <Card
            key={solicitation.id}
            className="hover:bg-white/5 transition-all duration-200"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
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
                    >
                      {solicitation.riskLevel.toUpperCase()} RISK
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Due {solicitation.dueDate}</span>
                </div>
                <Button
                  onClick={() => handleReviewClick(solicitation.id)}
                  className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                           hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
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
