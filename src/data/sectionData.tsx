
import { Globe, Shield, Database, Brain } from 'lucide-react';
import React from 'react';

export const sectionData = {
  core: {
    key: 'core',
    title: 'System Architecture',
    formula: 'F**(AKF) = Σ(P₍ᵢ₎ × L₍ᵢ₎ × B₍ᵢ₎) where i ∈ {mega, large, medium, small}',
    description: 'Enterprise-grade knowledge framework with FedRAMP High and CMMC Level 3 compliance',
    icon: <Globe className="w-6 h-6" />,
    components: [
      { name: 'Mega Pillars (4)', description: 'Core foundational regulatory frameworks' },
      { name: 'Large Pillars (16)', description: 'Major agency supplements and guidelines' },
      { name: 'Medium Pillars (64)', description: 'State and specialized regulations' },
      { name: 'Small Pillars (256)', description: 'Local and granular regulatory components' },
      { name: 'Tree Depth', description: '9 levels with 4-way branching (262,144 nodes)' }
    ]
  },
  ai: {
    key: 'ai',
    title: 'AI Integration',
    formula: 'AI(AKF) = GPT₄ᵗ + EMB₃ + VIS₄ + LLM₂ + GEM',
    description: 'Multi-model AI system with Azure OpenAI and LangChain integration',
    icon: <Brain className="w-6 h-6" />,
    components: [
      { name: 'GPT-4 Turbo', description: 'Advanced NLP with 128k context window' },
      { name: 'Text Embedding 3', description: '3072-dimensional semantic embeddings' },
      { name: 'Vision Analysis', description: 'Document and image processing capabilities' },
      { name: 'LangChain Pipeline', description: 'Optimized RAG with hybrid search' },
      { name: 'Safety & Ethics', description: 'Azure content safety and responsible AI' }
    ]
  },
  database: {
    key: 'database',
    title: 'Data Architecture',
    formula: 'DB(AKF) = COS(r, c, i) + VEC(e, s) where r∈R, c∈C, i∈I',
    description: 'Azure Cosmos DB and Cognitive Search implementation',
    icon: <Database className="w-6 h-6" />,
    components: [
      { name: 'Core Storage', description: 'Geo-redundant Cosmos DB with 7-year retention' },
      { name: 'Vector Store', description: 'Cognitive Search with semantic capabilities' },
      { name: 'Indexing', description: 'Multi-dimensional hierarchical indexing' },
      { name: 'Partitioning', description: 'Hierarchical with continuous backup' },
      { name: 'Performance', description: 'Premium tier with auto-scaling' }
    ]
  },
  security: {
    key: 'security',
    title: 'Security & Compliance',
    formula: 'SEC(AKF) = AUTH × ENC × COMP × AUDIT',
    description: 'FedRAMP High and NIST 800-53 Rev 5 compliant security',
    icon: <Shield className="w-6 h-6" />,
    components: [
      { name: 'Authentication', description: 'OAuth2 with MFA requirement' },
      { name: 'Encryption', description: 'End-to-end with quantum resistance' },
      { name: 'Compliance', description: 'CMMC Level 3 and ITAR compliance' },
      { name: 'Monitoring', description: 'Comprehensive security metrics' },
      { name: 'Audit', description: 'Continuous audit logging and trails' }
    ]
  }
};

export const relationshipData = [
  { from: 'core', to: 'ai', description: 'AI-powered knowledge processing' },
  { from: 'core', to: 'database', description: 'Hierarchical data storage' },
  { from: 'ai', to: 'security', description: 'AI safety and compliance' },
  { from: 'database', to: 'security', description: 'Secure data management' }
];
