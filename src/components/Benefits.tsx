
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Shield, Brain, Cloud, Activity } from "lucide-react";

const stats = [
  { 
    value: 85, 
    label: "Time Saved", 
    unit: "%", 
    icon: <Activity className="w-10 h-10 text-violet-400 group-hover:scale-110 transition-transform duration-300" />,
    description: "Faster acquisition processes"
  },
  { 
    value: 99, 
    label: "Compliance Rate", 
    unit: "%", 
    icon: <Shield className="w-10 h-10 text-fuchsia-400 group-hover:scale-110 transition-transform duration-300" />,
    description: "FedRAMP High certified"
  },
  { 
    value: 500, 
    label: "Organizations", 
    unit: "+", 
    icon: <Cloud className="w-10 h-10 text-pink-400 group-hover:scale-110 transition-transform duration-300" />,
    description: "Trust our platform"
  },
  { 
    value: 1000000, 
    label: "Documents Processed", 
    unit: "+", 
    icon: <Brain className="w-10 h-10 text-violet-400 group-hover:scale-110 transition-transform duration-300" />,
    description: "AI-powered analysis"
  },
];

const Benefits = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("benefits");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="benefits" className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 tracking-tight">
            Proven Results
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join hundreds of organizations that have transformed their acquisition processes with Procurity.AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="group relative p-8 text-center bg-black/40 backdrop-blur-sm border-white/5 
                         hover:bg-black/60 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col items-center gap-4">
                <div className="p-3 rounded-full bg-white/5">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold bg-clip-text text-transparent 
                               bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                  {isVisible ? (
                    <>
                      {stat.value.toLocaleString()}
                      {stat.unit}
                    </>
                  ) : (
                    "0"
                  )}
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-white">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
