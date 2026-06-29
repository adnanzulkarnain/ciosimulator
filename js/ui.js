/**
 * UIManager — Controls all DOM-based UI for CIO Simulator.
 * 
 * Queries pre-existing DOM elements by ID, manages screen transitions,
 * HUD updates, scenario panels, feedback toasts, and result displays.
 */

import { createQrSvg } from './qrCode.js';
import { formatTime } from './utils.js';

export class UIManager {
  constructor() {
    // ---- Cache DOM References ----

    // HUD
    this.hudOverlay = document.getElementById('hud-overlay');
    this.gaugeReputationFill = document.getElementById('gauge-reputation-fill');
    this.gaugeReputationValue = document.getElementById('gauge-reputation-value');
    this.gaugeFinanceFill = document.getElementById('gauge-finance-fill');
    this.gaugeFinanceValue = document.getElementById('gauge-finance-value');
    this.gaugeComplianceFill = document.getElementById('gauge-compliance-fill');
    this.gaugeComplianceValue = document.getElementById('gauge-compliance-value');
    this.hudTimer = document.getElementById('hud-timer');
    this.hudProgress = document.getElementById('hud-progress');

    // Gauge parent elements (for flash animations)
    this.gaugeElements = {
      reputation: document.getElementById('gauge-reputation'),
      finance: document.getElementById('gauge-finance'),
      compliance: document.getElementById('gauge-compliance'),
    };

    // Screens
    this.screens = {
      title: document.getElementById('screen-title'),
      intro: document.getElementById('screen-intro'),
      explore: document.getElementById('screen-explore'),
      result: document.getElementById('screen-result'),
      leaderboard: document.getElementById('screen-leaderboard'),
      cta: document.getElementById('screen-cta'),
    };

    // Level Selection
    this.levelSelector = document.getElementById('level-selector');
    this.introTitle = document.getElementById('intro-title');
    this.introRole = document.getElementById('intro-role');
    this.introMission = document.getElementById('intro-mission');

    // Scenario Panel
    this.scenarioPanel = document.getElementById('scenario-panel');
    this.scenarioIcon = document.getElementById('scenario-icon');
    this.scenarioTitle = document.getElementById('scenario-title');
    this.scenarioDescription = document.getElementById('scenario-description');
    this.scenarioChoices = document.getElementById('scenario-choices');

    // Result Screen
    this.resultTitle = document.getElementById('result-title');
    this.resultDescription = document.getElementById('result-description');
    this.resultEduMessage = document.getElementById('result-edu-message');
    this.resultScore = document.getElementById('result-score');
    this.impactList = document.getElementById('impact-list');
    this.resultGaugeReputation = document.getElementById('result-gauge-reputation');
    this.resultGaugeFinance = document.getElementById('result-gauge-finance');
    this.resultGaugeCompliance = document.getElementById('result-gauge-compliance');

    // Leaderboard
    this.leaderboardTableBody = document.getElementById('leaderboard-table-body');
    this.inputName = document.getElementById('input-name');
    this.inputSchool = document.getElementById('input-school');

    // Feedback Container
    this.feedbackContainer = document.getElementById('feedback-container');

    // Mute Button
    this.btnMute = document.getElementById('btn-mute');

    // CTA
    this.qrCode = document.getElementById('qr-code');

    // Active choice listeners (for cleanup)
    this._choiceCleanupFns = [];
  }

  /**
   * Show a named screen, hiding all others with a fade transition.
   * Controls HUD visibility based on active screen.
   * @param {'title'|'intro'|'explore'|'result'|'leaderboard'|'cta'} name
   */
  showScreen(name) {
    // Hide all screen overlays
    Object.entries(this.screens).forEach(([key, el]) => {
      if (!el) return;
      if (key === name) {
        el.style.display = 'flex';
        // Force reflow so animation replays
        el.offsetHeight; // eslint-disable-line no-unused-expressions
        el.classList.remove('fade-out');
        el.style.animation = 'none';
        el.offsetHeight; // eslint-disable-line no-unused-expressions
        el.style.animation = '';
      } else {
        el.style.display = 'none';
        el.classList.remove('fade-out');
      }
    });

    // HUD is only visible in explore phase
    if (this.hudOverlay) {
      this.hudOverlay.style.display = name === 'explore' ? 'flex' : 'none';
    }
  }

