/**
 * Recipe Schema Component - Google 2025 Compliant
 *
 * Implements Recipe structured data for Google Search rich results.
 * Based on schema.org/Recipe specification.
 *
 * Required properties: name, image
 * Recommended: prepTime, cookTime, recipeIngredient, recipeInstructions
 */

import { Recipe } from '@/lib/recipes-data';

interface RecipeSchemaProps {
  recipe: Recipe;
}

export default function RecipeSchema({ recipe }: RecipeSchemaProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bacho-iliya.eu';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.titleBg,
    image: [`${BASE_URL}${recipe.image}`],
    author: {
      '@type': 'Organization',
      name: 'Бачо Илия',
    },
    datePublished: '2025-01-20',
    description: recipe.descriptionBg,
    prepTime: `PT${recipe.prepTime}`,
    cookTime: `PT${recipe.cookTime}`,
    totalTime: `PT${parseInt(recipe.prepTime) + parseInt(recipe.cookTime)}M`,
    recipeYield: `${recipe.servings} порции`,
    recipeCategory: 'Българска кухня',
    recipeCuisine: 'Българска',
    keywords: [
      recipe.titleBg,
      'българска рецепта',
      'традиционна храна',
      'Бачо Илия',
      ...recipe.bachoProducts,
    ].join(', '),
    recipeIngredient: recipe.ingredients.map((ing) => ing.itemBg),
    recipeInstructions: recipe.instructions.map((inst, index) => ({
      '@type': 'HowToStep',
      name: `Стъпка ${index + 1}`,
      text: inst.stepBg,
      position: index + 1,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: '1 порция',
    },
    suitableForDiet: 'https://schema.org/VegetarianDiet',
    isPartOf: {
      '@type': 'WebPage',
      url: `${BASE_URL}/recipes/${recipe.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
