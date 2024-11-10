import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import RequestDemo from "@/components/RequestDemo";
import { DualLLMProcessor } from "@/components/DualLLMProcessor";
import { RAGProcessor } from "@/components/RAGProcessor";
import { BlockchainRecords } from "@/components/BlockchainRecords";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <DualLLMProcessor input="Sample input for demonstration" />
        <RAGProcessor />
        <BlockchainRecords />
      </div>
      <Features />
      <Benefits />
      <RequestDemo />
    </div>
  );
};

export default Index;