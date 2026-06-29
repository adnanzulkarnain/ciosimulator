/**
 * CIO Simulator — Audio Manager
 * Synthesized sound effects using Web Audio API — no external libraries
 */

export class AudioManager {
  constructor() {
    /** @type {AudioContext|null} */
    this.ctx = null;
    /** @type {GainNode|null} */
    this.masterGain = null;
    /** @type {OscillatorNode|null} */
    this._ambientOsc = null;
    /** @type {GainNode|null} */
    this._ambientGain = null;
    this._muted = false;
    this._initialized = false;
  }

  // ──────────────────────────────────────────
  // Public API
  // ──────────────────────────────────────────

  /**
   * Initialize the AudioContext. Must be called from a user interaction
   * event handler (click, keydown, etc.) to satisfy autoplay policies.
   */
  init() {
    if (this._initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this._muted ? 0 : 1;
      this.masterGain.connect(this.ctx.destination);
      this._initialized = true;
    } catch (e) {
      console.warn('[AudioManager] Web Audio API not supported:', e);
    }
  }

  /**
   * Play a named synthesized sound.
   * @param {'click'|'hover'|'success'|'warning'|'whoosh'|'notification'|'ambient'|'result'} soundName
   */
  play(soundName) {
    if (!this._initialized || !this.ctx) return;

    // Resume context if suspended (browser policy)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    switch (soundName) {
      case 'click':
        this._playClick();
        break;
      case 'hover':
        this._playHover();
        break;
      case 'success':
        this._playSuccess();
        break;
      case 'warning':
        this._playWarning();
        break;
      case 'whoosh':
        this._playWhoosh();
        break;
      case 'notification':
        this._playNotification();
        break;
      case 'result':
        this._playResult();
        break;
      default:
        console.warn(`[AudioManager] Unknown sound: ${soundName}`);
    }
  }

  /**
   * Start the ambient background drone (loops continuously).
   */
  startAmbient() {
    if (!this._initialized || !this.ctx || this._ambientOsc) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this._ambientGain = this.ctx.createGain();
    this._ambientGain.gain.value = 0.04; // Very quiet

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 80;

    // Add subtle movement with a second oscillator for depth
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.3; // Slow modulation
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 5; // Frequency deviation
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    osc.connect(this._ambientGain);
    this._ambientGain.connect(this.masterGain);
    osc.start();

    this._ambientOsc = osc;
    this._ambientLfo = lfo;
  }

  /**
   * Stop the ambient background drone.
   */
  stopAmbient() {
    if (this._ambientOsc) {
      try {
        this._ambientOsc.stop();
        this._ambientOsc.disconnect();
      } catch (_) {
        /* already stopped */
      }
      this._ambientOsc = null;
    }
    if (this._ambientLfo) {
      try {
        this._ambientLfo.stop();
        this._ambientLfo.disconnect();
      } catch (_) {
        /* already stopped */
      }
      this._ambientLfo = null;
    }
    if (this._ambientGain) {
      this._ambientGain.disconnect();
      this._ambientGain = null;
    }
  }

  /**
   * Mute or unmute all audio.
   * @param {boolean} muted
   */
  setMuted(muted) {
    this._muted = muted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(
        muted ? 0 : 1,
        this.ctx.currentTime
      );
    }
  }

  /**
   * Check mute state.
   * @returns {boolean}
   */
  isMuted() {
    return this._muted;
  }

  // ──────────────────────────────────────────
  // Sound Synthesis (Private)
  // ──────────────────────────────────────────

  /**
   * Short sine beep — 800Hz, 50ms, quick decay.
   * @private
   */
  _playClick() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  /**
   * Very short quiet sine — 600Hz, 30ms.
   * @private
   */
  _playHover() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 600;
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.04);
  }

  /**
   * Two-tone ascending — C5 (523Hz) → E5 (659Hz), 100ms each, sine.
   * @private
   */
  _playSuccess() {
    const t = this.ctx.currentTime;

    // Note 1: C5
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.value = 523.25; // C5
    gain1.gain.setValueAtTime(0.25, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(t);
    osc1.stop(t + 0.12);

    // Note 2: E5
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.value = 659.25; // E5
    gain2.gain.setValueAtTime(0.25, t + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(t + 0.1);
    osc2.stop(t + 0.22);
  }

  /**
   * Three short beeps — 400Hz, sine, 80ms each with 50ms gaps.
   * @private
   */
  _playWarning() {
    const t = this.ctx.currentTime;

    for (let i = 0; i < 3; i++) {
      const offset = t + i * 0.13; // 80ms beep + 50ms gap = 130ms interval
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = 400;
      gain.gain.setValueAtTime(0.25, offset);
      gain.gain.exponentialRampToValueAtTime(0.001, offset + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(offset);
      osc.stop(offset + 0.09);
    }
  }

  /**
   * White noise burst — 200ms, bandpass filter sweep.
   * @private
   */
  _playWhoosh() {
    const t = this.ctx.currentTime;
    const duration = 0.2;

    // Create white noise buffer
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    // Bandpass filter with frequency sweep
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 2;
    filter.frequency.setValueAtTime(200, t);
    filter.frequency.exponentialRampToValueAtTime(3000, t + duration * 0.6);
    filter.frequency.exponentialRampToValueAtTime(500, t + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start(t);
    source.stop(t + duration + 0.01);
  }

  /**
   * Pleasant chime — 1000Hz → 800Hz, triangle wave, 150ms.
   * @private
   */
  _playNotification() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1000, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.15);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.17);
  }

  /**
   * Fanfare ascending arpeggio — C4 → E4 → G4 → C5, 150ms each.
   * @private
   */
  _playResult() {
    const notes = [
      261.63, // C4
      329.63, // E4
      392.0,  // G4
      523.25  // C5
    ];
    const t = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      const offset = t + i * 0.15;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      // Each note slightly louder for building effect
      const volume = 0.15 + i * 0.05;
      gain.gain.setValueAtTime(volume, offset);
      gain.gain.exponentialRampToValueAtTime(0.001, offset + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(offset);
      osc.stop(offset + 0.22);
    });

    // Final sustain chord (C major)
    const chordOffset = t + 0.6;
    [261.63, 329.63, 523.25].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, chordOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, chordOffset + 0.6);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(chordOffset);
      osc.stop(chordOffset + 0.65);
    });
  }
}
