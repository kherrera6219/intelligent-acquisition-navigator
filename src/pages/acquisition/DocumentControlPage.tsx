
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/universal/Container";
import { useToast } from "@/components/ui/use-toast";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { FeedbackDialog } from "@/components/ui/universal/FeedbackDialog";
import { DocumentList } from "@/components/documents/DocumentList";
import { DocumentSearchBar } from "@/components/documents/DocumentSearchBar";
import { ImprovementChecklist } from "@/components/ui/checklist/ImprovementChecklist";
import { mockDocuments } from "@/types/documents";

const DocumentControl = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { toast } = useToast();

  const handleUpload = () => {
    setShowUploadDialog(false);
    toast({
      title: "Upload Started",
      description: "Your document is being processed...",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageErrorBoundary>
      <Container>
        <PageHeader
          title="Document Control"
          description="Manage and track procurement documentation"
        />

        <DocumentSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onUploadClick={() => setShowUploadDialog(true)}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DocumentList 
              documents={mockDocuments} 
              isLoading={isLoading} 
            />
          </div>
          <div>
            <ImprovementChecklist />
          </div>
        </div>

        <FeedbackDialog
          open={showUploadDialog}
          onOpenChange={setShowUploadDialog}
          title="Upload Document"
          description="Are you sure you want to upload this document? This action cannot be undone."
          type="info"
          confirmLabel="Upload"
          onConfirm={handleUpload}
        />
      </Container>
    </PageErrorBoundary>
  );
};

export default DocumentControl;
