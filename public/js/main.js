/**
 * main.js — CIO Simulator game orchestrator.
 * 
 * Ties together all modules: Three.js scene, world factory, hotspots,
 * scenarios, game state, UI, audio, and leaderboard.
 */

import { createScene, handleResize } from './scene.js';
import { buildWorld } from './worlds/worldFactory.js';
import { HotspotManager } from './hotspots.js';
import { LEVELS } from './scenarios.js';
import { GameState } from './gameState.js';
import { UIManager } from './ui.js';
import { AudioManager } from './audio.js';
import { Leaderboard } from './leaderboard.js';
import { GAME_CONFIG } from './config.js';

class Game {
  constructor() {
    this.gameState = new GameState();
    this.ui = new UIManager();
    this.audio = new AudioManager();
    this.leaderboard = new Leaderboard();
    this.hotspotManager = null;
    this.sceneData = null;
    this._worldCleanup = null;
    this.currentLevel = LEVELS[0];
    this.isRunning = false;
    this._boundAnimate = this.animate.bind(this);
  }

  /**
   * Initialize the game: build the 3D scene, create office + hotspots,
   * bind all event handlers, start the render loop, and show the title.
   */
  async init() {
    try {
      // Setup Three.js scene
      const container = document.getElementById('canvas-container');
      if (!container) {
        throw new Error('Canvas container #canvas-container not found');
      }

      this.sceneData = createScene(container);

      // Build the initial world
      this._buildCurrentWorld();

      // Wire up all UI event listeners
      this.bindEvents();
      this.ui.setCTA(GAME_CONFIG.infoProgramUrl);
      this.setLevel(this.currentLevel.id);

      // Start the render loop
      this.isRunning = true;
      this._boundAnimate();

      // Show the title screen
      this.ui.showScreen('title');
    } catch (err) {
      console.error('[CIO Simulator] Initialization failed:', err);
      // Show a user-friendly error if possible
      document.body.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100vh;
                    background:#0a0f1e;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;
                    flex-direction:column;gap:1rem;padding:2rem;text-align:center;">
          <h1 style="color:#ef4444;">⚠️ Gagal Memuat Game</h1>
          <p style="color:#94a3b8;max-width:500px;">${err.message}</p>
          <button onclick="location.reload()" style="padding:12px 24px;background:#00d4ff;
                  color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;">
            Coba Lagi
          </button>
        </div>
      `;
    }
  }

  /**
   * Bind all DOM event listeners: buttons, canvas interactions,
   * keyboard shortcuts, and window resize.
   */
  bindEvents() {
    // ---- Button Events ----

    // Title → Intro
    const btnStart = document.getElementById('btn-start');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        this.audio.init(); // Must initialize AudioContext on user gesture
        this.audio.play('click');
        this.ui.showScreen('intro');
      });
    }

    // Intro → Explore
    const btnEnterOffice = document.getElementById('btn-enter-office');
    if (btnEnterOffice) {
      btnEnterOffice.addEventListener('click', () => {
        this.audio.play('click');
        this.startExploration();
      });
    }

    // Result → Leaderboard
    const btnViewLeaderboard = document.getElementById('btn-view-leaderboard');
    if (btnViewLeaderboard) {
      btnViewLeaderboard.addEventListener('click', () => {
        this.audio.play('click');
        this.showLeaderboard();
      });
    }

    // Save Score
    const btnSaveScore = document.getElementById('btn-save-score');
    if (btnSaveScore) {
      btnSaveScore.addEventListener('click', () => {
        this.saveScore();
      });
    }

    // Leaderboard → CTA
    const btnToCta = document.getElementById('btn-to-cta');
    if (btnToCta) {
      btnToCta.addEventListener('click', () => {
        this.audio.play('click');
        this.ui.showScreen('cta');
      });
    }

    // Play Again
    const btnPlayAgain = document.getElementById('btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        this.audio.play('click');
        this.resetGame();
      });
    }

    // Mute Toggle
    const btnMute = document.getElementById('btn-mute');
    if (btnMute) {
      btnMute.addEventListener('click', () => {
        const muted = !this.audio.isMuted();
        this.audio.setMuted(muted);
        btnMute.textContent = muted ? '🔇' : '🔊';
      });
    }

    const btnAttendantFinish = document.getElementById('btn-attendant-finish');
    if (btnAttendantFinish) {
      btnAttendantFinish.addEventListener('click', () => {
        this.audio.play('click');
        this.endSession();
      });
    }

    const btnAttendantReset = document.getElementById('btn-attendant-reset');
    if (btnAttendantReset) {
      btnAttendantReset.addEventListener('click', () => {
        this.audio.play('click');
        this.resetGame();
      });
    }

    // ---- Canvas Interactions ----
    const canvas = this.sceneData.renderer.domElement;

    canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
    canvas.addEventListener('mousemove', (e) => this.handleCanvasMouseMove(e));

    // ---- Window Events ----
    window.addEventListener('resize', () => {
      handleResize(
        this.sceneData.camera,
        this.sceneData.renderer,
        document.getElementById('canvas-container')
      );
    });

    // Attendant mode: Ctrl+Shift+R for quick reset (prevents browser reload)
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        this.resetGame();
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        this.endSession();
      }
    });
  }

  getCurrentScenarios() {
    return this.currentLevel.scenarios;
  }

  /**
   * Build (or rebuild) the 3D world for the current level.
   * Cleans up the old world first if one exists.
   * @private
   */
  _buildCurrentWorld() {
    // Cleanup old world
    if (this._worldCleanup) {
      this._worldCleanup();
      this._worldCleanup = null;
    }
    if (this.hotspotManager) {
      this.hotspotManager.dispose();
      this.hotspotManager = null;
    }

    // Build new world
    const { hotspotPositions, cleanup } = buildWorld(
      this.sceneData.scene,
      this.currentLevel.sceneTheme
    );
    this._worldCleanup = cleanup;

    // Create hotspot manager for this world
    this.hotspotManager = new HotspotManager(
      this.sceneData.scene,
      this.sceneData.camera,
      hotspotPositions
    );
  }

  setLevel(levelId) {
    const nextLevel = LEVELS.find((level) => level.id === levelId) || LEVELS[0];
    this.currentLevel = nextLevel;
    this.gameState.reset();

    // Rebuild the 3D world for the new level
    this._buildCurrentWorld();

    this.ui.setLevelSelection(LEVELS, nextLevel.id, (selectedId) => {
      this.audio.play('click');
      this.setLevel(selectedId);
    });
    this.ui.setLevelIntro(nextLevel);
  }

  /**
   * Begin the explore phase: start timer, show HUD, start ambient audio.
   */
  startExploration() {
    this.gameState.phase = 'explore';
    this.ui.showScreen('explore');
    this.audio.startAmbient();

    this.ui.updateHUD(
      this.gameState.indicators,
      this.gameState.timeRemaining,
      this.hotspotManager.getCompletedCount(),
      this.getCurrentScenarios().length
    );
  }

  /**
   * Handle click on the 3D canvas — check if a hotspot was hit.
   */
  handleCanvasClick(event) {
    if (this.gameState.phase !== 'explore') return;

    const canvas = this.sceneData.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const scenarioId = this.hotspotManager.onClick(x, y, rect.width, rect.height);
    if (scenarioId) {
      this.audio.play('notification');
      this.openScenario(scenarioId);
    }
  }

  /**
   * Handle mouse move on the 3D canvas — update cursor for hotspot hover.
   */
  handleCanvasMouseMove(event) {
    if (this.gameState.phase !== 'explore') return;

    const canvas = this.sceneData.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const hovering = this.hotspotManager.onMouseMove(x, y, rect.width, rect.height);
    canvas.style.cursor = hovering ? 'pointer' : 'grab';
  }

  /**
   * Open a scenario decision panel.
   */
  openScenario(scenarioId) {
    const scenario = this.getCurrentScenarios().find((s) => s.id === scenarioId);
    if (!scenario) return;

    this.gameState.phase = 'scenario';
    this.ui.showScenarioPanel(scenario, (choiceIndex) => {
      this.makeChoice(scenario, choiceIndex);
    });
  }

  /**
   * Process a player's choice: apply effects, animate changes,
   * show feedback, and check for game completion.
   */
  makeChoice(scenario, choiceIndex) {
    const choice = scenario.choices[choiceIndex];
    if (!choice) return;

    // Snapshot old indicators for animation
    const oldIndicators = { ...this.gameState.indicators };

    // Apply effects to game state
    this.gameState.applyChoice(choice, scenario);
    this.hotspotManager.markCompleted(scenario.id);

    this.audio.play('whoosh');

    // Animate indicator changes
    ['reputation', 'finance', 'compliance'].forEach((key) => {
      if (this.gameState.indicators[key] !== oldIndicators[key]) {
        this.ui.animateIndicatorChange(
          key,
          oldIndicators[key],
          this.gameState.indicators[key]
        );
      }
    });

    // Show feedback toast
    const netEffect =
      (choice.effects.reputation || 0) +
      (choice.effects.finance || 0) +
      (choice.effects.compliance || 0);
    const type = netEffect > 0 ? 'positive' : netEffect < 0 ? 'negative' : 'neutral';
    this.ui.showFeedback(choice.consequence, type);

    // Hide the scenario panel
    this.ui.hideScenarioPanel();

    // Update HUD with new values
    this.ui.updateHUD(
      this.gameState.indicators,
      this.gameState.timeRemaining,
      this.hotspotManager.getCompletedCount(),
      this.getCurrentScenarios().length
    );

    // Check if all scenarios are completed
    if (this.gameState.isAllScenariosComplete(this.getCurrentScenarios().length)) {
      setTimeout(() => {
        if (this.gameState.phase !== 'result') this.showResult();
      }, 1500);
    } else {
      this.gameState.phase = 'explore';
    }
  }

  /**
   * End the current session immediately, used by timer and attendant controls.
   */
  endSession() {
    if (this.gameState.phase !== 'explore' && this.gameState.phase !== 'scenario') return;
    this.ui.hideScenarioPanel();
    this.showResult();
  }

  /**
   * Transition to the result screen with final score and title.
   */
  showResult() {
    this.gameState.phase = 'result';
    this.audio.stopAmbient();
    this.audio.play('result');

    const titleData = this.gameState.getTitle();
    const scoreDetails = this.gameState.getScoreDetails();

    this.ui.setResultScreen(
      titleData,
      this.gameState.indicators,
      scoreDetails,
      this.gameState.getDecisionLog()
    );
    this.ui.showScreen('result');
  }

  /**
   * Show the leaderboard screen with today's entries.
   */
  showLeaderboard() {
    const entries = this.leaderboard.getTodayEntries();
    this.ui.setLeaderboardData(entries);
    this.ui.showScreen('leaderboard');
  }

  /**
   * Save the player's score to the leaderboard.
   */
  saveScore() {
    const { name, school } = this.ui.getLeaderboardInput();

    if (!name.trim()) {
      this.ui.showFeedback('Masukkan nama dulu!', 'negative');
      return;
    }

    const score = this.gameState.getScore();
    const titleData = this.gameState.getTitle();

    this.leaderboard.addEntry(
      name.trim(),
      school.trim(),
      Math.round(score),
      `${titleData.title} - ${this.currentLevel.shortName}`
    );

    this.audio.play('success');
    this.ui.showFeedback('Skor tersimpan!', 'positive');

    // Refresh leaderboard display
    const entries = this.leaderboard.getTodayEntries();
    this.ui.setLeaderboardData(entries);

    // Disable save button to prevent duplicates
    const saveBtn = document.getElementById('btn-save-score');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = '✓ Tersimpan';
    }
  }

  /**
   * Reset the entire game to initial state.
   */
  resetGame() {
    this.gameState.reset();
    this.ui.reset();
    this.audio.stopAmbient();

    // Re-enable save button
    const saveBtn = document.getElementById('btn-save-score');
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Simpan Skor';
    }

    // Clear input fields
    const inputName = document.getElementById('input-name');
    const inputSchool = document.getElementById('input-school');
    if (inputName) inputName.value = '';
    if (inputSchool) inputSchool.value = '';

    this.setLevel(this.currentLevel.id);
    this.ui.showScreen('title');
  }

  /**
   * Main render/animation loop. Called once per frame via requestAnimationFrame.
   */
  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(this._boundAnimate);

    const delta = this.sceneData.clock.getDelta();

    // Update orbit controls
    if (this.sceneData.controls) {
      this.sceneData.controls.update();
    }

    // Update hotspot bob/glow animations
    if (this.hotspotManager) {
      this.hotspotManager.update(delta);
    }

    // Tick game timer during active play, including scenario reading time.
    if (this.gameState.phase === 'explore' || this.gameState.phase === 'scenario') {
      const expired = this.gameState.updateTimer(delta);

      this.ui.updateHUD(
        this.gameState.indicators,
        this.gameState.timeRemaining,
        this.hotspotManager.getCompletedCount(),
        this.getCurrentScenarios().length
      );

      if (expired) {
        this.endSession();
      }
    }

    // Render the scene
    this.sceneData.renderer.render(
      this.sceneData.scene,
      this.sceneData.camera
    );
  }
}

// ---- Boot ----
const game = new Game();
game.init();
