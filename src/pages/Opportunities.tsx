import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  ExternalLink,
  Calendar,
  Building2,
  Tag,
  Users,
  InboxIcon,
  AlertCircle,
  Info,
} from "lucide-react";
import { searchOpportunities, SamOpportunity } from "@/services/samgov/opportunitiesService";
import { useNavigate } from "react-router-dom";
import { pushNotification } from "@/hooks/useNotifications";

const SET_ASIDE_OPTIONS = [
  { value: "all", label: "All set-asides" },
  { value: "SBA", label: "Small Business" },
  { value: "8A", label: "8(a)" },
  { value: "HZS", label: "HUBZone" },
  { value: "SDVOSBC", label: "SDVOSB" },
  { value: "WOSB", label: "WOSB" },
  { value: "EDWOSB", label: "EDWOSB" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "All types" },
  { value: "o", label: "Solicitation" },
  { value: "p", label: "Presolicitation" },
  { value: "k", label: "Combined Synopsis" },
  { value: "r", label: "Sources Sought" },
];

function OpportunitySkeleton() {
  return (
    <Card className="p-5 bg-white/5 border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <Skeleton className="h-8 w-28 shrink-0" />
      </div>
    </Card>
  );
}

function OpportunityCard({ opp }: { opp: SamOpportunity }) {
  const navigate = useNavigate();

  const handleGetBrief = () => {
    pushNotification({
      type: "ai_complete",
      title: "AI Brief requested",
      body: `Opening AI assistant with context for "${opp.title}"`,
    });
    // Pre-seed chat with the opportunity title as context
    navigate(`/chat?context=${encodeURIComponent(`Provide a brief summary and compliance considerations for the following federal opportunity: ${opp.title} (${opp.solicitationNumber ?? "no solicitation number"}). Agency: ${opp.fullParentPathName}. Type: ${opp.type}. NAICS: ${opp.naicsCode ?? "N/A"}. Deadline: ${opp.responseDeadLine ?? "TBD"}.`)}`);
  };

  const daysLeft = opp.responseDeadLine
    ? Math.ceil((new Date(opp.responseDeadLine).getTime() - Date.now()) / 86_400_000)
    : null;

  return (
    <Card className="p-5 bg-white/5 border-white/10 hover:bg-white/[0.07] transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title + badges */}
          <div className="flex flex-wrap items-start gap-2">
            <h3 className="text-sm font-semibold text-white leading-snug flex-1">{opp.title}</h3>
            {opp.setAside && (
              <Badge variant="outline" className="border-violet-500/30 text-violet-400 text-[10px] shrink-0">
                <Users className="h-2.5 w-2.5 mr-1" aria-hidden="true" />
                {opp.setAside}
              </Badge>
            )}
            <Badge variant="outline" className="border-white/10 text-gray-400 text-[10px] shrink-0">
              {opp.type}
            </Badge>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <Building2 className="h-3 w-3" aria-hidden="true" />
              {opp.fullParentPathName.split(" > ").slice(-1)[0]}
            </span>
            {opp.naicsCode && (
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" aria-hidden="true" />
                NAICS {opp.naicsCode}
              </span>
            )}
            {opp.solicitationNumber && (
              <span className="font-mono">{opp.solicitationNumber}</span>
            )}
          </div>

          {/* Description excerpt */}
          {opp.description && (
            <p className="text-[11px] text-gray-400 line-clamp-2">{opp.description}</p>
          )}

          {/* Dates */}
          <div className="flex flex-wrap gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-gray-500">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              Posted {new Date(opp.postedDate).toLocaleDateString()}
            </span>
            {opp.responseDeadLine && (
              <span
                className={`flex items-center gap-1 font-medium ${
                  daysLeft !== null && daysLeft <= 7
                    ? "text-red-400"
                    : daysLeft !== null && daysLeft <= 14
                    ? "text-amber-400"
                    : "text-gray-400"
                }`}
              >
                <Calendar className="h-3 w-3" aria-hidden="true" />
                Due {new Date(opp.responseDeadLine).toLocaleDateString()}
                {daysLeft !== null && (
                  <span className="ml-1">({daysLeft > 0 ? `${daysLeft}d left` : "Closed"})</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 shrink-0">
          <Button
            size="sm"
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 text-xs"
            onClick={handleGetBrief}
          >
            Get AI Brief
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 text-xs"
            onClick={() => window.open(opp.uiLink, "_blank", "noopener,noreferrer")}
          >
            <ExternalLink className="h-3 w-3 mr-1.5" aria-hidden="true" />
            SAM.gov
          </Button>
        </div>
      </div>
    </Card>
  );
}

const Opportunities = () => {
  const [keyword, setKeyword] = useState("");
  const [naicsCode, setNaicsCode] = useState("");
  const [setAside, setSetAside] = useState("all");
  const [ptype, setPtype] = useState("all");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Clean up timer on unmount to prevent state updates on unmounted component
  useEffect(() => {
    return () => clearTimeout(debounceTimerRef.current);
  }, []);

  // Debounce search input
  const handleKeywordChange = (val: string) => {
    setKeyword(val);
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setDebouncedKeyword(val), 500);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["opportunities", debouncedKeyword, naicsCode, setAside, ptype],
    queryFn: () =>
      searchOpportunities({
        keyword: debouncedKeyword || undefined,
        naicsCode: naicsCode || undefined,
        typeOfSetAside: setAside !== "all" ? setAside : undefined,
        ptype: ptype !== "all" ? ptype : undefined,
        limit: 25,
      }),
    staleTime: 5 * 60 * 1000,
  });

  const opportunities = data?.data ?? [];
  const usingMock = data?.usingMock ?? true;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Opportunities"
        description="Browse active federal contracting opportunities from SAM.gov."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Opportunities" },
        ]}
      />

      {/* API key notice */}
      {usingMock && !isLoading && (
        <Card className="p-4 bg-amber-500/5 border-amber-500/20 flex items-start gap-3">
          <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm text-amber-300 font-medium">Demo data — live SAM.gov data not configured</p>
            <p className="text-xs text-amber-400/70 mt-0.5">
              Set <code className="font-mono bg-amber-500/10 px-1 rounded">VITE_SAM_GOV_API_KEY</code> in your{" "}
              <code className="font-mono bg-amber-500/10 px-1 rounded">.env</code> file to fetch real opportunities
              from SAM.gov.{" "}
              <a
                href="https://open.gsa.gov/api/get-started/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-300"
              >
                Get a free API key →
              </a>
            </p>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4 bg-black/40 backdrop-blur-sm border-white/5">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" aria-hidden="true" />
            <Input
              placeholder="Search by keyword, agency, or NAICS…"
              className="pl-9 bg-white/5 border-white/10"
              value={keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
              aria-label="Search opportunities"
            />
          </div>
          <Input
            placeholder="NAICS code"
            className="w-32 bg-white/5 border-white/10"
            value={naicsCode}
            onChange={(e) => setNaicsCode(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            aria-label="Filter by NAICS code"
          />
          <Select value={setAside} onValueChange={setSetAside}>
            <SelectTrigger className="w-44 bg-white/5 border-white/10" aria-label="Filter by set-aside">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SET_ASIDE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={ptype} onValueChange={setPtype}>
            <SelectTrigger className="w-44 bg-white/5 border-white/10" aria-label="Filter by opportunity type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results count */}
      {!isLoading && !isError && (
        <p className="text-xs text-gray-500" aria-live="polite">
          Showing {opportunities.length} {usingMock ? "demo " : ""}opportunit{opportunities.length !== 1 ? "ies" : "y"}
          {data?.total && !usingMock ? ` of ${data.total.toLocaleString()} total` : ""}
        </p>
      )}

      {/* States */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => <OpportunitySkeleton key={i} />)}
        </div>
      )}

      {isError && (
        <Card className="p-8 bg-red-500/5 border-red-500/20 flex flex-col items-center text-center gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-red-300">Failed to load opportunities</p>
            <p className="text-xs text-red-400/70 mt-1">{(error as Error).message}</p>
          </div>
        </Card>
      )}

      {!isLoading && !isError && opportunities.length === 0 && (
        <Card className="p-12 bg-black/40 border-white/5 flex flex-col items-center text-center">
          <InboxIcon className="h-12 w-12 text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-300">No opportunities found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
        </Card>
      )}

      {!isLoading && !isError && opportunities.length > 0 && (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.noticeId} opp={opp} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Opportunities;
