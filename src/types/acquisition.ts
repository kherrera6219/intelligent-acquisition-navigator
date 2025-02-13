
export interface FARCitation {
  id: string;
  part: string;
  subpart: string;
  section: string;
  text: string;
  title: string;
  applicability: string[];
  lastUpdated: Date;
  sourceDocument?: string;
}

export interface SolicitationDocument {
  id: string;
  title: string;
  type: 'RFI' | 'RFP' | 'RFQ' | 'SOW' | 'PWS';
  status: 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED';
  version: number;
  createdAt: Date;
  updatedAt: Date;
  reviewers: string[];
  currentReviewer?: string;
  dueDate?: Date;
  citations: FARCitation[];
  attachments: DocumentAttachment[];
  history: VersionHistory[];
}

export interface DocumentAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  url: string;
}

export interface VersionHistory {
  version: number;
  changedBy: string;
  changedAt: Date;
  changes: string[];
  previousVersion?: string;
}

export interface MarketResearch {
  id: string;
  title: string;
  conductedBy: string;
  conductedAt: Date;
  methodology: string[];
  findings: ResearchFinding[];
  recommendations: string[];
  attachments: DocumentAttachment[];
  status: 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED';
  expirationDate: Date;
}

export interface ResearchFinding {
  id: string;
  category: string;
  description: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  sources: string[];
  date: Date;
}
