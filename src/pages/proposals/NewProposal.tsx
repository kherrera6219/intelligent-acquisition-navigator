import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Check,
  Copy,
  Loader2,
  FileText,
  Pencil,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAICompletion } from "@/services/azure/aiService";
import { useCreateSolicitation } from "@/hooks/useSolicitations";
import { pushNotification } from "@/hooks/useNotifications";
import { supabase } from "@/integrations/supabase/client";

// --- Types ---
type Step = "requirements" | "sections" | "draft" | "review";

interface ProposalSection {
  id: string;
  label: string;
  description: string;
  content: string;
  isGenerating: boolean;
  isGenerated: boolean;
}

const ALL_SECTIONS: Omit<ProposalSection, "content" | "isGenerating" | "isGenerated">[] = [
  { id: "executive_summary", label: "Executive Summary", description: "High-level overview of your offer and its value" },
  { id: "technical_approach", label: "Technical Approach", description: "How you will meet the technical requirements" },
  { id: "management_plan", label: "Management Plan", description: "Organizational structure, staffing, and governance" },
  { id: "past_performance", label: "Past Performance", description: "Relevant prior contracts and performance metrics" },
  { id: "price_volume", label: "Price / Cost Volume", description: "Pricing methodology and cost breakdown narrative" },
];

const CONTRACT_TYPES = ["Fixed Price", "Cost Plus", "T&M", "IDIQ", "Other"];

// --- Step indicator ---
const STEPS: { id: Step; label: string }[] = [
  { id: "requirements", label: "Requirements" },
  { id: "sections", label: "Sections" },
  { id: "draft", label: "AI Draft" },
  { id: "review", label: "Review & Save" },
];

function StepIndicator({ current }: { current: Step }) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);
  return (
    <ol className="flex items-center gap-2 mb-8" aria-label="Proposal creation steps">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <li key={step.id} className="flex items-center gap-2">
            <span
              className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                done
                  ? "bg-emerald-500 text-white"
                  : active
                  ? "bg-violet-500 text-white"
                  : "bg-white/10 text-gray-500"
              }`}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={`text-xs font-medium ${active ? "text-white" : done ? "text-gray-400" : "text-gray-600"}`}>
              {step.label}
            </span>
            {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-gray-700 shrink-0" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

// --- Main component ---
const NewProposal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createSolicitation = useCreateSolicitation();

  // Step 1 — requirements
  const [rfpTitle, setRfpTitle] = useState("");
  const [vendor, setVendor] = useState("");
  const [contractType, setContractType] = useState("");
  const [requirements, setRequirements] = useState("");

  // Step 2 — sections
  const [selectedSections, setSelectedSections] = useState<Set<string>>(
    new Set(["executive_summary", "technical_approach"])
  );

  // Step 3 — drafts
  const [sections, setSections] = useState<ProposalSection[]>(
    ALL_SECTIONS.map((s) => ({ ...s, content: "", isGenerating: false, isGenerated: false }))
  );
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  // Step navigation
  const [step, setStep] = useState<Step>("requirements");

  // --- Helpers ---
  const toggleSection = (id: string) => {
    setSelectedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const generateSection = async (sectionId: string) => {
    const sectionMeta = ALL_SECTIONS.find((s) => s.id === sectionId);
    if (!sectionMeta) return;

    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, isGenerating: true } : s))
    );

    try {
      const systemPrompt = `You are a senior federal proposal writer with expertise in FAR/DFARS compliance.
Write a concise, professional ${sectionMeta.label} section for a federal government proposal.
Use active voice, avoid buzzwords, and reference relevant FAR/DFARS clauses where appropriate.
Keep the response focused and under 400 words unless complexity demands more.`;

      const userPrompt = `Write a ${sectionMeta.label} section for the following proposal:

**Opportunity Title:** ${rfpTitle}
**Vendor / Offeror:** ${vendor || "Our Company"}
**Contract Type:** ${contractType || "Not specified"}
**Requirements Summary:**
${requirements}

