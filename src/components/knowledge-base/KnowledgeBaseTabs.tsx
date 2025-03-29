
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeBaseItemType, KnowledgeBaseFilter, SoftwareBuildItem } from "@/types/knowledge-base";
import { SoftwareBuildList } from "./SoftwareBuildList";

interface KnowledgeBaseTabsProps {
  activeTab: KnowledgeBaseFilter;
  searchQuery: string;
  selectedFilters: {
    types: KnowledgeBaseItemType[];
    tags: string[];
  };
}

// Mock data for software builds
const mockSoftwareBuilds: SoftwareBuildItem[] = [
  {
    id: "1",
    title: "Acquisition Portal v2.1",
    description: "Latest version of the Federal Acquisition Portal with updated compliance modules and enhanced search functionality.",
    type: "software",
    createdAt: "2023-09-15T08:00:00Z",
    updatedAt: "2023-10-20T14:30:00Z",
    tags: ["Federal", "Acquisition", "Portal"],
    owner: "Development Team",
    version: "2.1.0",
    buildDate: "2023-10-20T14:00:00Z",
    buildNumber: "1256",
    repository: "github.com/federal-acquisition/portal",
    dependencies: ["React 18", "Node.js 18", "TypeScript 5", "Tailwind CSS"],
    status: "production",
    platform: ["Web", "Windows", "MacOS"],
    requirements: [
      "Modern web browser (Chrome, Firefox, Edge)",
      "Internet connection",
      "Federal authentication credentials"
    ]
  },
  {
    id: "2",
    title: "Compliance Checker Tool",
    description: "Automated tool for validating acquisition documents against federal regulations and standards.",
    type: "software",
    createdAt: "2023-08-01T10:15:00Z",
    updatedAt: "2023-10-15T09:20:00Z",
    tags: ["Compliance", "Validation", "FAR"],
    owner: "Compliance Team",
    version: "1.3.5",
    buildDate: "2023-10-15T09:00:00Z",
    buildNumber: "842",
    repository: "github.com/federal-acquisition/compliance-checker",
    dependencies: ["Python 3.10", "Django 4.1", "Natural Language Processing Kit"],
    status: "staging",
    platform: ["Web", "API"],
    requirements: [
      "Access to document repository",
      "Admin privileges for validation rules",
      "Internet connection"
    ]
  },
  {
    id: "3",
    title: "Market Research Assistant",
    description: "AI-powered tool to help acquisition professionals conduct comprehensive market research and vendor analysis.",
    type: "software",
    createdAt: "2023-05-10T11:30:00Z",
    updatedAt: "2023-10-01T13:45:00Z",
    tags: ["Market Research", "AI", "Vendor Analysis"],
    owner: "Research Team",
    version: "0.9.2",
    buildDate: "2023-10-01T13:30:00Z",
    buildNumber: "573",
    repository: "github.com/federal-acquisition/market-research",
    dependencies: ["React", "OpenAI API", "D3.js", "MongoDB"],
    status: "development",
    platform: ["Web"],
    requirements: [
      "API key for data sources",
      "Modern web browser",
      "Internet connection"
    ]
  }
];

export const KnowledgeBaseTabs: React.FC<KnowledgeBaseTabsProps> = ({
  activeTab,
  searchQuery,
  selectedFilters
}) => {
  // Filter software builds based on search query and selected filters
  const filteredSoftwareBuilds = mockSoftwareBuilds.filter(build => {
    // Filter by search query
    if (searchQuery && 
        !build.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !build.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected types
    if (selectedFilters.types.length > 0 && 
        !selectedFilters.types.includes(build.type)) {
      return false;
    }
    
    // Filter by selected tags
    if (selectedFilters.tags.length > 0 && 
        !build.tags.some(tag => selectedFilters.tags.includes(tag))) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="p-6">
      {/* This would contain your actual knowledge base items filtered by tab, search, and filters */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {activeTab === "all" ? "All documents" : `Filtered by: ${activeTab}`}
          {searchQuery && `, Search: "${searchQuery}"`}
          {selectedFilters.types.length > 0 && `, Types: ${selectedFilters.types.join(", ")}`}
          {selectedFilters.tags.length > 0 && `, Tags: ${selectedFilters.tags.join(", ")}`}
        </p>
        
        {activeTab === "software" ? (
          <SoftwareBuildList builds={filteredSoftwareBuilds} />
        ) : (
          <div className="rounded-md border p-4">
            {/* This is a placeholder for other content types */}
            <p className="text-center text-muted-foreground py-12">
              {searchQuery 
                ? `Showing results for "${searchQuery}"` 
                : activeTab === "all" 
                  ? "All documents in knowledge base" 
                  : `Showing ${activeTab} items`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
