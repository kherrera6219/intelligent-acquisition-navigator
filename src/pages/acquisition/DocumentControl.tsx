
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  Filter, 
  History,
  Download,
  ExternalLink,
  Clock
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import type { SolicitationDocument, VersionHistory } from '@/types/acquisition';
import Navigation from "@/components/Navigation";

const DocumentControl = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      // This would be replaced with actual API call
      return [] as SolicitationDocument[];
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pl-64">
        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient">
                Document Control
              </h1>
              <p className="text-gray-400">
                Version control and document management
              </p>
            </div>
            <Button className="enterprise-gradient">
              Upload Document
            </Button>
          </div>

          <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5 mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
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
            ) : documents?.map((document) => (
              <Card 
                key={document.id}
                className="p-6 bg-black/40 backdrop-blur-sm border-white/5 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {document.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Version {document.version}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated {new Date(document.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <History className="h-4 w-4 mr-2" />
                      History
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
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

export default DocumentControl;
