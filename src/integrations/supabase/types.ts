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
      user_roles: {
        Row: {
          created_at: string
          id: string
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
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
      [_ in never]: never
    }
    Enums: {
      document_type: "RFI" | "RFP" | "RFQ" | "SOW" | "PWS"
      solicitation_status: "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED"
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
