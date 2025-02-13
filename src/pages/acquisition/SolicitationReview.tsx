
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Check, 
  X, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import type { SolicitationDocument } from '@/types/acquisition';
import Navigation from "@/components/Navigation";

const SolicitationReview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SolicitationDocument['status']>();

  const { data: solicitations, isLoading } = useQuery({
    queryKey: ['solicitations'],
    queryFn: async () => {
      // This would be replaced with actual API call
      return [] as SolicitationDocument[];
    }
  });

  const getStatusIcon = (status: SolicitationDocument['status']) => {
    switch (status) {
      case 'APPROVED':
        return <Check className="text-green-500" />;
      case 'IN_REVIEW':
        return <Clock className="text-yellow-500" />;
      case 'DRAFT':
        return <AlertTriangle className="text-orange-500" />;
      case 'PUBLISHED':
        return <FileText className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: SolicitationDocument['status']) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-500/10 text-green-500';
      case 'IN_REVIEW':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'DRAFT':
        return 'bg-orange-500/10 text-orange-500';
      case 'PUBLISHED':
        return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pl-64">
        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient">
                Solicitation Review
              </h1>
              <p className="text-gray-400">
                Review and manage solicitation documents
              </p>
            </div>
            <Button className="enterprise-gradient">
              New Solicitation
            </Button>
          </div>

          <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5 mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search solicitations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button variant="outline">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6 bg-black/40">
                    <div className="h-6 bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </Card>
                ))}
              </div>
            ) : solicitations?.map((solicitation) => (
              <Card 
                key={solicitation.id}
                className="p-6 bg-black/40 backdrop-blur-sm border-white/5 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {solicitation.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Version {solicitation.version} • Last updated {new Date(solicitation.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(solicitation.status)}`}>
                      {getStatusIcon(solicitation.status)}
                      <span className="text-sm">{solicitation.status.replace('_', ' ')}</span>
                    </div>
                    <Button variant="outline">Review</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SolicitationReview;
