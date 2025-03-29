
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Section } from '@/components/ui/universal/PageSections';
import { SectionTitle } from '@/components/ui/universal/SectionTitle';
import { 
  MsButton, 
  MsCard, 
  MsCardHeader, 
  MsCardTitle, 
  MsCardDescription, 
  MsCardContent, 
  MsCardFooter,
  MsAlert,
  MsForm,
  MsFormField,
  MsInput,
  MsTextarea,
  MsProgress,
  MsSpinner,
  MsStatusBadge,
  MsTable, 
  MsTableHeader, 
  MsTableRow, 
  MsTableHead, 
  MsTableBody, 
  MsTableCell,
  MsBadge,
  MsToast,
  MsNotification,
  MsNavigation,
  MsNavigationGroup,
  MsNavigationItem,
  MsStat,
  MsDataPoint,
  MsMetricGroup,
  MsTimeline,
  MsTimelineItem,
  MsFileInput
} from '@/components/ui/ms-fluent';
import { 
  Calendar, 
  Check, 
  CreditCard, 
  Download, 
  Mail, 
  Moon, 
  Settings,
  User,
  AlertTriangle,
  Bell,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  Search,
  Share,
  ShoppingCart,
  Sun,
} from 'lucide-react';

const ComponentsShowcase: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Microsoft Fluent UI Components"
      description="A showcase of the Microsoft Fluent UI components library"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'UI Components', href: '/components' }
      ]}
    >
      <div className="space-y-16">
        <Section>
          <SectionTitle 
            title="Button Components" 
            description="Buttons for actions in forms, dialogs, and more with support for multiple sizes, states, and variants."
          />
          
          <div className="space-y-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <MsButton variant="default">Default</MsButton>
                <MsButton variant="primary">Primary</MsButton>
                <MsButton variant="secondary">Secondary</MsButton>
                <MsButton variant="accent">Accent</MsButton>
                <MsButton variant="outline">Outline</MsButton>
                <MsButton variant="ghost">Ghost</MsButton>
                <MsButton variant="link">Link</MsButton>
                <MsButton variant="destructive">Destructive</MsButton>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <MsButton size="xs">Extra Small</MsButton>
                <MsButton size="sm">Small</MsButton>
                <MsButton size="md">Medium</MsButton>
                <MsButton size="lg">Large</MsButton>
                <MsButton size="xl">Extra Large</MsButton>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <MsButton>Normal</MsButton>
                <MsButton loading>Loading</MsButton>
                <MsButton disabled>Disabled</MsButton>
                <MsButton icon={<Check className="h-4 w-4" />}>With Icon</MsButton>
                <MsButton icon={<Calendar className="h-4 w-4" />} iconPosition="right">Icon Right</MsButton>
              </div>
            </div>
          </div>
        </Section>
        
        <Section>
          <SectionTitle 
            title="Card Components" 
            description="Cards are surfaces that display content and actions on a single topic."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <MsCard>
              <MsCardHeader>
                <MsCardTitle>Default Card</MsCardTitle>
                <MsCardDescription>This is a default card with standard styling.</MsCardDescription>
              </MsCardHeader>
              <MsCardContent>
                <p>Cards have flexible components with fixed padding options.</p>
              </MsCardContent>
              <MsCardFooter>
                <MsButton size="sm" variant="outline">Action</MsButton>
              </MsCardFooter>
            </MsCard>
            
            <MsCard variant="primary" hover="lift">
              <MsCardHeader>
                <MsCardTitle>Primary Card</MsCardTitle>
                <MsCardDescription>A card with primary styling that lifts on hover.</MsCardDescription>
              </MsCardHeader>
              <MsCardContent>
                <p>This card will lift slightly when hovered.</p>
              </MsCardContent>
              <MsCardFooter>
                <MsButton size="sm">Action</MsButton>
              </MsCardFooter>
            </MsCard>
            
            <MsCard variant="glass" hover="shine">
              <MsCardHeader>
                <MsCardTitle>Glass Card</MsCardTitle>
                <MsCardDescription>A card with glass morphism styling.</MsCardDescription>
              </MsCardHeader>
              <MsCardContent>
                <p>This card has a glass effect with backdrop blur.</p>
              </MsCardContent>
              <MsCardFooter>
                <MsButton size="sm" variant="ghost">Cancel</MsButton>
                <MsButton size="sm" className="ml-2">Submit</MsButton>
              </MsCardFooter>
            </MsCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <MsCard horizontal className="h-32">
              <div className="flex-shrink-0 h-full w-32 bg-muted rounded-l-lg flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-medium">Horizontal Card</h3>
                <p className="text-sm text-muted-foreground mt-1">Cards can also be displayed horizontally.</p>
              </div>
            </MsCard>
            
            <MsCard variant="outline" loading>
              <MsCardHeader>
                <MsCardTitle>Loading Card</MsCardTitle>
                <MsCardDescription>This card shows a loading state.</MsCardDescription>
              </MsCardHeader>
              <MsCardContent>
                <p>The content is visible but with an overlay and spinner.</p>
              </MsCardContent>
            </MsCard>
          </div>
        </Section>
        
        <Section>
          <SectionTitle 
            title="Alert and Notification Components" 
            description="Components for displaying alerts, statuses, notifications and feedback."
          />
          
          <div className="space-y-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Alert Variants</h3>
              <div className="space-y-4">
                <MsAlert variant="default" title="Default Alert">
                  This is a default alert with a title and description.
                </MsAlert>
                <MsAlert variant="info" title="Information">
                  This is an informational alert with a title and description.
                </MsAlert>
                <MsAlert variant="success" title="Success">
                  Your action was completed successfully.
                </MsAlert>
                <MsAlert variant="warning" title="Warning">
                  This action might have consequences.
                </MsAlert>
                <MsAlert variant="error" title="Error">
                  There was a problem with your submission.
                </MsAlert>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Status Badges</h3>
              <div className="flex flex-wrap gap-4">
                <MsStatusBadge status="online" />
                <MsStatusBadge status="offline" />
                <MsStatusBadge status="away" />
                <MsStatusBadge status="busy" />
                <MsStatusBadge status="pending" />
                <MsStatusBadge status="approved" />
                <MsStatusBadge status="rejected" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Badges</h3>
              <div className="flex flex-wrap gap-4">
                <MsBadge>Default</MsBadge>
                <MsBadge variant="primary">Primary</MsBadge>
                <MsBadge variant="secondary">Secondary</MsBadge>
                <MsBadge variant="outline">Outline</MsBadge>
                <MsBadge variant="success">Success</MsBadge>
                <MsBadge variant="warning">Warning</MsBadge>
                <MsBadge variant="error">Error</MsBadge>
                <MsBadge 
                  variant="primary" 
                  icon={<Bell className="h-3 w-3" />}
                  dismissible
                  onDismiss={() => console.log('Dismissed')}
                >
                  Notifications
                </MsBadge>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Toasts & Notifications</h3>
              <div className="space-y-4">
                <MsToast 
                  variant="default" 
                  position="topRight" 
                  title="Update Available"
                  onClose={() => console.log('Closed')}
                >
                  A new version of the application is available.
                </MsToast>
                
                <MsNotification
                  title="New Message"
                  description="You received a new message from your team member"
                  variant="info"
                  icon={<Mail className="h-5 w-5" />}
                  action={<MsButton size="sm" variant="outline">View Message</MsButton>}
                  onDismiss={() => console.log('Dismissed')}
                />
              </div>
            </div>
          </div>
        </Section>
        
        <Section>
          <SectionTitle 
            title="Form Components" 
            description="Form controls for user input with validation and state handling."
          />
          
          <div className="space-y-8 mt-8">
            <MsForm>
              <div className="grid gap-6 md:grid-cols-2">
                <MsFormField
                  label="Full Name"
                  htmlFor="full-name"
                  required
                >
                  <MsInput
                    id="full-name"
                    placeholder="John Doe"
                    icon={<User className="h-4 w-4" />}
                  />
                </MsFormField>
                
                <MsFormField
                  label="Email Address"
                  htmlFor="email"
                  required
                  description="We'll never share your email."
                >
                  <MsInput
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    icon={<Mail className="h-4 w-4" />}
                  />
                </MsFormField>
                
                <MsFormField
                  label="Password"
                  htmlFor="password"
                  required
                  error="Password must be at least 8 characters"
                >
                  <MsInput
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </MsFormField>
                
                <MsFormField
                  label="Card Details"
                  htmlFor="card"
                >
                  <MsInput
                    id="card"
                    placeholder="4242 4242 4242 4242"
                    icon={<CreditCard className="h-4 w-4" />}
                  />
                </MsFormField>
                
                <MsFormField
                  label="Message"
                  htmlFor="message"
                  className="md:col-span-2"
                >
                  <MsTextarea
                    id="message"
                    placeholder="Type your message here..."
                  />
                </MsFormField>
                
                <div className="md:col-span-2">
                  <MsButton type="submit">Submit Form</MsButton>
                </div>
              </div>
            </MsForm>
          </div>
          
          <div className="mt-10">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">File Input</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <MsFileInput 
                label="Single File Upload"
                acceptedTypes="image/*,.pdf"
                maxSize={5}
                description="Max file size: 5MB. Accepted formats: images, PDF."
              />
              
              <MsFileInput 
                label="Multiple File Upload"
                multiple
                acceptedTypes="image/*,.pdf,.docx"
                preview
                previewType="grid"
                description="Max file size: 5MB per file. Accepted formats: images, PDF, DOCX."
              />
            </div>
          </div>
        </Section>
        
        <Section>
          <SectionTitle 
            title="Progress & Loading Components" 
            description="Components to show progress and loading states."
          />
          
          <div className="space-y-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Progress Bars</h3>
              <div className="space-y-4">
                <MsProgress value={25} max={100} showValue />
                <MsProgress value={50} max={100} variant="success" showValue />
                <MsProgress value={75} max={100} variant="warning" showValue valueFormat="fraction" />
                <MsProgress value={100} max={100} variant="success" showValue />
                <MsProgress indeterminate variant="primary" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Spinners</h3>
              <div className="flex flex-wrap gap-8">
                <MsSpinner size="xs" variant="primary" />
                <MsSpinner size="sm" variant="secondary" />
                <MsSpinner size="md" variant="primary" />
                <MsSpinner size="lg" variant="accent" />
                <MsSpinner size="xl" variant="success" />
                <MsSpinner size="md" variant="warning" label="Loading..." />
              </div>
            </div>
          </div>
        </Section>
        
        <Section>
          <SectionTitle 
            title="Navigation Components" 
            description="Components for application navigation and organization."
          />
          
          <div className="space-y-8 mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card/30 rounded-lg border border-border/40 p-4">
                <h3 className="text-lg font-semibold mb-4">Vertical Navigation</h3>
                <MsNavigation>
                  <MsNavigationGroup title="Main">
                    <MsNavigationItem icon={<Home className="h-4 w-4" />} label="Dashboard" active href="#" />
                    <MsNavigationItem icon={<Inbox className="h-4 w-4" />} label="Inbox" href="#" badge={<MsBadge variant="primary">3</MsBadge>} />
                    <MsNavigationItem icon={<FileText className="h-4 w-4" />} label="Documents" href="#" />
                  </MsNavigationGroup>
                  
                  <MsNavigationGroup title="Account" collapsible defaultOpen>
                    <MsNavigationItem icon={<User className="h-4 w-4" />} label="Profile" href="#" />
                    <MsNavigationItem icon={<Settings className="h-4 w-4" />} label="Settings" href="#" collapsible>
                      <MsNavigationItem label="Account Settings" href="#" depth={1} />
                      <MsNavigationItem label="Notifications" href="#" depth={1} />
                      <MsNavigationItem label="Appearance" href="#" depth={1} />
                    </MsNavigationItem>
                  </MsNavigationGroup>
                </MsNavigation>
              </div>
              
              <div className="bg-card/30 rounded-lg border border-border/40 p-4">
                <h3 className="text-lg font-semibold mb-4">Horizontal Navigation</h3>
                <div className="bg-card rounded-lg border border-border p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="h-6 w-6" />
                      <span className="font-semibold">App Name</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <MsNavigationMenu>
                        <MsNavigationMenuItem href="#" active>Home</MsNavigationMenuItem>
                        <MsNavigationMenuItem href="#">Products</MsNavigationMenuItem>
                        <MsNavigationMenuItem href="#">Pricing</MsNavigationMenuItem>
                        <MsNavigationMenuItem href="#">About</MsNavigationMenuItem>
                      </MsNavigationMenu>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MsButton size="sm" variant="ghost" icon={<Sun className="h-4 w-4" />}></MsButton>
                      <MsButton size="sm" variant="ghost" icon={<Search className="h-4 w-4" />}></MsButton>
                      <MsButton size="sm" icon={<User className="h-4 w-4" />}>Login</MsButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        
        <Section>
          <SectionTitle 
            title="Table Components" 
            description="Components for displaying tabular data."
          />
          
          <div className="space-y-4 mt-8">
            <MsTable striped hoverable bordered>
              <MsTableHeader>
                <MsTableRow>
                  <MsTableHead>Invoice</MsTableHead>
                  <MsTableHead>Status</MsTableHead>
                  <MsTableHead>Method</MsTableHead>
                  <MsTableHead>Amount</MsTableHead>
                  <MsTableHead>Actions</MsTableHead>
                </MsTableRow>
              </MsTableHeader>
              <MsTableBody>
                <MsTableRow>
                  <MsTableCell>#INV-001</MsTableCell>
                  <MsTableCell>
                    <MsStatusCell status="success" text="Paid" />
                  </MsTableCell>
                  <MsTableCell>Credit Card</MsTableCell>
                  <MsTableCell>$250.00</MsTableCell>
                  <MsTableCell>
                    <div className="flex space-x-2">
                      <MsButton size="sm" variant="outline" icon={<Download className="h-4 w-4" />}>
                        Download
                      </MsButton>
                    </div>
                  </MsTableCell>
                </MsTableRow>
                <MsTableRow>
                  <MsTableCell>#INV-002</MsTableCell>
                  <MsTableCell>
                    <MsStatusCell status="warning" text="Pending" />
                  </MsTableCell>
                  <MsTableCell>PayPal</MsTableCell>
                  <MsTableCell>$150.00</MsTableCell>
                  <MsTableCell>
                    <div className="flex space-x-2">
                      <MsButton size="sm" variant="outline" icon={<Download className="h-4 w-4" />}>
                        Download
                      </MsButton>
                    </div>
                  </MsTableCell>
                </MsTableRow>
                <MsTableRow>
                  <MsTableCell>#INV-003</MsTableCell>
                  <MsTableCell>
                    <MsStatusCell status="error" text="Failed" />
                  </MsTableCell>
                  <MsTableCell>Bank Transfer</MsTableCell>
                  <MsTableCell>$350.00</MsTableCell>
                  <MsTableCell>
                    <div className="flex space-x-2">
                      <MsButton size="sm" variant="outline" icon={<Download className="h-4 w-4" />}>
                        Download
                      </MsButton>
                    </div>
                  </MsTableCell>
                </MsTableRow>
              </MsTableBody>
            </MsTable>
          </div>
        </Section>
        
        <Section>
          <SectionTitle 
            title="Data Display Components" 
            description="Components for visualizing data and metrics."
          />
          
          <div className="space-y-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Statistics and Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MsStat
                  value="$13,456"
                  label="Total Revenue"
                  icon={<CreditCard className="h-4 w-4" />}
                  trend={{ value: 12.5, direction: 'up', label: 'vs last month' }}
                />
                
                <MsStat
                  value="2,345"
                  label="New Customers"
                  icon={<User className="h-4 w-4" />}
                  trend={{ value: 5.2, direction: 'up', label: 'vs last month' }}
                  variant="primary"
                />
                
                <MsStat
                  value="$8.5"
                  label="Average Order"
                  icon={<ShoppingCart className="h-4 w-4" />}
                  trend={{ value: 1.2, direction: 'down', label: 'vs last month' }}
                />
                
                <MsStat
                  value="89%"
                  label="Satisfaction"
                  icon={<Check className="h-4 w-4" />}
                  trend={{ value: 4, direction: 'up', label: 'vs last month' }}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Data Points</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <MsCard>
                  <MsCardHeader>
                    <MsCardTitle>Customer Details</MsCardTitle>
                  </MsCardHeader>
                  <MsCardContent className="space-y-4">
                    <MsDataPoint 
                      label="Name" 
                      value="John Doe" 
                      icon={<User className="h-4 w-4" />}
                    />
                    <MsDataPoint 
                      label="Email" 
                      value="john.doe@example.com" 
                      icon={<Mail className="h-4 w-4" />}
                    />
                    <MsDataPoint 
                      label="Status" 
                      value={<MsStatusBadge status="active" />}
                    />
                    <MsDataPoint 
                      label="Last Order" 
                      value="June 9, 2023" 
                      icon={<Calendar className="h-4 w-4" />}
                      tooltip="Date of most recent purchase"
                    />
                  </MsCardContent>
                </MsCard>
                
                <MsCard variant="outline">
                  <MsCardHeader>
                    <MsCardTitle>Timeline</MsCardTitle>
                  </MsCardHeader>
                  <MsCardContent>
                    <MsTimeline>
                      <MsTimelineItem
                        title="Order Placed"
                        description="Order #1234 was placed successfully."
                        timestamp="2 hours ago"
                        status="success"
                      />
                      <MsTimelineItem
                        title="Payment Processed"
                        description="Payment was processed via Credit Card."
                        timestamp="1 hour ago"
                        status="success"
                      />
                      <MsTimelineItem
                        title="Order Shipped"
                        description="Your order has been shipped with UPS."
                        timestamp="30 minutes ago"
                        status="default"
                      />
                      <MsTimelineItem
                        title="Delivery Attempt"
                        description="First delivery attempt was unsuccessful."
                        timestamp="Just now"
                        status="warning"
                      />
                    </MsTimeline>
                  </MsCardContent>
                </MsCard>
                
                <MsCard variant="primary">
                  <MsCardHeader>
                    <MsCardTitle>System Status</MsCardTitle>
                  </MsCardHeader>
                  <MsCardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API</span>
                      <MsStatusBadge status="online" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database</span>
                      <MsStatusBadge status="online" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Storage</span>
                      <MsStatusBadge status="online" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Authentication</span>
                      <MsStatusBadge status="pending" />
                    </div>
                    <MsProgress value={92} max={100} variant="success" showValue />
                  </MsCardContent>
                </MsCard>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </ProtectedPageLayout>
  );
};

export default ComponentsShowcase;
