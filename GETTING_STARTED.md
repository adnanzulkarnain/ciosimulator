# Getting Started with CIO Simulator

Choose your preferred way to run CIO Simulator:

## 🌐 Option 1: Play in Browser (Easiest - 2 minutes)

**Best for:** Quick testing, no installation

```bash
# Navigate to project
cd /Users/adnan/Documents/gamecio

# Start server
python3 -m http.server 8000

# Open in browser
http://localhost:8000
```

**Pros:**
- ✅ Fastest setup
- ✅ No additional software needed
- ✅ Easy to share URL with others

**Cons:**
- ❌ Requires local server
- ❌ Can't distribute as standalone file

---

## 🖥️ Option 2: Desktop App with Tauri (Recommended - 15 minutes)

**Best for:** Distribution, professional app, offline use

### Prerequisites
Install these first (do once):

```bash
# 1. Node.js (includes npm)
# Download: https://nodejs.org/

# 2. Rust
# Download: https://www.rust-lang.org/tools/install
```

Verify installation:
```bash
node --version    # Should be v14+
npm --version
rustc --version
cargo --version
```

### Build Steps

```bash
# Step 1: Navigate to project
cd /Users/adnan/Documents/gamecio

# Step 2: Install dependencies (1-2 min)
npm install

# Step 3: Build executable (5-10 min for first build)
npm run tauri-build

# Step 4: Find your executable
# Windows: src-tauri/target/release/CIO_Simulator.exe (~10 MB)
# macOS:   src-tauri/target/release/CIO Simulator.app
# Linux:   src-tauri/target/release/cio-simulator
```

### Test Development Mode

```bash
# Run in development with hot-reload
npm run tauri-dev
```

This opens the app window with your game running. Make code changes and see them instantly!

**Pros:**
- ✅ Standalone executable
- ✅ Professional appearance
- ✅ Small file size (10 MB)
- ✅ Works offline
- ✅ Can add to Start Menu
- ✅ Can be distributed to users

**Cons:**
- ⚠️ Takes longer to setup
- ⚠️ Requires Rust installation

---

## 📚 Detailed Guides

### For Browser Playing
- Just run `python3 -m http.server 8000` and open the URL

### For Desktop App Building
Pick one based on your needs:

1. **TAURI_QUICKSTART.md** ← START HERE
   - 5-minute quick reference
   - Copy-paste commands
   - Basic troubleshooting

2. **TAURI_SETUP.md**
   - Complete detailed guide
   - System requirements per OS
   - Advanced configuration
   - Signing & distribution

3. **TAURI_OVERVIEW.md**
   - Architecture diagrams
   - How Tauri works
   - Why Tauri vs alternatives
   - Technical deep dive

---

## Quick Decision Tree

```
Want to play right now?
└─→ Use Option 1 (Browser)

Want to distribute to others?
├─→ As website: Deploy to GitHub Pages / Netlify
└─→ As app: Use Option 2 (Tauri)

Want professional desktop app?
└─→ Use Option 2 (Tauri)

Want the smallest file size?
└─→ Use Option 2 (Tauri) ← 10 MB vs 200+ MB Electron

Want native look & feel?
└─→ Use Option 2 (Tauri)

Have limited time?
└─→ Use Option 1 (Browser)
```

---

## File Size Comparison

```
CIO Simulator with Different Approaches:

Option 1 (Browser):
├── Source files: 200 KB
└── Server (Python): Built-in

Option 2 (Tauri Desktop):
├── CIO_Simulator.exe: 10 MB ← Smallest!
├── Includes:
│   ├── Tauri framework: 2 MB
│   ├── WebView runtime: 2 MB
│   ├── Game assets: 1 MB
│   └── Dependencies: 5 MB
└── Total: 10 MB

Electron Alternative (Not used):
├── Electron.exe: 200+ MB ← Much larger
└── Same functionality

PyQt Alternative (Not used):
├── PyQt app: 100+ MB
└── Medium size
```

---

## Troubleshooting Quick Answers

### "npm: command not found"
```bash
# Restart terminal then check
npm --version

# If still error, reinstall Node.js from:
# https://nodejs.org/
```

### "cargo: command not found"
```bash
# Restart terminal then check
cargo --version

# If still error, reinstall Rust from:
# https://www.rust-lang.org/tools/install
```

### "First build is taking forever"
This is normal! Rust compilation takes 5-15 minutes for first build.  
Subsequent builds are much faster (1-2 min).

### "Port 8000 already in use"
```bash
# Use different port
python3 -m http.server 9000

# Then visit: http://localhost:9000
```

### "My antivirus is blocking the app"
This sometimes happens with new unsigned applications.  
- Click "More info" → "Run anyway"
- Or: See `TAURI_SETUP.md` for code signing

---

## Common Tasks

### I want to play right now
```bash
python3 -m http.server 8000
# Open: http://localhost:8000
```

### I want to share with others
```bash
# Option A: Share website URL
# Deploy to GitHub Pages or Netlify

# Option B: Share executable
npm run tauri-build
# Share: src-tauri/target/release/CIO_Simulator.exe
```

### I want to test changes in dev mode
```bash
npm run tauri-dev
# Edit files, see changes instantly
```

### I want to release version 2.0
```bash
# Edit version in package.json
# Then: npm run tauri-build
# New exe in: src-tauri/target/release/CIO_Simulator.exe
```

### I want to add my own icon
```bash
# 1. Replace files in src-tauri/icons/
# 2. npm run tauri-build
# Your icon will be in the app!
```

---

## What Next?

### After Building Successfully:
1. ✅ You have a working .exe or .app
2. ✅ Test it by double-clicking the file
3. ✅ Share it with others
4. ✅ Celebrate! 🎉

### To Learn More:
- Read TAURI_QUICKSTART.md for more details
- Check TAURI_OVERVIEW.md for architecture
- Visit https://v2.tauri.app/ for official docs

### To Customize:
- Edit game scenarios in `js/scenarios.js`
- Change colors in `css/styles.css`
- Modify config in `js/config.js`
- Update Tauri settings in `tauri.conf.json`

---

## Still Need Help?

1. **Browser issues?**
   - Clear browser cache (Ctrl+Shift+Del)
   - Try different browser
   - Check console (F12 → Console tab)

2. **Build issues?**
   - Read error message carefully
   - Check prerequisites installed
   - See TAURI_SETUP.md for detailed troubleshooting

3. **Want to know more?**
   - Tauri: https://v2.tauri.app/
   - Three.js: https://threejs.org/
   - Web APIs: https://developer.mozilla.org/

---

**Ready to get started? Pick your option above! 🚀**
