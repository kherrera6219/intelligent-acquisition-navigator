
export type KnowledgeBaseItemType = 
  | 'document' 
  | 'regulation' 
  | 'template' 
  | 'software' 
  | 'process' 
  | 'research';

export interface KnowledgeBaseItem {
  id: string;
  title: string;
  description: string;
  type: KnowledgeBaseItemType;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  owner: string;
  path?: string;
  url?: string;
  version?: string;
}

export interface SoftwareBuildItem extends KnowledgeBaseItem {
  type: 'software';
  version: string;
  buildDate: string;
  buildNumber: string;
  repository: string;
  dependencies: string[];
  status: 'development' | 'staging' | 'production' | 'archived';
  platform: string[];
  requirements: string[];
}
