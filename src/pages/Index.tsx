
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gradient">
            AI-Powered Procurement Evaluation Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoiceInterface />
            <DualLLMProcessor input="Sample input for demonstration" />
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gradient">
            Advanced Knowledge Processing
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <RAGProcessor />
            <BlockchainRecords />
            <AKFVisualization />
          </div>
        </section>
      </div>
      
      <Features />
      <Benefits />
      <RequestDemo />
    </div>
  );
};

export default Index;
