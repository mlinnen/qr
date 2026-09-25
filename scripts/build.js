const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

console.log('[build] Starting build process...');

// 1. Verify source directory exists
if (!fs.existsSync(srcDir)) {
  console.error(`[build] Error: Source directory does not exist at ${srcDir}`);
  process.exit(1);
}

// 2. Verify src/index.html exists
const srcIndex = path.join(srcDir, 'index.html');
if (!fs.existsSync(srcIndex)) {
  console.error(`[build] Error: Main entry file not found at ${srcIndex}`);
  process.exit(1);
}

// 3. Basic sanity check on src/index.html content
const content = fs.readFileSync(srcIndex, 'utf8');
if (!content.includes('id="manual-link"') || !content.includes('CONFIG')) {
  console.warn('[build] Warning: index.html might be missing required redirect elements.');
}

// 4. Clean previous dist directory if present
if (fs.existsSync(distDir)) {
  console.log('[build] Cleaning dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

// 5. Recreate dist and copy all assets from src/ to dist/
fs.mkdirSync(distDir, { recursive: true });
fs.cpSync(srcDir, distDir, { recursive: true });

console.log(`[build] Successfully published files from '${path.relative(rootDir, srcDir)}' to '${path.relative(rootDir, distDir)}'.`);
