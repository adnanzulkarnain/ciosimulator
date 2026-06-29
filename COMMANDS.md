# 🚀 Tauri Development Commands

Quick reference untuk semua commands yang digunakan dalam development CIO Simulator.

## 🎯 Development Commands

### Start Development Environment
```bash
# Terminal 1: Start web server (port 8000)
npm run dev

# Terminal 2: Start Tauri development (setelah Terminal 1 running)
npm run tauri-dev
```

### Production Build
```bash
# Build optimized production binary
npm run tauri-build

# Output locations:
# macOS:   src-tauri/target/release/bundle/macos/CIO\ Simulator.app
# Windows: src-tauri/target/release/bundle/msi/CIO\ Simulator_*.msi
# Linux:   src-tauri/target/release/bundle/deb/*.deb
```

## 🔧 Utility Commands

### Check Configuration
```bash
# Verify Tauri setup dan environment
npm run tauri -- info

# Output harus menunjukkan:
# ✔ rustc: 1.x.x
# ✔ Cargo: 1.x.x
# ✔ tauri 2.x.x
# ✔ tauri-build 2.x.x
```

### Tauri CLI Help
```bash
# List all tauri commands
npm run tauri -- help

# Specific command help
npm run tauri -- dev --help
npm run tauri -- build --help
```

### Direct Cargo Commands (Raw Rust)
```bash
# Build Rust binary only (no bundling)
cargo build --release -p cio-simulator

# Run tests
cargo test -p cio-simulator

# Check code
cargo check -p cio-simulator

# Format code
cargo fmt

# Lint code
cargo clippy
```

## 📋 npm Scripts (from package.json)

```bash
npm run tauri         # Run tauri CLI
npm run tauri-dev     # Development mode
npm run tauri-build   # Production build
npm run dev           # Python web server (localhost:8000)
npm run build         # Alias for tauri-build
```

## 🎨 Frontend Development

### Hot Reload
```bash
# Browser auto-reload on file changes
# Just save file in: css/, js/, atau modify index.html
# Refresh browser: Cmd+R (macOS) or Ctrl+R (Windows/Linux)
```

### Python Web Server
```bash
# Serve files on localhost:8000
python3 -m http.server 8000

# Or use npm shortcut:
npm run dev
```

## 🦀 Rust Backend Development

### File Locations
```
src-tauri/src/main.rs          # Main entry point
src-tauri/Cargo.toml           # Package configuration
src-tauri/build.rs             # Build script
src-tauri/target/              # Build artifacts
```

### Common Tasks

#### Add Tauri Dependency
```bash
cd src-tauri
cargo add tauri-plugin-NAME
```

#### Update Dependencies
```bash
cd src-tauri
cargo update
```

#### Check for Security Issues
```bash
cargo audit
```

## 📦 Production Workflow

### Full Build Process
```bash
# 1. Install Rust (one-time)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Install frontend dependencies
npm install

# 3. Build production binary
npm run tauri-build

# 4. Find built app in src-tauri/target/release/bundle/
ls src-tauri/target/release/bundle/
```

## 🐛 Debugging

### Enable Debug Output
```bash
# Verbose Tauri output
RUST_LOG=debug npm run tauri-dev

# Show all logs
RUST_LOG=trace npm run tauri-dev
```

### DevTools in App
DevTools otomatis terbuka di development mode (sudah configured di main.rs).

Untuk disable DevTools:
```rust
// Di src-tauri/src/main.rs
// Comment out atau remove:
#[cfg(debug_assertions)]
{
    window.open_devtools();
}
```

## 📊 Build Times (Approximate)

| Action | Time | Notes |
|--------|------|-------|
| `npm run dev` | <1s | Just starts server |
| `npm run tauri-dev` (first) | 3-5min | Build dependencies |
| `npm run tauri-dev` (change) | 10-30s | Rebuild with changes |
| `npm run tauri-build` (first) | 5-10min | Full release build |
| `npm run tauri-build` (no change) | <5s | Just bundles |

## 🔄 Common Workflows

### Quick Test Change
```bash
# 1. Edit HTML/CSS/JS
# 2. Save file (auto hot-reload)
# 3. Refresh browser (Cmd+R)
# 4. Done!
```

### Backend Change
```bash
# 1. Edit Rust code in src-tauri/src/
# 2. Kill tauri-dev (Ctrl+C)
# 3. Run npm run tauri-dev again
# 4. Wait for rebuild
# 5. Test in new window
```

### Release Version
```bash
# 1. Update version in:
#    - package.json: "version": "1.x.x"
#    - src-tauri/Cargo.toml: version = "1.x.x"
#    - tauri.conf.json: "version": "1.x.x"

# 2. Commit to git
git add .
git commit -m "Release v1.x.x"

# 3. Build
npm run tauri-build

# 4. Tag release
git tag -a v1.x.x -m "Release v1.x.x"
```

## 🆘 Troubleshooting

### Error: "Cannot connect to localhost:8000"
```bash
# Make sure npm run dev is running in Terminal 1
npm run dev
# Then start tauri-dev in Terminal 2 AFTER server is ready
```

### Error: "ENOENT: no such file or directory"
```bash
# Rebuild dependencies
rm -rf node_modules
npm install
```

### Error: "rustc: command not found"
```bash
# Activate Rust in shell
source "$HOME/.cargo/env"

# Verify
rustc --version
```

### Build cache issues
```bash
# Clean build
cd src-tauri
cargo clean

# Rebuild
cd ..
npm run tauri-build
```

## 📚 Related Documentation

- `SETUP_CHECKLIST.md` - Complete setup guide
- `TAURI_CONFIG.md` - Configuration details
- `RUST_SETUP.md` - Rust installation guide
- `FIXED_ISSUES.md` - What was fixed

---

**Last Updated**: 2026-06-29
**Tauri Version**: 2.x
**Rust Minimum**: 1.60
