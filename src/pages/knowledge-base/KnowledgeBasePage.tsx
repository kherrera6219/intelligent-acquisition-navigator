
import React, { useState } from "react";
import { ProtectedPageLayout } from "@/components/layout/ProtectedPageLayout";
import { KnowledgeBaseHeader } from "@/components/knowledge-base/KnowledgeBaseHeader";
import { KnowledgeBaseTabs } from "@/components/knowledge-base/KnowledgeBaseTabs";
import { KnowledgeBaseFilters } from "@/components/knowledge-base/KnowledgeBaseFilters";
import { KnowledgeSearch } from "@/components/knowledge-base/KnowledgeSearch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UniversalInternalHeader from "@/components/layout/UniversalInternalHeader";
import { InternalFooter } from "@/components/layout/InternalFooter";
import { NetworkStatusBanner } from "@/components/ui/universal/NetworkStatusBanner";
import { KnowledgeBaseItemType } from "@/types/knowledge-base";

const KnowledgeBasePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<KnowledgeBaseItemType | "all">("all");
  const [selectedFilters, setSelectedFilters] = useState<{ types: KnowledgeBaseItemType[], tags: string[] }>({
    types: [],
    tags: []
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as KnowledgeBaseItemType | "all");
  };

  const handleFilterChange = (filters: { types: KnowledgeBaseItemType[], tags: string[] }) => {
    setSelectedFilters(filters);
  };

  // Create an array of available tags for the filter component
  const availableTags = ["Federal", "Texas", "FAR", "Procurement", "Template", "Solicitation", "Contract"];

  return (
    <>
      <UniversalInternalHeader />
      <NetworkStatusBanner />
      <ProtectedPageLayout
        title="Knowledge Base"
        description="Access and search through acquisition regulations, guidance, and templates."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Knowledge Base", href: "/knowledge-base" },
        ]}
      >
        <div className="space-y-6">
          <KnowledgeBaseHeader 
            title="Federal Acquisition Knowledge Base" 
            description="Search, browse, and reference federal acquisition regulations, guidance documents, and templates."
          />

          <Card className="overflow-hidden">
            <div className="p-4 border-b">
              <KnowledgeSearch 
                query={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="p-4 border-b bg-muted/20">
              <KnowledgeBaseFilters
                onFilterChange={handleFilterChange}
                availableTags={availableTags}
              />
            </div>
            <CardContent className="p-0">
              <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
                <div className="border-b px-4">
                  <TabsList className="bg-transparent h-12">
                    <TabsTrigger value="all">All Documents</TabsTrigger>
                    <TabsTrigger value="regulation">Regulations</TabsTrigger>
                    <TabsTrigger value="template">Templates</TabsTrigger>
                    <TabsTrigger value="process">Guidelines</TabsTrigger>
                    <TabsTrigger value="document">Recently Viewed</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value={activeTab} className="m-0">
                  <KnowledgeBaseTabs
                    activeTab={activeTab}
                    searchQuery={searchQuery}
                    selectedFilters={selectedFilters}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </ProtectedPageLayout>
      <InternalFooter />
    </>
  );
};

export default KnowledgeBasePage;
