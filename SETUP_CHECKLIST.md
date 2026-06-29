# ✅ Tauri v2 Setup Checklist untuk CIO Simulator

Checklist lengkap dan panduan quick-start.

## 📋 Status Konfigurasi

### ✅ Sudah Fixed
- [x] **tauri.conf.json** - Valid untuk Tauri v2 dengan all required fields
- [x] **src-tauri/Cargo.toml** - Explicit package metadata + workspace support
- [x] **src-tauri/src/main.rs** - Berada di lokasi yang correct
- [x] **package.json** - Scripts sudah configured
- [x] **Workspace Cargo.toml** - Members properly set

### ❌ Perlu Dikerjakan
- [ ] Install Rust & Cargo
- [ ] Run `npm install` untuk frontend dependencies
- [ ] Test dev environment
- [ ] Build production binary

## 🚀 Quick Start (Minimal 10 menit)

### Step 1: Install Rust (5 menit)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```

### Step 2: Verify Instalasi
```bash
rustc --version
cargo --version
npm run tauri -- info
```

Output harus menunjukkan:
```
✔ rustc: <version>
✔ Cargo: <version>
✔ tauri <version>
✔ tauri-build <version>
```

### Step 3: Install Frontend Dependencies
```bash
npm install
```

### Step 4: Development Mode
```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Start Tauri dev (tunggu server berjalan)
npm run tauri-dev
```

### Step 5: Build Production
```bash
npm run tauri-build
```

## 📁 Folder Structure (FINAL)

```
gamecio/
├── package.json                    # Frontend config ✅
├── tauri.conf.json                 # Tauri config ✅ (FIXED)
├── Cargo.toml                      # Workspace config ✅
│
├── index.html                      # Frontend entry
├── css/                            # Frontend styles
├── js/                             # Frontend scripts
│
└── src-tauri/                      # Backend (Tauri/Rust)
    ├── Cargo.toml                  # Package config ✅ (FIXED)
    ├── build.rs                    # Build script ✅
    ├── src/
    │   └── main.rs                 # Main entry ✅ (MOVED HERE)
    └── icons/                      # App icons
```

## 🔍 File Configuration Details

### tauri.conf.json
```json
{
  "productName": "CIO Simulator",
  "version": "1.0.0",
  "identifier": "com.ciosimulator.app",
  "build": {
    "devUrl": "http://localhost:8000",
    "frontendDist": "."
  },
  "app": {
    "windows": [{ /* window config */ }],
    "security": { /* CSP for game */ }
  },
  "bundle": {
    "active": true,
    "targets": ["app"]
  }
}
```

### src-tauri/Cargo.toml
```toml
[package]
name = "cio-simulator"
version = "1.0.0"
authors = ["UBHINUS"]
edition = "2021"
rust-version = "1.60"

[dependencies]
tauri = { version = "2.0", features = ["shell-open"] }
tokio = { version = "1" }
serde_json = "1.0"
serde = { version = "1.0", features = ["derive"] }
```

## 🎯 Development Workflow

### Development Server
```bash
# Terminal 1: Frontend server
npm run dev           # Python http.server di :8000

# Terminal 2: Tauri dev
npm run tauri-dev     # Dev window dengan hot-reload
```

### Testing
```bash
# Build tanpa bundling
cargo build --release

# Run app langsung
./src-tauri/target/release/cio-simulator
```

### Production Build
```bash
npm run tauri-build

# Output locations:
# macOS: src-tauri/target/release/bundle/macos/
# Windows: src-tauri/target/release/bundle/msi/
# Linux: src-tauri/target/release/bundle/deb/
```

## ⚠️ Penting!

### Development Loop
**JANGAN** jalankan `tauri-dev` sebelum `npm run dev` (server harus running)

```bash
# ✅ BENAR
Terminal 1: npm run dev        # Tunggu sampai "Serving..."
Terminal 2: npm run tauri-dev  # Tunggu server ready
```

### Frontend Hot Reload
- Changes di HTML/CSS/JS akan auto-reload
- Refresh browser dengan Cmd+R

### Rust Backend Changes
- Restart tauri-dev untuk rebuild
- Akan recompile Rust code otomatis

## 🐛 Debug Mode

### Enable DevTools in App
File `src-tauri/src/main.rs` sudah configured:
```rust
#[cfg(debug_assertions)]
{
    let window = app.get_webview_window("main").unwrap();
    window.open_devtools();
}
```
- DevTools otomatis buka di development mode
- Disable untuk production

### Terminal Debugging
```bash
# Check tauri config
npm run tauri -- info

# List available commands
npm run tauri -- help

# Verbose output
RUST_LOG=debug npm run tauri-dev
```

## 📊 Build Time Expectations

| Action | Time |
|--------|------|
| First build | 5-10 menit |
| Subsequent Rust changes | 1-3 menit |
| Frontend changes | <1 detik (hot reload) |
| Production build | 5-10 menit |

## 🔗 Related Docs

- **TAURI_CONFIG.md** - Detailed configuration explanation
- **RUST_SETUP.md** - Rust installation guide
- **TAURI_OVERVIEW.md** - Architecture overview
- **TAURI_QUICKSTART.md** - Getting started guide

## ✨ Selesai!

Setelah semua step selesai, app siap digunakan:
- Development: `npm run tauri-dev`
- Production: `npm run tauri-build`

Semoga bermanfaat! 🚀
