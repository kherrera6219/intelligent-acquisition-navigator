
import { Card } from "@/components/ui/card";
import { Users, Shield, BarChart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 tracking-tight mb-4">
            About ProcurityIQ
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're on a mission to revolutionize acquisition management through artificial intelligence
            and human expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5">
            <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                           rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-gray-400">
              To empower organizations with intelligent acquisition solutions that drive efficiency
              and ensure compliance.
            </p>
          </Card>

          <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5">
            <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                           rounded-lg flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Our Values</h3>
            <p className="text-gray-400">
              Innovation, integrity, and excellence guide everything we do as we serve our clients
              and partners.
            </p>
          </Card>

          <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5">
            <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                           rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Our Team</h3>
            <p className="text-gray-400">
              A diverse group of experts in AI, acquisition, and compliance working together to
              transform procurement.
            </p>
          </Card>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-400 mb-4">
              Founded by industry veterans with decades of experience in acquisition and technology,
              ProcurityIQ was born from a simple observation: traditional acquisition processes
              were holding organizations back.
            </p>
            <p className="text-gray-400 mb-4">
              We set out to create a solution that would combine the power of artificial intelligence
              with human expertise to revolutionize how organizations handle their acquisition processes.
            </p>
            <p className="text-gray-400">
              Today, we're proud to serve organizations across the globe, helping them streamline
              their acquisition workflows, ensure compliance, and make data-driven decisions with
              confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
