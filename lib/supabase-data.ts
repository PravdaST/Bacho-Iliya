import { supabase, type ProductRow, type ProductSizeRow, type ProductTestimonialRow, type RecipeRow, type RecipeIngredientRow, type RecipeInstructionRow, type RecipeTipRow, type StoreRow } from './supabase-client';
import type { Product, ProductSize, ProductTestimonial } from './products-data';
import type { Recipe } from './recipes-data';
import type { StoreLocation } from './stores-data';

/**
 * Products Data Fetching
 */

export async function getAllProductsFromDB(): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      sizes:product_sizes(*),
      testimonials:product_testimonials(*)
    `)
    .order('id');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return products.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    shortDescription: p.short_description,
    fullDescription: p.full_description,
    image: p.image,
    sizes: (p.sizes || [])
      .sort((a: ProductSizeRow, b: ProductSizeRow) => a.display_order - b.display_order)
      .map((s: ProductSizeRow) => ({
        size: s.size,
        weight: s.weight,
        price: s.price,
        image: s.image,
        description: s.description,
      })),
    ingredients: p.ingredients,
    nutritionPer100g: p.nutrition_per_100g,
    relatedRecipes: p.related_recipes,
    bachoTip: p.bacho_tip,
    testimonials: (p.testimonials || [])
      .sort((a: ProductTestimonialRow, b: ProductTestimonialRow) => a.display_order - b.display_order)
      .map((t: ProductTestimonialRow) => ({
        name: t.name,
        location: t.location,
        quote: t.quote,
        rating: t.rating,
      })),
    features: p.features,
    shelfLife: p.shelf_life,
    storage: p.storage,
  }));
}

export async function getProductBySlugFromDB(slug: string): Promise<Product | undefined> {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      sizes:product_sizes(*),
      testimonials:product_testimonials(*)
    `)
    .eq('slug', slug)
    .single();

  if (error || !product) {
    console.error('Error fetching product:', error);
    return undefined;
  }

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    shortDescription: product.short_description,
    fullDescription: product.full_description,
    image: product.image,
    sizes: (product.sizes || [])
      .sort((a: ProductSizeRow, b: ProductSizeRow) => a.display_order - b.display_order)
      .map((s: ProductSizeRow) => ({
        size: s.size,
        weight: s.weight,
        price: s.price,
        image: s.image,
        description: s.description,
      })),
    ingredients: product.ingredients,
    nutritionPer100g: product.nutrition_per_100g,
    relatedRecipes: product.related_recipes,
    bachoTip: product.bacho_tip,
    testimonials: (product.testimonials || [])
      .sort((a: ProductTestimonialRow, b: ProductTestimonialRow) => a.display_order - b.display_order)
      .map((t: ProductTestimonialRow) => ({
        name: t.name,
        location: t.location,
        quote: t.quote,
        rating: t.rating,
      })),
    features: product.features,
    shelfLife: product.shelf_life,
    storage: product.storage,
  };
}

export async function getAllProductSlugsFromDB(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .order('id');

  if (error) {
    console.error('Error fetching product slugs:', error);
    return [];
  }

  return data.map((p) => p.slug);
}

/**
 * Recipes Data Fetching
 */

export async function getAllRecipesFromDB(): Promise<Recipe[]> {
  const { data: recipes, error } = await supabase
    .from('recipes')
    .select(`
      *,
      ingredients:recipe_ingredients(*),
      instructions:recipe_instructions(*),
      tips:recipe_tips(*)
    `)
    .order('id');

  if (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }

  return recipes.map((r: any) => ({
    slug: r.slug,
    title: r.title,
    titleBg: r.title_bg,
    description: r.description,
    descriptionBg: r.description_bg,
    image: r.image,
    prepTime: r.prep_time,
    cookTime: r.cook_time,
    servings: r.servings,
    difficulty: r.difficulty,
    bachoProducts: r.bacho_products,
    ingredients: (r.ingredients || [])
      .sort((a: RecipeIngredientRow, b: RecipeIngredientRow) => a.display_order - b.display_order)
      .map((i: RecipeIngredientRow) => ({
        item: i.item,
        itemBg: i.item_bg,
      })),
    instructions: (r.instructions || [])
      .sort((a: RecipeInstructionRow, b: RecipeInstructionRow) => a.step_number - b.step_number)
      .map((i: RecipeInstructionRow) => ({
        step: i.step,
        stepBg: i.step_bg,
      })),
    tips: (r.tips || [])
      .sort((a: RecipeTipRow, b: RecipeTipRow) => a.display_order - b.display_order)
      .map((t: RecipeTipRow) => ({
        tip: t.tip,
        tipBg: t.tip_bg,
      })),
    story: r.story,
    storyBg: r.story_bg,
  }));
}

