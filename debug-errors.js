#!/usr/bin/env node

/**
 * Debug script untuk CIO Simulator
 * Mencari syntax errors dan import issues di semua file JavaScript
 */

const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js');
const files = [];

function findJSFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findJSFiles(fullPath);
    } else if (entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
}

findJSFiles(jsDir);

console.log('🔍 Checking JavaScript files for syntax errors...\n');

let errorCount = 0;

for (const file of files) {
  const relativePath = path.relative(__dirname, file);
  const content = fs.readFileSync(file, 'utf-8');

  try {
    // Try to parse the file as valid JavaScript
    // This won't catch all errors but will catch syntax errors
    new Function(content);
    console.log(`✅ ${relativePath}`);
  } catch (err) {
    errorCount++;
    console.log(`❌ ${relativePath}`);
    console.log(`   Error: ${err.message}`);

    // Try to find line number
    const lines = content.split('\n');
    const errorMatch = err.message.match(/line (\d+)/);
    if (errorMatch) {
      const lineNum = parseInt(errorMatch[1]);
      if (lines[lineNum - 1]) {
        console.log(`   Line ${lineNum}: ${lines[lineNum - 1].trim()}`);
      }
    }
    console.log('');
  }
}

console.log(`\n📊 Summary: ${files.length} files checked, ${errorCount} errors found\n`);

// Also check for import paths
console.log('🔗 Checking import/export paths...\n');

const importRegex = /import\s+[^;]*from\s+['"]([^'"]+)['"]/g;
const missingFiles = [];

for (const file of files) {
  const relativePath = path.relative(__dirname, file);
  const content = fs.readFileSync(file, 'utf-8');

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // Skip external imports (URLs, three, etc)
    if (importPath.startsWith('http') || importPath.includes('cdn') || importPath === 'three' || importPath.startsWith('three/')) {
      continue;
    }

    // Resolve relative path
    const importDir = path.dirname(file);
    let resolvedPath = path.resolve(importDir, importPath);

    // Try with .js extension
    if (!fs.existsSync(resolvedPath)) {
      resolvedPath = resolvedPath + '.js';
    }

    if (!fs.existsSync(resolvedPath)) {
      missingFiles.push({
        file: relativePath,
        import: importPath,
        resolvedPath: path.relative(__dirname, resolvedPath)
      });
    }
  }
}

if (missingFiles.length > 0) {
  console.log('❌ Missing import files:\n');
  for (const missing of missingFiles) {
    console.log(`   File: ${missing.file}`);
    console.log(`   Import: ${missing.import}`);
    console.log(`   Expected: ${missing.resolvedPath}\n`);
  }
} else {
  console.log('✅ All import paths are valid!\n');
}

process.exit(errorCount + missingFiles.length > 0 ? 1 : 0);
