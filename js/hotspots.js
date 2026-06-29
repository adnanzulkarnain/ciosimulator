/**
 * CIO Simulator — Hotspot Manager
 * Interactive 3D hotspot indicators in the office scene
 * Uses raycasting for click/hover detection
 */

import * as THREE from 'three';

export class HotspotManager {
  /**
   * @param {THREE.Scene} scene — The Three.js scene to add hotspots to
   * @param {THREE.Camera} camera — The active camera (for raycasting)
   * @param {Map<string, THREE.Vector3>} hotspotPositions — Map of scenarioId → world position
   */
  constructor(scene, camera, hotspotPositions) {
    /** @type {THREE.Scene} */
    this.scene = scene;
    /** @type {THREE.Camera} */
    this.camera = camera;
    /** @type {THREE.Raycaster} */
    this.raycaster = new THREE.Raycaster();
    /** @type {THREE.Vector2} */
    this._mouse = new THREE.Vector2();

    /**
     * Internal hotspot data keyed by scenarioId.
     * @type {Map<string, {group: THREE.Group, ring: THREE.Mesh, sphere: THREE.Mesh, stalk: THREE.Mesh, completed: boolean, time: number}>}
     */
    this.hotspots = new Map();

    /** All meshes used for raycasting hit-detection */
    this._hitTargets = [];

    /** Elapsed time for animations */
    this._elapsed = 0;

    this._createHotspots(hotspotPositions);
  }

  // ──────────────────────────────────────────
  // Creation
  // ──────────────────────────────────────────

  /**
   * Build visual hotspot indicators at each position.
   * @private
   * @param {Map<string, THREE.Vector3>} positions
   */
  _createHotspots(positions) {
    // Shared geometries (reused across all hotspots)
    const ringGeo = new THREE.TorusGeometry(0.2, 0.03, 8, 24);
    const sphereGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const stalkGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.5, 4);

    const availableColor = new THREE.Color(0x00d4ff); // Cyan

