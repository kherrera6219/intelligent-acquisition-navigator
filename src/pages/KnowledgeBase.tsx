
import { KnowledgeDomainList } from "@/components/knowledge/KnowledgeDomainList";
import { AIAnalysisDashboard } from "@/components/knowledge/AIAnalysisDashboard";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/universal/Container";
import { Brain, Database, Shield, Globe } from "lucide-react";

const overviewCards = [
  {
    icon: Globe,
    iconColor: "text-blue-400",
    title: "System Architecture",
    description: "Enterprise-grade knowledge framework with adaptive domains",
  },
  {
    icon: Brain,
    iconColor: "text-violet-400",
    title: "AI Integration",
    description: "Multi-model AI system with advanced analysis capabilities",
  },
  {
    icon: Database,
    iconColor: "text-emerald-400",
    title: "Data Architecture",
    description: "Hierarchical data structures with real-time validation",
  },
  {
    icon: Shield,
    iconColor: "text-red-400",
    title: "Security & Compliance",
    description: "FedRAMP High and NIST 800-53 Rev 5 compliant",
  },
];

const KnowledgeBase = () => {
  return (
    <Container>
      <PageHeader
        title="Knowledge Base"
        description="Access the Multi-Domain Acquisition Knowledge Framework — a living repository of FAR/DFARS regulations, agency supplements, and compliance guidance."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Knowledge Base" }]}
      />

      {/* Overview Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="p-4 flex flex-col space-y-2 bg-white/5 border-white/10 hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${card.iconColor}`} aria-hidden="true" />
                <h3 className="font-semibold text-sm text-gray-200">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-400">{card.description}</p>
            </Card>
          );
        })}
      </div>

      {/* System Formula */}
      <Card className="p-6 mb-8 bg-white/5 border-white/10">
        <h3 className="font-semibold text-gray-200 mb-2 text-sm">
          Knowledge Framework Formula
        </h3>
        <p className="font-mono text-sm bg-black/30 text-gray-300 p-3 rounded-md border border-white/5">
          F**(AKF) = Σ(P₍ᵢ₎ × L₍ᵢ₎ × B₍ᵢ₎) where i ∈ &#123;mega, large, medium, small&#125;
        </p>
        <ul className="mt-4 text-sm text-gray-400 space-y-1 list-disc list-inside">
          <li>Mega Pillars (4): Core foundational regulatory frameworks</li>
          <li>Large Pillars (16): Major agency supplements and guidelines</li>
          <li>Medium Pillars (64): State and specialized regulations</li>
          <li>Small Pillars (256): Local and granular regulatory components</li>
        </ul>
      </Card>

      {/* AI Analysis Dashboard */}
      <AIAnalysisDashboard />

      {/* Knowledge Domains List */}
      <KnowledgeDomainList />
    </Container>
  );
};

export default KnowledgeBase;
