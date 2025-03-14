
export interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface ImprovementContextType {
  checklist: ChecklistItem[];
  toggleItem: (id: number) => void;
  completedCount: number;
  currentItem: number;
  showFeedback: boolean;
  setShowFeedback: (show: boolean) => void;
  handleFeedbackSubmit: (feedback: string, rating: number) => void;
  isLoading: boolean;
  error: Error | null;
}
