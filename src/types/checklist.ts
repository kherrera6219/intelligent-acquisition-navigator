
export interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface FeedbackSubmission {
  feedback: string;
  rating: number;
  timestamp: string;
  completedCount: number;
}

export interface ImprovementContextType {
  checklist: ChecklistItem[];
  toggleItem: (id: number) => void;
  completedCount: number;
  currentItem: number;
  showFeedback: boolean;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  handleFeedbackSubmit: (feedback: string, rating: number) => void;
  isLoading: boolean;
  error: Error | null;
}
