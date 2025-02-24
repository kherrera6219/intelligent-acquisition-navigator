
import React, { useState, useEffect } from "react";
import { GradientText } from "@/components/ui/universal/GradientText";
import { GlassCard } from "@/components/ui/universal/GlassCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { LoadingSkeleton } from "@/components/contact/LoadingSkeleton";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <GradientText>Get in Touch</GradientText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <ContactForm />
            </GlassCard>
          </div>

          <ContactMethods />
        </div>
      </div>
    </div>
  );
};

export default Contact;