    positions.forEach((pos, scenarioId) => {
      const group = new THREE.Group();
      group.position.copy(pos);
      group.userData.scenarioId = scenarioId;

      // ── Outer ring (rotating) ──
      const ringMat = new THREE.MeshBasicMaterial({
        color: availableColor,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2; // Lay flat, will rotate on Y
      ring.userData.scenarioId = scenarioId;
      group.add(ring);

      // ── Inner sphere (pulsing) ──
      const sphereMat = new THREE.MeshBasicMaterial({
        color: availableColor,
        transparent: true,
        opacity: 1.0
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.userData.scenarioId = scenarioId;
      group.add(sphere);

      // ── Vertical stalk ──
      const stalkMat = new THREE.MeshBasicMaterial({
        color: availableColor,
        transparent: true,
        opacity: 0.4
      });
      const stalk = new THREE.Mesh(stalkGeo, stalkMat);
      stalk.position.y = -0.25; // Extends downward from center
      group.add(stalk);

      // Store metadata
      this.hotspots.set(scenarioId, {
        group,
        ring,
        sphere,
        stalk,
        completed: false,
        time: Math.random() * Math.PI * 2 // Random phase offset for visual variety
      });

      // Register hit-targets for raycasting (ring + sphere)
      this._hitTargets.push(ring, sphere);

      this.scene.add(group);
    });
  }

  // ──────────────────────────────────────────
  // Animation
  // ──────────────────────────────────────────

  /**
   * Update all hotspot animations. Call every frame.
   * @param {number} deltaTime — Seconds since last frame
   */
  update(deltaTime) {
    this._elapsed += deltaTime;

    this.hotspots.forEach((hs) => {
      if (hs.completed) return;

      hs.time += deltaTime;

      // Pulse: scale oscillates between 0.8 and 1.2
      const pulse = 0.8 + 0.4 * (0.5 + 0.5 * Math.sin(hs.time * 3));
      hs.sphere.scale.setScalar(pulse);

      // Ring: slow rotation
      hs.ring.rotation.z += deltaTime * 0.8;
      hs.ring.rotation.x = Math.PI / 2 + Math.sin(hs.time * 1.5) * 0.15;

      // Subtle opacity breathing on the ring
      hs.ring.material.opacity = 0.6 + 0.3 * Math.sin(hs.time * 2);
    });
  }

  // ──────────────────────────────────────────
  // Interaction
  // ──────────────────────────────────────────

  /**
   * Handle click — returns the scenarioId of the clicked hotspot, or null.
   * @param {number} mouseX — Mouse X in pixels
   * @param {number} mouseY — Mouse Y in pixels
   * @param {number} canvasWidth — Canvas width in pixels
   * @param {number} canvasHeight — Canvas height in pixels
   * @returns {string|null}
   */
  onClick(mouseX, mouseY, canvasWidth, canvasHeight) {
    this._setMouse(mouseX, mouseY, canvasWidth, canvasHeight);
    this.raycaster.setFromCamera(this._mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this._hitTargets, false);
    if (intersects.length === 0) return null;

    const scenarioId = intersects[0].object.userData.scenarioId;
    if (!scenarioId) return null;

    const hs = this.hotspots.get(scenarioId);
    if (!hs || hs.completed) return null;

    return scenarioId;
  }

  /**
   * Handle mouse move — returns true if hovering over an available hotspot.
   * @param {number} mouseX
   * @param {number} mouseY
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @returns {boolean}
   */
  onMouseMove(mouseX, mouseY, canvasWidth, canvasHeight) {
    this._setMouse(mouseX, mouseY, canvasWidth, canvasHeight);
    this.raycaster.setFromCamera(this._mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this._hitTargets, false);
    if (intersects.length === 0) return false;

    const scenarioId = intersects[0].object.userData.scenarioId;
    if (!scenarioId) return false;

    const hs = this.hotspots.get(scenarioId);
    return hs && !hs.completed;
  }

  /**
   * Normalize mouse coordinates to NDC (-1 to +1).
   * @private
   */
  _setMouse(mouseX, mouseY, canvasWidth, canvasHeight) {
    this._mouse.x = (mouseX / canvasWidth) * 2 - 1;
    this._mouse.y = -(mouseY / canvasHeight) * 2 + 1;
  }

  // ──────────────────────────────────────────
  // State Management
  // ──────────────────────────────────────────

  /**
   * Mark a hotspot as completed and hide it from the scene.
   * @param {string} scenarioId
   */
  markCompleted(scenarioId) {
    const hs = this.hotspots.get(scenarioId);
    if (!hs) return;

    hs.completed = true;
    hs.group.visible = false;
  }

  /**
   * Number of hotspots not yet completed.
   * @returns {number}
   */
  getRemainingCount() {
    let count = 0;
    this.hotspots.forEach((hs) => {
      if (!hs.completed) count++;
    });
    return count;
  }

  /**
   * Number of completed hotspots.
   * @returns {number}
   */
  getCompletedCount() {
    let count = 0;
    this.hotspots.forEach((hs) => {
      if (hs.completed) count++;
    });
    return count;
  }

  /**
   * Reset all hotspots to available (cyan, pulsing) state.
   */
  reset() {
    const availableColor = new THREE.Color(0x00d4ff);

    this.hotspots.forEach((hs) => {
      hs.completed = false;
      hs.group.visible = true;
      hs.time = Math.random() * Math.PI * 2;

      hs.ring.material.color.copy(availableColor);
      hs.ring.material.opacity = 0.85;

      hs.sphere.material.color.copy(availableColor);
      hs.sphere.material.opacity = 1.0;
      hs.sphere.scale.setScalar(1);

      hs.stalk.material.color.copy(availableColor);
      hs.stalk.material.opacity = 0.4;
    });
  }

  // ──────────────────────────────────────────
  // Cleanup
  // ──────────────────────────────────────────

  /**
   * Remove all hotspots from the scene and dispose GPU resources.
   */
  dispose() {
    this.hotspots.forEach((hs) => {
      this.scene.remove(hs.group);

      // Dispose materials
      hs.ring.material.dispose();
      hs.sphere.material.dispose();
      hs.stalk.material.dispose();

      // Dispose geometries
      hs.ring.geometry.dispose();
      hs.sphere.geometry.dispose();
      hs.stalk.geometry.dispose();
    });

    this.hotspots.clear();
    this._hitTargets = [];
  }
}
