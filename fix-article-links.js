/**
 * Fix broken internal links in Supabase articles
 * Replaces /learn/ with /blog/learn/ and /recipes/ with /blog/learn/
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lrtbkvbmciqalpfvxxrh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydGJrdmJtY2lxYWxwZnZ4eHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ3MjgxNCwiZXhwIjoyMDc2MDQ4ODE0fQ.nM8M1QtdgWu9fba6XNzpwsoNzX4uyooFKH7SBHT3CZs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixArticleLinks() {
  console.log('Fetching articles from Supabase...');

  // Get all articles
  const { data: articles, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, content');

  if (error) {
    console.error('Error fetching articles:', error);
    return;
  }

  console.log(`Found ${articles.length} articles`);

  let fixedCount = 0;

  for (const article of articles) {
    let content = article.content;
    let needsUpdate = false;

    // Check if content has broken links
    if (content.includes('href="/learn/') || content.includes('href="/recipes/')) {
      needsUpdate = true;

      // Fix /learn/ -> /blog/learn/
      content = content.replace(/href="\/learn\//g, 'href="/blog/learn/');

      // Fix /recipes/ -> /blog/learn/ (with slug mapping)
      // These are approximate mappings based on the CSV report
      const recipeRedirects = {
        '/recipes/yaitza-po-panagurski': '/blog/learn/yaytsa-po-panagyurski-retsepta',
        '/recipes/patatnik-recipe': '/blog/learn/patatnik-recepta',
        '/recipes/patatnik': '/blog/learn/patatnik-recepta',
        '/recipes/klasicheska-recepta-tarator': '/blog/learn/tarator-recepta',
        '/recipes/krem-karamel-recepta': '/blog/learn/tradicionni-rodopski-yastiya-s-izvara',
        '/recipes/rodopski-klin': '/blog/learn/rodopski-klin-recepta',
        '/recipes/mekitsi-sirene-kiselo-mlyako': '/blog/learn/mekitsi-sas-sirene-i-kiselomlyako-recepta',
        '/recipes/mechitsi-sas-sirene-kiselo-mlyako': '/blog/learn/mekitsi-sas-sirene-i-kiselomlyako-recepta',
        '/recipes/sirene-po-shopski': '/blog/learn/sirene-po-shopski-recepta',
        '/recipes/kak-se-pravi-katak': '/blog/learn/ayryan-domashna-recepta',
        '/recipes/katyk-s-chesan-i-orehi': '/blog/learn/recepta-salata-snezhanka',
      };

      for (const [oldPath, newPath] of Object.entries(recipeRedirects)) {
        content = content.replace(new RegExp(`href="${oldPath}"`, 'g'), `href="${newPath}"`);
      }

      // Fix product links that don't exist
      content = content.replace(/href="\/products\/maslo-bacho-iliya"/g, 'href="/products"');
      content = content.replace(/href="\/products\/maslo"/g, 'href="/products"');
      content = content.replace(/href="\/products\/fermentirani-mlechni-produkti"/g, 'href="/products"');
    }

    if (needsUpdate) {
      console.log(`Fixing links in: ${article.title} (${article.slug})`);

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ content })
        .eq('id', article.id);

      if (updateError) {
        console.error(`Error updating ${article.slug}:`, updateError);
      } else {
        fixedCount++;
      }
    }
  }

  console.log(`\nDone! Fixed ${fixedCount} articles.`);
}

fixArticleLinks().catch(console.error);
