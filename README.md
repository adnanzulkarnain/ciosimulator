# CIO Simulator — Educational Game for IT Governance

An interactive 3D educational game that teaches IT governance and strategic decision-making through the perspective of a Chief Information Officer (CIO). Players navigate real-world IT challenges across three different organizational contexts: corporate, hospital, and campus environments.

## 🎮 Overview

**CIO Simulator** is a gamified learning experience designed for students and professionals to understand the complexities of IT governance, compliance, security, and organizational strategy. Make critical decisions as a CIO and watch how they impact your organization's Reputation, Finance, and Compliance metrics.

### Key Features

- **3D Interactive Environment** - Explore beautifully rendered office spaces using Three.js
- **Three Game Levels** - Corporate, Hospital, and Campus settings with unique scenarios
- **Decision-Based Gameplay** - 6 scenarios per level with branching consequences
- **Real-Time Metrics** - Track Reputation, Finance, and Compliance indicators
- **Leaderboard System** - Save scores and compete with other players
- **Responsive Design** - Works seamlessly across desktop browsers
- **Synthesized Audio** - Game sounds generated using Web Audio API
- **Educational Content** - Each decision includes learning notes aligned with IT governance frameworks (COBIT, ISO 27001, UU PDP)

## 🚀 Quick Start

### Prerequisites

- Modern web browser with WebGL support
- Python 3.x (for local development server)
- No external dependencies required (Three.js loaded from CDN)

### Installation & Running

1. **Clone or download the project**
   ```bash
   cd gamecio
   ```

2. **Start a local HTTP server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

4. **Play!** Click "Mulai sebagai CIO Baru" to begin

## 📁 Project Structure

```
gamecio/
├── index.html              # Main HTML entry point
├── README.md               # This file
├── css/
│   └── styles.css          # Global styling and animations
└── js/
    ├── main.js             # Game orchestrator and main loop
    ├── scene.js            # Three.js scene initialization
    ├── gameState.js        # Game state management
    ├── ui.js               # UI Manager for all DOM elements
    ├── hotspots.js         # Interactive hotspot manager
    ├── scenarios.js        # Game scenarios and branching logic
    ├── audio.js            # Audio synthesis and playback
    ├── leaderboard.js      # Leaderboard persistence (localStorage)
    ├── config.js           # Global configuration
    ├── utils.js            # Utility functions
    ├── qrCode.js           # QR code generation
    └── worlds/
        ├── worldFactory.js      # World builder factory
        ├── corporateWorld.js    # Corporate office 3D scene
        ├── hospitalWorld.js     # Hospital 3D scene
        └── campusWorld.js       # Campus 3D scene
```

## 🎯 Gameplay

### Phases

1. **Title Screen** - Select difficulty level (1-3)
2. **Intro** - Read mission briefing
3. **Explore** - Navigate 3D environment and click hotspots
4. **Scenario** - Read decision scenario and choose action
5. **Result** - View final score, title, and decision impacts
6. **Leaderboard** - Save score and view rankings
7. **CTA** - Call-to-action screen with program information

### Three Metrics

- **Reputation** - Organizational trust and credibility (0-100)
- **Finance** - Budget and financial health (0-100)
- **Compliance** - Regulatory adherence and risk management (0-100)

### Game Duration

- 5 minutes per session
- 6 scenarios per level
- Scenarios can be completed in any order

## 🛠 Technology Stack

### Frontend
- **Three.js 0.164.1** - 3D rendering and visualization
- **OrbitControls** - Camera control for 3D scene navigation
- **Web Audio API** - Synthesized sound effects
- **Vanilla JavaScript (ES6 Modules)** - Core game logic
- **CSS3** - Glassmorphism UI with animations

### Architecture

- **Modular Design** - Each system (game state, UI, audio, 3D) is independent
- **MVC-like Pattern** - Clear separation between game logic and presentation
- **Resource Management** - Proper cleanup of Three.js geometries, materials, and lights
- **Consequence Chaining** - Flag-based system for interconnected decisions

## 📊 Scenarios

Each level contains 6 decision scenarios:

### Corporate Level
1. **Budget Security** - Firewall investment decision
2. **Data Breach** - Incident response and transparency
3. **New Tech** - AI adoption governance
4. **Outsourcing** - Build vs. Buy decision
5. **Legacy System** - Digital transformation approach
6. **Compliance Audit** - Data protection audit preparation

### Hospital Level
1. **Medical Records Security** - Healthcare system upgrade
2. **Patient Data Breach** - Healthcare incident response
3. **AI Triage** - Medical AI implementation
4. **System Integration** - EHR integration strategy
5. **Queue Management** - Digital queue system
6. **Privacy Audit** - Patient data access control

