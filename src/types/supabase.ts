export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      auction_answer: {
        Row: {
          answer: string;
          auction_answer_id: string;
          auction_question_id: string;
          created_at: string;
          user_id: string;
        };
        Insert: {
          answer?: string;
          auction_answer_id?: string;
          auction_question_id: string;
          created_at?: string;
          user_id: string;
        };
        Update: {
          answer?: string;
          auction_answer_id?: string;
          auction_question_id?: string;
          created_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "auction_answer_auction_question_id_fkey";
            columns: ["auction_question_id"];
            isOneToOne: false;
            referencedRelation: "user_info";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "auction_answer_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_info";
            referencedColumns: ["user_id"];
          },
        ];
      };
      auction_images: {
        Row: {
          auction_id: string;
          created_at: string;
          image_id: string;
          image_path: string | null;
        };
        Insert: {
          auction_id: string;
          created_at?: string;
          image_id?: string;
          image_path?: string | null;
        };
        Update: {
          auction_id?: string;
          created_at?: string;
          image_id?: string;
          image_path?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "\bauction_images_auction_id_fkey";
            columns: ["auction_id"];
            isOneToOne: false;
            referencedRelation: "auction_post";
            referencedColumns: ["auction_id"];
          },
        ];
      };
      auction_like: {
        Row: {
          auction_id: string;
          created_at: string;
          like_id: string;
          user_id: string;
        };
        Insert: {
          auction_id: string;
          created_at?: string;
          like_id?: string;
          user_id: string;
        };
        Update: {
          auction_id?: string;
          created_at?: string;
          like_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "auction_like_auction_id_fkey";
            columns: ["auction_id"];
            isOneToOne: false;
            referencedRelation: "auction_post";
            referencedColumns: ["auction_id"];
          },
          {
            foreignKeyName: "auction_like_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_info";
            referencedColumns: ["user_id"];
          },
        ];
      };
      auction_post: {
        Row: {
          auction_end_date: string;
          auction_id: string;
          auction_start_date: string;
          auction_status: string;
          category_id: string;
          content: string;
          created_at: string;
          lower_limit: number;
          product_img: string | null;
          product_status: string;
          shipping_type: string;
          title: string;
          upper_limit: number;
          user_id: string;
        };
        Insert: {
          auction_end_date: string;
          auction_id?: string;
          auction_start_date: string;
          auction_status?: string;
          category_id: string;
          content?: string;
          created_at?: string;
          lower_limit: number;
          product_img?: string | null;
          product_status?: string;
          shipping_type?: string;
          title?: string;
          upper_limit: number;
          user_id: string;
        };
        Update: {
          auction_end_date?: string;
          auction_id?: string;
          auction_start_date?: string;
          auction_status?: string;
          category_id?: string;
          content?: string;
          created_at?: string;
          lower_limit?: number;
          product_img?: string | null;
          product_status?: string;
          shipping_type?: string;
          title?: string;
          upper_limit?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "auction_post_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "auction_post_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_info";
            referencedColumns: ["user_id"];
          },
        ];
      };
      auction_question: {
        Row: {
          auction_id: string;
          auction_question_id: string;
          created_at: string;
          question: string;
          title: string;
          user_id: string;
        };
        Insert: {
          auction_id: string;
          auction_question_id?: string;
          created_at?: string;
          question?: string;
          title?: string;
          user_id: string;
        };
        Update: {
          auction_id?: string;
          auction_question_id?: string;
          created_at?: string;
          question?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "auction_question_auction_id_fkey";
            columns: ["auction_id"];
            isOneToOne: false;
            referencedRelation: "auction_post";
            referencedColumns: ["auction_id"];
          },
          {
            foreignKeyName: "auction_question_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_info";
            referencedColumns: ["user_id"];
          },
        ];
      };
      category: {
        Row: {
          category_id: string;
          category_name: string;
          created_at: string;
        };
        Insert: {
          category_id?: string;
          category_name?: string;
          created_at?: string;
        };
        Update: {
          category_id?: string;
          category_name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      user_info: {
        Row: {
          address1: string | null;
          address2: string | null;
          created_at: string;
          profile_image: string | null;
          user_email: string;
          user_id: string;
        };
        Insert: {
          address1?: string | null;
          address2?: string | null;
          created_at?: string;
          profile_image?: string | null;
          user_email?: string;
          user_id?: string;
        };
        Update: {
          address1?: string | null;
          address2?: string | null;
          created_at?: string;
          profile_image?: string | null;
          user_email?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
