export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_analysis_records: {
        Row: {
          confidence_score: number
          created_at: string
          domain_id: string
          id: string
          metadata: Json | null
          query_text: string
          response_text: string
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          confidence_score: number
          created_at?: string
          domain_id: string
          id?: string
          metadata?: Json | null
          query_text: string
          response_text: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          confidence_score?: number
          created_at?: string
          domain_id?: string
          id?: string
          metadata?: Json | null
          query_text?: string
          response_text?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_analysis_records_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "knowledge_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          resource_id: string | null
          resource_type: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          resource_id?: string | null
          resource_type: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          resource_id?: string | null
          resource_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      auth_methods: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          last_authenticated: string | null
          metadata: Json | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_authenticated?: string | null
          metadata?: Json | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_authenticated?: string | null
          metadata?: Json | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          context_data: Json | null
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          parent_message_id: string | null
          role: string
          user_id: string
        }
        Insert: {
          content: string
          context_data?: Json | null
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          parent_message_id?: string | null
          role: string
          user_id: string
        }
        Update: {
          content?: string
          context_data?: Json | null
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          parent_message_id?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_checks: {
        Row: {
          confidence_score: number
          created_at: string
          description: string
          evidence: Json
          id: string
          metadata: Json | null
          rule_id: string
          severity: number
          status: Database["public"]["Enums"]["reasoning_status"]
        }
        Insert: {
          confidence_score: number
          created_at?: string
          description: string
          evidence?: Json
          id?: string
          metadata?: Json | null
          rule_id: string
          severity: number
          status: Database["public"]["Enums"]["reasoning_status"]
        }
        Update: {
          confidence_score?: number
          created_at?: string
          description?: string
          evidence?: Json
          id?: string
          metadata?: Json | null
          rule_id?: string
          severity?: number
          status?: Database["public"]["Enums"]["reasoning_status"]
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      document_attachments: {
        Row: {
          content_type: string
          file_path: string
          id: string
          name: string
          size: number
          solicitation_id: string
          uploaded_at: string
          uploaded_by: string
          version: number
        }
        Insert: {
          content_type: string
          file_path: string
          id?: string
          name: string
          size: number
          solicitation_id: string
          uploaded_at?: string
          uploaded_by: string
          version?: number
        }
        Update: {
          content_type?: string
          file_path?: string
          id?: string
          name?: string
          size?: number
          solicitation_id?: string
          uploaded_at?: string
          uploaded_by?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_attachments_solicitation_id_fkey"
            columns: ["solicitation_id"]
            isOneToOne: false
            referencedRelation: "solicitations"
            referencedColumns: ["id"]
          },
        ]
      }
      far_citations: {
        Row: {
          applicability: string[]
          id: string
          last_updated: string
          part: string
          section: string
          source_document: string | null
          subpart: string
          text: string
          title: string
        }
        Insert: {
          applicability: string[]
          id?: string
          last_updated?: string
          part: string
          section: string
          source_document?: string | null
          subpart: string
          text: string
          title: string
        }
        Update: {
          applicability?: string[]
          id?: string
          last_updated?: string
          part?: string
          section?: string
          source_document?: string | null
          subpart?: string
          text?: string
          title?: string
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          created_at: string
          form_data: Json
          form_type: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          form_data: Json
          form_type: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          form_data?: Json
          form_type?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      framework_component_relationships: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          relationship_type: string
          source_component_id: string
          target_component_id: string
          weight: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          relationship_type: string
          source_component_id: string
          target_component_id: string
          weight?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          relationship_type?: string
          source_component_id?: string
          target_component_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "framework_component_relationships_source_component_id_fkey"
            columns: ["source_component_id"]
            isOneToOne: false
            referencedRelation: "mathematical_framework_components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "framework_component_relationships_target_component_id_fkey"
            columns: ["target_component_id"]
            isOneToOne: false
            referencedRelation: "mathematical_framework_components"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_documents: {
        Row: {
          content_text: string | null
          created_at: string
          created_by: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          knowledge_domain_id: string | null
          metadata: Json | null
          status: string | null
        }
        Insert: {
          content_text?: string | null
          created_at?: string
          created_by: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          knowledge_domain_id?: string | null
          metadata?: Json | null
          status?: string | null
        }
        Update: {
          content_text?: string | null
          created_at?: string
          created_by?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          knowledge_domain_id?: string | null
          metadata?: Json | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_documents_knowledge_domain_id_fkey"
            columns: ["knowledge_domain_id"]
            isOneToOne: false
            referencedRelation: "knowledge_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_domains: {
        Row: {
          coordinates: string | null
          created_at: string
          description: string | null
          domain_type: string
          id: string
          metadata: Json | null
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          coordinates?: string | null
          created_at?: string
          description?: string | null
          domain_type: string
          id?: string
          metadata?: Json | null
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          coordinates?: string | null
          created_at?: string
          description?: string | null
          domain_type?: string
          id?: string
          metadata?: Json | null
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_domains_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "knowledge_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      mathematical_framework_components: {
        Row: {
          component_type: Database["public"]["Enums"]["framework_component_type"]
          created_at: string
          description: string | null
          formula: string
          id: string
          metadata: Json | null
          name: string
          updated_at: string
          variables: Json | null
        }
        Insert: {
          component_type: Database["public"]["Enums"]["framework_component_type"]
          created_at?: string
          description?: string | null
          formula: string
          id?: string
          metadata?: Json | null
          name: string
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          component_type?: Database["public"]["Enums"]["framework_component_type"]
          created_at?: string
          description?: string | null
          formula?: string
          id?: string
          metadata?: Json | null
          name?: string
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      metrics: {
        Row: {
          avg_review_time: number
          avg_review_time_change: number
          compliance_rate: number
          compliance_rate_change: number
          created_at: string
          id: string
          pending_reviews: number
          pending_reviews_change: number
          tasks_completed: number
          tasks_completed_change: number
          updated_at: string
        }
        Insert: {
          avg_review_time?: number
          avg_review_time_change?: number
          compliance_rate?: number
          compliance_rate_change?: number
          created_at?: string
          id?: string
          pending_reviews?: number
          pending_reviews_change?: number
          tasks_completed?: number
          tasks_completed_change?: number
          updated_at?: string
        }
        Update: {
          avg_review_time?: number
          avg_review_time_change?: number
          compliance_rate?: number
          compliance_rate_change?: number
          created_at?: string
          id?: string
          pending_reviews?: number
          pending_reviews_change?: number
          tasks_completed?: number
          tasks_completed_change?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      reasoning_result_checks: {
        Row: {
          check_id: string
          created_at: string
          result_id: string
        }
        Insert: {
          check_id: string
          created_at?: string
          result_id: string
        }
        Update: {
          check_id?: string
          created_at?: string
          result_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reasoning_result_checks_check_id_fkey"
            columns: ["check_id"]
            isOneToOne: false
            referencedRelation: "compliance_checks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reasoning_result_checks_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "reasoning_results"
            referencedColumns: ["id"]
          },
        ]
      }
      reasoning_result_steps: {
        Row: {
          created_at: string
          result_id: string
          step_id: string
        }
        Insert: {
          created_at?: string
          result_id: string
          step_id: string
        }
        Update: {
          created_at?: string
          result_id?: string
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reasoning_result_steps_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "reasoning_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reasoning_result_steps_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "reasoning_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      reasoning_results: {
        Row: {
          compliance_checks: string[]
          conclusion: string
          confidence_score: number
          created_at: string
          id: string
          metadata: Json | null
          reasoning_steps: string[]
          supporting_evidence: Json
        }
        Insert: {
          compliance_checks?: string[]
          conclusion: string
          confidence_score: number
          created_at?: string
          id?: string
          metadata?: Json | null
          reasoning_steps?: string[]
          supporting_evidence?: Json
        }
        Update: {
          compliance_checks?: string[]
          conclusion?: string
          confidence_score?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          reasoning_steps?: string[]
          supporting_evidence?: Json
        }
        Relationships: []
      }
      reasoning_steps: {
        Row: {
          confidence_score: number
          created_at: string
          description: string
          id: string
          inputs: Json
          logic_applied: string
          metadata: Json | null
          output: string
          step_id: string
          supporting_evidence: Json
        }
        Insert: {
          confidence_score: number
          created_at?: string
          description: string
          id?: string
          inputs?: Json
          logic_applied: string
          metadata?: Json | null
          output: string
          step_id: string
          supporting_evidence?: Json
        }
        Update: {
          confidence_score?: number
          created_at?: string
          description?: string
          id?: string
          inputs?: Json
          logic_applied?: string
          metadata?: Json | null
          output?: string
          step_id?: string
          supporting_evidence?: Json
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      solicitation_citations: {
        Row: {
          citation_id: string
          created_at: string
          id: string
          solicitation_id: string
        }
        Insert: {
          citation_id: string
          created_at?: string
          id?: string
          solicitation_id: string
        }
        Update: {
          citation_id?: string
          created_at?: string
          id?: string
          solicitation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solicitation_citations_citation_id_fkey"
            columns: ["citation_id"]
            isOneToOne: false
            referencedRelation: "far_citations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitation_citations_solicitation_id_fkey"
            columns: ["solicitation_id"]
            isOneToOne: false
            referencedRelation: "solicitations"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitations: {
        Row: {
          created_at: string
          created_by: string
          current_reviewer: string | null
          description: string | null
          due_date: string | null
          estimated_value: number | null
          id: string
          status: Database["public"]["Enums"]["solicitation_status"]
          title: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          created_by: string
          current_reviewer?: string | null
          description?: string | null
          due_date?: string | null
          estimated_value?: number | null
          id?: string
          status?: Database["public"]["Enums"]["solicitation_status"]
          title: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          current_reviewer?: string | null
          description?: string | null
          due_date?: string | null
          estimated_value?: number | null
          id?: string
          status?: Database["public"]["Enums"]["solicitation_status"]
          title?: string
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      texas_chat_messages: {
        Row: {
          agency_type: Database["public"]["Enums"]["texas_agency_type"]
          content: string
          context_data: Json | null
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          response_level: string | null
          role: string
          user_id: string
          user_role: Database["public"]["Enums"]["texas_role"]
        }
        Insert: {
          agency_type: Database["public"]["Enums"]["texas_agency_type"]
          content: string
          context_data?: Json | null
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          response_level?: string | null
          role: string
          user_id: string
          user_role: Database["public"]["Enums"]["texas_role"]
        }
        Update: {
          agency_type?: Database["public"]["Enums"]["texas_agency_type"]
          content?: string
          context_data?: Json | null
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          response_level?: string | null
          role?: string
          user_id?: string
          user_role?: Database["public"]["Enums"]["texas_role"]
        }
        Relationships: [
          {
            foreignKeyName: "texas_chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "texas_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      texas_conversations: {
        Row: {
          created_at: string
          id: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      texas_response_validations: {
        Row: {
          confidence_score: number
          created_at: string
          id: string
          message_id: string
          status: Database["public"]["Enums"]["validation_status"]
          updated_at: string
          validated_by: string | null
          validation_data: Json | null
          validation_notes: string | null
        }
        Insert: {
          confidence_score?: number
          created_at?: string
          id?: string
          message_id: string
          status?: Database["public"]["Enums"]["validation_status"]
          updated_at?: string
          validated_by?: string | null
          validation_data?: Json | null
          validation_notes?: string | null
        }
        Update: {
          confidence_score?: number
          created_at?: string
          id?: string
          message_id?: string
          status?: Database["public"]["Enums"]["validation_status"]
          updated_at?: string
          validated_by?: string | null
          validation_data?: Json | null
          validation_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "texas_response_validations_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "texas_chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      user_documents: {
        Row: {
          conversation_id: string | null
          extracted_text: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          metadata: Json | null
          processed_status: string | null
          uploaded_at: string
          user_id: string
        }
        Insert: {
          conversation_id?: string | null
          extracted_text?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          metadata?: Json | null
          processed_status?: string | null
          uploaded_at?: string
          user_id: string
        }
        Update: {
          conversation_id?: string | null
          extracted_text?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          metadata?: Json | null
          processed_status?: string | null
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_documents_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          email_verified: boolean | null
          full_name: string | null
          id: string
          last_login: string | null
          password_reset_expires: string | null
          password_reset_token: string | null
          role: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          last_login?: string | null
          password_reset_expires?: string | null
          password_reset_token?: string | null
          role?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          password_reset_expires?: string | null
          password_reset_token?: string | null
          role?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          last_login: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_login?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_login?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      version_history: {
        Row: {
          changed_at: string
          changed_by: string
          changes: Json
          id: string
          previous_version: string | null
          solicitation_id: string
          version: number
        }
        Insert: {
          changed_at?: string
          changed_by: string
          changes: Json
          id?: string
          previous_version?: string | null
          solicitation_id: string
          version: number
        }
        Update: {
          changed_at?: string
          changed_by?: string
          changes?: Json
          id?: string
          previous_version?: string | null
          solicitation_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "version_history_previous_version_fkey"
            columns: ["previous_version"]
            isOneToOne: false
            referencedRelation: "version_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_history_solicitation_id_fkey"
            columns: ["solicitation_id"]
            isOneToOne: false
            referencedRelation: "solicitations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_password_reset_token: {
        Args: {
          user_email: string
        }
        Returns: string
      }
    }
    Enums: {
      document_type: "RFI" | "RFP" | "RFQ" | "SOW" | "PWS"
      domain_type: "CORE" | "SPECIALIZED" | "SUPPORT"
      framework_component_type:
        | "PILLAR"
        | "LEVEL"
        | "BRANCH"
        | "NODE"
        | "RISK"
        | "TRACKING"
        | "RESOURCE"
        | "COMPLIANCE"
        | "PROCESS"
        | "SECURITY"
        | "INTEGRATION"
      reasoning_status: "passed" | "failed" | "warning"
      reasoning_type: "analytical" | "inductive" | "deductive" | "general"
      solicitation_status: "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED"
      texas_agency_type:
        | "TEXAS_GOVERNMENT"
        | "TEXAS_EDUCATION"
        | "TEXAS_HEALTHCARE"
      texas_role:
        | "CONTRACTING_OFFICER"
        | "SOURCE_SELECTION_AUTHORITY"
        | "TECHNICAL_EVALUATION_PANEL"
        | "COST_PRICE_ANALYST"
        | "LEGAL_COMPLIANCE_ADVISOR"
        | "PAST_PERFORMANCE_EVALUATOR"
        | "SMALL_BUSINESS_LIAISON"
        | "PROPOSAL_REVIEW_STAFF"
        | "PROTEST_APPEALS_OFFICER"
      user_role: "user" | "super_user" | "admin"
      user_status: "ACTIVE" | "INACTIVE" | "SUSPENDED"
      validation_status: "pending" | "valid" | "invalid" | "needs_review"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