### Campus Level
1. **SSO Security** - Campus authentication system
2. **Phishing Attack** - Security awareness incident
3. **AI Tools** - Generative AI adoption in education
4. **Learning Portal** - Learning management system strategy
5. **Integrated Apps** - Student information system
6. **Data Alumni** - Alumni data sharing and privacy

## 📚 Educational Framework

Scenarios are aligned with:
- **COBIT** - IT governance framework
- **ISO 27001/27701** - Information security standards
- **UU PDP** - Indonesia's Personal Data Protection Law
- **HIPAA/Healthcare Regulations** - For hospital scenarios
- **GDPR-like concepts** - Privacy and data protection

## 🎨 UI/UX Design

- **Glassmorphic Interface** - Modern frosted glass aesthetic
- **Dark Theme** - Cyan accents (#00d4ff) for accessibility
- **Animated Gauges** - Smooth transitions for metric changes
- **Toast Notifications** - Feedback on decisions
- **Responsive Layout** - Adapts to different screen sizes

## 🔧 Configuration

Edit `js/config.js` to customize:
```javascript
export const GAME_CONFIG = {
  sessionDurationSeconds: 300,        // Game duration in seconds
  infoProgramUrl: 'https://...',      // Program information URL
  maxScenarios: 6                     // Scenarios per level
};
```

## 💾 Data Persistence

- **Leaderboard** - Stored in browser's `localStorage`
- **Key** - `cio_simulator_leaderboard`
- **Format** - JSON array of player entries with scores, titles, timestamps

## 🎤 Audio System

Audio is synthesized in real-time using Web Audio API:
- **Click** - Button interaction
- **Hover** - UI element hover
- **Success** - Positive decision outcome
- **Warning** - Negative decision outcome
- **Whoosh** - Decision transition
- **Notification** - Scenario available
- **Result** - Session completion
- **Ambient** - Background music during exploration

## 🖼 3D Assets

All 3D objects are procedurally generated using Three.js geometries:
- **Corporate Office** - Executive workspace with desk, chairs, plants, etc.
- **Hospital** - Medical setting with equipment and workspace
- **Campus** - Educational environment with typical office/admin space

No external 3D models required - everything is built from basic geometries.

## 🔐 Browser Compatibility

- **Chrome/Chromium** - Full support
- **Firefox** - Full support
- **Safari** - Full support (iOS 13+)
- **Edge** - Full support

Requires WebGL 2.0 support for Three.js rendering.

## 📱 Accessibility Notes

- Large, readable fonts
- High contrast color scheme
- Keyboard support for basic navigation
- Audio can be muted
- Clear instructional text in Indonesian

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

No backend required - everything runs client-side.

### Local Development
```bash
# Start HTTP server
python3 -m http.server 8000

# Visit browser
open http://localhost:8000
```

## 🐛 Development Notes

### Attendant Mode
Kiosk attendants can use:
- **Ctrl+Shift+R** - Quick reset without browser reload
- **Ctrl+Shift+F** - Finish current session
- **⏭ Button** - End session
- **↺ Button** - Reset game

### Adding New Scenarios

Edit `js/scenarios.js` and add to appropriate scenario array:
```javascript
{
  id: 'unique_id',
  title: 'Scenario Title',
  icon: '🎯',
  location: 'Office Location',
  description: 'Scenario context...',
  choices: [
    {
      text: 'Option 1',
      effects: { reputation: 10, finance: -5, compliance: 8 },
      consequence: 'What happens with this choice...',
      flags: { flagName: true }
    },
    // More choices...
  ]
}
```

### Adding New Worlds

Create `js/worlds/newWorld.js`:
```javascript
export function buildNewWorld(scene) {
  const hotspotPositions = new Map();
  // Build your 3D scene...
  hotspotPositions.set('scenario_id', new THREE.Vector3(x, y, z));
  
  return {
    hotspotPositions,
    cleanup: () => { /* cleanup code */ }
  };
}
```

Update `js/worlds/worldFactory.js` and `js/scenarios.js`.

## 📄 License

This project is developed for educational purposes at UBHINUS (Universitas Buana Harapan Indonesia).

## 👥 Credits

- **Concept & Design** - IT Governance Education Program
- **Development** - Web Development Team
- **Institution** - UBHINUS Smart Campus Initiative

## 📧 Contact & Support

For questions about the game or educational content, contact the Information Systems Department at UBHINUS.

---

**Last Updated:** 2024  
**Version:** 1.0.0  
**Language:** English (UI/Game in Indonesian)
