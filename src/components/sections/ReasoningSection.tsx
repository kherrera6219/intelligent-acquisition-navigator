
import { Book, Scale, Shield, CheckCircle } from "lucide-react";

export const ReasoningSection = () => {
  return (
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
  );
};
