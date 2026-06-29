# CIO Simulator – Educational Game for IT Governance

An interactive 3D educational game that teaches IT governance, compliance, and strategic decision-making through the perspective of a Chief Information Officer (CIO). Navigate real-world IT challenges across three organizational contexts: corporate, hospital, and campus environments.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-Educational-green)

## 🎮 Overview

**CIO Simulator** is a gamified learning platform designed for students and IT professionals to understand the complexities of IT governance, security, compliance, and organizational strategy. Play as a CIO making critical decisions that impact your organization's Reputation, Finance, and Compliance metrics.

### ✨ Key Features

- **3D Interactive Environment** – Explore beautifully rendered office spaces using Three.js
- **Three Game Levels** – Corporate, Hospital, and Campus settings with unique scenarios
- **18 Decision Scenarios** – 6 scenarios per level with branching consequences
- **Real-Time Metrics** – Track Reputation, Finance, and Compliance indicators
- **Leaderboard System** – Save scores and compete with other players
- **Desktop Executable** – Convert to Windows .exe or macOS .app using Tauri
- **Responsive Design** – Works seamlessly across desktop browsers
- **Synthesized Audio** – Game sounds generated using Web Audio API
- **Educational Framework** – Content aligned with COBIT, ISO 27001, and UU PDP

## 🚀 Quick Start

### Option 1: Play in Web Browser (Easiest)

**Requirements:** Python 3.x or any HTTP server

```bash
cd gamecio
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

Click "Mulai sebagai CIO Baru" (Start as New CIO) to begin.

### Option 2: Desktop App with Tauri (Recommended)

Convert the game into a standalone executable (.exe for Windows, .app for macOS).

**Requirements:**
- Node.js 18+
- Rust (for Tauri)
- npm

**Build Steps:**

```bash
cd gamecio

# Install dependencies
npm install

# Build for your platform
npm run tauri-build

