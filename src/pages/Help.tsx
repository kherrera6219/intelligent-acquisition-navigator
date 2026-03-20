
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  BookOpen,
  MessageSquare,
  Shield,
  FileText,
  BarChart2,
  Keyboard,
  ExternalLink,
} from "lucide-react";

const faqs = [
  {
    q: "How do I submit a solicitation for review?",
    a: "Navigate to Acquisition → Solicitation Review and click 'New Solicitation'. Fill in the required fields including title, department, and upload your solicitation document. The AI will automatically check FAR/DFARS compliance.",
  },
  {
    q: "What regulations does the AI assistant know?",
    a: "The AI is trained on FAR (Federal Acquisition Regulation), DFARS (Defense), GSAM, HHSAR, AGAR, and 25 additional agency supplements. Coverage is updated quarterly.",
  },
  {
    q: "How do I use the ⌘K command palette?",
    a: "Press Ctrl+K (Windows/Linux) or ⌘K (Mac) from anywhere in the app to open the command palette. You can quickly navigate to any page or perform common actions without using the mouse.",
  },
  {
    q: "Can I upload documents for AI analysis?",
    a: "Yes. In the AI Assistant (Chat) page, use the file upload button to attach solicitations, proposals, or other acquisition documents. The AI will use them as context for its responses.",
  },
  {
    q: "How is my data secured?",
    a: "ProcurityIQ uses Supabase (PostgreSQL with row-level security), HTTPS-only communication, and a 15-minute session timeout. All user actions are logged to an immutable audit trail.",
  },
  {
    q: "What are the different acquisition roles?",
    a: "The system supports 6 roles: Contracting Officer, Contract Specialist, Program Manager, Legal Reviewer, Small Business Specialist, and System Admin. Each has a tailored permission set.",
  },
  {
    q: "How do I export data for reporting?",
    a: "Users with the EXPORT_DATA permission (Contracting Officers and System Admins by default) can export data from the Analytics page using the Export button at the top right.",
  },
];

const quickLinks = [
  { icon: MessageSquare, label: "AI Assistant", desc: "Ask the acquisition AI anything", href: "/chat" },
  { icon: FileText, label: "Solicitation Review", desc: "Review and manage solicitations", href: "/acquisition/solicitation-review" },
  { icon: Shield, label: "Compliance", desc: "FAR/DFARS compliance dashboard", href: "/compliance" },
  { icon: BarChart2, label: "Analytics", desc: "Acquisition metrics and trends", href: "/analytics" },
];

const shortcuts = [
  { keys: ["⌘", "K"], action: "Open command palette" },
  { keys: ["⌘", "↵"], action: "Send message in chat" },
  { keys: ["Tab"], action: "Navigate between elements" },
  { keys: ["Esc"], action: "Close modals / dialogs" },
];

const Help = () => {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      !search ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader
        title="Help & Documentation"
        description="Find answers, keyboard shortcuts, and guidance for using ProcurityIQ."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Help" }]}
      />

      {/* Search */}
      <div className="relative mb-8 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" aria-hidden="true" />
        <Input
          placeholder="Search FAQs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          aria-label="Search help articles"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ column */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Frequently Asked Questions
          </h2>

          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 overflow-hidden"
                >
                  <AccordionTrigger className="text-sm text-gray-200 hover:text-white text-left py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-400 pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Card className="p-8 text-center bg-white/5 border-white/10 text-gray-500">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-30" aria-hidden="true" />
              <p className="text-sm">No FAQs match "{search}"</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick links */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Quick Links
            </h2>
            <div className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <Icon className="h-4 w-4 text-violet-400 shrink-0" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-200 group-hover:text-white">
                        {link.label}
                      </p>
                      <p className="text-xs text-gray-500">{link.desc}</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-gray-600 group-hover:text-gray-400 shrink-0" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <Separator className="bg-white/5" />

          {/* Keyboard shortcuts */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Keyboard className="h-3.5 w-3.5" aria-hidden="true" />
              Keyboard Shortcuts
            </h2>
            <div className="space-y-2">
              {shortcuts.map((s) => (
                <div key={s.action} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{s.action}</span>
                  <span className="flex items-center gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-gray-300"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-white/5" />

          {/* Support */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Support
            </h2>
            <Card className="p-4 bg-violet-500/5 border-violet-500/20 text-sm">
              <p className="text-gray-300 mb-2 font-medium">Need more help?</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Contact your system administrator or submit a support ticket through your agency's IT helpdesk.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
