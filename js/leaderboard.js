/**
 * CIO Simulator — Leaderboard Manager
 * Menyimpan dan mengelola skor pemain menggunakan localStorage
 */

export class Leaderboard {
  /**
   * @param {string} storageKey — localStorage key for persistence
   */
  constructor(storageKey = 'cio_simulator_leaderboard') {
    this.storageKey = storageKey;
  }

  /**
   * Get all leaderboard entries, sorted by score descending.
   * @returns {Array<{name: string, school: string, score: number, title: string, timestamp: number}>}
   */
  getEntries() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const entries = JSON.parse(raw);
      if (!Array.isArray(entries)) return [];
      return entries.sort((a, b) => b.score - a.score);
    } catch (e) {
      console.warn('[Leaderboard] Failed to parse entries:', e);
      return [];
    }
  }

  /**
   * Add a new entry to the leaderboard.
   * @param {string} name — Player name
   * @param {string} school — School / institution name
   * @param {number} score — Final score (0–100)
   * @param {string} title — Earned title (e.g., 'CIO Visioner')
   */
  addEntry(name, school, score, title) {
    const entries = this.getEntries();
    entries.push({
      name,
      school,
      score: Math.round(score * 100) / 100,
      title,
      timestamp: Date.now()
    });
    this._save(entries);
  }

  /**
   * Get the top N entries by score.
   * @param {number} n — Number of top entries to return
   * @returns {Array}
   */
  getTopN(n = 10) {
    return this.getEntries().slice(0, n);
  }

  /**
   * Clear all leaderboard data.
   */
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {
      console.warn('[Leaderboard] Failed to clear:', e);
    }
  }

  /**
   * Export all entries as a CSV string.
   * @returns {string} CSV content with headers
   */
  exportCSV() {
    const entries = this.getEntries();
    const headers = ['Nama', 'Institusi', 'Skor', 'Gelar', 'Waktu'];
    const rows = entries.map((entry) => {
      const date = new Date(entry.timestamp).toLocaleString('id-ID');
      return [
        this._escapeCSV(entry.name),
        this._escapeCSV(entry.school),
        entry.score,
        this._escapeCSV(entry.title),
        this._escapeCSV(date)
      ].join(',');
    });
    return [headers.join(','), ...rows].join('\n');
  }

  /**
   * Get entries from today only (local timezone).
   * @returns {Array}
   */
  getTodayEntries() {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const todayEnd = todayStart + 24 * 60 * 60 * 1000;

    return this.getEntries().filter(
      (entry) => entry.timestamp >= todayStart && entry.timestamp < todayEnd
    );
  }

  /**
   * Save entries to localStorage.
   * @private
   * @param {Array} entries
   */
  _save(entries) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(entries));
    } catch (e) {
      console.warn('[Leaderboard] Failed to save:', e);
    }
  }

  /**
   * Escape a value for CSV output.
   * @private
   * @param {string} value
   * @returns {string}
   */
  _escapeCSV(value) {
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }
}
