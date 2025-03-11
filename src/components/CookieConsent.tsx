
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

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent className="sm:max-w-md bg-gray-900/90 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Cookie Preferences</DialogTitle>
          <DialogDescription className="text-gray-300">
            We use cookies and similar technologies to help personalize content, enhance your experience, 
            and analyze how our sites are used.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-gray-300 text-sm">
          <p className="mb-2">
            Essential cookies are always enabled as they're necessary for the website to function properly.
            Optional cookies help us improve our services and provide personalized features.
          </p>
          <p>
            For more information, please read our{" "}
            <a href="/privacy" className="text-primary hover:underline">privacy policy</a>.
          </p>
        </div>
        <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieConsent;
