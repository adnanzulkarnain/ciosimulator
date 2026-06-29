# Building Windows .exe with Tauri v2 – Complete Guide

This guide explains how to build the CIO Simulator game as a Windows .exe executable using Tauri v2's cross-compilation feature from macOS.

## 📋 Prerequisites

### Already Installed in This Project ✅
- ✅ Node.js 18+
- ✅ npm
- ✅ Rust
- ✅ Rust target: `x86_64-pc-windows-gnu`
- ✅ MinGW-w64 (GCC compiler for Windows)
- ✅ Tauri v2
- ✅ Cargo configuration for cross-compilation

Run this to verify:
```bash
node --version          # v18+
npm --version           # 11+
rustc --version         # 1.70+
cargo --version         # 1.70+
x86_64-w64-mingw32-gcc --version  # Should show version info
```

## 🔨 Build Methods

### Method 1: Simple Build (Recommended for First Time)

This builds just the executable without creating an installer:

```bash
cd /Users/adnan/Documents/gamecio

# Full cross-compile build
cargo build --release --target=x86_64-pc-windows-gnu

# Time: 20-40 minutes (first build slower due to compilation)
# Output: target/x86_64-pc-windows-gnu/release/cio-simulator.exe (~10 MB)
```

**What happens:**
1. Rust compiler (`rustc`) cross-compiles to Windows x86_64
2. MinGW-w64 links the compiled code using Windows libraries
3. Final .exe is placed in `target/x86_64-pc-windows-gnu/release/`

### Method 2: Using Automated Build Script

A build script is already prepared:

```bash
cd /Users/adnan/Documents/gamecio
bash build-windows.sh
```

This runs the same cross-compile command with nice output formatting.

### Method 3: Create Windows Installer (.msi)

Build a proper Windows installer:

```bash
cd /Users/adnan/Documents/gamecio

# Build and bundle for Windows
npm run tauri-build -- --target x86_64-pc-windows-gnu

# Time: 40-60 minutes
# Output: Multiple files including .msi installer
```

## 📍 Output Locations

After building, find your files here:

### After Method 1 (Executable Only)
```
target/x86_64-pc-windows-gnu/release/
├── cio-simulator.exe              ← Windows executable (~10 MB)
├── cio-simulator.exe.pdb          ← Debug symbols
└── deps/                          ← Dependencies
```

### After Method 3 (Full Bundle with Installer)
```
target/x86_64-pc-windows-gnu/release/bundle/
├── msi/
│   ├── CIO_Simulator_1.0.0_x64.msi      ← Windows Installer
│   └── CIO_Simulator_1.0.0_x64.msi.zip  ← Installer + signature
├── nsis/                                  ← Alternative installer format
└── exe/
    └── CIO_Simulator_1.0.0_x64.exe       ← Portable executable
```

### Quick File Locators

```bash
# Find the main executable
find /Users/adnan/Documents/gamecio/target -name "cio-simulator.exe" -type f

# Find all .msi installers
find /Users/adnan/Documents/gamecio/target -name "*.msi" -type f

# Find all executables
find /Users/adnan/Documents/gamecio/target -name "*.exe" -type f
```

## ⏱️ Build Time Expectations

| Stage | Time | Notes |
|-------|------|-------|
| **First Cross-Compile** | 20-40 min | Compiles all dependencies |
| **Incremental Build** | 2-5 min | Only recompiles changes |
| **Bundler (MSI/NSIS)** | 5-10 min | Creates installers |
| **Total (First Time)** | 45-90 min | Entire end-to-end process |

**Speed Tips:**
- First build is slowest (compiling all Rust dependencies)
- Subsequent builds are much faster (incremental compilation)
- Use `--release` for optimized, smaller .exe
- Remove old builds: `cargo clean` before building

## 🧪 Testing the .exe

### Option 1: Copy to Windows Machine
```bash
# Copy the .exe to a Windows PC and run it directly
# No installation needed!
scp target/x86_64-pc-windows-gnu/release/cio-simulator.exe user@windows-pc:~/Desktop/
```

### Option 2: Use Windows VM
Create a virtual machine with VirtualBox or Parallels and test the .exe there.

### Option 3: Windows Subsystem for Linux (WSL2)
If you have WSL2 on a Windows machine:
```bash
# Copy .exe to Windows share and run it
wsl.exe "cp /mnt/c/Users/.../cio-simulator.exe /mnt/c/Users/.../Desktop/"
```

### System Requirements for Running
- **Windows 7 SP1** or newer
- **WebView2 Runtime** (auto-installed with most Windows 10/11)
- **4GB RAM** minimum
- **50 MB disk space**

## 🔧 Configuration Files

### Tauri Config (`tauri.conf.json`)
Controls app metadata and bundler settings:
```json
{
  "app": {
    "windows": [
      {
        "fullscreen": false,
        "width": 1280,
        "height": 720,
        "title": "CIO Simulator"
      }
    ]
  },
  "bundle": {
    "targets": ["msi"],  // Customize bundle types
    "msiInstallerPath": "."
  }
}
```

