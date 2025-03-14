import { PricingPlan } from './PricingPlansSection';

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "49",
    billing: "per user / month",
    description: "Perfect for small teams getting started with acquisition management",
    features: [
      { text: "Up to 5 team members", included: true },
      { text: "Basic knowledge base access", included: true },
      { text: "Limited compliance checks", included: true },
      { text: "Standard email support", included: true },
      { text: "Core features access", included: true },
      { text: "Basic reporting", included: true },
      { text: "Advanced AI analysis", included: false, tooltip: "Available in Professional and Enterprise plans" },
      { text: "Custom workflows", included: false },
      { text: "API access", included: false },
    ],
    ctaText: "Start 14-Day Free Trial"
  },
  {
    name: "Professional",
    price: "99",
    billing: "per user / month",
    description: "Ideal for growing organizations with complex acquisition needs",
    features: [
      { text: "Up to 20 team members", included: true },
      { text: "Full knowledge base access", included: true },
      { text: "Advanced compliance checks", included: true },
      { text: "Priority support", included: true },
      { text: "All core features", included: true },
      { text: "Advanced reporting", included: true },
      { text: "Advanced AI analysis", included: true },
      { text: "Custom workflows", included: true },
      { text: "API access", included: false, tooltip: "Available in Enterprise plan only" },
    ],
    popular: true,
    ctaText: "Start 14-Day Free Trial"
  },
  {
    name: "Enterprise",
    price: "249",
    billing: "per user / month",
    description: "For large organizations with complex, mission-critical requirements",
    features: [
      { text: "Unlimited team members", included: true },
      { text: "Full knowledge base access", included: true },
      { text: "Comprehensive compliance suite", included: true },
      { text: "24/7 premium support", included: true },
      { text: "All features included", included: true },
      { text: "Custom reporting", included: true },
      { text: "Advanced AI & ML capabilities", included: true },
      { text: "Advanced security controls", included: true },
      { text: "Full API access", included: true },
    ],
    ctaText: "Contact Sales"
  }
];

export const faqItems = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to get started."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, purchase orders, and can work with government payment systems."
  },
  {
    question: "Do you offer discounts?",
    answer: "We offer discounts for annual billing and special pricing for educational institutions and non-profits."
  }
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Federal Contracting Officer",
    content: "ProcurityIQ has transformed our procurement process. We've reduced review time by 72% and improved compliance accuracy by 98%.",
    image: "/avatars/sarah.jpg",
    score: 5
  },
  {
    name: "Michael Chen",
    role: "City Procurement Manager",
    content: "The AI-powered compliance checks have saved our department countless hours and helped us avoid several potential issues before they became problems.",
    image: "/avatars/michael.jpg",
    score: 5
  },
  {
    name: "Jamal Williams",
    role: "State Acquisition Director",
    content: "We've been able to standardize our procurement processes across 12 different departments thanks to the platform's flexibility and powerful knowledge base.",
    image: "/avatars/jamal.jpg",
    score: 4
  }
];
