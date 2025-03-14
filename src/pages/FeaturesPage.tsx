
import React from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { MainLayout } from "@/components/layout/MainLayout";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Zap, 
  BarChart, 
  Brain, 
  ClipboardCheck, 
  RefreshCw, 
  Globe, 
  Lock, 
  Clock, 
  Search,
  Landmark,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturesPage = () => {
  const navigate = useNavigate();
  
  return (
    <PageErrorBoundary>
      <MainLayout
        variant="fluent"
        showHeader={true}
        showFooter={true}
        forceExternalHeader={true}
        forceExternalFooter={true}
        className="bg-background"
      >
        <Container className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>Features</GradientText> and Capabilities
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover how our platform streamlines your acquisition process with 
              powerful AI-driven tools and comprehensive regulatory knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card variant="metal" className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <Brain className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
              </div>
              <p className="text-muted-foreground">
                Our advanced AI analyzes documents, identifies risks, and generates 
                recommendations based on your specific procurement context.
              </p>
            </Card>
            
            <Card variant="metal" className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <Shield className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold">Real-Time Compliance</h3>
              </div>
              <p className="text-muted-foreground">
                Stay compliant with automatic monitoring and instant updates when 
                regulations change at federal, state, or local levels.
              </p>
            </Card>
            
            <Card variant="metal" className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <Zap className="w-12 h-12 text-amber-400 mb-4" />
                <h3 className="text-xl font-semibold">Lightning-Fast Processing</h3>
              </div>
              <p className="text-muted-foreground">
                Process and analyze complex documents in seconds, not hours, with 
                our optimized document processing engine.
              </p>
            </Card>
            
            <Card variant="metal" className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <BarChart className="w-12 h-12 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold">Advanced Analytics</h3>
              </div>
              <p className="text-muted-foreground">
                Gain insights from comprehensive dashboards showing performance metrics,
                compliance scores, and opportunity areas.
              </p>
            </Card>
            
            <Card variant="metal" className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <ClipboardCheck className="w-12 h-12 text-rose-400 mb-4" />
                <h3 className="text-xl font-semibold">Automated Document Generation</h3>
              </div>
              <p className="text-muted-foreground">
                Create compliant solicitations, contracts, and procurement documents 
                with AI-assisted templates and content generation.
              </p>
            </Card>
            
            <Card variant="metal" className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <RefreshCw className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold">Workflow Automation</h3>
              </div>
              <p className="text-muted-foreground">
                Streamline approval processes and automate routine tasks with 
                customizable workflow rules and notifications.
              </p>
            </Card>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">The Power of the 4D Knowledge Framework</h2>
            
            <Card variant="metal" className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-4">
                    <Globe className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">Comprehensive Coverage</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Our framework integrates regulations from federal, state, and local levels 
                    into a unified knowledge system.
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <Lock className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">Regulatory Certainty</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Stay confident with continuously updated regulations and interpretations 
                    across all jurisdictions.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <Clock className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">Time-Based Analysis</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Evaluate regulations that were in effect at specific points in time for 
                    historical compliance verification.
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <Search className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">Context-Aware Search</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Find exactly what you need with intelligent search that understands 
                    procurement terminology and context.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card variant="metal" className="p-8">
              <div className="flex items-center mb-6">
                <Landmark className="w-10 h-10 text-blue-400 mr-4" />
                <h3 className="text-2xl font-semibold">Federal Acquisition</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <div className="bg-primary/20 p-1 rounded mr-3 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>FAR and DFARS compliance automation</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-1 rounded mr-3 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>Agency-specific acquisition regulations</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-1 rounded mr-3 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>Federal procurement best practices</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-1 rounded mr-3 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>Small business set-aside assistance</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/contact")}
              >
                Learn More
              </Button>
            </Card>
            
            <Card variant="metal" className="p-8">
              <div className="flex items-center mb-6">
                <FileText className="w-10 h-10 text-green-400 mr-4" />
                <h3 className="text-2xl font-semibold">State & Local Acquisition</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <div className="bg-primary/20 p-1 rounded mr-3 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>State-specific procurement regulations</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-1 rounded mr-3 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>Local ordinance compliance</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-1 rounded mr-3 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>Cross-jurisdiction regulation management</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-1 rounded mr-3 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>Special district procurement support</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/contact")}
              >
                Learn More
              </Button>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to transform your procurement process?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Join government agencies across the country already using ProcurityIQ to 
              streamline their acquisition workflows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg"
                className="px-8"
                onClick={() => navigate("/pricing")}
              >
                View Pricing
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8"
                onClick={() => navigate("/contact")}
              >
                Request Demo
              </Button>
            </div>
          </div>
        </Container>
      </MainLayout>
    </PageErrorBoundary>
  );
};

export default FeaturesPage;
