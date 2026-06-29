# Building CIO Simulator as Desktop App with Tauri

This guide explains how to convert the CIO Simulator web application into a standalone Windows/macOS/Linux executable using Tauri.

## What is Tauri?

Tauri is a lightweight framework for building cross-platform desktop applications using web technologies (HTML, CSS, JavaScript) with a minimal Rust backend. It's much smaller and faster than Electron.

**Benefits:**
- Small bundle size (~3-15 MB vs 150+ MB for Electron)
- Native performance
- Works on Windows, macOS, and Linux
- Easy code signing and distribution
- Built-in auto-update system

## Prerequisites

Before starting, install these:

### 1. Node.js & npm
Download from: https://nodejs.org/
Verify installation:
```bash
node --version
npm --version
```

### 2. Rust
Download from: https://www.rust-lang.org/tools/install
Verify installation:
```bash
rustc --version
cargo --version
```

### 3. System Dependencies (Windows)
- Microsoft C++ Build Tools or Visual Studio Community
- WebView2 Runtime (automatically installed on modern Windows)

For macOS:
```bash
xcode-select --install
```

For Linux (Ubuntu/Debian):
```bash
sudo apt-get install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

## Installation Steps

### Step 1: Initialize Tauri Project

Navigate to project root and create Tauri structure:

```bash
cd /Users/adnan/Documents/gamecio
npm install -D tauri
npx tauri init
```

During `tauri init`, answer prompts:
- **Product name:** CIO Simulator
- **Package identifier:** com.ciosimulator.app
- **Build command:** `npm run build` (leave empty, we'll use static files)
- **Dev URL:** `http://localhost:8000`
- **Frontend dir:** `.` (current directory)

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup package.json

Update your `package.json` with Tauri scripts.

### Step 4: Configure Tauri (tauri.conf.json)

The configuration file will be created during init. Customize it.

### Step 5: Build for Production

```bash
npm run tauri build
```

This will create:
- **Windows:** `src-tauri/target/release/CIO_Simulator.exe`
- **macOS:** `src-tauri/target/release/CIO\ Simulator.app`
- **Linux:** `src-tauri/target/release/cio-simulator`

## File Structure After Setup

```
gamecio/
├── src-tauri/              # Rust backend (Tauri creates this)
│   ├── Cargo.toml
│   ├── src/
│   │   └── main.rs
│   └── tauri.conf.json
├── node_modules/
├── package.json
├── .tauri/
├── index.html
├── css/
├── js/
└── ... (rest of your files)
```

## Build & Run

### Development Mode
```bash
npm run tauri dev
```

This launches your app with hot-reload. The app window opens automatically.

### Production Build
```bash
npm run tauri build
```

Creates optimized executable in `src-tauri/target/release/`.

## Important Considerations

### 1. Static File Serving
Since the app is self-contained, all files (HTML, CSS, JS) must be accessible. Tauri serves from project root by default.

### 2. No External Server Needed
The app includes its own local server. No need for Python HTTP server when distributing.

### 3. File Paths
Update any hardcoded paths:
```javascript
// ❌ Wrong
fetch('http://localhost:8000/data.json')

// ✅ Correct (for Tauri)
fetch('./data.json')
```

### 4. LocalStorage Still Works
Leaderboard data is still stored in browser localStorage automatically.

## Signing & Distribution (Optional)

For distributing to users:

### Windows Code Signing
```bash
# Generate certificate or use existing one
# Set environment variables:
TAURI_SIGNING_PRIVATE_KEY=your_private_key
TAURI_SIGNING_PRIVATE_KEY_PASSWORD=your_password

npm run tauri build
```

### Auto-Update Setup
Edit `src-tauri/tauri.conf.json`:
```json
{
  "build": {
    "frontendDist": ".",
    "beforeBuildCommand": "",
    "beforeDevCommand": "",
    "devPath": "http://localhost:8000",
    "withGlobalTauri": false
  },
  "app": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://updates.example.com/{{target}}/{{arch}}/update.json"
      ],
      "dialog": true,
      "pubkey": "your_public_key"
    }
  }
}
```

## Troubleshooting

### Issue: "cargo not found"
**Solution:** Restart terminal and verify Rust installation:
```bash
rustc --version
```

### Issue: WebView2 Runtime Missing (Windows)
**Solution:** Download from: https://developer.microsoft.com/en-us/microsoft-edge/webview2/

### Issue: Large Bundle Size
**Solution:** Enable release optimizations in `src-tauri/Cargo.toml`:
```toml
[profile.release]
opt-level = 3
lto = true
```

### Issue: App won't start
**Solution:** Check console in development mode:
```bash
npm run tauri dev
```

## Advanced: Custom Rust Backend

If you want to add Rust functionality (file I/O, system integration, etc.):

Edit `src-tauri/src/main.rs`:
```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
```

Call from JavaScript:
```javascript
const { invoke } = await import('@tauri-apps/api/tauri');
const message = await invoke('greet', { name: 'World' });
```

## Resources

- Tauri Documentation: https://v2.tauri.app/
- Tauri GitHub: https://github.com/tauri-apps/tauri
- Community Discord: https://discord.com/invite/tauri
- Tauri Best Practices: https://v2.tauri.app/develop/architecture/

## Distribution Channels

Once built, you can distribute the .exe via:
- GitHub Releases
- Your website
- Windows Package Managers (Choco, Winget)
- Microsoft Store (via Tauri helpers)
- Installers using NSIS or Inno Setup

---

**Next Steps:**
1. Install prerequisites (Node.js, Rust)
2. Run `npm install -D tauri`
3. Run `npx tauri init`
4. Update configuration
5. Test with `npm run tauri dev`
6. Build with `npm run tauri build`
