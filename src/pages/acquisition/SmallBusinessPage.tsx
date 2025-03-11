
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Search, 
  FileText, 
  BarChart3, 
  PieChart, 
  CheckCircle2, 
  ArrowRight,
  Users,
  Info,
  AreaChart
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SmallBusinessGoal {
  category: string;
  goal: number;
  current: number;
  color: string;
}

interface SmallBusinessListing {
  id: string;
  name: string;
  category: string[];
  naicsCode: string;
  location: string;
  matchScore: number;
  verified: boolean;
}

const SmallBusinessPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample small business goals data
  const [smallBusinessGoals] = useState<SmallBusinessGoal[]>([
    { category: 'Small Business', goal: 23, current: 18, color: 'bg-blue-500' },
    { category: 'Small Disadvantaged Business', goal: 11, current: 9.5, color: 'bg-purple-500' },
    { category: 'Women-Owned Small Business', goal: 5, current: 4.2, color: 'bg-pink-500' },
    { category: 'HUBZone', goal: 3, current: 1.8, color: 'bg-amber-500' },
    { category: 'Service-Disabled Veteran-Owned', goal: 3, current: 2.7, color: 'bg-green-500' }
  ]);

  // Sample small business listings
  const [smallBusinesses] = useState<SmallBusinessListing[]>([
    {
      id: '1',
      name: 'TechInnovate Solutions',
      category: ['Small Business', 'Women-Owned Small Business'],
      naicsCode: '541512',
      location: 'Austin, TX',
      matchScore: 92,
      verified: true
    },
    {
      id: '2',
      name: 'Veterans IT Services',
      category: ['Small Business', 'Service-Disabled Veteran-Owned'],
      naicsCode: '541513',
      location: 'San Antonio, TX',
      matchScore: 87,
      verified: true
    },
    {
      id: '3',
      name: 'Aero Engineering Group',
      category: ['Small Business', 'Small Disadvantaged Business'],
      naicsCode: '541330',
      location: 'Houston, TX',
      matchScore: 84,
      verified: true
    },
    {
      id: '4',
      name: 'Rural Tech Solutions',
      category: ['Small Business', 'HUBZone'],
      naicsCode: '541512',
      location: 'Lubbock, TX',
      matchScore: 79,
      verified: false
    },
    {
      id: '5',
      name: 'Inclusive Software Development',
      category: ['Small Business', 'Small Disadvantaged Business', 'Women-Owned Small Business'],
      naicsCode: '541511',
      location: 'Dallas, TX',
      matchScore: 88,
      verified: true
    }
  ]);

  const handleSearch = () => {
    setIsLoading(true);
    toast({
      title: "Searching small businesses",
      description: `Finding matches for "${searchQuery}"...`,
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Search complete",
        description: "Found 5 matching small businesses",
      });
    }, 1500);
  };

  const filteredBusinesses = smallBusinesses
    .filter(business => 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.naicsCode.includes(searchQuery) ||
      business.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(business => 
      categoryFilter === '' || 
      business.category.includes(categoryFilter)
    );

  return (
    <ProtectedPageLayout
      title={<GradientText>Small Business Programs</GradientText>}
      description="Manage small business participation in your acquisition activities"
      isLoading={isLoading}
    >
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="search">Find Small Businesses</TabsTrigger>
          <TabsTrigger value="goals">Goals & Reporting</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <PieChart className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Small Business Goals Progress</h2>
            </div>
            
            <div className="space-y-6">
              {smallBusinessGoals.map((goal) => (
                <div key={goal.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.category}</span>
                    <span className="text-sm text-gray-400">
                      {goal.current}% of {goal.goal}% goal
                    </span>
                  </div>
                  <Progress 
                    value={(goal.current / goal.goal) * 100} 
                    className="h-2"
                    indicatorClassName={goal.color}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <Button variant="outline" className="w-full">
                View Detailed Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-xl font-semibold">Recent Awards</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start pb-3 border-b border-gray-800">
                  <div>
                    <h3 className="font-medium">IT Support Services</h3>
                    <p className="text-sm text-gray-400">Veterans IT Services</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">$245,000</span>
                    <p className="text-xs text-gray-400">Awarded: 10/28/2023</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-start pb-3 border-b border-gray-800">
                  <div>
                    <h3 className="font-medium">Software Development</h3>
                    <p className="text-sm text-gray-400">Inclusive Software Development</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">$189,500</span>
                    <p className="text-xs text-gray-400">Awarded: 10/15/2023</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Engineering Consultation</h3>
                    <p className="text-sm text-gray-400">Aero Engineering Group</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">$134,750</span>
                    <p className="text-xs text-gray-400">Awarded: 10/03/2023</p>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                View All Awards
              </Button>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-xl font-semibold">Upcoming Opportunities</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start pb-3 border-b border-gray-800">
                  <div>
                    <h3 className="font-medium">Database Management</h3>
                    <p className="text-sm text-gray-400">RFP Release: 11/15/2023</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-blue-900/40 text-blue-400 rounded">Small Business Set-Aside</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start pb-3 border-b border-gray-800">
                  <div>
                    <h3 className="font-medium">Facility Maintenance</h3>
                    <p className="text-sm text-gray-400">RFP Release: 11/22/2023</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-purple-900/40 text-purple-400 rounded">8(a) Set-Aside</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Cybersecurity Services</h3>
                    <p className="text-sm text-gray-400">RFP Release: 12/05/2023</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-green-900/40 text-green-400 rounded">SDVOSB Set-Aside</span>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                View All Opportunities
              </Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="search" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Search className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Find Small Businesses</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="col-span-2">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search by name, NAICS code, or location" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch}>Search</Button>
                </div>
              </div>
              
              <div>
                <Select 
                  value={categoryFilter} 
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Small Business">Small Business</SelectItem>
                    <SelectItem value="Small Disadvantaged Business">Small Disadvantaged Business</SelectItem>
                    <SelectItem value="Women-Owned Small Business">Women-Owned Small Business</SelectItem>
                    <SelectItem value="HUBZone">HUBZone</SelectItem>
                    <SelectItem value="Service-Disabled Veteran-Owned">Service-Disabled Veteran-Owned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6">
              {filteredBusinesses.length === 0 ? (
                <div className="text-center py-8">
                  <Building className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No businesses found</h3>
                  <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBusinesses.map((business) => (
                    <Card key={business.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{business.name}</h3>
                            {business.verified && (
                              <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" title="Verified Business" />
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {business.category.map((cat, index) => (
                              <span key={index} className="text-xs px-2 py-0.5 bg-blue-900/40 text-blue-400 rounded">
                                {cat}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm text-gray-400 mt-2">
                            NAICS: {business.naicsCode} | {business.location}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">Match Score:</span>
                            <span className={`text-sm font-medium ${
                              business.matchScore >= 90 ? 'text-green-400' :
                              business.matchScore >= 80 ? 'text-blue-400' :
                              'text-amber-400'
                            }`}>
                              {business.matchScore}%
                            </span>
                          </div>
                          <Button size="sm" className="mt-2 w-full">View Profile</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Small Business Goals & Reporting</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Current Fiscal Year Goals</h3>
                <div className="space-y-4">
                  {smallBusinessGoals.map((goal) => (
                    <div key={goal.category} className="flex justify-between items-center">
                      <span>{goal.category}</span>
                      <span className="font-medium">{goal.goal}%</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Configure Goals
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Progress Overview</h3>
                <div className="flex items-center justify-center h-48">
                  <AreaChart className="h-32 w-32 text-gray-500" />
                  <div className="text-center ml-2">
                    <p className="text-sm text-gray-400">Reporting charts are in development</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Small Business Resources</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 bg-blue-950/30 border-blue-800/50">
                <h3 className="text-lg font-medium mb-2">SBA Resources</h3>
                <p className="text-sm text-gray-400 mb-4">Access Small Business Administration resources, guides, and programs.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="https://www.sba.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SBA Official Website</a>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="https://www.sba.gov/federal-contracting" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Federal Contracting Guide</a>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="https://certify.sba.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SBA Certification Portal</a>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-4 bg-purple-950/30 border-purple-800/50">
                <h3 className="text-lg font-medium mb-2">Procurement Center Representatives</h3>
                <p className="text-sm text-gray-400 mb-4">PCRs assist small businesses in obtaining federal contracts.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="https://www.sba.gov/federal-contracting/counseling-help/procurement-center-representative-directory" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PCR Directory</a>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="#" className="text-primary hover:underline">Schedule a PCR Consultation</a>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-4 bg-green-950/30 border-green-800/50">
                <h3 className="text-lg font-medium mb-2">Small Business Training</h3>
                <p className="text-sm text-gray-400 mb-4">Access training materials and resources for small businesses.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="https://www.sba.gov/learning-center" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SBA Learning Center</a>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="https://www.aptac-us.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Procurement Technical Assistance Centers</a>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-4 bg-amber-950/30 border-amber-800/50">
                <h3 className="text-lg font-medium mb-2">Procurement Regulations</h3>
                <p className="text-sm text-gray-400 mb-4">Access FAR/DFARS regulations pertaining to small business.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="https://www.acquisition.gov/far/part-19" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">FAR Part 19 - Small Business Programs</a>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-primary mr-2" />
                    <a href="https://www.acquisition.gov/dfars/part-219-small-business-programs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DFARS Part 219 - Small Business Programs</a>
                  </li>
                </ul>
              </Card>
            </div>
            
            <div className="mt-8 p-4 rounded-lg border border-amber-800/50 bg-amber-950/30">
              <div className="flex items-start">
                <Users className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-400">Need Assistance?</h3>
                  <p className="text-sm text-amber-300/80 mt-1">
                    Our Small Business Liaison Officers (SBLOs) are available to assist with your small business procurement needs and questions.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 border-amber-600/50 text-amber-400 hover:bg-amber-950/60">
                    Contact SBLO Team
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </ProtectedPageLayout>
  );
};

export default SmallBusinessPage;
