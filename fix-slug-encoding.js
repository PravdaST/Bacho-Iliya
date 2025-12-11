/**
 * Fix slug encoding issue for the smetana-katyk article
 * Changes smétana to smetana (removes accent)
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lrtbkvbmciqalpfvxxrh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydGJrdmJtY2lxYWxwZnZ4eHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ3MjgxNCwiZXhwIjoyMDc2MDQ4ODE0fQ.nM8M1QtdgWu9fba6XNzpwsoNzX4uyooFKH7SBHT3CZs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSlugEncoding() {
  console.log('Looking for article with problematic slug...');

  // Update the article with the problematic slug
  const oldSlug = 'rodopski-mlechni-specialiteti-smétana-katyk';
  const newSlug = 'rodopski-mlechni-specialiteti-smetana-katyk';

  console.log(`Updating slug from: ${oldSlug}`);
  console.log(`To: ${newSlug}`);

  const { error } = await supabase
    .from('blog_posts')
    .update({ slug: newSlug })
    .eq('slug', oldSlug);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Slug fixed successfully!');
}

fixSlugEncoding().catch(console.error);
