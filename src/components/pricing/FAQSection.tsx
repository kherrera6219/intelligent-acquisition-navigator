
import React from 'react';
import { Card } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqItems: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqItems }) => {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {faqItems.map((item, index) => (
          <Card key={index} className="p-6 bg-gray-800 border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">{item.question}</h3>
            <p className="text-gray-400">{item.answer}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
