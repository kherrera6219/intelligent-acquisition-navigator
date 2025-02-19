
export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  updatedAt: string;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  evaluations: Array<{
    id: string;
    comment: string;
    rating: number;
    createdAt: string;
  }>;
}