export async function getRecipeBySlugFromDB(slug: string): Promise<Recipe | undefined> {
  const { data: recipe, error } = await supabase
    .from('recipes')
    .select(`
      *,
      ingredients:recipe_ingredients(*),
      instructions:recipe_instructions(*),
      tips:recipe_tips(*)
    `)
    .eq('slug', slug)
    .single();

  if (error || !recipe) {
    console.error('Error fetching recipe:', error);
    return undefined;
  }

  return {
    slug: recipe.slug,
    title: recipe.title,
    titleBg: recipe.title_bg,
    description: recipe.description,
    descriptionBg: recipe.description_bg,
    image: recipe.image,
    prepTime: recipe.prep_time,
    cookTime: recipe.cook_time,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    bachoProducts: recipe.bacho_products,
    ingredients: (recipe.ingredients || [])
      .sort((a: RecipeIngredientRow, b: RecipeIngredientRow) => a.display_order - b.display_order)
      .map((i: RecipeIngredientRow) => ({
        item: i.item,
        itemBg: i.item_bg,
      })),
    instructions: (recipe.instructions || [])
      .sort((a: RecipeInstructionRow, b: RecipeInstructionRow) => a.step_number - b.step_number)
      .map((i: RecipeInstructionRow) => ({
        step: i.step,
        stepBg: i.step_bg,
      })),
    tips: (recipe.tips || [])
      .sort((a: RecipeTipRow, b: RecipeTipRow) => a.display_order - b.display_order)
      .map((t: RecipeTipRow) => ({
        tip: t.tip,
        tipBg: t.tip_bg,
      })),
    story: recipe.story,
    storyBg: recipe.story_bg,
  };
}

export async function getAllRecipeSlugsFromDB(): Promise<string[]> {
  const { data, error} = await supabase
    .from('recipes')
    .select('slug')
    .order('id');

  if (error) {
    console.error('Error fetching recipe slugs:', error);
    return [];
  }

  return data.map((r) => r.slug);
}

/**
 * Stores Data Fetching
 */

export async function getAllStoresFromDB(): Promise<StoreLocation[]> {
  const { data: stores, error } = await supabase
    .from('stores')
    .select('*')
    .order('city, name');

  if (error) {
    console.error('Error fetching stores:', error);
    return [];
  }

  return stores.map((s: any) => ({
    id: s.id,
    name: s.name,
    type: s.type,
    city: s.city,
    address: s.address,
    coordinates: s.coordinates ? {
      lat: s.coordinates.coordinates[1], // PostGIS stores as [lng, lat]
      lng: s.coordinates.coordinates[0],
    } : { lat: 0, lng: 0 },
    phone: s.phone,
    workingHours: s.working_hours,
    products: s.products,
    description: s.description,
  }));
}

export async function getStoresByCityFromDB(city: string): Promise<StoreLocation[]> {
  const { data: stores, error } = await supabase
    .from('stores')
    .select('*')
    .eq('city', city)
    .order('name');

  if (error) {
    console.error('Error fetching stores by city:', error);
    return [];
  }

  return stores.map((s: any) => ({
    id: s.id,
    name: s.name,
    type: s.type,
    city: s.city,
    address: s.address,
    coordinates: s.coordinates ? {
      lat: s.coordinates.coordinates[1],
      lng: s.coordinates.coordinates[0],
    } : { lat: 0, lng: 0 },
    phone: s.phone,
    workingHours: s.working_hours,
    products: s.products,
    description: s.description,
  }));
}
