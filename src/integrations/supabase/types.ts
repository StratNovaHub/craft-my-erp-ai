export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      compliance_records: {
        Row: {
          compliance_date: string | null
          created_at: string | null
          description: string | null
          id: string
          next_review_date: string | null
          org_id: string
          regulation: string | null
          responsible_party: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          compliance_date?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          next_review_date?: string | null
          org_id: string
          regulation?: string | null
          responsible_party?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          compliance_date?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          next_review_date?: string | null
          org_id?: string
          regulation?: string | null
          responsible_party?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string | null
          customer_id: string | null
          email: string | null
          id: string
          name: string
          org_id: string
          phone: string | null
          position: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          email?: string | null
          id?: string
          name: string
          org_id: string
          phone?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          email?: string | null
          id?: string
          name?: string
          org_id?: string
          phone?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          location: string | null
          name: string
          org_id: string
          phone: string | null
          status: Database["public"]["Enums"]["customer_status"] | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name: string
          org_id: string
          phone?: string | null
          status?: Database["public"]["Enums"]["customer_status"] | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name?: string
          org_id?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["customer_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      deals: {
        Row: {
          created_at: string | null
          customer_id: string | null
          expected_close_date: string | null
          id: string
          org_id: string
          status: Database["public"]["Enums"]["deal_status"] | null
          title: string
          updated_at: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          expected_close_date?: string | null
          id?: string
          org_id: string
          status?: Database["public"]["Enums"]["deal_status"] | null
          title: string
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          expected_close_date?: string | null
          id?: string
          org_id?: string
          status?: Database["public"]["Enums"]["deal_status"] | null
          title?: string
          updated_at?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      edge_function_meta: {
        Row: {
          id: number
          name: string | null
          note: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          note?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          note?: string | null
        }
        Relationships: []
      }
      incidents: {
        Row: {
          assigned_to: string | null
          category: Database["public"]["Enums"]["risk_category"]
          created_at: string | null
          description: string | null
          id: string
          org_id: string
          reported_date: string | null
          resolved_date: string | null
          severity: Database["public"]["Enums"]["risk_severity"]
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          category: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          org_id: string
          reported_date?: string | null
          resolved_date?: string | null
          severity: Database["public"]["Enums"]["risk_severity"]
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          org_id?: string
          reported_date?: string | null
          resolved_date?: string | null
          severity?: Database["public"]["Enums"]["risk_severity"]
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      inventory_batches: {
        Row: {
          batch_number: string
          created_at: string | null
          expiry_date: string | null
          id: string
          org_id: string
          product_id: string | null
          quantity: number
          received_date: string
          supplier: string | null
          updated_at: string | null
        }
        Insert: {
          batch_number: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          org_id: string
          product_id?: string | null
          quantity: number
          received_date: string
          supplier?: string | null
          updated_at?: string | null
        }
        Update: {
          batch_number?: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          org_id?: string
          product_id?: string | null
          quantity?: number
          received_date?: string
          supplier?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_batches_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      join_requests: {
        Row: {
          id: string
          org_id: string
          processed_at: string | null
          processed_by: string | null
          requested_at: string
          status: string
          user_id: string
        }
        Insert: {
          id?: string
          org_id: string
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string
          status?: string
          user_id: string
        }
        Update: {
          id?: string
          org_id?: string
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "join_requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          org_id: string
          product_id: string | null
          quantity: number
          total_price: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          id?: string
          order_id?: string | null
          org_id: string
          product_id?: string | null
          quantity: number
          total_price: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string | null
          org_id?: string
          product_id?: string | null
          quantity?: number
          total_price?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          delivery_date: string | null
          id: string
          notes: string | null
          order_date: string | null
          order_number: string
          org_id: string
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string | null
          order_number: string
          org_id: string
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string | null
          order_number?: string
          org_id?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          org_id: string
          role: string
          user_id: string
        }
        Insert: {
          org_id: string
          role?: string
          user_id: string
        }
        Update: {
          org_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          org_id: string
          price: number
          sku: string
          stock_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          org_id: string
          price: number
          sku: string
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          org_id?: string
          price?: number
          sku?: string
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resource_permissions: {
        Row: {
          can_read: boolean
          granted_at: string
          granted_by: string | null
          id: string
          member_user_id: string
          org_id: string
          resource_key: string
          resource_type: string
          updated_at: string
        }
        Insert: {
          can_read?: boolean
          granted_at?: string
          granted_by?: string | null
          id?: string
          member_user_id: string
          org_id: string
          resource_key: string
          resource_type: string
          updated_at?: string
        }
        Update: {
          can_read?: boolean
          granted_at?: string
          granted_by?: string | null
          id?: string
          member_user_id?: string
          org_id?: string
          resource_key?: string
          resource_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_permissions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_assessments: {
        Row: {
          assessed_date: string | null
          category: Database["public"]["Enums"]["risk_category"]
          created_at: string | null
          description: string | null
          id: string
          impact_score: number | null
          mitigation_plan: string | null
          org_id: string
          probability: number | null
          severity: Database["public"]["Enums"]["risk_severity"]
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assessed_date?: string | null
          category: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          impact_score?: number | null
          mitigation_plan?: string | null
          org_id: string
          probability?: number | null
          severity: Database["public"]["Enums"]["risk_severity"]
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assessed_date?: string | null
          category?: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          impact_score?: number | null
          mitigation_plan?: string | null
          org_id?: string
          probability?: number | null
          severity?: Database["public"]["Enums"]["risk_severity"]
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sales_logs: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          org_id: string
          product_id: string | null
          quantity: number
          sale_date: string | null
          sale_price: number
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          org_id: string
          product_id?: string | null
          quantity: number
          sale_date?: string | null
          sale_price: number
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          org_id?: string
          product_id?: string | null
          quantity?: number
          sale_date?: string | null
          sale_price?: number
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_logs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_views: {
        Row: {
          config: Json
          created_at: string | null
          created_by: string | null
          id: string
          org_id: string
          table_name: string
          title: string
          updated_at: string | null
        }
        Insert: {
          config?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          org_id: string
          table_name: string
          title: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          org_id?: string
          table_name?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_views_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_org_with_member: {
        Args: { p_name: string; p_org_id: string; p_user_id: string }
        Returns: {
          member_role: string
          member_user_id: string
          org_id: string
          org_name: string
        }[]
      }
      create_org_with_member_v2: {
        Args: { p_name: string; p_org_id: string; p_user_id: string }
        Returns: undefined
      }
      sim_insert_customer: {
        Args: { p_id: string; p_org_id: string; p_user_id: string }
        Returns: {
          id: string
          ok: boolean
        }[]
      }
      sim_select_customers: {
        Args: { p_org_id: string; p_user_id: string }
        Returns: {
          id: string
          org_id: string
        }[]
      }
      sim_select_organizations: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          name: string
        }[]
      }
      sim_user_is_member: {
        Args: { p_org_id: string; p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      customer_status: "active" | "inactive" | "prospect" | "churned"
      deal_status:
        | "lead"
        | "qualified"
        | "proposal"
        | "negotiation"
        | "closed_won"
        | "closed_lost"
      order_status:
        | "pending"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      risk_category:
        | "operational"
        | "financial"
        | "strategic"
        | "compliance"
        | "reputational"
      risk_severity: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      customer_status: ["active", "inactive", "prospect", "churned"],
      deal_status: [
        "lead",
        "qualified",
        "proposal",
        "negotiation",
        "closed_won",
        "closed_lost",
      ],
      order_status: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      risk_category: [
        "operational",
        "financial",
        "strategic",
        "compliance",
        "reputational",
      ],
      risk_severity: ["low", "medium", "high", "critical"],
    },
  },
} as const
