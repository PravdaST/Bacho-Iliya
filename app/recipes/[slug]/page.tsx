import { notFound } from 'next/navigation';
import { getRecipeBySlug, getAllRecipeSlugs } from '@/lib/recipes-data';
import { RecipeSchema, BreadcrumbSchema } from '@/components/seo';
import RecipeDetailClient from './RecipeDetailClient';
import type { Metadata } from 'next';

// Generate dynamic metadata for each recipe
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const recipe = getRecipeBySlug(resolvedParams.slug);

  if (!recipe) {
    return {
      title: 'Рецепта не е намерена',
      description: 'Търсената рецепта не съществува.',
    };
  }

  // Calculate total time for description
  const prepMinutes = parseInt(recipe.prepTime) || 0;
  const cookMinutes = parseInt(recipe.cookTime) || 0;
  const totalMinutes = prepMinutes + cookMinutes;

  return {
    title: `${recipe.titleBg} - Традиционна Българска Рецепта`,
    description: `${recipe.descriptionBg} Време за приготвяне: ${totalMinutes} мин. Порции: ${recipe.servings}. Рецепта с продукти Бачо Илия.`,
    keywords: [
      recipe.titleBg,
      'българска рецепта',
      'традиционна кухня',
      'бачо илия',
      ...recipe.ingredients.slice(0, 5).map((ing) => ing.itemBg),
    ],
    openGraph: {
      title: `${recipe.titleBg} - Рецепта`,
      description: recipe.descriptionBg,
      images: [recipe.image],
      type: 'article',
    },
  };
}

// Server Component - resolves async params
export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const recipe = getRecipeBySlug(resolvedParams.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      {/* SEO: Recipe Schema.org Structured Data */}
      <RecipeSchema recipe={recipe} />

      {/* SEO: Breadcrumb Navigation */}
      <BreadcrumbSchema
        breadcrumbs={[
          { name: 'Начало', url: '/' },
          { name: 'Рецепти', url: '/recipes' },
          { name: recipe.titleBg }, // Last item without URL
        ]}
      />

      <RecipeDetailClient recipe={recipe} />
    </>
  );
}

// Generate static paths for all recipes
export async function generateStaticParams() {
  const slugs = getAllRecipeSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}
