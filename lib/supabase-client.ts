import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Server-side rendering doesn't need session persistence
  },
});

// Type definitions matching our Supabase schema
export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  category: 'cheese' | 'yogurt' | 'drinks' | 'other';
  short_description: string;
  full_description: string;
  image: string;
  ingredients: string[];
  nutrition_per_100g: {
    energy: string;
    fat: string;
    saturatedFat: string;
    carbohydrates: string;
    sugars: string;
    protein: string;
    salt: string;
    calcium?: string;
  };
  related_recipes: string[];
  bacho_tip: string;
  features: string[];
  shelf_life: string;
  storage: string;
}

export interface ProductSizeRow {
  id: number;
  product_id: string;
  size: string;
  weight: string;
  price?: string;
  image?: string;
  description?: string;
  display_order: number;
}

export interface ProductTestimonialRow {
  id: number;
  product_id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  display_order: number;
}

export interface RecipeRow {
  id: number;
  slug: string;
  title: string;
  title_bg: string;
  description: string;
  description_bg: string;
  image: string;
  prep_time: string;
  cook_time: string;
  servings: number;
  difficulty: 'Лесна' | 'Средна' | 'Трудна';
  bacho_products: string[];
  story: string;
  story_bg: string;
}

export interface RecipeIngredientRow {
  id: number;
  recipe_id: number;
  item: string;
  item_bg: string;
  display_order: number;
}

export interface RecipeInstructionRow {
  id: number;
  recipe_id: number;
  step: string;
  step_bg: string;
  step_number: number;
}

export interface RecipeTipRow {
  id: number;
  recipe_id: number;
  tip: string;
  tip_bg: string;
  display_order: number;
}

export interface StoreRow {
  id: string;
  name: string;
  type: 'supermarket' | 'local-shop' | 'market' | 'specialty';
  city: string;
  address: string;
  coordinates: any; // PostGIS geography type
  phone?: string;
  working_hours: string;
  products: string[];
  description?: string;
}
