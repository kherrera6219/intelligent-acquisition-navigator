
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PrivacyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export const PrivacyDialog = ({ open, onOpenChange, onAccept }: PrivacyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Privacy Policy Update</DialogTitle>
          <DialogDescription>
            We've updated our privacy policy to better protect your data and improve your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-2">
            Our privacy policy outlines how we collect, use, and protect your personal information. 
            Your privacy is important to us, and we're committed to being transparent about our practices.
          </p>
          <Link to="/privacy" className="text-primary hover:underline text-sm">
            Read the full privacy policy
          </Link>
        </div>
        <DialogFooter className="flex sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Not Now
          </Button>
          <Button onClick={onAccept}>
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
