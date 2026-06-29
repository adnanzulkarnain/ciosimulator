# CIO Simulator - Tauri Quick Start Guide

Convert the web game into a standalone Windows/macOS/Linux executable in 5 steps.

## Prerequisites Check

Before starting, verify you have installed:

```bash
# Check Node.js (should be v14+)
node --version
npm --version

# Check Rust (should be latest stable)
rustc --version
cargo --version
```

If any are missing, install from:
- Node.js: https://nodejs.org/
- Rust: https://www.rust-lang.org/tools/install

## Step-by-Step Setup

### 1. Install npm Dependencies
```bash
cd /Users/adnan/Documents/gamecio
npm install
```

### 2. Install Tauri CLI
```bash
npm install -D @tauri-apps/cli
```

### 3. Test in Development Mode
```bash
npm run tauri-dev
```

This will:
- Start development server at http://localhost:8000
- Open Tauri app window
- Show your game running as desktop app
- Enable hot-reload

**Keep this running!** Leave the terminal open.

### 4. Build Executable
In a new terminal:

```bash
cd /Users/adnan/Documents/gamecio
npm run tauri-build
```

This will take 5-10 minutes for the first build.

### 5. Find Your Executable
After build completes, find the .exe file:

**Windows:**
```
src-tauri/target/release/CIO_Simulator.exe
```

**macOS:**
```
src-tauri/target/release/CIO Simulator.app
```

**Linux:**
```
src-tauri/target/release/cio-simulator
```

---

## Faster Development Workflow

### Development Loop
```bash
# Terminal 1: Start web server
npm run dev

# Terminal 2: Run Tauri dev app (watch for changes)
npm run tauri-dev
```

### Quick Rebuild
If you just want to rebuild without dev mode:
```bash
npm run tauri-build
```

---

## Common Commands Reference

```bash
# Development with hot-reload
npm run tauri-dev

# Production build (creates .exe/.app/.deb)
npm run tauri-build

# Run web version (no Tauri, just browser)
npm run dev

# Install dependencies
npm install

# Update Tauri
npm install -D @tauri-apps/cli@latest
```

---

## File Structure

After setup, your project looks like:

```
gamecio/
├── index.html              # Main page (loaded by Tauri)
├── css/                    # Styles
├── js/                     # Game code
├── package.json            # npm configuration
├── tauri.conf.json         # Tauri configuration
│
├── src-tauri/              # Rust backend (Tauri creates/updates)
│   ├── main.rs             # Rust entry point
│   ├── build.rs            # Build script
│   └── Cargo.toml          # Rust dependencies
│
├── src-tauri/target/       # Build output (after npm run tauri-build)
│   └── release/
│       ├── CIO_Simulator.exe    # Windows executable
│       └── bundle/              # Installer files
│
└── node_modules/           # npm packages
```

---

## Troubleshooting

### Issue: "npm: command not found"
**Solution:** Restart terminal and verify Node.js installed:
```bash
node --version
```

### Issue: "cargo: command not found"
**Solution:** Restart terminal and verify Rust installed:
```bash
rustc --version
```

### Issue: "error[E0514]: found crate compiled by an incompatible version"
**Solution:** Clean and rebuild:
```bash
rm -rf src-tauri/target
npm run tauri-build
```

### Issue: App window opens but shows blank page
**Solution:** Check that:
1. index.html is in project root
2. All JS/CSS paths are correct
3. No CORS issues in browser console

### Issue: Build takes very long
**Solution:** This is normal for first build (5-15 min). Subsequent builds are faster.

---

## Customization

### Change App Icon
Replace icon files in `src-tauri/icons/`:
- `icon.ico` (Windows)
- `icon.icns` (macOS)  
- `128x128.png` (Linux)

Generate icons from your logo:
https://tauri.app/tools/tauri-icon-generator/

### Adjust Window Size
Edit `tauri.conf.json`:
```json
{
  "app": {
    "windows": [
      {
        "width": 1280,
        "height": 900
      }
    ]
  }
}
```

### Add Custom Rust Functions
Edit `src-tauri/main.rs` to add backend logic, then call from JavaScript.

---

## Distribution

Once you have the .exe:

1. **Direct Download:** Share the .exe file
2. **Installer:** Use NSIS to create installer
3. **GitHub Releases:** Attach .exe to release
4. **Windows Package Managers:**
   ```bash
   # via Chocolatey
   choco install cio-simulator
   
   # via Winget
   winget install cio-simulator
   ```

---

## Performance Notes

- Bundle size: ~5-15 MB (vs 150+ MB for Electron)
- Memory usage: ~50-100 MB (vs 200+ MB for Electron)
- Startup time: <1 second
- No external dependencies needed

---

## Need Help?

1. Read full guide: See `TAURI_SETUP.md`
2. Tauri Docs: https://v2.tauri.app/
3. Tauri Discord: https://discord.com/invite/tauri
4. GitHub Issues: https://github.com/tauri-apps/tauri/issues

---

**Ready to build? Run:** `npm install && npm run tauri-build`
