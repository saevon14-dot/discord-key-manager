#!/usr/bin/env node
// GitHub Pages Build Script
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, cpSync, mkdirSync } from 'fs';
import { join } from 'path';

console.log('🚀 Building for GitHub Pages...');

// 1. Build the client with Vite
console.log('📦 Building client...');
execSync('npx vite build -c vite.config.pages.ts', { 
  stdio: 'inherit',
  cwd: process.cwd()
});

// 2. Copy additional assets
console.log('📁 Copying assets...');
try {
  cpSync('attached_assets', 'dist/assets', { recursive: true });
  console.log('✅ Assets copied successfully');
} catch (error) {
  console.log('⚠️ No attached_assets found, skipping...');
}

console.log('✅ Assets copied successfully');

// 4. Update index.html for GitHub Pages
console.log('🔧 Configuring for GitHub Pages...');
let indexHtml = readFileSync('dist/public/index.html', 'utf8');

// Add GitHub Pages notice and demo mode indicator
const githubPagesNotice = `
  <div id="github-pages-notice" style="
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: linear-gradient(135deg, #f59e0b, #ea580c);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 8px;
  ">
    <div style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 2s infinite;"></div>
    GitHub Pages Demo - Data stored locally
  </div>
  <style>
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  </style>
`;

// Insert notice into the body
indexHtml = indexHtml.replace('<div id="root"></div>', `<div id="root"></div>${githubPagesNotice}`);

// Update base path if needed
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
if (repoName) {
  indexHtml = indexHtml.replace('<base href="/">', `<base href="/${repoName}/">`);
}

writeFileSync('dist/public/index.html', indexHtml);

// 5. Create a simple 404.html for SPA routing
const html404 = indexHtml.replace(
  /<title>.*<\/title>/,
  '<title>Discord Key Manager</title>'
);
writeFileSync('dist/public/404.html', html404);

// 6. Copy everything from public to root for GitHub Pages
console.log('📁 Organizing for GitHub Pages...');
cpSync('dist/public', 'dist', { recursive: true, force: true });

// 7. Create .nojekyll in root
writeFileSync('dist/.nojekyll', '');

console.log('✅ GitHub Pages build completed!');
console.log('');
console.log('📋 Next steps:');
console.log('1. Push your code to GitHub');
console.log('2. Go to Settings → Pages in your GitHub repo');
console.log('3. Select "GitHub Actions" as source');
console.log('4. Your site will be live at: https://yourusername.github.io/your-repo-name');
console.log('');
console.log('🌟 Features in GitHub Pages mode:');
console.log('• Beautiful animated galaxy background');
console.log('• Full Discord-themed UI');
console.log('• Local data persistence via localStorage');
console.log('• Simulated real-time updates');
console.log('• All dashboard features working');
console.log('');
console.log('⚠️  Note: Discord bot commands won\'t work in GitHub Pages (frontend only)');
console.log('   For full bot functionality, use Railway/Render hosting instead');