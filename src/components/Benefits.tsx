import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const stats = [
  { value: 85, label: "Time Saved", unit: "%" },
  { value: 99, label: "Compliance Rate", unit: "%" },
  { value: 500, label: "Organizations", unit: "+" },
  { value: 1000000, label: "Documents Processed", unit: "+" },
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
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of organizations that have transformed their acquisition processes with Procurity.AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {isVisible ? (
                  <>
                    {stat.value.toLocaleString()}
                    {stat.unit}
                  </>
                ) : (
                  "0"
                )}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;