  /**
   * Render selectable level cards on the title screen.
   * @param {Array} levels
   * @param {string} selectedLevelId
   * @param {Function} onSelect
   */
  setLevelSelection(levels, selectedLevelId, onSelect) {
    if (!this.levelSelector) return;

    this.levelSelector.innerHTML = '';

    levels.forEach((level) => {
      const button = document.createElement('button');
      button.className = 'level-card';
      if (level.id === selectedLevelId) {
        button.classList.add('selected');
      }
      button.type = 'button';
      button.innerHTML = `
        <span class="level-badge">${this._escapeHTML(level.badge)}</span>
        <strong>${this._escapeHTML(level.shortName)}</strong>
        <span>${this._escapeHTML(level.title)}</span>
      `;
      button.addEventListener('click', () => onSelect(level.id));
      this.levelSelector.appendChild(button);
    });
  }

  /**
   * Update intro text for the selected case world.
   * @param {Object} level
   */
  setLevelIntro(level) {
    if (this.introTitle) {
      this.introTitle.textContent = `${level.shortName}: ${level.title}`;
    }
    if (this.introRole) {
      this.introRole.innerHTML = this._escapeHTML(level.intro).replace(
        'CIO',
        '<strong>Chief Information Officer</strong>'
      );
    }
    if (this.introMission) {
      this.introMission.textContent = `"${level.mission}"`;
    }
  }

