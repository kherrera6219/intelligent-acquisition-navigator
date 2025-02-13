
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  ChartBar, 
  FileText, 
  Download,
  ExternalLink
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import type { MarketResearch } from '@/types/acquisition';
import Navigation from "@/components/Navigation";

const MarketResearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: marketResearch, isLoading } = useQuery({
    queryKey: ['marketResearch'],
    queryFn: async () => {
      // This would be replaced with actual API call
      return [] as MarketResearch[];
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
                Market Research
              </h1>
              <p className="text-gray-400">
                Conduct and analyze market research
              </p>
            </div>
            <Button className="enterprise-gradient">
              New Research
            </Button>
          </div>

          <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5 mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search market research..."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6 bg-black/40 animate-pulse">
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </>
            ) : marketResearch?.map((research) => (
              <Card 
                key={research.id}
                className="p-6 bg-black/40 backdrop-blur-sm border-white/5 hover:bg-white/5 transition-colors"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        {research.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Conducted on {new Date(research.conductedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      research.status === 'COMPLETED' 
                        ? 'bg-green-500/10 text-green-500'
                        : research.status === 'IN_PROGRESS'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {research.status.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <ChartBar className="h-4 w-4" />
                        <span>{research.findings.length} Findings</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FileText className="h-4 w-4" />
                        <span>{research.attachments.length} Documents</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export
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

export default MarketResearchPage;
