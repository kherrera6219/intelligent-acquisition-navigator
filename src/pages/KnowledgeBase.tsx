
import { KnowledgeDomainList } from "@/components/knowledge/KnowledgeDomainList";
import { AIAnalysisDashboard } from "@/components/knowledge/AIAnalysisDashboard";
import { Card } from "@/components/ui/card";
import { Brain, Database, Shield, Globe } from "lucide-react";

const KnowledgeBase = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Overview Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">System Architecture</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Enterprise-grade knowledge framework with adaptive domains
          </p>
        </Card>

        <Card className="p-4 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold">AI Integration</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Multi-model AI system with advanced analysis capabilities
          </p>
        </Card>

        <Card className="p-4 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Data Architecture</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Hierarchical data structures with real-time validation
          </p>
        </Card>

        <Card className="p-4 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold">Security & Compliance</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            FedRAMP High and NIST 800-53 Rev 5 compliant
          </p>
        </Card>
      </div>

      {/* System Formula */}
      <Card className="p-6">
        <h3 className="font-semibold mb-2">Knowledge Framework Formula</h3>
        <p className="font-mono text-sm bg-muted p-2 rounded">
          F**(AKF) = Σ(P₍ᵢ₎ × L₍ᵢ₎ × B₍ᵢ₎) where i ∈ {'{mega, large, medium, small}'}
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>Mega Pillars (4): Core foundational regulatory frameworks</li>
            <li>Large Pillars (16): Major agency supplements and guidelines</li>
            <li>Medium Pillars (64): State and specialized regulations</li>
            <li>Small Pillars (256): Local and granular regulatory components</li>
          </ul>
        </div>
      </Card>

      {/* AI Analysis Dashboard */}
      <AIAnalysisDashboard />

      {/* Knowledge Domains List */}
      <KnowledgeDomainList />
    </div>
  );
};

export default KnowledgeBase;
