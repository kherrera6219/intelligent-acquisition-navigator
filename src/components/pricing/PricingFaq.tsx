
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const PricingFaq: React.FC = () => {
  const faqs = [
    {
      question: "How does the 14-day free trial work?",
      answer: "Our free trial gives you full access to the platform features based on the plan you select. You can explore all the capabilities, invite team members, and test the system with your data. No credit card is required to start, and you can upgrade or cancel at any time."
    },
    {
      question: "Can I switch plans after signing up?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be billed the prorated difference for the remainder of your billing cycle. If you downgrade, the changes will take effect at the start of your next billing cycle."
    },
    {
      question: "Do you offer discounts for government agencies?",
      answer: "Yes, we offer special pricing for government agencies through various procurement vehicles. We're registered on GSA, SEWP, and several state contract vehicles. Contact our sales team for specific information about government pricing and available discounts."
    },
    {
      question: "What kind of support is included with each plan?",
      answer: "The Starter plan includes standard email support with a 48-hour response time. The Professional plan adds phone support with a 24-hour response time. The Enterprise plan includes 24/7 premium support with a 4-hour response time guarantee and a dedicated support manager for your organization."
    },
    {
      question: "Is there a minimum contract length?",
      answer: "Our standard plans are available on monthly or annual terms, with a discount for annual commitments. Enterprise plans typically have a minimum one-year term, but we can customize the contract length based on your organization's needs and procurement requirements."
    },
    {
      question: "Can I import data from our existing systems?",
      answer: "Yes, we offer data migration services to help you import your existing acquisition data into our platform. The Starter plan includes basic data import capabilities, while the Professional and Enterprise plans include more advanced migration support and custom integrations with your existing systems."
    },
    {
      question: "Do you provide training for our team?",
      answer: "Yes, all plans include access to our knowledge base and video tutorials. The Starter plan includes one initial training session, the Professional plan includes three training sessions, and the Enterprise plan offers unlimited training and onboarding support."
    },
    {
      question: "What security certifications does the platform have?",
      answer: "Our platform is FedRAMP Moderate authorized, HIPAA compliant, and SOC 2 Type II certified. We maintain strict security protocols to ensure the protection of your data and compliance with government security requirements."
    }
  ];
  
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about our pricing? Find answers to commonly asked questions below.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index}
              value={`item-${index}`}
              className="bg-[#1A1F2C]/50 border border-border/10 rounded-lg"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
