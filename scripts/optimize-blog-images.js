/**
 * Optimize Blog Images - Convert PNG to WebP
 *
 * This script converts large PNG blog images to WebP format with 80% quality,
 * reducing file sizes by ~70-80% while maintaining visual quality.
 *
 * Before running:
 * npm install sharp
 *
 * Usage:
 * node scripts/optimize-blog-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BLOG_DIR = path.join(__dirname, '..', 'public', 'blog');
const WEBP_QUALITY = 80; // 80% quality (good balance)
const MIN_SIZE_KB = 500; // Only optimize files > 500KB

async function optimizeImages() {
  console.log('🖼️  Blog Image Optimizer\n');
  console.log(`📁 Scanning: ${BLOG_DIR}\n`);

  const files = fs.readdirSync(BLOG_DIR);
  const pngFiles = files.filter(f => f.endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG files\n`);

  let totalSaved = 0;
  let optimizedCount = 0;

  for (const file of pngFiles) {
    const inputPath = path.join(BLOG_DIR, file);
    const outputFile = file.replace('.png', '.webp');
    const outputPath = path.join(BLOG_DIR, outputFile);

    // Get original file size
    const stats = fs.statSync(inputPath);
    const originalSizeKB = Math.round(stats.size / 1024);

    // Skip if already exists or too small
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${file} (WebP already exists)`);
      continue;
    }

    if (originalSizeKB < MIN_SIZE_KB) {
      console.log(`⏭️  Skipping ${file} (${originalSizeKB}KB - too small)`);
      continue;
    }

    try {
      // Convert to WebP
      await sharp(inputPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      // Get new file size
      const newStats = fs.statSync(outputPath);
      const newSizeKB = Math.round(newStats.size / 1024);
      const savedKB = originalSizeKB - newSizeKB;
      const savedPercent = Math.round((savedKB / originalSizeKB) * 100);

      totalSaved += savedKB;
      optimizedCount++;

      console.log(`✅ ${file}`);
      console.log(`   ${originalSizeKB}KB → ${newSizeKB}KB (saved ${savedKB}KB / ${savedPercent}%)`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Optimized: ${optimizedCount} images`);
  console.log(`   Total saved: ${Math.round(totalSaved / 1024)}MB`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Update image references from .png to .webp in your code`);
  console.log(`   2. Test that images display correctly`);
  console.log(`   3. Delete old .png files if WebP works well`);
  console.log(`   4. Commit and deploy`);
}

optimizeImages().catch(console.error);