# Output location:
# macOS: target/release/bundle/macos/CIO\ Simulator.app
# Windows (cross-compile): target/x86_64-pc-windows-gnu/release/bundle/msi/*.msi
```

**Benefits:**
- ✅ Standalone executable (no browser needed)
- ✅ Native application experience
- ✅ Small file size (~10 MB vs 200+ MB Electron)
- ✅ Works offline
- ✅ Can be installed system-wide

## 📦 Build Executable Using Tauri

### macOS Build (from macOS)
```bash
npm run tauri-build
# Output: CIO Simulator.app (~8 MB)
```

### Windows Build from macOS (Cross-Compilation)
```bash
# Prerequisites already set up in this project
bash build-windows.sh
# Output: target/x86_64-pc-windows-gnu/release/bundle/msi/*.msi
```

### Where Is the .exe File?

After building:

```
gamecio/
├── target/
│   ├── release/bundle/macos/           # macOS .app
│   └── x86_64-pc-windows-gnu/release/
│       ├── cio-simulator.exe           # Windows executable
│       └── bundle/msi/                 # Windows installer (.msi)
```

**Direct paths:**
- **macOS app**: `target/release/bundle/macos/CIO\ Simulator.app/Contents/MacOS/CIO\ Simulator`
- **Windows exe**: `target/x86_64-pc-windows-gnu/release/cio-simulator.exe`
- **Windows installer**: `target/x86_64-pc-windows-gnu/release/bundle/msi/*.msi`

## 🎯 Gameplay Guide

### Game Phases

1. **Welcome Screen** – Select difficulty level (1-3)
2. **Mission Briefing** – Read your CIO assignment
3. **Explore** – Navigate the 3D office environment
4. **Encounter Scenarios** – Click hotspots to trigger decision points
5. **Make Decisions** – Choose actions and see real-time impacts
6. **View Results** – See final score and earned title
7. **Save Score** – Add to leaderboard and compete

### Three Core Metrics

- **Reputation** (0-100) – Organizational trust and credibility
- **Finance** (0-100) – Budget and financial health
- **Compliance** (0-100) – Regulatory adherence and risk management

### Game Duration

- ~5 minutes per session
- 6 scenarios per level
- Scenarios can be completed in any order
- Total 18 scenarios across all levels

## 🌍 Three Game Worlds

### 1. Corporate Level
IT governance in a commercial organization
- Budget Security & Firewall Investment
- Data Breach Response & Transparency
- AI & Emerging Technology Adoption
- Build vs. Buy Outsourcing Decisions
- Digital Transformation & Legacy Systems
- Compliance Audit & Data Protection

### 2. Hospital Level
IT governance in healthcare
- Medical Records Security & System Upgrades
- Patient Data Breach Response
- AI in Medical Diagnosis (Triage)
- EHR Integration Strategies
- Digital Queue Management Systems
- Patient Privacy & Access Controls

### 3. Campus Level
IT governance in education
- Campus Authentication (SSO) Security
- Phishing Attack & Security Awareness
- Generative AI Tools in Education
- Learning Management System Strategy
- Student Information System Integration
- Alumni Data Privacy & Sharing

## 🛠 Technology Stack

### Frontend
- **Three.js 0.164.1** – 3D rendering and visualization
- **OrbitControls** – Intuitive camera control
- **Web Audio API** – Synthesized sound effects
- **Vanilla JavaScript (ES6 Modules)** – Core game logic
- **CSS3** – Glassmorphic UI design

### Backend
- **Tauri 2.0** – Desktop app framework (Rust + WebView)
- **Rust** – System integration and performance

### Storage
- **LocalStorage** – Leaderboard persistence

## 📁 Project Structure

```
gamecio/
├── index.html                          # Main entry point
├── package.json                        # npm configuration
├── Cargo.toml                          # Rust workspace config
├── tauri.conf.json                     # Tauri app configuration
├── .cargo/config.toml                  # Rust cross-compile config
│
├── css/
│   └── styles.css                      # Global styling
│
├── js/
│   ├── main.js                         # Game orchestrator
│   ├── scene.js                        # Three.js initialization
│   ├── gameState.js                    # Game state management
│   ├── ui.js                           # UI Manager
│   ├── hotspots.js                     # Interactive hotspots
│   ├── scenarios.js                    # Decision scenarios
│   ├── audio.js                        # Audio synthesis
│   ├── leaderboard.js                  # Score persistence
│   ├── config.js                       # Configuration
│   ├── utils.js                        # Utilities
│   └── worlds/
│       ├── worldFactory.js             # World builder
│       ├── corporateWorld.js           # Corporate office
│       ├── hospitalWorld.js            # Hospital environment
│       └── campusWorld.js              # Campus office
│
├── public/                             # Web assets (build output)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
└── src-tauri/                          # Tauri backend
    ├── src/main.rs                     # Rust entry point
    ├── Cargo.toml                      # Rust dependencies
    └── target/
        └── release/                    # Build outputs
```

## ⚙️ Configuration

Edit `js/config.js` to customize game parameters:

```javascript
export const GAME_CONFIG = {
  sessionDurationSeconds: 300,    // Game duration (seconds)
  infoProgramUrl: 'https://...',  // Program information link
  maxScenarios: 6                 // Scenarios per level
};
```

## 💾 Data & Persistence

- **Leaderboard** – Stored in browser's `localStorage`
- **Key** – `cio_simulator_leaderboard`
- **Format** – JSON array of player scores with timestamps
- **Syncing** – Client-side only (no server required)

## 🔊 Audio System

All audio is synthesized in real-time using Web Audio API:
- **Click** – Button interactions
- **Success** – Positive decision outcomes
- **Warning** – Negative decision outcomes
- **Whoosh** – Scenario transitions
- **Notification** – Available scenarios
- **Ambient** – Background during exploration

Users can mute audio from the settings menu.

## 🎨 Visual Design

- **Glassmorphic UI** – Modern frosted glass aesthetic
- **Dark Theme** – Cyan accents (#00d4ff) for accessibility
- **Animated Gauges** – Smooth metric transitions
- **3D Rendering** – Procedurally generated assets
- **Responsive Layout** – Adapts to various screen sizes

## 🔐 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Chromium | ✅ Full | Recommended |
| Firefox | ✅ Full | Excellent performance |
| Safari | ✅ Full | iOS 13+ |
| Edge | ✅ Full | Chromium-based |

**Requirements:** WebGL 2.0 support

## 🌐 Deployment Options

### Option 1: Static Hosting
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

```bash
# Simply upload the gamecio/ folder
```

### Option 2: Desktop App Distribution
Build and distribute .exe/.app executables via:
- Direct download (GitHub Releases)
- Microsoft Store
- Apple App Store
- Software package managers (Chocolatey, Winget)

### Option 3: Docker Container
```bash
docker build -t cio-simulator .
docker run -p 8000:8000 cio-simulator
```

## 🔧 Development & Customization

### Adding New Scenarios

Edit `js/scenarios.js`:

```javascript
{
  id: 'unique_id',
  title: 'Scenario Title',
  icon: '🎯',
  location: 'Office Area',
  description: 'Context and background...',
  choices: [
    {
      text: 'Option 1',
      effects: { reputation: 10, finance: -5, compliance: 8 },
      consequence: 'What happens...',
      flags: { flagName: true }
    },
    { /* Option 2 */ }
  ]
}
```

### Adding New Worlds

Create `js/worlds/myWorld.js`:

```javascript
export function buildMyWorld(scene) {
  const hotspotPositions = new Map();
  
  // Build 3D objects and add to scene...
  // Add hotspots...
  hotspotPositions.set('scenario_id', new THREE.Vector3(x, y, z));
  
  return {
    hotspotPositions,
    cleanup: () => { /* cleanup code */ }
  };
}
```

Update `worldFactory.js` and `scenarios.js`.

### Development Server

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for web
npm run tauri-build  # Build desktop app
```