### Cargo Config (`.cargo/config.toml`)
Sets up the Windows linker:
```toml
[build]
target-dir = "target"

[target.x86_64-pc-windows-gnu]
linker = "/opt/homebrew/bin/x86_64-w64-mingw32-gcc"
ar = "/opt/homebrew/bin/x86_64-w64-mingw32-ar"
```

## 🐛 Troubleshooting

### Build Fails: "Command not found: x86_64-w64-mingw32-gcc"

**Solution:** MinGW-w64 not installed or not in PATH
```bash
# Install MinGW-w64
brew install mingw-w64

# Verify installation
which x86_64-w64-mingw32-gcc
# Should output: /opt/homebrew/bin/x86_64-w64-mingw32-gcc

# Verify Rust target installed
rustup target list | grep "x86_64-pc-windows-gnu"
# Should show: x86_64-pc-windows-gnu (installed)

# If not installed, add it:
rustup target add x86_64-pc-windows-gnu
```

### Build Fails: "Linker cannot find files"

**Solution:** Cargo config might be incorrect
```bash
# Check config
cat .cargo/config.toml

# Reinstall Rust components
rustup update
rustup target add x86_64-pc-windows-gnu
```

### Build Takes Very Long

**Normal:** First build takes 20-40 minutes. Subsequent builds are much faster.

**Speed it up:**
```bash
# Use fewer threads if system is overloaded
cargo build -j 2 --release --target=x86_64-pc-windows-gnu

# Check progress
ps aux | grep cargo  # See running processes
```

### .exe Won't Run on Windows

**Possible causes:**
1. **WebView2 not installed** – User needs to install Windows WebView2
   ```
   https://developer.microsoft.com/en-us/microsoft-edge/webview2/
   ```

2. **Missing dependencies** – Copy these if needed:
   ```
   vcruntime140.dll
   kernel32.dll
   user32.dll
   ```

3. **Antivirus blocking** – Some antivirus software may block new .exe files
   - Add to whitelist
   - Disable momentarily to test
   - Sign the executable (requires code signing certificate)

4. **64-bit vs 32-bit mismatch** – Ensure you built for x86_64
   ```bash
   file target/x86_64-pc-windows-gnu/release/cio-simulator.exe
   # Should output: PE 32-bit LSB executable, Intel 80386
   ```

## 📦 Distribution Options

### Option 1: Direct .exe Download
- Users download `cio-simulator.exe`
- Double-click to run
- Simplest method
- File size: ~10 MB

### Option 2: Windows Installer (.msi)
- Users download and run the `.msi` installer
- Professional look
- Can auto-start on login
- Can auto-check for updates
- File size: ~15 MB

### Option 3: GitHub Releases
```bash
# Upload to GitHub
gh release create v1.0.0 \
  target/x86_64-pc-windows-gnu/release/cio-simulator.exe \
  target/x86_64-pc-windows-gnu/release/bundle/msi/*.msi
```

### Option 4: Cloud Download Link
Upload to cloud storage:
- Google Drive
- OneDrive
- AWS S3
- Azure Blob Storage

## 🔗 Next Steps

1. **Run first build:**
   ```bash
   cd /Users/adnan/Documents/gamecio
   cargo build --release --target=x86_64-pc-windows-gnu
   ```

2. **Locate the .exe:**
   ```bash
   ls -lh target/x86_64-pc-windows-gnu/release/cio-simulator.exe
   ```

3. **Copy to distribution location:**
   ```bash
   cp target/x86_64-pc-windows-gnu/release/cio-simulator.exe ~/Desktop/CIO_Simulator.exe
   ```

4. **Test on Windows machine**

5. **Distribute to users**

## 📚 Additional Resources

- **Tauri Docs**: https://v2.tauri.app/start/prerequisites/
- **Cross-Compilation**: https://rust-lang.github.io/rustup/cross-compilation.html
- **MinGW-w64**: https://www.mingw-w64.org/
- **WebView2**: https://developer.microsoft.com/en-us/microsoft-edge/webview2/

## 💡 Pro Tips

### Automate Builds
Create a GitHub Action to automatically build .exe on every release:
```yaml
# .github/workflows/build-windows.yml
name: Build Windows .exe
on: [push, release]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: rust-lang/rust-toolchain@v1
      - run: cargo build --release --target=x86_64-pc-windows-gnu
      - uses: actions/upload-artifact@v3
        with:
          name: windows-exe
          path: target/x86_64-pc-windows-gnu/release/cio-simulator.exe
```

### Code Signing (Optional but Recommended)
Sign the .exe to avoid Windows security warnings:
```bash
# Requires Authenticode certificate from Microsoft
signtool sign /f certificate.pfx /p password /t http://timestamp.server.com cio-simulator.exe
```

### Auto-Updates
Tauri v2 supports auto-updates. Configure in `tauri.conf.json`:
```json
{
  "updater": {
    "active": true,
    "endpoints": ["https://updates.example.com/releases/{{target}}/{{current_version}}"],
    "dialog": true
  }
}
```

---

**Current Status:** ✅ All prerequisites installed and verified  
**Ready to Build:** Yes, run `cargo build --release --target=x86_64-pc-windows-gnu`  
**Est. Time:** 20-40 minutes (first build)
