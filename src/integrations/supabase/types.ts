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
          phone: string | null
          position: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          position?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          position?: string | null
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
      incidents: {
        Row: {
          assigned_to: string | null
          category: Database["public"]["Enums"]["risk_category"]
          created_at: string | null
          description: string | null
          id: string
          reported_date: string | null
          resolved_date: string | null
          severity: Database["public"]["Enums"]["risk_severity"]
          status: string | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          category: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          reported_date?: string | null
          resolved_date?: string | null
          severity: Database["public"]["Enums"]["risk_severity"]
          status?: string | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          category?: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          reported_date?: string | null
          resolved_date?: string | null
          severity?: Database["public"]["Enums"]["risk_severity"]
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      inventory_batches: {
        Row: {
          batch_number: string
          created_at: string | null
          expiry_date: string | null
          id: string
          product_id: string | null
          quantity: number
          received_date: string
          supplier: string | null
        }
        Insert: {
          batch_number: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          product_id?: string | null
          quantity: number
          received_date: string
          supplier?: string | null
        }
        Update: {
          batch_number?: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          received_date?: string
          supplier?: string | null
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
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number
          total_price?: number
          unit_price?: number
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
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
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
          price?: number
          sku?: string
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
          product_id: string | null
          quantity: number
          sale_date: string | null
          sale_price: number
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          quantity: number
          sale_date?: string | null
          sale_price: number
          total_amount: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          sale_date?: string | null
          sale_price?: number
          total_amount?: number
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
