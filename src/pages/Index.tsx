
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
import { ArrowRight, Brain, Shield, Cloud, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />
      <Hero />
      
      {/* AI Technology Stack Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 
                          bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-full">
              <Sparkles className="w-4 h-4 text-violet-400 mr-2" />
              <span className="text-sm text-violet-300 font-medium">Enterprise-Grade AI Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              Advanced AI Technology Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Leverage our enterprise-ready AI platform powered by cutting-edge machine learning 
              and blockchain technology for seamless acquisition management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 hover:bg-white/10 group transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-500/20 group-hover:scale-110 transition-transform">
                  <Brain className="h-5 w-5 text-violet-400" />
                </div>
                Voice-Enabled Interface
              </h3>
              <VoiceInterface />
            </div>
            <div className="glass-card p-8 hover:bg-white/10 group transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-fuchsia-500/20 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-fuchsia-400" />
                </div>
                Dual LLM Processing
              </h3>
              <DualLLMProcessor input="Enterprise compliance verification" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-8 group hover:bg-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-violet-500/20">
                  <Brain className="h-6 w-6 text-violet-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-white">Enterprise RAG</h3>
              </div>
              <RAGProcessor />
            </div>
            
            <div className="glass-card p-8 group hover:bg-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-fuchsia-500/20">
                  <Shield className="h-6 w-6 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-white">Security Suite</h3>
              </div>
              <BlockchainRecords />
            </div>
            
            <div className="glass-card p-8 group hover:bg-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-pink-500/20">
                  <Cloud className="h-6 w-6 text-pink-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-white">Cloud Framework</h3>
              </div>
              <AKFVisualization />
            </div>
          </div>

          <div className="glass-card p-8 mb-16">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Try Our AI Assistant</h3>
              <AzureAIChat />
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                         hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 
                         group px-8 py-6 text-lg shadow-lg shadow-violet-500/25"
            >
              Schedule Enterprise Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