Section purpose: ${sectionMeta.description}`;

      const response = await getAICompletion([
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ]);
      const content = response.choices[0]?.message?.content ?? "";
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, content, isGenerating: false, isGenerated: true } : s
        )
      );
    } catch {
      setSections((prev) =>
        prev.map((s) => (s.id === sectionId ? { ...s, isGenerating: false } : s))
      );
    }
  };

  const generateAll = async () => {
    setIsGeneratingAll(true);
    // Generate all selected sections concurrently — significantly faster than sequential
    await Promise.allSettled([...selectedSections].map((id) => generateSection(id)));
    setIsGeneratingAll(false);
    pushNotification({
      type: "ai_complete",
      title: "Proposal sections drafted",
      body: `AI completed drafts for "${rfpTitle}". Review and save.`,
    });
  };

  const handleCopy = async (content: string, label: string) => {
    await navigator.clipboard.writeText(content);
    toast({ title: `${label} copied to clipboard` });
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const createdBy = user?.id ?? 'anonymous';

      await createSolicitation.mutateAsync({
        title: rfpTitle,
        type: "RFP",
        description: requirements,
        due_date: null,
        estimated_value: null,
        created_by: createdBy,
      });
      pushNotification({
        type: "status_change",
        title: "Proposal saved",
        body: `"${rfpTitle}" has been saved as a draft solicitation.`,
        resourceType: "solicitation",
      });
      navigate("/proposals");
    } catch {
      // error handled in mutation
    }
  };

  // --- Steps ---
  const step1Valid = rfpTitle.trim().length > 3 && requirements.trim().length > 20;
  const step2Valid = selectedSections.size > 0;
  const activeSections = sections.filter((s) => selectedSections.has(s.id));
  const allGenerated = activeSections.every((s) => s.isGenerated);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="New Proposal"
        description="Use AI to draft a complete federal proposal from your requirements."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Proposals", href: "/proposals" },
          { label: "New Proposal" },
        ]}
      />

      <StepIndicator current={step} />

      {/* ── Step 1: Requirements ── */}
      {step === "requirements" && (
        <Card className="p-6 bg-white/5 border-white/10 space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <FileText className="h-4 w-4 text-violet-400" aria-hidden="true" />
            Enter Solicitation Details
          </h2>

          <div className="space-y-1.5">
            <Label htmlFor="rfp-title" className="text-sm text-gray-400">Opportunity Title *</Label>
            <Input
              id="rfp-title"
              placeholder="e.g. Enterprise IT Support Services — Help Desk"
              value={rfpTitle}
              onChange={(e) => setRfpTitle(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="vendor" className="text-sm text-gray-400">Company / Offeror Name</Label>
              <Input
                id="vendor"
                placeholder="Your company name"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-400">Contract Type</Label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {CONTRACT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="requirements" className="text-sm text-gray-400">
              Requirements / Scope of Work *
            </Label>
            <Textarea
              id="requirements"
              placeholder="Paste the solicitation's Statement of Work, Section L/M requirements, or a summary of what the government needs…"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="bg-white/5 border-white/10 min-h-36 resize-y"
            />
            <p className="text-xs text-gray-600">{requirements.length} characters</p>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!step1Valid}
              onClick={() => setStep("sections")}
              className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
            >
              Next — Choose Sections
              <ChevronRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
            </Button>
          </div>
        </Card>
      )}

      {/* ── Step 2: Sections ── */}
      {step === "sections" && (
        <Card className="p-6 bg-white/5 border-white/10 space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Pencil className="h-4 w-4 text-violet-400" aria-hidden="true" />
            Choose Sections to Draft
          </h2>
          <p className="text-sm text-gray-400">
            Select the sections you want AI to draft for <strong className="text-gray-200">"{rfpTitle}"</strong>.
          </p>

          <div className="space-y-3">
            {ALL_SECTIONS.map((s) => {
              const selected = selectedSections.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSection(s.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selected
                      ? "border-violet-500/50 bg-violet-500/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                  }`}
                  aria-pressed={selected}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                        selected ? "bg-violet-500 border-violet-500" : "border-white/20"
                      }`}
                    >
                      {selected && <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" />}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{s.label}</p>
                      <p className="text-xs text-gray-500">{s.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep("requirements")}>
              <ChevronLeft className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Back
            </Button>
            <Button
              disabled={!step2Valid}
              onClick={() => setStep("draft")}
              className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
            >
              Next — Generate Drafts
              <ChevronRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
            </Button>
          </div>
        </Card>
      )}

      {/* ── Step 3: AI Draft ── */}
      {step === "draft" && (
        <div className="space-y-4">
          <Card className="p-4 bg-white/5 border-white/10 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-gray-300">
              Click <strong className="text-white">Generate All</strong> to draft all sections at once, or generate individually.
            </p>
            <Button
              onClick={generateAll}
              disabled={isGeneratingAll}
              className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
            >
              {isGeneratingAll ? (
                <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" aria-hidden="true" /> Generating…</>
              ) : (
                <><Sparkles className="h-4 w-4 mr-1.5" aria-hidden="true" /> Generate All</>
              )}
            </Button>
          </Card>

          {activeSections.map((section) => (
            <Card key={section.id} className="p-5 bg-white/5 border-white/10 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">{section.label}</h3>
                  {section.isGenerated && (
                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
                      <Check className="h-2.5 w-2.5 mr-1" aria-hidden="true" /> Done
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {section.isGenerated && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 text-xs"
                      onClick={() => handleCopy(section.content, section.label)}
                    >
                      <Copy className="h-3 w-3 mr-1" aria-hidden="true" />
                      Copy
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-violet-500/30 text-violet-400 hover:text-violet-300 text-xs"
                    disabled={section.isGenerating || isGeneratingAll}
                    onClick={() => generateSection(section.id)}
                  >
                    {section.isGenerating ? (
                      <><Loader2 className="h-3 w-3 mr-1 animate-spin" aria-hidden="true" /> Drafting…</>
                    ) : section.isGenerated ? (
                      "Re-generate"
                    ) : (
                      <><Sparkles className="h-3 w-3 mr-1" aria-hidden="true" /> Generate</>
                    )}
                  </Button>
                </div>
              </div>

              {section.isGenerating ? (
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ) : section.isGenerated ? (
                <Textarea
                  value={section.content}
                  onChange={(e) =>
                    setSections((prev) =>
                      prev.map((s) => (s.id === section.id ? { ...s, content: e.target.value } : s))
                    )
                  }
                  className="bg-white/5 border-white/10 min-h-48 text-sm text-gray-200 resize-y font-mono"
                  aria-label={`${section.label} content`}
                />
              ) : (
                <div className="h-20 flex items-center justify-center text-xs text-gray-600 border border-dashed border-white/10 rounded-md">
                  Click "Generate" to draft this section with AI
                </div>
              )}
            </Card>
          ))}

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep("sections")}>
              <ChevronLeft className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Back
            </Button>
            <Button
              disabled={!allGenerated}
              onClick={() => setStep("review")}
              className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
            >
              Next — Review & Save
              <ChevronRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Step 4: Review & Save ── */}
      {step === "review" && (
        <Card className="p-6 bg-white/5 border-white/10 space-y-6">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Save className="h-4 w-4 text-violet-400" aria-hidden="true" />
            Review & Save Proposal
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Title</p>
              <p className="text-gray-200 font-medium">{rfpTitle}</p>
            </div>
            {vendor && (
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Offeror</p>
                <p className="text-gray-200">{vendor}</p>
              </div>
            )}
            {contractType && (
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Contract Type</p>
                <p className="text-gray-200">{contractType}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500">Sections drafted</p>
            <div className="flex flex-wrap gap-2">
              {activeSections.map((s) => (
                <Badge key={s.id} variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                  <Check className="h-2.5 w-2.5 mr-1" aria-hidden="true" />
                  {s.label}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Saving will create a draft RFP in Solicitation Review. You can assign reviewers and continue editing from there.
          </p>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep("draft")}>
              <ChevronLeft className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Back to Drafts
            </Button>
            <Button
              onClick={handleSave}
              disabled={createSolicitation.isPending}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              {createSolicitation.isPending ? (
                <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" aria-hidden="true" /> Saving…</>
              ) : (
                <><Save className="h-4 w-4 mr-1.5" aria-hidden="true" /> Save Proposal</>
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NewProposal;
