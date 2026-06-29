#!/bin/bash

# Build CIO Simulator for Windows from macOS using cross-compilation
# Prerequisites:
# - Rust with x86_64-pc-windows-gnu target installed
# - MinGW-w64 installed via Homebrew (brew install mingw-w64)

export PATH="/Users/adnan/.cargo/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

echo "🚀 CIO Simulator - Windows Cross-Compile Build"
echo "=============================================="
echo ""

# Verify tools
echo "🔍 Checking tools..."
echo "Node: $(node --version)"
echo "npm: $(npm --version)"
echo "Rust: $(rustc --version)"
echo "Cargo: $(cargo --version)"
echo "MinGW: $(x86_64-w64-mingw32-gcc --version | head -1)"
echo ""

cd /Users/adnan/Documents/gamecio

echo "📦 Installing npm dependencies..."
npm install

echo ""
echo "🔨 Starting Windows cross-compilation build..."
echo "(This may take 15-30 minutes - compiling for Windows target)"
echo ""

# Verify target is installed
echo "✓ Checking Rust target..."
rustup target list | grep x86_64-pc-windows-gnu || echo "Installing target..."
rustup target add x86_64-pc-windows-gnu 2>/dev/null

echo ""
echo "⏱️  Building for Windows x86_64..."

# Build using cargo directly with Windows target
cargo build --release --target=x86_64-pc-windows-gnu

echo ""
echo "✅ Build complete!"
echo ""
echo "📂 Output location:"
ls -lh target/x86_64-pc-windows-gnu/release/cio-simulator.exe 2>/dev/null || echo "Check: target/x86_64-pc-windows-gnu/release/"
echo ""
echo "💡 To use Tauri bundler for .msi installer:"
echo "   npm run tauri-build --target x86_64-pc-windows-gnu"
