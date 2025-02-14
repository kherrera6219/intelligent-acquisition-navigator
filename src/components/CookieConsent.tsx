
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    toast({
      title: "Preferences Saved",
      description: "Your cookie preferences have been saved.",
    });
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
    toast({
      title: "Preferences Saved",
      description: "You've chosen to reject optional cookies.",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/20 backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto bg-gray-900/90 border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Cookie Preferences</h2>
          <p className="text-gray-300 mb-4">
            We use cookies and similar technologies to help personalize content, enhance your experience, 
            and analyze how our sites are used. For more information, please read our privacy policy.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleReject}
              className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
            >
              Reject Optional Cookies
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white"
            >
              Accept All Cookies
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
