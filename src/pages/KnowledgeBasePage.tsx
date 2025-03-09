import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { useState } from 'react';
import { Card } from '@/components/ui/universal/Card';
import { Grid } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Book, FileText, Video, Bookmark, Star, Clock, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for: ${searchQuery}`,
    });
  };

  const handleResourceClick = (resourceName: string) => {
    toast({
      title: "Resource selected",
      description: `Opening ${resourceName}`,
    });
  };

  const resources = [
    { id: 1, title: 'Federal Acquisition Regulation (FAR)', type: 'document', category: 'federal', lastUpdated: '2023-10-15' },
    { id: 2, title: 'Texas Government Code Chapter 2155', type: 'document', category: 'texas', lastUpdated: '2023-09-22' },
    { id: 3, title: 'Proposal Writing Best Practices', type: 'guide', category: 'guides', lastUpdated: '2023-11-05' },
    { id: 4, title: 'Contract Negotiation Strategies', type: 'video', category: 'training', lastUpdated: '2023-08-30' },
    { id: 5, title: 'Small Business Set-Aside Programs', type: 'document', category: 'federal', lastUpdated: '2023-07-12' },
    { id: 6, title: 'Texas DIR Cooperative Contracts', type: 'guide', category: 'texas', lastUpdated: '2023-10-28' },
    { id: 7, title: 'Cost and Price Analysis Techniques', type: 'video', category: 'training', lastUpdated: '2023-09-14' },
    { id: 8, title: 'DFARS Compliance Checklist', type: 'document', category: 'federal', lastUpdated: '2023-11-10' },
  ];

  const filteredResources = resources.filter(resource => 
    (activeTab === 'all' || resource.category === activeTab) &&
    (searchQuery === '' || resource.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-5 w-5 text-blue-400" />;
      case 'guide': return <Book className="h-5 w-5 text-green-400" />;
      case 'video': return <Video className="h-5 w-5 text-red-400" />;
      default: return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <ProtectedPageLayout
      title="Knowledge Base"
      description="Access and manage acquisition knowledge resources"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Knowledge Base', href: '/knowledge-base' }
      ]}
      action={
        <Button variant="outline" size="sm" onClick={() => toast({ title: "Coming Soon", description: "Bookmark management will be available soon" })}>
          <Bookmark className="h-4 w-4 mr-2" />
          My Bookmarks
        </Button>
      }
    >
      <div className="min-h-[calc(100vh-200px)]">
        <Card className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </Card>

        <div className="mb-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="federal">Federal</TabsTrigger>
                <TabsTrigger value="texas">Texas</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <TabsContent value="all" className="mt-0">
              <Grid columns={3} gap="md">
                {filteredResources.map(resource => (
                  <Card 
                    key={resource.id} 
                    className="flex flex-col hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => handleResourceClick(resource.title)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        {getResourceIcon(resource.type)}
                        <span className="ml-2 text-sm text-gray-400 capitalize">{resource.type}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => {
                        e.stopPropagation();
                        toast({ title: "Bookmarked", description: `${resource.title} added to bookmarks` });
                      }}>
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
                    <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Updated {resource.lastUpdated}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-amber-400" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </Grid>
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No resources found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTab('all');
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {['federal', 'texas', 'guides', 'training'].map(tab => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <Grid columns={3} gap="md">
                  {filteredResources.map(resource => (
                    <Card 
                      key={resource.id} 
                      className="flex flex-col hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => handleResourceClick(resource.title)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          {getResourceIcon(resource.type)}
                          <span className="ml-2 text-sm text-gray-400 capitalize">{resource.type}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => {
                          e.stopPropagation();
                          toast({ title: "Bookmarked", description: `${resource.title} added to bookmarks` });
                        }}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
                      <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Updated {resource.lastUpdated}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-amber-400" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </Grid>
                
                {filteredResources.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No resources found matching your criteria.</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveTab('all');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </ProtectedPageLayout>
  );
};

export default KnowledgeBasePage;
