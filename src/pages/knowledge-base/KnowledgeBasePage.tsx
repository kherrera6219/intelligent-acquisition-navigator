
import React, { useState } from "react";
import { ProtectedPageLayout } from "@/components/layout/ProtectedPageLayout";
import { KnowledgeBaseHeader } from "@/components/knowledge-base/KnowledgeBaseHeader";
import { KnowledgeBaseTabs } from "@/components/knowledge-base/KnowledgeBaseTabs";
import { KnowledgeBaseFilters } from "@/components/knowledge-base/KnowledgeBaseFilters";
import { KnowledgeSearch } from "@/components/knowledge-base/KnowledgeSearch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UniversalInternalHeader } from "@/components/layout/UniversalInternalHeader";
import { InternalFooter } from "@/components/layout/InternalFooter";
import { NetworkStatusBanner } from "@/components/ui/universal/NetworkStatusBanner";

const KnowledgeBasePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

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
              <KnowledgeSearch onSearch={handleSearch} />
            </div>
            <div className="p-4 border-b bg-muted/20">
              <KnowledgeBaseFilters
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <CardContent className="p-0">
              <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
                <div className="border-b px-4">
                  <TabsList className="bg-transparent h-12">
                    <TabsTrigger value="all">All Documents</TabsTrigger>
                    <TabsTrigger value="regulations">Regulations</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                    <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
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
