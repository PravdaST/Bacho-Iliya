/**
 * Script to send welcome emails to all registered giveaway participants
 *
 * Usage:
 *   npm run send-emails
 *   or
 *   npx tsx --env-file=.env.local scripts/send-welcome-emails.ts
 *
 * This script will:
 * 1. Fetch all entries from the database
 * 2. Send a welcome email to each participant
 * 3. Add a delay between emails to respect rate limits
 * 4. Log progress and any errors
 */

import { supabaseAdmin } from '../lib/supabase';
import { sendGiveawayWelcomeEmail } from '../lib/email';
import { products } from '../lib/store';

// Delay between emails (in milliseconds) to respect rate limits
const DELAY_BETWEEN_EMAILS = 1000; // 1 second

// Helper to get product name by ID
function getProductNameById(productId: string): string {
  const product = products.find((p) => p.id === productId);
  return product ? product.nameBg : productId;
}

// Helper to delay execution
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendWelcomeEmailsToAll() {
  console.log('🚀 Starting email sending process...\n');

  try {
    // Fetch all entries from database
    console.log('📊 Fetching all giveaway entries from database...');
    const { data: entries, error } = await supabaseAdmin
      .from('giveaway_entries')
      .select('*')
      .order('submitted_at', { ascending: true });

    if (error) {
      console.error('❌ Error fetching entries:', error);
      return;
    }

    if (!entries || entries.length === 0) {
      console.log('ℹ️ No entries found in database.');
      return;
    }

    console.log(`✅ Found ${entries.length} entries in database.\n`);

    // Ask for confirmation
    console.log('⚠️  IMPORTANT: This will send emails to all registered users!');
    console.log(`   Total emails to send: ${entries.length}`);
    console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');

    await delay(5000);

    // Send emails
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const progress = `[${i + 1}/${entries.length}]`;

      try {
        console.log(`${progress} Sending email to ${entry.name} (${entry.email})...`);

        // Parse selected products
        let selectedProductIds: string[] = [];
        try {
          selectedProductIds = JSON.parse(entry.selected_products);
        } catch (parseError) {
          console.warn(`  ⚠️  Warning: Could not parse products for ${entry.email}`);
          selectedProductIds = [];
        }

        // Convert product IDs to names
        const productNames = selectedProductIds.map((id) => getProductNameById(id));

        // Send email
        const result = await sendGiveawayWelcomeEmail({
          email: entry.email,
          name: entry.name,
          entryId: entry.entry_id,
          selectedProducts: productNames,
        });

        if (result.success) {
          console.log(`  ✅ Email sent successfully!`);
          successCount++;
        } else {
          console.log(`  ❌ Failed to send email: ${result.error}`);
          errorCount++;
        }

        // Add delay between emails (except after the last one)
        if (i < entries.length - 1) {
          await delay(DELAY_BETWEEN_EMAILS);
        }
      } catch (error) {
        console.error(`  ❌ Error sending email to ${entry.email}:`, error);
        errorCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 EMAIL SENDING SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total entries: ${entries.length}`);
    console.log(`✅ Successfully sent: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log('='.repeat(50) + '\n');
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

// Run the script
sendWelcomeEmailsToAll()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
