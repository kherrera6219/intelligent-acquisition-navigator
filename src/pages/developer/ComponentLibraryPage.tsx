
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GlassCard } from '@/components/ui/universal/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Layout, Palette, Box, Type, User, Bell, Flag, CheckSquare, ToggleLeft
} from 'lucide-react';

const ComponentLibraryPage: React.FC = () => {
  return (
    <main className="flex-grow">
      <Container>
        <div className="space-y-8 py-6">
          <PageHeader
            title="Component Library"
            description="Browse and explore ProcurityIQ UI components"
          />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">
                <Layout className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="buttons">
                <Box className="h-4 w-4 mr-2" />
                Buttons
              </TabsTrigger>
              <TabsTrigger value="cards">
                <Palette className="h-4 w-4 mr-2" />
                Cards
              </TabsTrigger>
              <TabsTrigger value="inputs">
                <Type className="h-4 w-4 mr-2" />
                Inputs
              </TabsTrigger>
              <TabsTrigger value="data">
                <User className="h-4 w-4 mr-2" />
                Data Display
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-4">Component Library Overview</h2>
                <p className="text-gray-300 mb-4">
                  The ProcurityIQ component library provides a consistent set of UI components 
                  built with React, Tailwind CSS, and Radix UI. These components follow accessibility 
                  best practices and are designed to work in dark mode environments.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <Card className="p-4 bg-gray-800/50 border-gray-700">
                    <Box className="h-5 w-5 text-blue-400 mb-2" />
                    <h3 className="text-lg font-medium mb-1">Design System</h3>
                    <p className="text-sm text-gray-400">Consistent design tokens and themes</p>
                  </Card>
                  <Card className="p-4 bg-gray-800/50 border-gray-700">
                    <Flag className="h-5 w-5 text-green-400 mb-2" />
                    <h3 className="text-lg font-medium mb-1">Accessibility</h3>
                    <p className="text-sm text-gray-400">WCAG 2.1 AA compliant components</p>
                  </Card>
                  <Card className="p-4 bg-gray-800/50 border-gray-700">
                    <Palette className="h-5 w-5 text-purple-400 mb-2" />
                    <h3 className="text-lg font-medium mb-1">Customization</h3>
                    <p className="text-sm text-gray-400">Highly customizable through props</p>
                  </Card>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="buttons">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-4">Button Components</h2>
                <p className="text-gray-300 mb-6">
                  Buttons communicate actions that users can take. They are typically placed throughout your UI.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Button Variants</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="default">Default</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Button Sizes</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Button States</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button>Default</Button>
                      <Button disabled>Disabled</Button>
                      <Button className="enterprise-gradient">Gradient</Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="cards">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-4">Card Components</h2>
                <p className="text-gray-300 mb-6">
                  Cards are surfaces that display content and actions on a single topic.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-4 bg-gray-800/50 border-gray-700">
                    <h3 className="text-lg font-medium mb-2">Standard Card</h3>
                    <p className="text-sm text-gray-400 mb-4">Basic card with title and content</p>
                    <Button size="sm">Action</Button>
                  </Card>

                  <GlassCard className="p-4">
                    <h3 className="text-lg font-medium mb-2">Glass Card</h3>
                    <p className="text-sm text-gray-400 mb-4">Translucent card with blur effect</p>
                    <Button size="sm" variant="outline">Action</Button>
                  </GlassCard>

                  <Card className="p-0 overflow-hidden bg-gray-800/50 border-gray-700">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2"></div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-2">Header Card</h3>
                      <p className="text-sm text-gray-400 mb-4">Card with colored header</p>
                      <Button size="sm" variant="secondary">Action</Button>
                    </div>
                  </Card>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="inputs">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-4">Input Components</h2>
                <p className="text-gray-300 mb-6">
                  Form inputs allow users to enter text and make selections.
                </p>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-2">Checkbox</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms1" />
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept terms and conditions
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms2" checked />
                        <label
                          htmlFor="terms2"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email notifications
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-2">Switch</h3>
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <label
                          htmlFor="airplane-mode"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Dark Mode
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="notifications" checked />
                        <label
                          htmlFor="notifications"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Push Notifications
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="data">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-4">Data Display Components</h2>
                <p className="text-gray-300 mb-6">
                  Components for displaying data and information.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Avatar</h3>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Badge</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Card Examples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4 bg-gray-800/50 border-gray-700">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-md font-medium">Project Update</h4>
                            <p className="text-xs text-gray-400 mt-1">Last updated: 2 hours ago</p>
                          </div>
                          <Badge>In Progress</Badge>
                        </div>
                        <p className="text-sm mt-3 text-gray-300">
                          The project is on track for delivery by next week.
                        </p>
                      </Card>

                      <Card className="p-4 bg-gray-800/50 border-gray-700">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-md font-medium">Jane Doe</h4>
                            <p className="text-xs text-gray-400 mt-1">Project Manager</p>
                            <p className="text-sm mt-2 text-gray-300">
                              Approved the latest changes to the project scope.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </main>
  );
};

export default ComponentLibraryPage;
