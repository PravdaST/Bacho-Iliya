import { createClient } from '@supabase/supabase-js';
import { recipes } from '../lib/recipes-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateRecipes() {
  console.log(`🚀 Starting migration of ${recipes.length} recipes...`);

  // Skip first recipe (already migrated)
  const recipesToMigrate = recipes.slice(1);

  for (const recipe of recipesToMigrate) {
    console.log(`\n📝 Migrating: ${recipe.titleBg}`);

    try {
      // Insert recipe
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .insert({
          slug: recipe.slug,
          title: recipe.title,
          title_bg: recipe.titleBg,
          description: recipe.description,
          description_bg: recipe.descriptionBg,
          image: recipe.image,
          prep_time: recipe.prepTime,
          cook_time: recipe.cookTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          bacho_products: recipe.bachoProducts,
          story: recipe.story,
          story_bg: recipe.storyBg,
        })
        .select('id')
        .single();

      if (recipeError) {
        console.error(`❌ Error inserting recipe ${recipe.slug}:`, recipeError);
        continue;
      }

      const recipeId = recipeData.id;
      console.log(`✅ Recipe inserted with ID: ${recipeId}`);

      // Insert ingredients
      const ingredients = recipe.ingredients.map((ing, index) => ({
        recipe_id: recipeId,
        item: ing.item,
        item_bg: ing.itemBg,
        display_order: index + 1,
      }));

      const { error: ingredientsError } = await supabase
        .from('recipe_ingredients')
        .insert(ingredients);

      if (ingredientsError) {
        console.error(`❌ Error inserting ingredients:`, ingredientsError);
      } else {
        console.log(`✅ Inserted ${ingredients.length} ingredients`);
      }

      // Insert instructions
      const instructions = recipe.instructions.map((inst, index) => ({
        recipe_id: recipeId,
        step: inst.step,
        step_bg: inst.stepBg,
        step_number: index + 1,
      }));

      const { error: instructionsError } = await supabase
        .from('recipe_instructions')
        .insert(instructions);

      if (instructionsError) {
        console.error(`❌ Error inserting instructions:`, instructionsError);
      } else {
        console.log(`✅ Inserted ${instructions.length} instructions`);
      }

      // Insert tips
      const tips = recipe.tips.map((tip, index) => ({
        recipe_id: recipeId,
        tip: tip.tip,
        tip_bg: tip.tipBg,
        display_order: index + 1,
      }));

      const { error: tipsError } = await supabase.from('recipe_tips').insert(tips);

      if (tipsError) {
        console.error(`❌ Error inserting tips:`, tipsError);
      } else {
        console.log(`✅ Inserted ${tips.length} tips`);
      }

      console.log(`✅ Successfully migrated: ${recipe.titleBg}`);
    } catch (error) {
      console.error(`❌ Unexpected error for ${recipe.slug}:`, error);
    }
  }

  console.log('\n🎉 Migration complete!');
}

migrateRecipes().catch(console.error);
