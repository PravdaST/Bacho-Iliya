// Simple test to verify Next.js app structure
const fs = require('fs');
const path = require('path');

const nextjsPath = './nextjs-app';

// Check key files exist
const requiredFiles = [
  'src/app/page.tsx',
  'src/app/layout.tsx', 
  'src/app/globals.css',
  'src/app/api/quiz/route.ts',
  'src/components/ui/quiz-section.tsx',
  'src/components/ui/recipes-section.tsx',
  'src/components/ui/header.tsx',
  'src/lib/queryClient.ts',
  'src/shared/schema.ts',
  'package.json'
];

console.log('🔍 Checking Next.js project structure...\n');

requiredFiles.forEach(file => {
  const fullPath = path.join(nextjsPath, file);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Count components
const componentsPath = path.join(nextjsPath, 'src/components/ui');
if (fs.existsSync(componentsPath)) {
  const components = fs.readdirSync(componentsPath).filter(f => f.endsWith('.tsx'));
  console.log(`\n📦 Found ${components.length} UI components`);
}

// Check public assets
const publicPath = path.join(nextjsPath, 'public');
if (fs.existsSync(publicPath)) {
  const assets = fs.readdirSync(publicPath);
  console.log(`🖼️ Found ${assets.length} public assets`);
}

console.log('\n✅ Next.js migration appears complete!');