## 🐛 Troubleshooting

### Application won't start
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Ensure WebGL is enabled

### 3D scene is dark
- Adjust window lighting in scene.js
- Check graphics card drivers
- Try a different browser

### Audio not playing
- Unmute system volume
- Check browser audio permissions
- Try muting and unmuting in game settings

### Tauri build fails
```bash
# Clear cache and rebuild
rm -rf node_modules target
npm install
npm run tauri-build
```

## 📚 Educational Framework Alignment

Scenarios are designed around:
- **COBIT 2019** – IT governance framework
- **ISO 27001/27701** – Information security standards
- **UU PDP** – Indonesia's Personal Data Protection Law
- **HIPAA** – Healthcare data protection (hospital scenarios)
- **GDPR Concepts** – Privacy and data protection principles

Each decision includes learning notes explaining the governance principle involved.

## 📊 Performance

- **File Size** – ~10 MB (standalone), ~2 MB (web)
- **Load Time** – <2 seconds (web), <1 second (app)
- **Memory Usage** – ~150 MB (desktop app)
- **FPS** – Stable 60 FPS on modern hardware
- **Offline Mode** – Full functionality without internet

## 🤝 Contributing

To contribute improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is developed for educational purposes at **UBHINUS (Universitas Buana Harapan Indonesia)**.

Educational use is permitted. Commercial use requires explicit written permission.

## 👥 Credits

- **Concept & Design** – UBHINUS IT Governance Education Program
- **Development** – Web Development Team
- **Institution** – UBHINUS Smart Campus Initiative

## 📞 Support & Contact

For questions about the game, educational content, or implementation:
- Contact: Information Systems Department, UBHINUS
- Email: cio-simulator@ubhinus.ac.id

## 🔗 Links

- **GitHub**: [adnanzulkarnain/ciosimulator](https://github.com/adnanzulkarnain/ciosimulator)
- **Three.js**: https://threejs.org/
- **Tauri**: https://v2.tauri.app/
- **COBIT**: https://www.isaca.org/resources/cobit

---

**Status:** ✅ Active & Maintained  
**Last Updated:** June 2026  
**Version:** 1.0.0  
**Language:** Game UI in Indonesian, Documentation in English
