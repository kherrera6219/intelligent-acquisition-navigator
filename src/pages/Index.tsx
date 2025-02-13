
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import RequestDemo from "@/components/RequestDemo";
import { AzureAIChat } from "@/components/AzureAIChat";
import { DualLLMProcessor } from "@/components/DualLLMProcessor";
import { RAGProcessor } from "@/components/RAGProcessor";
import { BlockchainRecords } from "@/components/BlockchainRecords";
import { VoiceInterface } from "@/components/VoiceInterface";
import AKFVisualization from "@/components/AKFVisualization";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Shield, Cloud, Sparkles, Book, Scale, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />
      <Hero />
      
      {/* Reasoning Section */}
      <section 
        className="py-24 relative overflow-hidden"
        aria-labelledby="reasoning-title"
      >
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-module">
          <div className="flex-module-col flex-module-center text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 
                          bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-full">
              <Book className="w-4 h-4 text-violet-400 mr-2" aria-hidden="true" />
              <span className="text-sm text-violet-300 font-medium">Why Choose Our Solution</span>
            </div>
            <h2 
              id="reasoning-title"
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 mb-6"
            >
              Federal Acquisition Excellence
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Empowering acquisition professionals with AI-driven insights while maintaining 
              strict compliance with federal regulations.
            </p>
          </div>

          <div className="grid-module-3 grid-module-gap-lg mb-16">
            <div 
              className="glass-card spacing-module-lg glass-card-hover group"
              role="article"
              aria-labelledby="far-compliance-title"
            >
              <div className="flex-module-start flex-module-gap-md mb-6">
                <div className="p-3 rounded-lg bg-violet-500/20">
                  <Scale className="h-6 w-6 text-violet-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </div>
                <h3 id="far-compliance-title" className="text-xl font-semibold text-white">FAR Compliance</h3>
              </div>
              <p className="text-gray-400">
                Built-in compliance checks ensure adherence to Federal Acquisition Regulations 
                and agency-specific requirements.
              </p>
            </div>
            
            <div 
              className="glass-card spacing-module-lg glass-card-hover group"
              role="article"
              aria-labelledby="security-title"
            >
              <div className="flex-module-start flex-module-gap-md mb-6">
                <div className="p-3 rounded-lg bg-fuchsia-500/20">
                  <Shield className="h-6 w-6 text-fuchsia-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </div>
                <h3 id="security-title" className="text-xl font-semibold text-white">Security First</h3>
              </div>
              <p className="text-gray-400">
                FedRAMP High and CMMC Level 3 certified platform with end-to-end encryption 
                and comprehensive audit trails.
              </p>
            </div>
            
            <div 
              className="glass-card spacing-module-lg glass-card-hover group"
              role="article"
              aria-labelledby="results-title"
            >
              <div className="flex-module-start flex-module-gap-md mb-6">
                <div className="p-3 rounded-lg bg-pink-500/20">
                  <CheckCircle className="h-6 w-6 text-pink-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </div>
                <h3 id="results-title" className="text-xl font-semibold text-white">Proven Results</h3>
              </div>
              <p className="text-gray-400">
                Streamline acquisition processes by up to 60% while maintaining accuracy 
                and regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Stack Section */}
      <section 
        className="py-24 relative overflow-hidden"
        aria-labelledby="tech-stack-title"
      >
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-module">
          <div className="flex-module-col flex-module-center text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 
                          bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-full">
              <Sparkles className="w-4 h-4 text-violet-400 mr-2" aria-hidden="true" />
              <span className="text-sm text-violet-300 font-medium">Enterprise-Grade AI Solutions</span>
            </div>
            <h2 
              id="tech-stack-title"
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400"
            >
              Advanced AI Technology Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Leverage our enterprise-ready AI platform powered by cutting-edge machine learning 
              and blockchain technology for seamless acquisition management.
            </p>
          </div>

          <div className="grid-module-2 grid-module-gap-lg mb-16">
            <div 
              className="glass-card spacing-module-lg glass-card-hover group"
              role="region"
              aria-labelledby="voice-interface-title"
            >
              <h3 id="voice-interface-title" className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-500/20 group-hover:scale-110 transition-transform">
                  <Brain className="h-5 w-5 text-violet-400" aria-hidden="true" />
                </div>
                Voice-Enabled Interface
              </h3>
              <VoiceInterface />
            </div>
            <div 
              className="glass-card spacing-module-lg glass-card-hover group"
              role="region"
              aria-labelledby="dual-llm-title"
            >
              <h3 id="dual-llm-title" className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-fuchsia-500/20 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-fuchsia-400" aria-hidden="true" />
                </div>
                Dual LLM Processing
              </h3>
              <DualLLMProcessor input="Enterprise compliance verification" />
            </div>
          </div>

          <div className="grid-module-3 grid-module-gap-lg mb-16">
            <div 
              className="glass-card spacing-module-lg glass-card-hover group"
              role="region"
              aria-labelledby="rag-title"
            >
              <div className="flex-module-start flex-module-gap-md mb-6">
                <div className="p-3 rounded-lg bg-violet-500/20">
                  <Brain className="h-6 w-6 text-violet-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </div>
                <h3 id="rag-title" className="text-xl font-semibold text-white">Enterprise RAG</h3>
              </div>
              <RAGProcessor />
            </div>
            
            <div 
              className="glass-card spacing-module-lg glass-card-hover group"
              role="region"
              aria-labelledby="security-suite-title"
            >
              <div className="flex-module-start flex-module-gap-md mb-6">
                <div className="p-3 rounded-lg bg-fuchsia-500/20">
                  <Shield className="h-6 w-6 text-fuchsia-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </div>
                <h3 id="security-suite-title" className="text-xl font-semibold text-white">Security Suite</h3>
              </div>
              <BlockchainRecords />
            </div>
            
            <div 
              className="glass-card spacing-module-lg glass-card-hover group"
              role="region"
              aria-labelledby="cloud-framework-title"
            >
              <div className="flex-module-start flex-module-gap-md mb-6">
                <div className="p-3 rounded-lg bg-pink-500/20">
                  <Cloud className="h-6 w-6 text-pink-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </div>
                <h3 id="cloud-framework-title" className="text-xl font-semibold text-white">Cloud Framework</h3>
              </div>
              <AKFVisualization />
            </div>
          </div>

          <div 
            className="glass-card spacing-module-lg mb-16"
            role="region"
            aria-labelledby="ai-assistant-title"
          >
            <div className="max-w-3xl mx-auto">
              <h3 id="ai-assistant-title" className="text-2xl font-semibold text-white mb-6 text-center">Try Our AI Assistant</h3>
              <AzureAIChat />
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="enterprise-gradient group px-8 py-6 text-lg shadow-lg shadow-violet-500/25"
              aria-label="Schedule Enterprise Demo"
            >
              Schedule Enterprise Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <Features />
      <Benefits />
      <RequestDemo />
    </div>
  );
};

export default Index;
