
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { X, Cookie } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Delay to prevent overwhelming the user on initial load
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

  // If using banner style
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-900 border border-gray-800 shadow-xl rounded-lg overflow-hidden p-0">
          <div className="flex flex-col md:flex-row">
            <div className="p-5 md:p-6 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Cookie className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Cookie Settings</h3>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies as described in our Cookie Policy.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleAccept}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Accept All
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReject}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Reject Optional
                </Button>
                <a 
                  href="/privacy" 
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm inline-flex items-center mt-1"
                >
                  Learn more about our cookies
                </a>
              </div>
            </div>
            
            {/* Close button (visible only on larger screens) */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white p-1 rounded-full"
              aria-label="Close cookie banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CookieConsent;
