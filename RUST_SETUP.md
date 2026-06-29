# 🦀 Setup Rust untuk Tauri v2

Panduan lengkap untuk menginstall Rust dan dependencies Tauri.

## 📋 Status Saat Ini

```
✅ Configuration sudah valid (tauri.conf.json)
✅ Cargo.toml sudah benar (src-tauri/Cargo.toml)
✅ File structure sudah benar (src-tauri/src/main.rs)
✅ Node.js & npm sudah installed (v25.9.0, v11.12.1)

❌ Rust/Cargo belum terinstall
```

## 🚀 Instalasi Rust

### 1. Install Rustup

```bash
# Download dan install rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Pilih option 1 (default)
# Tunggu proses selesai
```

### 2. Aktifkan Rust di shell

```bash
# Reload shell config
source "$HOME/.cargo/env"

# Verify instalasi
rustc --version
cargo --version
```

### 3. Verify Tauri Setup

```bash
npm run tauri -- info
```

Outputnya harus menunjukkan Rust version dan Cargo installed.

## 📦 Additional Dependencies

### macOS (sudah ada)
- ✅ Xcode Command Line Tools
- ✅ rustc & cargo

### Windows (jika apply)
```bash
# Install Visual Studio Build Tools 2022
# Atau gunakan MSVC dengan rustup
rustup toolchain install stable-msvc
```

### Linux (jika apply)
```bash
sudo apt-get install -y \
  libssl-dev \
  libexpat1-dev \
  libglib2.0-dev \
  libcairo2-dev \
  libpango1.0-dev \
  libgtk-3-dev \
  libasound2-dev
```

## ✅ Verification Checklist

Setelah install Rust, jalankan:

```bash
# 1. Check Rust
rustc --version

# 2. Check Cargo
cargo --version

# 3. Check Tauri
npm run tauri -- info

# Output harus menunjukkan:
# ✔ rustc: <version>
# ✔ Cargo: <version>
# ✔ tauri <version>
# ✔ tauri-build <version>
```

## 🎯 Langkah Selanjutnya (Setelah Rust Installed)

### 1. Build Tauri Binary Dependencies
```bash
# First build akan download dan compile dependencies
npm run tauri-build
```

### 2. Development Mode
```bash
# Terminal 1
npm run dev        # Start Python server (localhost:8000)

# Terminal 2 (tunggu server berjalan)
npm run tauri-dev  # Start Tauri development
```

### 3. Production Build
```bash
npm run tauri-build

# Output app ada di: src-tauri/target/release/bundle/
```

## 🔧 Troubleshooting

### Error: "command not found: rustc"
**Solusi**: Restart shell atau source cargo env manually:
```bash
source "$HOME/.cargo/env"
```

### Error: "RUSTFLAGS" atau build issues
**Solusi**: Update toolchain:
```bash
rustup update stable
```

### Slow first build
**Expected**: First build bisa 5-10 menit (compile dependencies)
Subsequent builds jauh lebih cepat.

## 📚 Resources
- [Rust Installation Guide](https://www.rust-lang.org/tools/install)
- [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
- [Tauri Troubleshooting](https://tauri.app/v1/guides/troubleshooting)
