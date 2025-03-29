
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { 
  MsFluentCard, 
  MsFluentCardHeader, 
  MsFluentCardTitle,
  MsFluentCardDescription,
  MsFluentCardContent
} from '@/components/ui/ms-fluent/MsFluentCard';
import { MsFluentButton } from '@/components/ui/ms-fluent/MsFluentButton';
import { MsFluentAlert } from '@/components/ui/ms-fluent/MsFluentAlert';
import {
  MsNavigation,
  MsNavigationItem,
  MsNavigationGroup,
  MsNavigationSeparator
} from '@/components/ui/ms-fluent/MsNavigation';
import { MsFluentTable, MsFluentTableHeader, MsFluentTableRow, MsFluentTableHead, MsFluentTableBody, MsFluentTableCell } from '@/components/ui/ms-fluent/MsFluentTable';
import { 
  MsFileInput, 
  MsFileInputUploader, 
  MsFileInputPreview 
} from '@/components/ui/ms-fluent/MsFileInput';
import { MsProgressIndicator } from '@/components/ui/ms-fluent/MsProgressIndicator';
import { SectionTitle } from '@/components/ui/universal/SectionTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Check, Info, AlertTriangle, X, Home, Settings, User, Search, Mail, FileText, Database, Shield } from 'lucide-react';

// Mock status cell component since it doesn't exist yet
const MsStatusCell = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'pending':
        return 'bg-amber-500/10 text-amber-500';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-500';
      case 'error':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
};

const ComponentsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (files: File[]) => {
    setUploadedFiles(files);
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <ProtectedPageLayout
      title="Microsoft Fluent UI Components"
      description="Showcase of Microsoft Fluent UI design system components"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/components' }
      ]}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="w-full flex justify-start overflow-x-auto">
          <TabsTrigger value="basic">Basic Components</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="files">File Management</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <SectionTitle title="Button Components" description="Microsoft Fluent UI Button styles and variants" />
          
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Button Variants</MsFluentCardTitle>
              <MsFluentCardDescription>Different button styles for various use cases</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent className="flex flex-wrap gap-4">
              <MsFluentButton>Default Button</MsFluentButton>
              <MsFluentButton variant="primary">Primary</MsFluentButton>
              <MsFluentButton variant="outline">Outline</MsFluentButton>
              <MsFluentButton variant="subtle">Subtle</MsFluentButton>
              <MsFluentButton variant="destructive">Destructive</MsFluentButton>
              <MsFluentButton variant="ghost">Ghost</MsFluentButton>
              <MsFluentButton variant="link">Link Button</MsFluentButton>
            </MsFluentCardContent>
          </MsFluentCard>

          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Button Sizes</MsFluentCardTitle>
              <MsFluentCardDescription>Different button sizes for various UI contexts</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent className="flex flex-wrap items-center gap-4">
              <MsFluentButton size="xs">Extra Small</MsFluentButton>
              <MsFluentButton size="sm">Small</MsFluentButton>
              <MsFluentButton size="md">Medium</MsFluentButton>
              <MsFluentButton size="lg">Large</MsFluentButton>
              <MsFluentButton size="xl">Extra Large</MsFluentButton>
            </MsFluentCardContent>
          </MsFluentCard>

          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Button With Icons</MsFluentCardTitle>
              <MsFluentCardDescription>Buttons with leading or trailing icons</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent className="flex flex-wrap gap-4">
              <MsFluentButton leadingIcon={<Check />}>With Leading Icon</MsFluentButton>
              <MsFluentButton trailingIcon={<Check />}>With Trailing Icon</MsFluentButton>
              <MsFluentButton variant="primary" leadingIcon={<Bell />}>Notifications</MsFluentButton>
              <MsFluentButton variant="outline" leadingIcon={<Settings />}>Settings</MsFluentButton>
              <MsFluentButton variant="destructive" leadingIcon={<X />}>Delete</MsFluentButton>
              <MsFluentButton iconOnly={<Search />} aria-label="Search" />
              <MsFluentButton variant="outline" iconOnly={<User />} aria-label="User profile" />
            </MsFluentCardContent>
          </MsFluentCard>

          <SectionTitle title="Alert Components" description="Microsoft Fluent UI Alert styles" />
          
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Alert Variants</MsFluentCardTitle>
              <MsFluentCardDescription>Different alert styles for various status messages</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent className="space-y-4">
              <MsFluentAlert icon={<Info />} title="Informational Alert">
                This is an informational alert with additional details.
              </MsFluentAlert>
              
              <MsFluentAlert variant="success" icon={<Check />} title="Success Alert">
                Operation completed successfully.
              </MsFluentAlert>
              
              <MsFluentAlert variant="warning" icon={<AlertTriangle />} title="Warning Alert">
                Please review the information before proceeding.
              </MsFluentAlert>
              
              <MsFluentAlert variant="error" icon={<X />} title="Error Alert">
                An error occurred while processing your request.
              </MsFluentAlert>
            </MsFluentCardContent>
          </MsFluentCard>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <SectionTitle title="Navigation Components" description="Microsoft Fluent UI Navigation styles" />
          
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Navigation Items</MsFluentCardTitle>
              <MsFluentCardDescription>Main navigation patterns</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-2">Horizontal Navigation</h4>
                <MsNavigation>
                  <MsNavigationItem icon={<Home />}>Home</MsNavigationItem>
                  <MsNavigationItem icon={<Database />}>Products</MsNavigationItem>
                  <MsNavigationItem icon={<FileText />}>Documents</MsNavigationItem>
                  <MsNavigationItem icon={<Settings />}>Settings</MsNavigationItem>
                </MsNavigation>
              </div>
              
              <div className="w-64">
                <h4 className="text-sm font-semibold mb-2">Vertical Navigation</h4>
                <MsNavigation vertical>
                  <MsNavigationItem icon={<Home />} active>Dashboard</MsNavigationItem>
                  
                  <MsNavigationGroup label="Content" icon={<FileText />}>
                    <MsNavigationItem>Pages</MsNavigationItem>
                    <MsNavigationItem>Posts</MsNavigationItem>
                    <MsNavigationItem>Media</MsNavigationItem>
                  </MsNavigationGroup>
                  
                  <MsNavigationSeparator />
                  
                  <MsNavigationItem icon={<Settings />}>Settings</MsNavigationItem>
                  <MsNavigationItem icon={<Shield />}>Security</MsNavigationItem>
                  <MsNavigationItem icon={<User />}>Profile</MsNavigationItem>
                  
                  <MsNavigationSeparator />
                  
                  <MsNavigationItem destructive>Logout</MsNavigationItem>
                </MsNavigation>
              </div>
            </MsFluentCardContent>
          </MsFluentCard>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <SectionTitle title="Data Display Components" description="Microsoft Fluent UI Data Display styles" />
          
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Table Component</MsFluentCardTitle>
              <MsFluentCardDescription>Tabular data presentation</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent>
              <MsFluentTable variant="striped">
                <MsFluentTableHeader>
                  <MsFluentTableRow>
                    <MsFluentTableHead>ID</MsFluentTableHead>
                    <MsFluentTableHead>Name</MsFluentTableHead>
                    <MsFluentTableHead>Department</MsFluentTableHead>
                    <MsFluentTableHead>Status</MsFluentTableHead>
                    <MsFluentTableHead>Actions</MsFluentTableHead>
                  </MsFluentTableRow>
                </MsFluentTableHeader>
                <MsFluentTableBody>
                  <MsFluentTableRow>
                    <MsFluentTableCell>001</MsFluentTableCell>
                    <MsFluentTableCell>John Smith</MsFluentTableCell>
                    <MsFluentTableCell>Engineering</MsFluentTableCell>
                    <MsFluentTableCell>
                      <MsStatusCell status="Active" />
                    </MsFluentTableCell>
                    <MsFluentTableCell>
                      <div className="flex gap-2">
                        <MsFluentButton variant="outline" size="sm">Edit</MsFluentButton>
                        <MsFluentButton variant="destructive" size="sm">Delete</MsFluentButton>
                      </div>
                    </MsFluentTableCell>
                  </MsFluentTableRow>
                  <MsFluentTableRow>
                    <MsFluentTableCell>002</MsFluentTableCell>
                    <MsFluentTableCell>Jane Doe</MsFluentTableCell>
                    <MsFluentTableCell>Marketing</MsFluentTableCell>
                    <MsFluentTableCell>
                      <MsStatusCell status="Pending" />
                    </MsFluentTableCell>
                    <MsFluentTableCell>
                      <div className="flex gap-2">
                        <MsFluentButton variant="outline" size="sm">Edit</MsFluentButton>
                        <MsFluentButton variant="destructive" size="sm">Delete</MsFluentButton>
                      </div>
                    </MsFluentTableCell>
                  </MsFluentTableRow>
                  <MsFluentTableRow>
                    <MsFluentTableCell>003</MsFluentTableCell>
                    <MsFluentTableCell>Robert Johnson</MsFluentTableCell>
                    <MsFluentTableCell>Finance</MsFluentTableCell>
                    <MsFluentTableCell>
                      <MsStatusCell status="Inactive" />
                    </MsFluentTableCell>
                    <MsFluentTableCell>
                      <div className="flex gap-2">
                        <MsFluentButton variant="outline" size="sm">Edit</MsFluentButton>
                        <MsFluentButton variant="destructive" size="sm">Delete</MsFluentButton>
                      </div>
                    </MsFluentTableCell>
                  </MsFluentTableRow>
                </MsFluentTableBody>
              </MsFluentTable>
            </MsFluentCardContent>
          </MsFluentCard>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <SectionTitle title="Feedback Components" description="Microsoft Fluent UI Feedback components" />
          
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Alert Types</MsFluentCardTitle>
              <MsFluentCardDescription>Various alert types for different feedback scenarios</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent className="space-y-4">
              <MsFluentAlert icon={<Info />} title="Information">
                This action will be logged for auditing purposes.
              </MsFluentAlert>
              
              <MsFluentAlert variant="success" icon={<Check />} title="Success">
                The changes have been saved successfully.
              </MsFluentAlert>
              
              <MsFluentAlert variant="warning" icon={<AlertTriangle />} title="Warning">
                Your account subscription will expire in 3 days.
              </MsFluentAlert>
              
              <MsFluentAlert variant="error" icon={<X />} title="Error">
                Unable to connect to the server. Please try again later.
              </MsFluentAlert>
            </MsFluentCardContent>
          </MsFluentCard>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <SectionTitle title="File Management Components" description="Microsoft Fluent UI File Management components" />
          
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>File Upload</MsFluentCardTitle>
              <MsFluentCardDescription>Drag and drop file uploader with preview</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent>
              <MsFileInput 
                onChange={handleFileChange}
                value={uploadedFiles}
                maxFiles={5}
                maxSize={5000000}
                acceptedTypes={['image/*', 'application/pdf']}
              >
                <MsFileInputUploader />
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Uploaded Files</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <MsFileInputPreview 
                          key={index}
                          file={file}
                          onRemove={() => removeFile(index)}
                          progress={uploadProgress}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </MsFileInput>
            </MsFluentCardContent>
          </MsFluentCard>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <SectionTitle title="Progress Components" description="Microsoft Fluent UI Progress Indicators" />
          
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Progress Indicators</MsFluentCardTitle>
              <MsFluentCardDescription>Various progress indicator styles</MsFluentCardDescription>
            </MsFluentCardHeader>
            <MsFluentCardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-2">Linear Progress</h4>
                <div className="space-y-4">
                  <MsProgressIndicator value={30} label="Processing files" />
                  <MsProgressIndicator value={65} label="Uploading documents" />
                  <MsProgressIndicator value={100} label="Completed" />
                  <MsProgressIndicator value={undefined} label="Loading data..." />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Circular Progress</h4>
                <div className="flex flex-wrap gap-6">
                  <MsProgressIndicator type="circular" value={25} size="sm" />
                  <MsProgressIndicator type="circular" value={50} />
                  <MsProgressIndicator type="circular" value={75} size="lg" />
                  <MsProgressIndicator type="circular" value={undefined} />
                </div>
              </div>
            </MsFluentCardContent>
          </MsFluentCard>
        </TabsContent>
      </Tabs>
    </ProtectedPageLayout>
  );
};

export default ComponentsShowcase;
