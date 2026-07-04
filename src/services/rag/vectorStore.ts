import { errorTracker } from "@/lib/security/errorTracking";

export interface VectorMatch {
  id: string;
  score: number;
  metadata: {
    text: string;
    source: string;
    [key: string]: unknown;
  };
}

export interface VectorQueryResult {
  matches: VectorMatch[];
}

interface KnowledgeEntry {
  id: string;
  text: string;
  source: string;
  tokens: string[];
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "far-15-3",
    source: "FAR 15.3",
    text: "FAR Part 15.3 defines source selection procedures and requires evaluation factors to be stated in the solicitation.",
    tokens: ["far", "15", "source", "selection", "evaluation", "solicitation"],
  },
  {
    id: "far-6-3",
    source: "FAR 6.3",
    text: "FAR Part 6.3 addresses other than full and open competition and requires justification and approval documentation.",
    tokens: ["far", "6", "competition", "justification", "approval", "sole", "source"],
  },
  {
    id: "far-19",
    source: "FAR 19",
    text: "FAR Part 19 covers small business programs including set-asides and subcontracting plans.",
    tokens: ["far", "19", "small", "business", "set-aside", "subcontracting"],
  },
  {
    id: "dfars-215-371",
    source: "DFARS 215.371",
    text: "DFARS 215.371 provides policy for only one offer and includes requirements for resolicitation and documentation.",
    tokens: ["dfars", "215", "one", "offer", "resolicitation", "documentation"],
  },
];

const tokenize = (query: string): string[] =>
  query
    .toLowerCase()
    .replace(/[^a-z0-9\s.-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const scoreEntry = (entry: KnowledgeEntry, tokens: string[]): number => {
  if (!tokens.length) return 0;
  const tokenSet = new Set(entry.tokens);
  let matches = 0;
  tokens.forEach((token) => {
    if (tokenSet.has(token)) {
      matches += 1;
    } else if (entry.text.toLowerCase().includes(token)) {
      matches += 0.5;
    }
  });
  return matches / tokens.length;
};

export const initVectorStore = async (): Promise<boolean> => true;

export const queryVectorStore = async (
  query: string,
  topK = 5
): Promise<VectorQueryResult> => {
  try {
    const tokens = tokenize(query);
    const matches = KNOWLEDGE_BASE.map((entry) => ({
      id: entry.id,
      score: scoreEntry(entry, tokens),
      metadata: {
        text: entry.text,
        source: entry.source,
      },
    }))
      .filter((candidate) => candidate.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return { matches };
  } catch (error) {
    errorTracker.trackError({
      message: error instanceof Error ? error.message : "Vector store query failed",
      stack: error instanceof Error ? error.stack : undefined,
      severity: "HIGH",
      errorType: "SYSTEM",
      status: "NEW",
    });
    return { matches: [] };
  }
};
