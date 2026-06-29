/**
 * scene.js — CIO Simulator 3D Scene Setup
 * Creates the Three.js renderer, camera, controls, lighting, and clock.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Initialises the core 3D scene and returns all handles the game loop needs.
 * @param {HTMLElement} container – DOM element to mount the renderer canvas into.
 * @returns {{ scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, controls: OrbitControls, clock: THREE.Clock }}
 */
export function createScene(container) {
  /* ── Renderer ─────────────────────────────────────────────── */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  /* ── Scene ────────────────────────────────────────────────── */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  /* ── Camera ───────────────────────────────────────────────── */
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(5, 4, 5);
  camera.lookAt(0, 1, 0);

  /* ── OrbitControls ────────────────────────────────────────── */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.minPolarAngle = 0.3;
  controls.maxPolarAngle = 1.4;
  controls.minAzimuthAngle = -1.2;
  controls.maxAzimuthAngle = 1.2;
  controls.minDistance = 3;
  controls.maxDistance = 8;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.update();

  /* ── Lighting ─────────────────────────────────────────────── */

  // Hemisphere (ambient fill)
  const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x362d1f, 0.6);
  scene.add(hemiLight);

  // Directional (sun / key light)
  const dirLight = new THREE.DirectionalLight(0xfff4e0, 1.5);
  dirLight.position.set(3, 5, 2);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.left = -4;
  dirLight.shadow.camera.right = 4;
  dirLight.shadow.camera.top = 4;
  dirLight.shadow.camera.bottom = -4;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 20;
  dirLight.shadow.bias = -0.002;
  scene.add(dirLight);

  /* ── Clock ────────────────────────────────────────────────── */
  const clock = new THREE.Clock();

  return { scene, camera, renderer, controls, clock };
}

/**
 * Call on window resize to keep the viewport in sync.
 * @param {THREE.PerspectiveCamera} camera
 * @param {THREE.WebGLRenderer} renderer
 * @param {HTMLElement} container
 */
export function handleResize(camera, renderer, container) {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
