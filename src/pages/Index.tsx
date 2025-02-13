
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import RequestDemo from "@/components/RequestDemo";
import { DualLLMProcessor } from "@/components/DualLLMProcessor";
import { RAGProcessor } from "@/components/RAGProcessor";
import { BlockchainRecords } from "@/components/BlockchainRecords";
import { VoiceInterface } from "@/components/VoiceInterface";
import AKFVisualization from "@/components/AKFVisualization";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Cloud } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />
      <Hero />
      
      {/* Technology Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              AI-Powered Technology Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform leverages cutting-edge AI and blockchain technology to revolutionize procurement evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
              <VoiceInterface />
            </div>
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
              <DualLLMProcessor input="Sample input for demonstration" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-violet-500/20">
                  <Brain className="h-6 w-6 text-violet-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">RAG Processing</h3>
              </div>
              <RAGProcessor />
            </div>
            
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-fuchsia-500/20">
                  <Shield className="h-6 w-6 text-fuchsia-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">Blockchain Security</h3>
              </div>
              <BlockchainRecords />
            </div>
            
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-pink-500/20">
                  <Cloud className="h-6 w-6 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">Knowledge Framework</h3>
              </div>
              <AKFVisualization />
            </div>
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                         hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600
                         group"
            >
              Explore Our Technology
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
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
