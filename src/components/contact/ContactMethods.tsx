
import React from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { GlassCard } from "@/components/ui/universal/GlassCard";

const contactMethods = [
  { icon: Mail, title: "Email", info: "contact@procurityiq.com" },
  { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
  { icon: MessageSquare, title: "Live Chat", info: "Available 24/7" }
];

export const ContactMethods = () => {
  return (
    <div className="space-y-6">
      {contactMethods.map((item, index) => (
        <GlassCard key={index}>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                           rounded-lg flex items-center justify-center">
              <item.icon className="h-6 w-6 text-fuchsia-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-gray-400">{item.info}</p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};
