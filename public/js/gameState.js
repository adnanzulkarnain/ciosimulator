/**
 * CIO Simulator — Game State Manager
 * Mengelola state permainan: indikator, flags, skenario, timer, dan penilaian
 */

import { GAME_CONFIG } from './config.js';
import { clamp } from './utils.js';

export class GameState {
  constructor() {
    this.reset();
  }

  /**
   * Reset all state to initial values.
   */
  reset() {
    this.indicators = {
      reputation: 50,
      finance: 50,
      compliance: 50
    };
    this.flags = {};
    this.completedScenarios = [];
    this.decisionLog = [];
    this.timeRemaining = GAME_CONFIG.sessionDurationSeconds;
    this.phase = 'title'; // 'title' | 'intro' | 'explore' | 'scenario' | 'result' | 'leaderboard' | 'cta'
  }

  /**
   * Apply a player's choice, including flag-based modifiers.
   * @param {object} choice — The selected choice object from a scenario
   * @param {object|string} scenario — The scenario object, or its id string
   */
  applyChoice(choice, scenario) {
    const scenarioId = typeof scenario === 'string' ? scenario : scenario.id;
    const before = { ...this.indicators };

    // Calculate modified effects
    const effects = this.getModifiedEffects(choice, scenarioId);

    // Apply effects, clamped to 0–100
    this.indicators.reputation = clamp(
      this.indicators.reputation + effects.reputation,
      0,
      100
    );
    this.indicators.finance = clamp(
      this.indicators.finance + effects.finance,
      0,
      100
    );
    this.indicators.compliance = clamp(
      this.indicators.compliance + effects.compliance,
      0,
      100
    );

    // Set flags from the choice
    if (choice.flags) {
      Object.assign(this.flags, choice.flags);
    }

    // Mark scenario as completed
    if (!this.completedScenarios.includes(scenarioId)) {
      this.completedScenarios.push(scenarioId);
    }

    this.decisionLog.push({
      scenarioId,
      title: typeof scenario === 'string' ? scenarioId : scenario.title,
      choice: choice.text,
      effects,
      before,
      after: { ...this.indicators },
      consequence: choice.consequence
    });
  }

  /**
   * Return effects modified by current flags (consequence chaining).
   * Does NOT mutate state — used for previewing or applying.
   * @param {object} choice — The choice object with base effects
   * @param {string} scenarioId — The scenario's id
   * @returns {{ reputation: number, finance: number, compliance: number }}
   */
  getModifiedEffects(choice, scenarioId) {
    // Clone base effects
    const effects = {
      reputation: choice.effects.reputation || 0,
      finance: choice.effects.finance || 0,
      compliance: choice.effects.compliance || 0
    };

    // ── Data Breach modifiers ──
    if (scenarioId === 'data_breach') {
      if (this.flags.securityBudgetFull) {
        // Full security investment pays off: compliance bonus
        effects.compliance += 5;
      }
      if (this.flags.securityBudgetDenied) {
        // Denied security budget makes breach worse: compliance penalty
        effects.compliance -= 5;
      }
    }

    // ── Compliance Audit modifiers ──
    if (scenarioId === 'compliance_audit') {
      if (this.flags.coverUp) {
        // Cover-up discovered during audit: severe compliance penalty
        effects.compliance -= 8;
      }
      if (this.flags.phishingIgnored) {
        // Ignored phishing incident noted by auditors
        effects.compliance -= 5;
      }
    }

    return effects;
  }

