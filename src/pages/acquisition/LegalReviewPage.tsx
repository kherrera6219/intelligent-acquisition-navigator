
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Users, 
  MessageSquare,
  PlusCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface LegalReviewItem {
  id: string;
  documentName: string;
  reviewStatus: 'pending' | 'in-progress' | 'completed' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignedTo: string;
  comments: string[];
  documentType: string;
}

const LegalReviewPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newReviewDialogOpen, setNewReviewDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('pending');

  // Sample legal review data
  const [reviewItems, setReviewItems] = useState<LegalReviewItem[]>([
    {
      id: '1',
      documentName: 'Contract Terms and Conditions - Project Alpha',
      reviewStatus: 'pending',
      priority: 'high',
      dueDate: '2023-11-25',
      assignedTo: 'Sarah Johnson',
      comments: [],
      documentType: 'Contract'
    },
    {
      id: '2',
      documentName: 'Non-Disclosure Agreement - Vendor Beta',
      reviewStatus: 'in-progress',
      priority: 'medium',
      dueDate: '2023-11-22',
      assignedTo: 'Michael Chen',
      comments: ['Initial review completed; waiting for clarification on clause 3.2'],
      documentType: 'Agreement'
    },
    {
      id: '3',
      documentName: 'Statement of Work - Tech Services',
      reviewStatus: 'completed',
      priority: 'medium',
      dueDate: '2023-11-15',
      assignedTo: 'Robert Garcia',
      comments: ['Approved with minor modifications', 'Recommend clarification on deliverable timelines'],
      documentType: 'SOW'
    },
    {
      id: '4',
      documentName: 'Bid Protest Response - Procurement XYZ',
      reviewStatus: 'rejected',
      priority: 'high',
      dueDate: '2023-11-18',
      assignedTo: 'Amanda Wilson',
      comments: ['Response requires substantial revision', 'Missing key references to FAR clauses'],
      documentType: 'Legal Brief'
    },
    {
      id: '5',
      documentName: 'Contract Modification #2 - Project Gamma',
      reviewStatus: 'pending',
      priority: 'low',
      dueDate: '2023-11-30',
      assignedTo: 'Unassigned',
      comments: [],
      documentType: 'Modification'
    }
  ]);

  const [newReview, setNewReview] = useState({
    documentName: '',
    documentType: '',
    priority: '',
    dueDate: '',
    assignedTo: '',
    comments: ''
  });

  const submitNewReview = () => {
    // Validate required fields
    if (!newReview.documentName || !newReview.documentType || !newReview.priority || !newReview.dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const newItem: LegalReviewItem = {
      id: (reviewItems.length + 1).toString(),
      documentName: newReview.documentName,
      documentType: newReview.documentType,
      reviewStatus: 'pending',
      priority: newReview.priority as 'high' | 'medium' | 'low',
      dueDate: newReview.dueDate,
      assignedTo: newReview.assignedTo || 'Unassigned',
      comments: newReview.comments ? [newReview.comments] : []
    };

    setReviewItems([...reviewItems, newItem]);
    setNewReviewDialogOpen(false);
    
    // Clear form
    setNewReview({
      documentName: '',
      documentType: '',
      priority: '',
      dueDate: '',
      assignedTo: '',
      comments: ''
    });

    toast({
      title: "Review request submitted",
      description: "The document has been added to the review queue"
    });
  };

  const filterReviewsByStatus = (status: string) => {
    if (status === 'all') return reviewItems;
    return reviewItems.filter(item => item.reviewStatus === status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const pageTitle = "Legal Review";

  return (
    <ProtectedPageLayout
      title={pageTitle}
      description="Conduct legal reviews of acquisition documents and contracts"
      isLoading={isLoading}
      action={
        <Dialog open={newReviewDialogOpen} onOpenChange={setNewReviewDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Review Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Submit Document for Legal Review</DialogTitle>
              <DialogDescription>
                Enter the document details for legal review. Required fields are marked with an asterisk (*).
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="documentName">Document Name *</Label>
                <Input
                  id="documentName"
                  value={newReview.documentName}
                  onChange={(e) => setNewReview({...newReview, documentName: e.target.value})}
                  placeholder="Enter document name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="documentType">Document Type *</Label>
                <Select 
                  value={newReview.documentType} 
                  onValueChange={(value) => setNewReview({...newReview, documentType: value})}
                >
                  <SelectTrigger id="documentType">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Agreement">Agreement</SelectItem>
                    <SelectItem value="SOW">Statement of Work</SelectItem>
                    <SelectItem value="Modification">Modification</SelectItem>
                    <SelectItem value="Legal Brief">Legal Brief</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select 
                  value={newReview.priority} 
                  onValueChange={(value) => setNewReview({...newReview, priority: value})}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input 
                  id="dueDate" 
                  type="date" 
                  value={newReview.dueDate}
                  onChange={(e) => setNewReview({...newReview, dueDate: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="assignedTo">Assign To</Label>
                <Input 
                  id="assignedTo" 
                  value={newReview.assignedTo}
                  onChange={(e) => setNewReview({...newReview, assignedTo: e.target.value})}
                  placeholder="Leave blank for automatic assignment"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="comments">Initial Comments</Label>
                <Textarea 
                  id="comments" 
                  value={newReview.comments}
                  onChange={(e) => setNewReview({...newReview, comments: e.target.value})}
                  placeholder="Add any initial comments or context for the reviewer"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setNewReviewDialogOpen(false)}>Cancel</Button>
              <Button onClick={submitNewReview}>Submit for Review</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <GradientText className="text-3xl font-bold mb-4">{pageTitle}</GradientText>
      <Tabs defaultValue="pending" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All Reviews</TabsTrigger>
        </TabsList>
        
        {['pending', 'in-progress', 'completed', 'rejected', 'all'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filterReviewsByStatus(tab === 'all' ? 'all' : tab).length === 0 ? (
              <Card className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No {tab === 'all' ? '' : tab} reviews found</h3>
                <p className="text-gray-400">
                  {tab === 'all' 
                    ? 'There are no documents submitted for legal review.' 
                    : `There are no documents with "${tab}" status.`}
                </p>
                {tab !== 'completed' && tab !== 'rejected' && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setNewReviewDialogOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Submit a document for review
                  </Button>
                )}
              </Card>
            ) : (
              filterReviewsByStatus(tab === 'all' ? 'all' : tab).map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(item.reviewStatus)}
                      <div>
                        <h3 className="font-medium">{item.documentName}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-gray-800 px-2 py-0.5 rounded text-xs">{item.documentType}</span>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            item.priority === 'high' ? 'bg-red-900/50 text-red-300' : 
                            item.priority === 'medium' ? 'bg-amber-900/50 text-amber-300' : 
                            'bg-blue-900/50 text-blue-300'
                          }`}>
                            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            item.reviewStatus === 'pending' ? 'bg-amber-900/50 text-amber-300' : 
                            item.reviewStatus === 'in-progress' ? 'bg-blue-900/50 text-blue-300' : 
                            item.reviewStatus === 'completed' ? 'bg-green-900/50 text-green-400' : 
                            'bg-red-900/50 text-red-400'
                          }`}>
                            {item.reviewStatus.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-4 md:mt-0 text-sm text-gray-400">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Due: {item.dueDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{item.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  
                  {item.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex items-center mb-2">
                        <MessageSquare className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Comments</span>
                      </div>
                      <ul className="space-y-2">
                        {item.comments.map((comment, index) => (
                          <li key={index} className="text-sm text-gray-400 pl-6">
                            • {comment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    {item.reviewStatus === 'pending' && (
                      <Button size="sm">Begin Review</Button>
                    )}
                    {item.reviewStatus === 'in-progress' && (
                      <Button size="sm">Continue Review</Button>
                    )}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </ProtectedPageLayout>
  );
};

export default LegalReviewPage;
