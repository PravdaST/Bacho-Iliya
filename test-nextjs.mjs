import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

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
  const fullPath = join(nextjsPath, file);
  const exists = existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Count components
const componentsPath = join(nextjsPath, 'src/components/ui');
if (existsSync(componentsPath)) {
  const components = readdirSync(componentsPath).filter(f => f.endsWith('.tsx'));
  console.log(`\n📦 Found ${components.length} UI components`);
  
  // List some key components
  const keyComponents = ['header.tsx', 'hero-section.tsx', 'quiz-section.tsx', 'recipes-section.tsx', 'products-section.tsx'];
  keyComponents.forEach(comp => {
    const exists = components.includes(comp);
    console.log(`  ${exists ? '✅' : '❌'} ${comp}`);
  });
}

// Check public assets
const publicPath = join(nextjsPath, 'public');
if (existsSync(publicPath)) {
  const assets = readdirSync(publicPath);
  console.log(`\n🖼️ Found ${assets.length} public assets`);
  
  // Check for key assets
  const keyAssets = ['logo.png', 'banica.webp', 'guvech.webp', 'shopska.webp'];
  keyAssets.forEach(asset => {
    const exists = assets.includes(asset);
    console.log(`  ${exists ? '✅' : '❌'} ${asset}`);
  });
}

// Check package.json has Next.js
const packagePath = join(nextjsPath, 'package.json');
if (existsSync(packagePath)) {
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
  console.log(`\n📋 Package name: ${pkg.name}`);
  console.log(`📋 Scripts available: ${Object.keys(pkg.scripts).join(', ')}`);
}

console.log('\n✅ Next.js migration analysis complete!');