
export type KnowledgeDomainType = 'CORE' | 'SPECIALIZED' | 'SUPPORT';

export interface KnowledgeDomain {
  id: string;
  name: string;
  domain_type: KnowledgeDomainType;
  description?: string;
  parent_id?: string;
  coordinates?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface AIAnalysisRecord {
  id: string;
  domain_id: string;
  query_text: string;
  response_text: string;
  confidence_score: number;
  metadata?: Record<string, any>;
  created_at: string;
  validated_by?: string;
  validated_at?: string;
}
