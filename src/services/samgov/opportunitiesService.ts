/**
 * SAM.gov Opportunities Service
 *
 * Uses the public SAM.gov Opportunities API v2.
 * An API key from https://open.gsa.gov/api/get-started/ is required.
 * Set VITE_SAM_GOV_API_KEY in your .env file to enable live data.
 * Without a key the service returns mock data so the UI is always functional.
 */

export interface SamOpportunity {
  noticeId: string;
  title: string;
  solicitationNumber: string | null;
  fullParentPathName: string;           // agency hierarchy
  postedDate: string;
  responseDeadLine: string | null;
  type: string;                          // Presolicitation, Combined Synopsis, etc.
  baseType: string;
  naicsCode: string | null;
  naicsCategory: string | null;
  setAside: string | null;
  setAsideCode: string | null;
  active: string;
  award: {
    date: string | null;
    number: string | null;
    amount: string | null;
    awardee: { name: string | null; location: { city: { name: string | null } | null } | null } | null;
  } | null;
  description: string | null;
  uiLink: string;
}

interface SamApiResponse {
  totalRecords: number;
  limit: number;
  offset: number;
  opportunitiesData: SamOpportunity[];
}

export interface OpportunitySearchParams {
  keyword?: string;
  naicsCode?: string;
  typeOfSetAside?: string;
  postedFrom?: string;  // MM/DD/YYYY
  postedTo?: string;
  ptype?: string;       // p = presolicitation, o = solicitation, etc.
  limit?: number;
  offset?: number;
}

const SAM_API_BASE = "https://api.sam.gov/opportunities/v2/search";
const API_KEY = import.meta.env.VITE_SAM_GOV_API_KEY;

const MOCK_OPPORTUNITIES: SamOpportunity[] = [
  {
    noticeId: "mock-opp-001",
    title: "Enterprise IT Support Services — Help Desk & Field Technician",
    solicitationNumber: "HQ0034-26-R-0012",
    fullParentPathName: "Department of Defense > Defense Logistics Agency",
    postedDate: "2026-03-15",
    responseDeadLine: "2026-04-15",
    type: "Solicitation",
    baseType: "Combined Synopsis/Solicitation",
    naicsCode: "541512",
    naicsCategory: "Computer Systems Design Services",
    setAside: "Small Business",
    setAsideCode: "SBA",
    active: "Yes",
    award: null,
    description:
      "The Defense Logistics Agency (DLA) requires enterprise IT support services including help desk (Tier 1-3) and on-site field technician support across 12 CONUS installations.",
    uiLink: "https://sam.gov/opp/mock-opp-001",
  },
  {
    noticeId: "mock-opp-002",
    title: "Professional Services — Program Management & Acquisition Support",
    solicitationNumber: "W9124D-26-R-0003",
    fullParentPathName: "Department of the Army > Army Contracting Command",
    postedDate: "2026-03-12",
    responseDeadLine: "2026-04-30",
    type: "Presolicitation",
    baseType: "Presolicitation",
    naicsCode: "541611",
    naicsCategory: "Administrative Management and General Management Consulting Services",
    setAside: "8(a)",
    setAsideCode: "8A",
    active: "Yes",
    award: null,
    description:
      "Army Contracting Command seeks acquisition and program management support to include FAR/DFARS compliance review, acquisition planning, market research, and source selection support.",
    uiLink: "https://sam.gov/opp/mock-opp-002",
  },
  {
    noticeId: "mock-opp-003",
    title: "Cybersecurity Assessment & Monitoring (CMMC Level 2)",
    solicitationNumber: "N00039-26-R-0057",
    fullParentPathName: "Department of the Navy > Space and Naval Warfare Systems Command",
    postedDate: "2026-03-10",
    responseDeadLine: "2026-05-01",
    type: "Solicitation",
    baseType: "Solicitation",
    naicsCode: "541519",
    naicsCategory: "Other Computer Related Services",
    setAside: "SDVOSB",
    setAsideCode: "SDVOSBC",
    active: "Yes",
    award: null,
    description:
      "NAVWAR requires a qualified CMMC Level 2 assessment organization and ongoing cybersecurity monitoring for defense industrial base partner systems. DFARS 252.204-7012 applies.",
    uiLink: "https://sam.gov/opp/mock-opp-003",
  },
  {
    noticeId: "mock-opp-004",
    title: "Facilities Operations & Maintenance — GSA Building Services",
    solicitationNumber: "GS-11P-26-CQ-0002",
    fullParentPathName: "General Services Administration > Public Buildings Service",
    postedDate: "2026-03-08",
    responseDeadLine: "2026-04-22",
    type: "Solicitation",
    baseType: "Combined Synopsis/Solicitation",
    naicsCode: "561210",
    naicsCategory: "Facilities Support Services",
    setAside: "HUBZone",
    setAsideCode: "HZS",
    active: "Yes",
    award: null,
    description:
      "GSA PBS seeks facilities operations and maintenance services for 3 Federal buildings in the National Capital Region. Includes HVAC, electrical, plumbing, janitorial, and grounds maintenance.",
    uiLink: "https://sam.gov/opp/mock-opp-004",
  },
  {
    noticeId: "mock-opp-005",
    title: "Cloud Migration & DevSecOps Platform Engineering",
    solicitationNumber: "70RSAT26R00000011",
    fullParentPathName: "Department of Homeland Security > Cybersecurity and Infrastructure Security Agency",
    postedDate: "2026-03-05",
    responseDeadLine: "2026-04-18",
    type: "Solicitation",
    baseType: "Solicitation",
    naicsCode: "541511",
    naicsCategory: "Custom Computer Programming Services",
    setAside: null,
    setAsideCode: null,
    active: "Yes",
    award: null,
    description:
      "CISA seeks an experienced contractor to lead cloud migration to FedRAMP-authorized environments and establish a DevSecOps pipeline adhering to NIST SP 800-53 and Zero Trust Architecture principles.",
    uiLink: "https://sam.gov/opp/mock-opp-005",
  },
];

export async function searchOpportunities(
  params: OpportunitySearchParams = {}
): Promise<{ data: SamOpportunity[]; total: number; usingMock: boolean }> {
  if (!API_KEY) {
    // Filter mock data by keyword if provided
    const kw = params.keyword?.toLowerCase() ?? "";
    const filtered = kw
      ? MOCK_OPPORTUNITIES.filter(
          (o) =>
            o.title.toLowerCase().includes(kw) ||
            (o.description ?? "").toLowerCase().includes(kw) ||
            (o.naicsCode ?? "").includes(kw) ||
            (o.fullParentPathName ?? "").toLowerCase().includes(kw)
        )
      : MOCK_OPPORTUNITIES;
    return { data: filtered, total: filtered.length, usingMock: true };
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    limit: String(params.limit ?? 25),
    offset: String(params.offset ?? 0),
    ...(params.keyword && { keyword: params.keyword }),
    ...(params.naicsCode && { naicsCode: params.naicsCode }),
    ...(params.typeOfSetAside && { typeOfSetAside: params.typeOfSetAside }),
    ...(params.postedFrom && { postedFrom: params.postedFrom }),
    ...(params.postedTo && { postedTo: params.postedTo }),
    ...(params.ptype && { ptype: params.ptype }),
  });

  const res = await fetch(`${SAM_API_BASE}?${searchParams.toString()}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SAM.gov API error ${res.status}: ${text.slice(0, 200)}`);
  }

  const json: SamApiResponse = await res.json();
  return {
    data: json.opportunitiesData ?? [],
    total: json.totalRecords ?? 0,
    usingMock: false,
  };
}
