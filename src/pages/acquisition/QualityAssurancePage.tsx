
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  FileCheck, 
  BarChart, 
  ClipboardCheck, 
  CalendarDays, 
  Plus,
  Search,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  Filter
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface QAItem {
  id: string;
  title: string;
  type: 'inspection' | 'audit' | 'review';
  status: 'passed' | 'failed' | 'pending';
  dueDate: string;
  assignedTo: string;
  contract: string;
  description: string;
  findings: string[];
}

const QualityAssurancePage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [newQADialogOpen, setNewQADialogOpen] = useState(false);

  // Sample quality assurance data
  const [qaItems, setQaItems] = useState<QAItem[]>([
    {
      id: '1',
      title: 'Monthly IT Services Quality Review',
      type: 'inspection',
      status: 'passed',
      dueDate: '2023-11-18',
      assignedTo: 'John Martinez',
      contract: 'IT-2023-0142',
      description: 'Regular monthly inspection of IT support services delivery',
      findings: ['All SLAs met for the reporting period', 'Documentation complete and accurate']
    },
    {
      id: '2',
      title: 'Construction Site Safety Inspection',
      type: 'inspection',
      status: 'failed',
      dueDate: '2023-11-15',
      assignedTo: 'Sarah Johnson',
      contract: 'CONST-2023-0087',
      description: 'Safety compliance inspection at primary construction site',
      findings: ['Missing safety barriers in section C', 'Inadequate PPE usage by subcontractor personnel']
    },
    {
      id: '3',
      title: 'Quarterly Contract Compliance Audit',
      type: 'audit',
      status: 'pending',
      dueDate: '2023-11-30',
      assignedTo: 'Michael Chen',
      contract: 'SERV-2023-0201',
      description: 'Comprehensive review of contract compliance and deliverables',
      findings: []
    },
    {
      id: '4',
      title: 'Software Deliverable Review',
      type: 'review',
      status: 'passed',
      dueDate: '2023-11-10',
      assignedTo: 'Lisa Garcia',
      contract: 'IT-2023-0156',
      description: 'Acceptance testing for new software module delivery',
      findings: ['All acceptance criteria met', 'Performance exceeds minimum requirements']
    },
    {
      id: '5',
      title: 'Furniture Quality Inspection',
      type: 'inspection',
      status: 'failed',
      dueDate: '2023-11-12',
      assignedTo: 'David Wilson',
      contract: 'SUPP-2023-0032',
      description: 'Quality inspection of office furniture delivery',
      findings: ['15% of chairs show manufacturing defects', 'Assembly instructions missing from 8 packages']
    },
    {
      id: '6',
      title: 'Network Security Audit',
      type: 'audit',
      status: 'pending',
      dueDate: '2023-12-05',
      assignedTo: 'Unassigned',
      contract: 'IT-2023-0178',
      description: 'Security compliance audit for network infrastructure',
      findings: []
    }
  ]);

  const [newQAItem, setNewQAItem] = useState({
    title: '',
    type: '',
    dueDate: '',
    assignedTo: '',
    contract: '',
    description: ''
  });

  const handleCreateQA = () => {
    // Validate required fields
    if (!newQAItem.title || !newQAItem.type || !newQAItem.dueDate || !newQAItem.contract) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const newItem: QAItem = {
      id: (qaItems.length + 1).toString(),
      title: newQAItem.title,
      type: newQAItem.type as 'inspection' | 'audit' | 'review',
      status: 'pending',
      dueDate: newQAItem.dueDate,
      assignedTo: newQAItem.assignedTo || 'Unassigned',
      contract: newQAItem.contract,
      description: newQAItem.description,
      findings: []
    };

    setQaItems([...qaItems, newItem]);
    setNewQADialogOpen(false);
    
    // Clear form
    setNewQAItem({
      title: '',
      type: '',
      dueDate: '',
      assignedTo: '',
      contract: '',
      description: ''
    });

    toast({
      title: "Quality assurance item created",
      description: "The new item has been added to the schedule"
    });
  };

  // Filtering functions
  const filteredQAItems = qaItems
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(item => 
      statusFilter === '' || 
      item.status === statusFilter
    )
    .filter(item => 
      typeFilter === '' || 
      item.type === typeFilter
    );

  // Calculate summary statistics
  const qaStats = {
    total: qaItems.length,
    passed: qaItems.filter(item => item.status === 'passed').length,
    failed: qaItems.filter(item => item.status === 'failed').length,
    pending: qaItems.filter(item => item.status === 'pending').length,
    completion: qaItems.filter(item => item.status !== 'pending').length / qaItems.length * 100
  };

  return (
    <ProtectedPageLayout
      title={<GradientText>Quality Assurance</GradientText>}
      description="Ensure quality control for your acquisition processes and deliverables"
      isLoading={isLoading}
      action={
        <Dialog open={newQADialogOpen} onOpenChange={setNewQADialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create QA Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Quality Assurance Item</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newQAItem.title}
                  onChange={(e) => setNewQAItem({...newQAItem, title: e.target.value})}
                  placeholder="Enter title"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Type *</Label>
                <Select 
                  value={newQAItem.type} 
                  onValueChange={(value) => setNewQAItem({...newQAItem, type: value})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input 
                  id="dueDate" 
                  type="date" 
                  value={newQAItem.dueDate}
                  onChange={(e) => setNewQAItem({...newQAItem, dueDate: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contract">Contract Number *</Label>
                <Input 
                  id="contract" 
                  value={newQAItem.contract}
                  onChange={(e) => setNewQAItem({...newQAItem, contract: e.target.value})}
                  placeholder="Enter contract number"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input 
                  id="assignedTo" 
                  value={newQAItem.assignedTo}
                  onChange={(e) => setNewQAItem({...newQAItem, assignedTo: e.target.value})}
                  placeholder="Leave blank for automatic assignment"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newQAItem.description}
                  onChange={(e) => setNewQAItem({...newQAItem, description: e.target.value})}
                  placeholder="Enter description of the quality assurance activity"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewQADialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateQA}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="schedule">QA Schedule</TabsTrigger>
          <TabsTrigger value="templates">QA Templates</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-green-950/30 border-green-800/50">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-400">Passed</h3>
                  <p className="text-3xl font-bold text-green-300">{qaStats.passed}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-red-950/30 border-red-800/50">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400">Failed</h3>
                  <p className="text-3xl font-bold text-red-300">{qaStats.failed}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-blue-950/30 border-blue-800/50">
              <div className="flex items-center">
                <FileCheck className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">Pending</h3>
                  <p className="text-3xl font-bold text-blue-300">{qaStats.pending}</p>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ClipboardCheck className="h-5 w-5 mr-2 text-primary" />
              Quality Assurance Overview
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm text-gray-400">{qaStats.completion.toFixed(0)}%</span>
                </div>
                <Progress value={qaStats.completion} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm">Software Deliverable Review passed</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ThumbsDown className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm">Furniture Quality Inspection failed</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ClipboardCheck className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm">Quarterly Audit scheduled</p>
                        <p className="text-xs text-gray-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Upcoming Inspections</h3>
                  <div className="space-y-3">
                    {qaItems
                      .filter(item => item.status === 'pending')
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                      .slice(0, 3)
                      .map(item => (
                        <div key={item.id} className="flex items-start">
                          <CalendarDays className="h-4 w-4 text-primary mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm">{item.title}</p>
                            <p className="text-xs text-gray-500">Due: {item.dueDate}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <Button variant="outline" className="w-full" onClick={() => setActiveTab('schedule')}>
                View Complete Schedule
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                Quality Assurance Schedule
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex">
                  <Input 
                    placeholder="Search..." 
                    className="rounded-r-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="secondary" className="rounded-l-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={typeFilter} 
                    onValueChange={setTypeFilter}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {filteredQAItems.length === 0 ? (
              <div className="text-center py-8">
                <ClipboardCheck className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No quality assurance items found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setNewQADialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create QA Item
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQAItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start gap-3">
                        {item.status === 'passed' && <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />}
                        {item.status === 'failed' && <AlertTriangle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />}
                        {item.status === 'pending' && <FileCheck className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />}
                        
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              item.type === 'inspection' ? 'bg-blue-900/40 text-blue-400' : 
                              item.type === 'audit' ? 'bg-purple-900/40 text-purple-400' : 
                              'bg-emerald-900/40 text-emerald-400'
                            }`}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-gray-800 rounded">
                              Contract: {item.contract}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              item.status === 'passed' ? 'bg-green-900/40 text-green-400' : 
                              item.status === 'failed' ? 'bg-red-900/40 text-red-400' : 
                              'bg-blue-900/40 text-blue-400'
                            }`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                          
                          {item.findings.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-300 mb-1">Findings:</p>
                              <ul className="text-xs text-gray-400 pl-2">
                                {item.findings.map((finding, index) => (
                                  <li key={index} className="list-disc list-inside">{finding}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                        <div className="flex flex-col md:items-end mb-2">
                          <div className="text-sm text-gray-400">Due: {item.dueDate}</div>
                          <div className="text-sm text-gray-400">Assignee: {item.assignedTo}</div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          {item.status === 'pending' && (
                            <Button size="sm">Begin</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-primary" />
              QA Templates
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                <h3 className="font-medium mb-2">IT Services Inspection Template</h3>
                <p className="text-sm text-gray-400">Comprehensive checklist for IT service delivery verification</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">Last updated: 10/15/2023</span>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                <h3 className="font-medium mb-2">Construction Safety Audit</h3>
                <p className="text-sm text-gray-400">Safety compliance verification for construction sites</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">Last updated: 09/22/2023</span>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                <h3 className="font-medium mb-2">Software Deliverable Checklist</h3>
                <p className="text-sm text-gray-400">Acceptance testing criteria for software deliveries</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">Last updated: 10/05/2023</span>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                <h3 className="font-medium mb-2">Quarterly Contract Compliance</h3>
                <p className="text-sm text-gray-400">Standard audit procedures for quarterly contract reviews</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">Last updated: 11/01/2023</span>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                <h3 className="font-medium mb-2">Goods Inspection Template</h3>
                <p className="text-sm text-gray-400">Physical product quality inspection checklist</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">Last updated: 10/12/2023</span>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </Card>
              
              <Card className="p-4 border-dashed hover:bg-gray-800/50 transition-colors cursor-pointer">
                <div className="h-full flex flex-col items-center justify-center text-center py-6">
                  <Plus className="h-8 w-8 text-gray-500 mb-2" />
                  <h3 className="font-medium text-gray-300">Create Custom Template</h3>
                  <p className="text-sm text-gray-500 mt-1">Design a new QA template</p>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-primary" />
              QA Reports
            </h2>
            
            <div className="text-center py-8">
              <BarChart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Reports Coming Soon</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Advanced reporting features are currently in development. 
                These will include trend analysis, compliance metrics, and 
                customizable reporting options.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </ProtectedPageLayout>
  );
};

export default QualityAssurancePage;
