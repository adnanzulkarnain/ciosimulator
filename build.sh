#!/bin/bash

# Add cargo to PATH
export PATH="/Users/adnan/.cargo/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

echo "🚀 CIO Simulator - Tauri Build"
echo "=============================="
echo ""

# Verify tools
echo "🔍 Checking tools..."
echo "Node: $(node --version)"
echo "npm: $(npm --version)"
echo "Rust: $(rustc --version)"
echo "Cargo: $(cargo --version)"
echo ""

cd /Users/adnan/Documents/gamecio

echo "📦 Installing npm dependencies..."
npm install

echo ""
echo "🔨 Starting Tauri build..."
echo "(This may take 10-20 minutes for first build)"
echo ""

# Run build
npm run tauri-build

echo ""
echo "✅ Build complete!"
echo ""
echo "📂 Output location:"
ls -lh src-tauri/target/release/*.app 2>/dev/null || echo "Check src-tauri/target/release/"
