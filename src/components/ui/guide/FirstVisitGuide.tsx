
interface FirstVisitGuideProps {
  visible: boolean;
}

export const FirstVisitGuide = ({ visible }: FirstVisitGuideProps) => {
  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-white/10 text-white text-sm animate-fade-in"
      role="status"
      aria-live="polite"
    >
      Press '?' for keyboard shortcuts
    </div>
  );
};
