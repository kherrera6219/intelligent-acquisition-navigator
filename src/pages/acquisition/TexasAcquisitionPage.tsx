
import { useTexasConversation } from "@/hooks/useTexasConversation";
import { useTexasChatSubmit } from "@/hooks/useTexasChatSubmit";
import { TexasChatContainer } from "@/components/texas/TexasChatContainer";
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import UniversalInternalHeader from "@/components/layout/UniversalInternalHeader";
import { InternalFooter } from "@/components/layout/InternalFooter";
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, MessageSquare, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RESPONSE_LEVEL_LABELS } from "@/types/texas-chat";

const TexasAcquisitionPage = () => {
  const { messages, conversationId, addMessage, isLoading: isInitializing } = useTexasConversation();
  
  const {
    input,
    setInput,
    selectedAgency,
    setSelectedAgency,
    selectedRole,
    setSelectedRole,
    selectedResponseLevel,
    setSelectedResponseLevel,
    handleSubmit,
    isProcessing
  } = useTexasChatSubmit({
    messages,
    conversationId,
    addMessage
  });

  return (
    <>
      <UniversalInternalHeader />
      <NetworkStatusBanner />
      <ProtectedPageLayout
        title="Texas Acquisition Management"
        description="Manage and monitor Texas state acquisition compliance and procedures."
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Texas Acquisition', href: '/texas-acquisition' }
        ]}
        isLoading={isInitializing}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-primary" />
                Texas Acquisition Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Badge variant="outline" className="mr-2">Guide</Badge>
                  <span>Texas Procurement Manual</span>
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="mr-2">Form</Badge>
                  <span>HUB Subcontracting Plan</span>
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="mr-2">Checklist</Badge>
                  <span>SPD Contract Review</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Conversation Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="font-medium">Agency Type:</dt>
                  <dd>{selectedAgency.replace('_', ' ')}</dd>
                </div>
                <div>
                  <dt className="font-medium">Your Role:</dt>
                  <dd>{selectedRole.replace('_', ' ')}</dd>
                </div>
                <div>
                  <dt className="font-medium">Response Level:</dt>
                  <dd>{RESPONSE_LEVEL_LABELS[selectedResponseLevel]}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm list-disc pl-4">
                <li>Use specific questions about Texas regulations</li>
                <li>Ask about HUB requirements for your project</li>
                <li>Inquire about procurement thresholds</li>
                <li>Request templates for solicitation documents</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <TexasChatContainer
          conversationId={conversationId || ""}
          messages={messages}
          isLoading={isInitializing || isProcessing}
          input={input}
          selectedAgency={selectedAgency}
          selectedRole={selectedRole}
          selectedResponseLevel={selectedResponseLevel}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onAgencyChange={setSelectedAgency}
          onRoleChange={setSelectedRole}
          onResponseLevelChange={setSelectedResponseLevel}
        />
      </ProtectedPageLayout>
      <InternalFooter />
    </>
  );
};

export default TexasAcquisitionPage;
