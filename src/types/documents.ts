
export interface Document {
  id: string;
  title: string;
  type: string;
  status: "draft" | "review" | "approved";
  lastModified: string;
  owner: string;
}

export const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Federal Acquisition Regulation Update 2024",
    type: "Policy",
    status: "approved",
    lastModified: "2024-02-15",
    owner: "John Smith"
  },
  {
    id: "2",
    title: "IT Equipment Procurement Guidelines",
    type: "Procedure",
    status: "review",
    lastModified: "2024-02-14",
    owner: "Sarah Johnson"
  },
  {
    id: "3",
    title: "Vendor Evaluation Template",
    type: "Template",
    status: "draft",
    lastModified: "2024-02-13",
    owner: "Michael Brown"
  }
];
