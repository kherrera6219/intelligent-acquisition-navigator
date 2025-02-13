
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Shield, Brain, Cloud, Activity } from "lucide-react";

const stats = [
  { value: 85, label: "Time Saved", unit: "%", icon: <Activity className="w-8 h-8 text-primary mb-4" /> },
  { value: 99, label: "Compliance Rate", unit: "%", icon: <Shield className="w-8 h-8 text-primary mb-4" /> },
  { value: 500, label: "Organizations", unit: "+", icon: <Cloud className="w-8 h-8 text-primary mb-4" /> },
  { value: 1000000, label: "Documents Processed", unit: "+", icon: <Brain className="w-8 h-8 text-primary mb-4" /> },
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
    <section id="benefits" className="py-24 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join hundreds of organizations that have transformed their acquisition processes with Procurity.AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} 
                  className="p-6 text-center bg-black/50 border-0 
                            shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center">
                {stat.icon}
                <div className="text-4xl font-bold bg-clip-text text-transparent 
                               bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
                  {isVisible ? (
                    <>
                      {stat.value.toLocaleString()}
                      {stat.unit}
                    </>
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
