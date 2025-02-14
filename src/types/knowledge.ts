
export type DomainType = 'CORE' | 'SPECIALIZED' | 'SUPPORT';

export interface KnowledgeDomain {
  id: string;
  name: string;
  domain_type: DomainType;
  description?: string;
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
  created_at: string;
  metadata?: Record<string, any>;
  validated_at?: string;
  validated_by?: string;
}

export interface ComponentRelationship {
  id: string;
  source_component_id: string;
  target_component_id: string;
  relationship_type: string;
  weight?: number;
  metadata?: Record<string, any>;
}