  /**
   * Calculate the player's title, description, and educational message
   * based on final indicator levels.
   * @returns {{ title: string, description: string, eduMessage: string }}
   */
  getTitle() {
    const { reputation, finance, compliance } = this.indicators;

    // All indicators balanced and healthy
    if (reputation >= 60 && finance >= 60 && compliance >= 60) {
      return {
        title: 'CIO Visioner',
        description:
          'Kamu berhasil menyeimbangkan reputasi, keuangan, dan kepatuhan — tanda pemimpin TI sejati.',
        eduMessage:
          'Tata kelola TI yang baik menurut COBIT 2019 menekankan keseimbangan antara stakeholder value, ' +
          'resource optimization, dan risk management. Kamu sudah menerapkan prinsip ini dengan baik!'
      };
    }

    // Security-focused but financially strained
    if (compliance >= 65 && finance < 45) {
      return {
        title: 'Penyelamat Krisis',
        description:
          'Keamanan dan kepatuhan menjadi prioritasmu, meski anggaran terkuras habis.',
        eduMessage:
          'ISO 27001 dan UU PDP memang menuntut investasi besar di keamanan informasi. ' +
          'Tantangannya: bagaimana memenuhi kontrol keamanan tanpa membahayakan kelangsungan finansial. ' +
          'Coba pelajari pendekatan risk-based budgeting di framework COBIT EDM02.'
      };
    }

    // Innovation-focused but compliance gap
    if (reputation >= 65 && compliance < 40) {
      return {
        title: 'Inovator Berani',
        description:
          'Kamu dikenal sebagai pemimpin inovatif, tapi auditor mungkin punya pendapat berbeda.',
        eduMessage:
          'Inovasi tanpa governance framework bisa berbahaya. NIST AI RMF dan ISO 42001 ' +
          'menyediakan kerangka untuk berinovasi secara bertanggung jawab. ' +
          'Ingat: UU PDP memberikan sanksi hingga 2% pendapatan tahunan untuk pelanggaran serius!'
      };
    }

    // Cost-cutter
    if (finance >= 65 && reputation < 50 && compliance < 50) {
      return {
        title: 'Efisiensi di Atas Segalanya',
        description:
          'Anggaran sehat, tapi penghematan berlebihan meninggalkan celah besar di keamanan dan reputasi.',
        eduMessage:
          'Framework COBIT EDM04 tentang Resource Optimization mengajarkan bahwa efisiensi ' +
          'harus seimbang dengan efektivitas. Penghematan jangka pendek di keamanan TI ' +
          'sering berujung biaya insiden yang jauh lebih besar — rata-rata kerugian data breach ' +
          'di ASEAN mencapai USD 3,05 juta (IBM, 2024).'
      };
    }

    // All indicators critically low
    if (reputation < 40 && finance < 40 && compliance < 40) {
      return {
        title: 'Perlu Belajar Lagi',
        description:
          'Semua indikator dalam zona merah. Tapi setiap CIO hebat pernah memulai dari sini.',
        eduMessage:
          'Jangan menyerah! Pelajari dasar-dasar tata kelola TI melalui COBIT 2019 Foundation, ' +
          'pahami persyaratan UU PDP (UU No. 27/2022), dan eksplorasi ISO 27001 untuk ' +
          'kerangka keamanan informasi. Setiap keputusan kecil membentuk pemimpin besar.'
      };
    }

    // Default: developing leader
    return {
      title: 'Pemimpin Berkembang',
      description:
        'Kamu menunjukkan potensi kepemimpinan TI yang solid. Beberapa area masih perlu ditingkatkan.',
      eduMessage:
        'Seorang CIO yang efektif terus belajar dan beradaptasi. Perkuat pemahamanmu tentang ' +
        'COBIT untuk tata kelola, ISO 27001 untuk keamanan, dan UU PDP untuk perlindungan data. ' +
        'Gabungkan ketiganya untuk menjadi pemimpin digital yang komprehensif.'
    };
  }

  /**
   * Calculate weighted final score with a small balance penalty.
   * Weights: reputation 35%, finance 30%, compliance 35%.
   * @returns {{ score: number, baseScore: number, balancePenalty: number, imbalance: number, weights: object }}
   */
  getScoreDetails() {
    const { reputation, finance, compliance } = this.indicators;
    const weights = {
      reputation: 0.35,
      finance: 0.3,
      compliance: 0.35
    };
    const baseScore =
      reputation * weights.reputation +
      finance * weights.finance +
      compliance * weights.compliance;
    const imbalance = Math.max(reputation, finance, compliance) - Math.min(reputation, finance, compliance);
    const balancePenalty = imbalance * 0.25;

    return {
      score: clamp(baseScore - balancePenalty, 0, 100),
      baseScore,
      balancePenalty,
      imbalance,
      weights
    };
  }

  /**
   * Calculate final score.
   * @returns {number} Score between 0–100
   */
  getScore() {
    return this.getScoreDetails().score;
  }

  /**
   * Return recorded decision impacts for the result screen.
   * @returns {Array}
   */
  getDecisionLog() {
    return this.decisionLog;
  }

  /**
   * Check if all 6 scenarios have been completed.
   * @returns {boolean}
   */
  isAllScenariosComplete(totalScenarios = GAME_CONFIG.maxScenarios) {
    return this.completedScenarios.length >= totalScenarios;
  }

  /**
   * Update the countdown timer.
   * @param {number} deltaTime — Seconds elapsed since last update
   * @returns {boolean} True if time has expired
   */
  updateTimer(deltaTime) {
    this.timeRemaining = Math.max(0, this.timeRemaining - deltaTime);
    return this.timeRemaining <= 0;
  }
}
