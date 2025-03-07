
import { useState } from "react";
import { SoftwareBuildItem, KnowledgeBaseItemType } from "@/types/knowledge-base";
import { KnowledgeBaseHeader } from "@/components/knowledge-base/KnowledgeBaseHeader";
import { KnowledgeBaseFilters } from "@/components/knowledge-base/KnowledgeBaseFilters";
import { KnowledgeBaseTabs } from "@/components/knowledge-base/KnowledgeBaseTabs";
import { SoftwareBuildCard } from "@/components/knowledge-base/SoftwareBuildCard";
import { BuildDetailModal } from "@/components/knowledge-base/BuildDetailModal";

// Sample data - in a real implementation, this would come from a database
const mockSoftwareBuilds: SoftwareBuildItem[] = [
  {
    id: "build-001",
    title: "ProcurityIQ Core Platform",
    description: "The main application platform for procurement management including contract tracking, vendor management, and proposal evaluation.",
    type: "software",
    createdAt: "2023-10-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    owner: "dev-team",
    tags: ["react", "typescript", "core-system", "frontend"],
    version: "2.3.1",
    buildDate: "2024-01-20T14:30:00Z",
    buildNumber: "245",
    repository: "https://github.com/procurity/platform-core",
    dependencies: ["React 18.3.1", "TypeScript 5.0", "TailwindCSS", "Supabase"],
    status: "production",
    platform: ["Web", "Desktop"],
    requirements: [
      "Node.js 16.x or higher",
      "npm 7.x or higher",
      "Modern browser with ES6 support"
    ]
  },
  {
    id: "build-002",
    title: "ProcurityIQ API Service",
    description: "Backend API service handling data processing, authentication, and third-party integrations for the ProcurityIQ platform.",
    type: "software",
    createdAt: "2023-09-05T08:20:00Z",
    updatedAt: "2024-02-10T11:15:00Z",
    owner: "backend-team",
    tags: ["nodejs", "express", "api", "backend", "database"],
    version: "1.5.0",
    buildDate: "2024-02-10T11:15:00Z",
    buildNumber: "137",
    repository: "https://github.com/procurity/api-service",
    dependencies: ["Node.js 18", "Express", "Supabase", "JWT", "OpenAI SDK"],
    status: "production",
    platform: ["Server", "Docker"],
    requirements: [
      "Node.js 18.x",
      "PostgreSQL 14+",
      "Redis for caching",
      "Docker 20.10+ (for containerized deployment)"
    ]
  },
  {
    id: "build-003",
    title: "ProcurityIQ Mobile App",
    description: "Mobile application for accessing procurement data, receiving notifications, and approving requests on the go.",
    type: "software",
    createdAt: "2023-11-20T09:45:00Z",
    updatedAt: "2024-03-05T16:20:00Z",
    owner: "mobile-team",
    tags: ["react-native", "mobile", "ios", "android"],
    version: "1.2.0",
    buildDate: "2024-03-05T16:20:00Z",
    buildNumber: "48",
    repository: "https://github.com/procurity/mobile-app",
    dependencies: ["React Native 0.72", "Redux", "React Navigation", "Axios"],
    status: "staging",
    platform: ["iOS", "Android"],
    requirements: [
      "iOS 14+ / Android 10+",
      "React Native CLI or Expo",
      "Xcode 13+ (for iOS builds)",
      "Android Studio (for Android builds)"
    ]
  },
  {
    id: "build-004",
    title: "ProcurityIQ Analytics Engine",
    description: "Data analytics and reporting service for procurement metrics, trend analysis, and business intelligence.",
    type: "software",
    createdAt: "2023-08-12T14:10:00Z",
    updatedAt: "2024-02-28T13:40:00Z",
    owner: "data-team",
    tags: ["python", "data", "analytics", "machine-learning"],
    version: "0.9.5",
    buildDate: "2024-02-28T13:40:00Z",
    buildNumber: "72",
    repository: "https://github.com/procurity/analytics-engine",
    dependencies: ["Python 3.9", "Pandas", "NumPy", "scikit-learn", "FastAPI"],
    status: "development",
    platform: ["Server", "Docker", "AWS Lambda"],
    requirements: [
      "Python 3.9+",
      "PostgreSQL database connection",
      "Min 4GB RAM for processing",
      "Docker for containerization"
    ]
  },
  {
    id: "build-005",
    title: "ProcurityIQ Document Parser",
    description: "Service for parsing, extracting, and analyzing information from procurement documents including contracts and RFPs.",
    type: "software",
    createdAt: "2023-07-25T11:30:00Z",
    updatedAt: "2023-12-15T09:50:00Z",
    owner: "ml-team",
    tags: ["python", "nlp", "document-processing", "machine-learning"],
    version: "1.1.2",
    buildDate: "2023-12-15T09:50:00Z",
    buildNumber: "94",
    repository: "https://github.com/procurity/document-parser",
    dependencies: ["Python 3.8", "spaCy", "PyPDF2", "TensorFlow", "Transformers"],
    status: "archived",
    platform: ["Server"],
    requirements: [
      "Python 3.8+",
      "GPU recommended for NLP processing",
      "Min 8GB RAM",
      "Document storage service connection"
    ]
  }
];

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<KnowledgeBaseItemType>("software");
  const [filters, setFilters] = useState<{
    types: KnowledgeBaseItemType[];
    tags: string[];
  }>({ types: [], tags: [] });
  
  const [selectedBuild, setSelectedBuild] = useState<SoftwareBuildItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Extract all unique tags from the builds for the filters
  const allTags = Array.from(
    new Set(mockSoftwareBuilds.flatMap(build => build.tags))
  );

  // Filter builds based on search query and filters
  const filteredBuilds = mockSoftwareBuilds.filter(build => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      build.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      build.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      build.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by selected types (if any)
    const matchesType = filters.types.length === 0 || 
      filters.types.includes(build.type);
    
    // Filter by selected tags (if any)
    const matchesTags = filters.tags.length === 0 || 
      filters.tags.some(tag => build.tags.includes(tag));
    
    return matchesSearch && matchesType && matchesTags;
  });

  const handleBuildClick = (build: SoftwareBuildItem) => {
    setSelectedBuild(build);
    setIsDetailModalOpen(true);
  };

  const handleCreateNew = () => {
    // In a real application, this would open a form to create a new knowledge base item
    console.log("Create new knowledge base item");
  };

  return (
    <div className="container mx-auto py-8">
      <KnowledgeBaseHeader 
        onSearch={setSearchQuery}
        onCreateNew={handleCreateNew}
      />
      
      <KnowledgeBaseTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <KnowledgeBaseFilters 
          onFilterChange={setFilters}
          availableTags={allTags}
        />
        
        {activeTab === "software" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBuilds.map(build => (
              <SoftwareBuildCard 
                key={build.id}
                build={build}
                onClick={handleBuildClick}
              />
            ))}
            
            {filteredBuilds.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">No matching software builds found.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab !== "software" && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section is under development.
            </p>
          </div>
        )}
      </KnowledgeBaseTabs>
      
      <BuildDetailModal
        build={selectedBuild}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};

export default KnowledgeBasePage;
