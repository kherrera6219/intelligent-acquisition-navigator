
import React from "react";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { LoadingState } from "@/components/ui/universal/LoadingState";
import { Document } from "@/types/documents";

interface DocumentListProps {
  documents: Document[];
  isLoading: boolean;
}

const getStatusColor = (status: Document["status"]) => {
  switch (status) {
    case "draft":
      return "bg-yellow-400/20 text-yellow-400";
    case "review":
      return "bg-blue-400/20 text-blue-400";
    case "approved":
      return "bg-green-400/20 text-green-400";
  }
};

const getStatusIcon = (status: Document["status"]) => {
  switch (status) {
    case "draft":
      return Clock;
    case "review":
      return AlertTriangle;
    case "approved":
      return CheckCircle;
  }
};

export const DocumentList = ({ documents, isLoading }: DocumentListProps) => {
  if (isLoading) {
    return <LoadingState message="Loading documents..." />;
  }

  if (!documents.length) {
    return (
      <Card className="p-8 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-white mb-2">No documents found</h3>
        <p className="text-gray-400">Try adjusting your search or filters</p>
      </Card>
    );
  }

  return (
    <Grid columns={1} gap="lg">
      {documents.map((doc) => {
        const StatusIcon = getStatusIcon(doc.status);
        return (
          <Card
            key={doc.id}
            className="hover:bg-white/5 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
              <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-violet-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">{doc.title}</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-1">
                    <span className="text-sm text-gray-400">{doc.type}</span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="text-sm text-gray-400">
                      Modified: {doc.lastModified}
                    </span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="text-sm text-gray-400">
                      Owner: {doc.owner}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div
                  className={`px-3 py-1 rounded-full flex items-center gap-2 justify-center sm:justify-start ${getStatusColor(
                    doc.status
                  )}`}
                >
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm capitalize">{doc.status}</span>
                </div>
                <div className="flex gap-3 sm:ml-4">
                  <Button variant="outline" className="border-white/10 flex-1 sm:flex-none">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" className="border-white/10 flex-1 sm:flex-none">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </Grid>
  );
};
