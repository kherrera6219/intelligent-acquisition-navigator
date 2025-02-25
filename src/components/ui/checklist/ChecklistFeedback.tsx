
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChecklistFeedbackProps {
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export const ChecklistFeedback = ({ onClose, onSubmit }: ChecklistFeedbackProps) => {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold">Your Feedback</h2>
        <p className="text-sm text-gray-400">Please share your thoughts on the improvements made:</p>
        <textarea 
          className="w-full h-32 p-3 rounded-md bg-white/5 border border-white/10 text-white"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
        />
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(feedback)}>Submit</Button>
        </div>
      </Card>
    </div>
  );
};
