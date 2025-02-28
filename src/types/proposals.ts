
export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DRAFT';
  submittedAt: string;
  updatedAt: string;
  submissionDate: string; // Added for compatibility
  budget: number; // Added for compatibility
  timeframe: number; // Added for compatibility
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  evaluations: Array<Evaluation>;
}

export interface Evaluation {
  id: string;
  userId?: string;
  userName?: string;
  comment: string;
  rating: number;
  createdAt: string;
  date?: string; // Added for compatibility
}
