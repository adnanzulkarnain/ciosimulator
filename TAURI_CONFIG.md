# ✅ Tauri v2 Configuration Guide

Dokumentasi lengkap konfigurasi Tauri v2 untuk CIO Simulator.

## 📁 Struktur Folder yang Benar

```
gamecio/
├── package.json                  # Frontend npm config
├── tauri.conf.json              # ✅ Tauri config (updated)
├── Cargo.toml                   # Workspace Rust config
├── index.html                   # Frontend entry point
├── css/                         # Frontend styles
├── js/                          # Frontend scripts
├── src-tauri/                   # Backend Tauri/Rust
│   ├── Cargo.toml              # ✅ Tauri package config (updated)
│   ├── build.rs                # Tauri build script
│   ├── src/
│   │   └── main.rs             # ✅ Main Rust entry point (moved here)
│   └── icons/
│       └── ...                 # App icons
```

## 📝 Perubahan yang Dibuat

### 1. **tauri.conf.json** ✅
- ✅ Tambahkan `"package"` section dengan `productName` dan `version`
- ✅ Tambahkan `"bundle"` configuration untuk macOS, Windows, Linux
- ✅ Konfigurasi CSP security yang tepat
- ✅ Frontend dist path ke `.` (root directory)

### 2. **src-tauri/Cargo.toml** ✅
- ✅ Tambahkan explicit `name`, `version`, `authors`, `edition`
- ✅ Hapus `.workspace` references, gunakan values directly
- ✅ Tambahkan `rust-version = "1.60"`
- ✅ Metadata lengkap untuk binary

### 3. **src-tauri/src/main.rs** ✅
- ✅ Pindahkan dari `src-tauri/main.rs` ke `src-tauri/src/main.rs`
- ✅ File sudah memiliki konfigurasi Tauri v2 yang correct

## 🚀 Langkah Selanjutnya

### 1. Install Dependencies
```bash
npm install
```

### 2. Develop Mode
```bash
npm run dev        # Terminal 1 (Python server di port 8000)
npm run tauri-dev  # Terminal 2 (Tauri development)
```

### 3. Build untuk Production
```bash
npm run tauri-build
```

## ⚠️ Konfigurasi Penting untuk Tauri v2

### Development Server
- Frontend di-serve dari `http://localhost:8000` (Python http.server)
- Tauri dev menunggu server berjalan
- URL harus match dengan `devUrl` di tauri.conf.json

### Frontend Distribution
- `"frontendDist": "."` = root folder (index.html, css/, js/)
- Build production: semua files diambil dari sini

### Security
```json
"csp": "default-src blob: data: filesystem: ws: http: https: 'unsafe-eval' 'unsafe-inline' 'self'"
```
- Diperlukan untuk Three.js dan game development
- Adjust sesuai kebutuhan security

### Bundle Targets
- `app` = native application (recommended)
- Konfigurasi per-platform (macOS, Windows, Linux)

## 🔧 Troubleshooting

### Error: "No package info in the config file"
**Solusi**: Tambahkan `"package"` section di tauri.conf.json ✅

### Error: "can't find `main` in workspace"
**Solusi**: Pindahkan main.rs ke src-tauri/src/main.rs ✅

### Error: Cannot connect to localhost:8000
**Solusi**: 
```bash
# Terminal 1: Jalankan development server
npm run dev

# Terminal 2: Jalankan Tauri dev (setelah server running)
npm run tauri-dev
```

### Icon tidak muncul di build
**Lokasi icons**: `src-tauri/icons/`
Format:
- macOS: `.png` (128x128)
- Windows: `.ico`
- Linux: `.png`

## 📋 Checklist Konfigurasi

- [x] tauri.conf.json memiliki `package` section
- [x] src-tauri/Cargo.toml memiliki metadata lengkap
- [x] src-tauri/src/main.rs ada di folder yang benar
- [x] package.json memiliki scripts: `tauri`, `tauri-dev`, `tauri-build`
- [x] Workspace Cargo.toml di root dengan member `src-tauri`
- [x] frontendDist pointing ke root (`.`)
- [x] devUrl = `http://localhost:8000`

## 📚 Referensi Tauri v2
- [Tauri Configuration](https://tauri.app/v1/api/config/)
- [Tauri Bundle Configuration](https://tauri.app/v1/api/config/#bundle)
- [Tauri Security](https://tauri.app/v1/guides/distribution/sign-macos)