  /**
   * Show the scenario decision panel with slide-up animation.
   * @param {Object} scenario — scenario from SCENARIOS array
   * @param {Function} onChoice — callback(choiceIndex)
   */
  showScenarioPanel(scenario, onChoice) {
    if (!this.scenarioPanel) return;

    // Populate content
    this.scenarioIcon.textContent = scenario.icon || '💻';
    this.scenarioTitle.textContent = scenario.title;
    this.scenarioDescription.textContent = scenario.description;

    // Clear old choices and listeners
    this._cleanupChoices();
    this.scenarioChoices.innerHTML = '';

    // Create choice buttons
    scenario.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'btn-choice';
      btn.textContent = choice.text;

      const handler = () => {
        onChoice(index);
      };
      btn.addEventListener('click', handler);

      this._choiceCleanupFns.push(() => {
        btn.removeEventListener('click', handler);
      });

      this.scenarioChoices.appendChild(btn);
    });

    // Show panel with animation
    this.scenarioPanel.classList.remove('hide');
    this.scenarioPanel.style.display = 'block';
    // Force reflow for animation
    this.scenarioPanel.offsetHeight; // eslint-disable-line no-unused-expressions
    this.scenarioPanel.style.animation = 'none';
    this.scenarioPanel.offsetHeight; // eslint-disable-line no-unused-expressions
    this.scenarioPanel.style.animation = '';
  }

  /**
   * Hide the scenario panel with slide-down animation.
   */
  hideScenarioPanel() {
    if (!this.scenarioPanel) return;

    this.scenarioPanel.classList.add('hide');

    // Clean up after animation
    const onEnd = () => {
      this.scenarioPanel.style.display = 'none';
      this.scenarioPanel.classList.remove('hide');
      this._cleanupChoices();
      this.scenarioPanel.removeEventListener('animationend', onEnd);
    };
    this.scenarioPanel.addEventListener('animationend', onEnd);

    // Fallback in case animationend doesn't fire
    setTimeout(() => {
      if (this.scenarioPanel.style.display !== 'none') {
        this.scenarioPanel.style.display = 'none';
        this.scenarioPanel.classList.remove('hide');
        this._cleanupChoices();
      }
    }, 500);
  }

  /**
   * Remove all choice button event listeners.
   */
  _cleanupChoices() {
    this._choiceCleanupFns.forEach((fn) => fn());
    this._choiceCleanupFns = [];
  }

  /**
   * Show a toast notification with auto-dismiss.
   * @param {string} text — message to show
   * @param {'positive'|'negative'|'neutral'} type — color variant
   */
  showFeedback(text, type = 'neutral') {
    if (!this.feedbackContainer) return;

    const toast = document.createElement('div');
    toast.className = `feedback-toast ${type}`;
    toast.textContent = text;
    this.feedbackContainer.appendChild(toast);

    // Auto-dismiss after 2.5s
    setTimeout(() => {
      toast.classList.add('fade-out');
      toast.addEventListener('animationend', () => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      });
      // Safety fallback
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 500);
    }, 2500);
  }

  /**
   * Update the HUD gauge fills, timer, and progress counter.
   * @param {Object} indicators — { reputation, finance, compliance }
   * @param {number} timeRemaining — seconds remaining
   * @param {number} completedCount — completed scenarios
   * @param {number} totalCount — total scenarios
   */
  updateHUD(indicators, timeRemaining, completedCount, totalCount) {
    // Gauge fills — clamp to 0-100%
    if (this.gaugeReputationFill) {
      const repVal = Math.max(0, Math.min(100, indicators.reputation));
      this.gaugeReputationFill.style.width = repVal + '%';
      this.gaugeReputationValue.textContent = Math.round(repVal);
    }
    if (this.gaugeFinanceFill) {
      const finVal = Math.max(0, Math.min(100, indicators.finance));
      this.gaugeFinanceFill.style.width = finVal + '%';
      this.gaugeFinanceValue.textContent = Math.round(finVal);
    }
    if (this.gaugeComplianceFill) {
      const compVal = Math.max(0, Math.min(100, indicators.compliance));
      this.gaugeComplianceFill.style.width = compVal + '%';
      this.gaugeComplianceValue.textContent = Math.round(compVal);
    }

    // Timer
    if (this.hudTimer) {
      this.hudTimer.textContent = this._formatTime(timeRemaining);

      // Pulse effect when under 60 seconds
      if (timeRemaining < 60) {
        this.hudTimer.classList.add('pulse');
      } else {
        this.hudTimer.classList.remove('pulse');
      }
    }

    // Progress
    if (this.hudProgress) {
      this.hudProgress.textContent = `Keputusan ${completedCount}/${totalCount}`;
    }
  }

  /**
   * Flash a gauge and show a floating delta indicator.
   * @param {string} indicatorName — 'reputation'|'finance'|'compliance'
   * @param {number} oldValue
   * @param {number} newValue
   */
  animateIndicatorChange(indicatorName, oldValue, newValue) {
    const gaugeEl = this.gaugeElements[indicatorName];
    if (!gaugeEl) return;

    // Flash the gauge
    gaugeEl.classList.add('flash');
    setTimeout(() => gaugeEl.classList.remove('flash'), 600);

    // Show floating delta
    const delta = Math.round(newValue - oldValue);
    if (delta === 0) return;

    const deltaEl = document.createElement('span');
    deltaEl.className = `indicator-delta ${delta > 0 ? 'positive' : 'negative'}`;
    deltaEl.textContent = (delta > 0 ? '+' : '') + delta;

    // Position relative to the gauge
    const rect = gaugeEl.getBoundingClientRect();
    deltaEl.style.position = 'fixed';
    deltaEl.style.left = (rect.left + rect.width / 2) + 'px';
    deltaEl.style.top = (rect.top - 5) + 'px';

    document.body.appendChild(deltaEl);

    // Remove after animation
    setTimeout(() => {
      if (deltaEl.parentNode) {
        deltaEl.parentNode.removeChild(deltaEl);
      }
    }, 1200);
  }

  /**
   * Populate the result screen with final data.
   * @param {Object} titleData — { title, description, eduMessage }
   * @param {Object} indicators — { reputation, finance, compliance }
   * @param {Object|number} scoreDetails — score details, or legacy score number
   * @param {Array} decisionLog — list of decision impacts
   */
  setResultScreen(titleData, indicators, scoreDetails, decisionLog = []) {
    const details = typeof scoreDetails === 'number'
      ? { score: scoreDetails, baseScore: scoreDetails, balancePenalty: 0, imbalance: 0 }
      : scoreDetails;

    if (this.resultTitle) {
      this.resultTitle.textContent = titleData.title;
    }
    if (this.resultDescription) {
      this.resultDescription.textContent = titleData.description;
    }
    if (this.resultEduMessage) {
      this.resultEduMessage.textContent = titleData.eduMessage;
    }
    if (this.resultScore) {
      this.resultScore.textContent = Math.round(details.score);
    }

    this._renderImpactList(decisionLog);

    // Animate result gauges (slight delay for visual pop)
    requestAnimationFrame(() => {
      if (this.resultGaugeReputation) {
        this.resultGaugeReputation.style.width = Math.max(0, Math.min(100, indicators.reputation)) + '%';
      }
      if (this.resultGaugeFinance) {
        this.resultGaugeFinance.style.width = Math.max(0, Math.min(100, indicators.finance)) + '%';
      }
      if (this.resultGaugeCompliance) {
        this.resultGaugeCompliance.style.width = Math.max(0, Math.min(100, indicators.compliance)) + '%';
      }
    });
  }

  /**
   * Render per-decision impact summaries.
   * @private
   */
  _renderImpactList(decisionLog) {
    if (!this.impactList) return;

    this.impactList.innerHTML = '';

    if (!decisionLog || decisionLog.length === 0) {
      return;
    }

    const heading = document.createElement('h3');
    heading.textContent = 'Dampak Keputusan';
    this.impactList.appendChild(heading);

    decisionLog.forEach((entry, index) => {
      const item = document.createElement('div');
      item.className = 'impact-item';

      const deltas = ['reputation', 'finance', 'compliance']
        .map((key) => {
          const value = entry.effects[key] || 0;
          const label = this._indicatorLabel(key);
          const sign = value > 0 ? '+' : '';
          const cls = value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral';
          return `<span class="impact-delta ${cls}">${label} ${sign}${value}</span>`;
        })
        .join('');

      item.innerHTML = `
        <div class="impact-title">${index + 1}. ${this._escapeHTML(entry.title)}</div>
        <div class="impact-choice">${this._escapeHTML(entry.choice)}</div>
        <div class="impact-deltas">${deltas}</div>
        <p>${this._escapeHTML(entry.consequence)}</p>
      `;

      this.impactList.appendChild(item);
    });
  }

  /**
   * Populate the leaderboard table.
   * @param {Array} entries — [{ name, school, score, title }]
   */
  setLeaderboardData(entries) {
    if (!this.leaderboardTableBody) return;

    this.leaderboardTableBody.innerHTML = '';

    if (!entries || entries.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="5" style="text-align:center; color: var(--color-text-dim); padding: 2rem;">Belum ada skor. Jadilah yang pertama!</td>';
      this.leaderboardTableBody.appendChild(row);
      return;
    }

    entries.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${this._escapeHTML(entry.name)}</td>
        <td>${this._escapeHTML(entry.school || '-')}</td>
        <td>${this._escapeHTML(entry.title || '-')}</td>
        <td>${entry.score}</td>
      `;
      this.leaderboardTableBody.appendChild(row);
    });
  }

  /**
   * Render the program info QR code and fallback link.
   * @param {string} infoUrl
   */
  setCTA(infoUrl) {
    if (!this.qrCode) return;

    this.qrCode.innerHTML = '';

    try {
      const qr = document.createElement('div');
      qr.className = 'qr-code';
      qr.innerHTML = createQrSvg(infoUrl);
      this.qrCode.appendChild(qr);
    } catch (err) {
      const fallback = document.createElement('div');
      fallback.className = 'qr-fallback';
      fallback.textContent = 'QR belum tersedia';
      this.qrCode.appendChild(fallback);
      console.warn('[CIO Simulator] Failed to render QR:', err);
    }

    const link = document.createElement('a');
    link.className = 'qr-link';
    link.href = infoUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = infoUrl.replace(/^https?:\/\//, '');
    this.qrCode.appendChild(link);
  }

  /**
   * Get current values from leaderboard input fields.
   * @returns {{ name: string, school: string }}
   */
  getLeaderboardInput() {
    return {
      name: (this.inputName ? this.inputName.value : ''),
      school: (this.inputSchool ? this.inputSchool.value : ''),
    };
  }

  /**
   * Reset all UI elements to initial state.
   */
  reset() {
    // Reset gauge fills
    [this.gaugeReputationFill, this.gaugeFinanceFill, this.gaugeComplianceFill].forEach((el) => {
      if (el) el.style.width = '50%';
    });
    [this.gaugeReputationValue, this.gaugeFinanceValue, this.gaugeComplianceValue].forEach((el) => {
      if (el) el.textContent = '50';
    });

    // Reset timer
    if (this.hudTimer) {
      this.hudTimer.textContent = '5:00';
      this.hudTimer.classList.remove('pulse');
    }

    // Reset progress
    if (this.hudProgress) {
      this.hudProgress.textContent = 'Keputusan 0/6';
    }

    // Hide scenario panel
    if (this.scenarioPanel) {
      this.scenarioPanel.style.display = 'none';
      this.scenarioPanel.classList.remove('hide');
    }
    this._cleanupChoices();

    // Clear feedback toasts
    if (this.feedbackContainer) {
      this.feedbackContainer.innerHTML = '';
    }

    // Reset result gauges
    [this.resultGaugeReputation, this.resultGaugeFinance, this.resultGaugeCompliance].forEach((el) => {
      if (el) el.style.width = '0%';
    });

    // Reset result text
    if (this.resultTitle) this.resultTitle.textContent = '';
    if (this.resultDescription) this.resultDescription.textContent = '';
    if (this.resultEduMessage) this.resultEduMessage.textContent = '';
    if (this.resultScore) this.resultScore.textContent = '0';
    if (this.impactList) this.impactList.innerHTML = '';

    // Clear leaderboard table
    if (this.leaderboardTableBody) {
      this.leaderboardTableBody.innerHTML = '';
    }
  }

  /**
   * Format seconds to M:SS string.
   * @param {number} seconds
   * @returns {string}
   */
  _formatTime(seconds) {
    // Use the imported formatTime if available, else fallback
    if (typeof formatTime === 'function') {
      return formatTime(seconds);
    }
    const s = Math.max(0, Math.ceil(seconds));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  /**
   * Escape HTML special characters to prevent XSS.
   * @param {string} str
   * @returns {string}
   */
  _escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  _indicatorLabel(key) {
    if (key === 'reputation') return 'Reputasi';
    if (key === 'finance') return 'Keuangan';
    if (key === 'compliance') return 'Kepatuhan';
    return key;
  }
}
