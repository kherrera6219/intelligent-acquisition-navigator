
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeBaseItemType } from "@/types/knowledge-base";

interface KnowledgeBaseTabsProps {
  activeTab: KnowledgeBaseItemType;
  onTabChange: (tab: KnowledgeBaseItemType) => void;
  children: React.ReactNode;
}

export const KnowledgeBaseTabs = ({
  activeTab,
  onTabChange,
  children
}: KnowledgeBaseTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={(value) => onTabChange(value as KnowledgeBaseItemType)}>
      <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-3 sm:grid-cols-6">
        <TabsTrigger value="document">Documents</TabsTrigger>
        <TabsTrigger value="regulation">Regulations</TabsTrigger>
        <TabsTrigger value="template">Templates</TabsTrigger>
        <TabsTrigger value="software">Software</TabsTrigger>
        <TabsTrigger value="process">Processes</TabsTrigger>
        <TabsTrigger value="research">Research</TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab}>
        {children}
      </TabsContent>
    </Tabs>
  );
};
