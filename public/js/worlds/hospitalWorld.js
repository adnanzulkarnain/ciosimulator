/**
 * hospitalWorld.js — CIO Simulator Hospital World
 * Builds a premium, detailed hospital CIO office using Three.js geometry.
 * Clean, clinical feel with medical elements and a garden view.
 */
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   Material Palette — Clinical Hospital Theme
   ═══════════════════════════════════════════════════════════════ */
function makeMaterials() {
  return {
    // Room
    floor: new THREE.MeshStandardMaterial({ color: 0xd0d8e0, roughness: 0.4, metalness: 0.05 }),
    floorTile: new THREE.MeshStandardMaterial({ color: 0xc8d0d8, roughness: 0.35, metalness: 0.05 }),
    wall: new THREE.MeshStandardMaterial({ color: 0xf4fbff, roughness: 0.9, metalness: 0.0 }),
    ceiling: new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.95 }),
    baseboard: new THREE.MeshStandardMaterial({ color: 0xeef2f5, roughness: 0.6 }),

    // Furniture
    desk: new THREE.MeshStandardMaterial({ color: 0xe8eef4, roughness: 0.35, metalness: 0.05 }),
    deskEdge: new THREE.MeshStandardMaterial({ color: 0xdce4ec, roughness: 0.3, metalness: 0.08 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.25, metalness: 0.8 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xbbbbbb, roughness: 0.15, metalness: 0.9 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.3, metalness: 0.7 }),
    chair: new THREE.MeshStandardMaterial({ color: 0xd5dde5, roughness: 0.5, metalness: 0.05 }),
    chairDark: new THREE.MeshStandardMaterial({ color: 0xb0b8c0, roughness: 0.55, metalness: 0.05 }),

    // Glass & Window
    glass: new THREE.MeshStandardMaterial({ color: 0xc8eeff, transparent: true, opacity: 0.15, roughness: 0.05, metalness: 0.3 }),
    windowFrame: new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.3, metalness: 0.2 }),

    // Screens
    screen: new THREE.MeshStandardMaterial({ color: 0x0a1a2a, emissive: 0x00897b, emissiveIntensity: 0.65, roughness: 0.2, metalness: 0.3 }),
    tabletScreen: new THREE.MeshStandardMaterial({ color: 0x0a200a, emissive: 0x34a853, emissiveIntensity: 0.5, roughness: 0.2, metalness: 0.3 }),
    boardScreen: new THREE.MeshStandardMaterial({ color: 0x0a1a2a, emissive: 0x00897b, emissiveIntensity: 0.55, roughness: 0.15, metalness: 0.3 }),
    screenOff: new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.2 }),

    // Medical
    medRed: new THREE.MeshStandardMaterial({ color: 0xe53935, roughness: 0.5, metalness: 0.1 }),
    medGreen: new THREE.MeshStandardMaterial({ color: 0x34a853, roughness: 0.5, metalness: 0.1 }),
    teal: new THREE.MeshStandardMaterial({ color: 0x00897b, roughness: 0.4, metalness: 0.15 }),
    white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }),
    offWhite: new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5 }),
    lightGray: new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.5 }),

    // Props
    phone: new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.4, metalness: 0.15 }),
    phoneRed: new THREE.MeshStandardMaterial({ color: 0xe53935, roughness: 0.4, metalness: 0.1 }),
    black: new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 }),
    sanitizer: new THREE.MeshStandardMaterial({ color: 0xeef5f2, roughness: 0.3, metalness: 0.1 }),
    sanitizerPump: new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.25, metalness: 0.6 }),
    plant: new THREE.MeshStandardMaterial({ color: 0x4caf50, roughness: 0.8 }),
    plantDark: new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.8 }),
    pot: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }),
    soil: new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.95 }),

    // Cabinet & folders
    cabinet: new THREE.MeshStandardMaterial({ color: 0xdce2e8, roughness: 0.4, metalness: 0.1 }),
    cabinetHandle: new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.2, metalness: 0.8 }),
    folder: (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 }),

    // Frames
    frame: new THREE.MeshStandardMaterial({ color: 0xbbbbbb, roughness: 0.35, metalness: 0.2 }),
    frameInner: new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.5 }),
    frameGreen: new THREE.MeshStandardMaterial({ color: 0xc8e6c9, roughness: 0.5 }),
    frameBeige: new THREE.MeshStandardMaterial({ color: 0xfff8e1, roughness: 0.5 }),

    // Wall clock
    clockFace: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }),
    clockRim: new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.5 }),

    // Garden / Outdoor
    grass: new THREE.MeshStandardMaterial({ color: 0x66bb6a, roughness: 0.9 }),
    treeTrunk: new THREE.MeshStandardMaterial({ color: 0x795548, roughness: 0.8 }),
    treeFoliage: (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }),
    bench: new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.6 }),
    gardenPath: new THREE.MeshStandardMaterial({ color: 0xbcaaa4, roughness: 0.7 }),

    // LED panel
    ledPanel: new THREE.MeshStandardMaterial({ color: 0xfafafa, emissive: 0xf5f8ff, emissiveIntensity: 0.7, roughness: 0.3 }),
    ledFrame: new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.3 }),

    // Nameplate
    nameplate: new THREE.MeshStandardMaterial({ color: 0x00897b, roughness: 0.3, metalness: 0.4 }),
    nameplateText: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }),
  };
}

/* ═══════════════════════════════════════════════════════════════
   Geometry Helpers
   ═══════════════════════════════════════════════════════════════ */

function box(w, h, d, mat) {
  const g = new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cyl(rT, rB, h, seg, mat) {
  const g = new THREE.CylinderGeometry(rT, rB, h, seg);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function plane(w, h, mat) {
  const g = new THREE.PlaneGeometry(w, h);
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  return m;
}

/* ═══════════════════════════════════════════════════════════════
   buildHospitalWorld — Main Export
   ═══════════════════════════════════════════════════════════════ */
export function buildHospitalWorld(scene) {
  const M = makeMaterials();
  const hotspotPositions = new Map();

  // Track everything for cleanup
  const allGroups = [];
  const allGeometries = [];
  const allMaterials = [];

  // Collect materials for cleanup
  for (const key of Object.keys(M)) {
    const val = M[key];
    if (val instanceof THREE.Material) allMaterials.push(val);
  }

  /** Add a group to the scene and track it */
  function addGroup(group) {
    scene.add(group);
    allGroups.push(group);
  }

  /** Track geometry from mesh */
  function trackMesh(mesh) {
    if (mesh.geometry) allGeometries.push(mesh.geometry);
    if (mesh.material && !allMaterials.includes(mesh.material)) {
      allMaterials.push(mesh.material);
    }
  }

  /** Recursively track all meshes in a group */
  function trackGroup(group) {
    group.traverse((child) => {
      if (child.isMesh) trackMesh(child);
    });
  }

  // Set scene background
  scene.background = new THREE.Color(0xf0f8ff);

  /* ─────────────── 1. Room Shell ──────────────────────────── */
  const roomGroup = new THREE.Group();
  roomGroup.name = 'HospitalRoom';

  // Floor — light vinyl with subtle tile pattern
  const floorMain = plane(6, 6, M.floor);
  floorMain.rotation.x = -Math.PI / 2;
  floorMain.position.y = 0;
  roomGroup.add(floorMain);

  // Floor tile lines for realism
  for (let i = -2.5; i <= 2.5; i += 1.0) {
    const lineH = box(6, 0.002, 0.01, M.floorTile);
    lineH.position.set(0, 0.001, i);
    roomGroup.add(lineH);
    const lineV = box(0.01, 0.002, 6, M.floorTile);
    lineV.position.set(i, 0.001, 0);
    roomGroup.add(lineV);
  }

  // Ceiling
  const ceil = plane(6, 6, M.ceiling);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = 3;
  roomGroup.add(ceil);

  // Back wall (z = -3)
  const backWall = plane(6, 3, M.wall);
  backWall.position.set(0, 1.5, -3);
  roomGroup.add(backWall);

  // Left wall (x = -3)
  const leftWall = plane(6, 3, M.wall);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-3, 1.5, 0);
  roomGroup.add(leftWall);

  // Right wall (x = 3) — will have window cut into it
  const rightWallTop = plane(6, 0.6, M.wall);
  rightWallTop.rotation.y = -Math.PI / 2;
  rightWallTop.position.set(3, 2.7, 0);
  roomGroup.add(rightWallTop);

  const rightWallBot = plane(6, 0.8, M.wall);
  rightWallBot.rotation.y = -Math.PI / 2;
  rightWallBot.position.set(3, 0.4, 0);
  roomGroup.add(rightWallBot);

  // Right wall left portion (behind meeting area)
  const rightWallLeft = plane(1.8, 1.6, M.wall);
  rightWallLeft.rotation.y = -Math.PI / 2;
  rightWallLeft.position.set(3, 1.6, 2.1);
  roomGroup.add(rightWallLeft);

  // Right wall right portion
  const rightWallRight = plane(1.8, 1.6, M.wall);
  rightWallRight.rotation.y = -Math.PI / 2;
  rightWallRight.position.set(3, 1.6, -2.1);
  roomGroup.add(rightWallRight);

  // Baseboards
  const bbBack = box(6, 0.08, 0.02, M.baseboard);
  bbBack.position.set(0, 0.04, -2.99);
  roomGroup.add(bbBack);

  const bbLeft = box(0.02, 0.08, 6, M.baseboard);
  bbLeft.position.set(-2.99, 0.04, 0);
  roomGroup.add(bbLeft);

  const bbRight = box(0.02, 0.08, 6, M.baseboard);
  bbRight.position.set(2.99, 0.04, 0);
  roomGroup.add(bbRight);

  trackGroup(roomGroup);
  addGroup(roomGroup);

  /* ─────────────── 1b. Window on Right Wall ───────────────── */
  const windowGroup = new THREE.Group();
  windowGroup.name = 'Window';

  // Window frame
  const winFrameTop = box(2.5, 0.06, 0.05, M.windowFrame);
  winFrameTop.position.set(3, 2.4, 0);
  winFrameTop.rotation.y = Math.PI / 2;
  windowGroup.add(winFrameTop);

  const winFrameBot = box(2.5, 0.06, 0.05, M.windowFrame);
  winFrameBot.position.set(3, 0.8, 0);
  winFrameBot.rotation.y = Math.PI / 2;
  windowGroup.add(winFrameBot);

  const winFrameL = box(0.05, 1.66, 0.05, M.windowFrame);
  winFrameL.position.set(3, 1.6, 1.2);
  windowGroup.add(winFrameL);

  const winFrameR = box(0.05, 1.66, 0.05, M.windowFrame);
  winFrameR.position.set(3, 1.6, -1.2);
  windowGroup.add(winFrameR);

  // Window center divider
  const winDiv = box(0.03, 1.6, 0.04, M.windowFrame);
  winDiv.position.set(3, 1.6, 0);
  windowGroup.add(winDiv);

  // Glass panes
  const glassL = plane(1.18, 1.54, M.glass);
  glassL.rotation.y = -Math.PI / 2;
  glassL.position.set(2.98, 1.6, 0.6);
  windowGroup.add(glassL);

  const glassR = plane(1.18, 1.54, M.glass);
  glassR.rotation.y = -Math.PI / 2;
  glassR.position.set(2.98, 1.6, -0.6);
  windowGroup.add(glassR);

  // Window sill
  const windowSill = box(0.12, 0.03, 2.5, M.windowFrame);
  windowSill.position.set(2.94, 0.78, 0);
  windowGroup.add(windowSill);

  trackGroup(windowGroup);
  addGroup(windowGroup);

  /* ─────────────── 1c. LED Ceiling Panels ─────────────────── */
  const ledGroup = new THREE.Group();
  ledGroup.name = 'LEDPanels';

  const ledPositions = [
    { x: -1.2, z: -0.8 },
    { x: 1.2, z: -0.8 },
    { x: 0, z: 1.2 },
  ];

  ledPositions.forEach((pos) => {
    // Panel body
    const panel = box(0.9, 0.03, 0.9, M.ledPanel);
    panel.position.set(pos.x, 2.97, pos.z);
    panel.castShadow = false;
    ledGroup.add(panel);

    // Frame around panel
    const fT = box(0.94, 0.02, 0.03, M.ledFrame);
    fT.position.set(pos.x, 2.96, pos.z - 0.47);
    ledGroup.add(fT);
    const fB = box(0.94, 0.02, 0.03, M.ledFrame);
    fB.position.set(pos.x, 2.96, pos.z + 0.47);
    ledGroup.add(fB);
    const fL = box(0.03, 0.02, 0.94, M.ledFrame);
    fL.position.set(pos.x - 0.47, 2.96, pos.z);
    ledGroup.add(fL);
    const fR = box(0.03, 0.02, 0.94, M.ledFrame);
    fR.position.set(pos.x + 0.47, 2.96, pos.z);
    ledGroup.add(fR);
  });

  trackGroup(ledGroup);
  addGroup(ledGroup);

  /* ─────────────── 2. CIO Desk (center-back) ─────────────── */
  const deskGroup = new THREE.Group();
  deskGroup.name = 'CIODesk';

  // Main desk surface
  const deskTop = box(1.8, 0.04, 0.85, M.desk);
  deskTop.position.set(0, 0.76, -2.2);
  deskGroup.add(deskTop);

  // Desk edge strip (front)
  const deskEdge = box(1.8, 0.025, 0.02, M.deskEdge);
  deskEdge.position.set(0, 0.755, -1.77);
  deskGroup.add(deskEdge);

  // Desk modesty panel (back panel)
  const deskPanel = box(1.8, 0.55, 0.02, M.desk);
  deskPanel.position.set(0, 0.465, -2.62);
  deskGroup.add(deskPanel);

  // Desk side panels
  const deskSideL = box(0.02, 0.55, 0.83, M.desk);
  deskSideL.position.set(-0.89, 0.465, -2.2);
  deskGroup.add(deskSideL);

  const deskSideR = box(0.02, 0.55, 0.83, M.desk);
  deskSideR.position.set(0.89, 0.465, -2.2);
  deskGroup.add(deskSideR);

  // Metal legs (4 corners)
  const legPositions = [
    { x: -0.82, z: -2.55 },
    { x: 0.82, z: -2.55 },
    { x: -0.82, z: -1.85 },
    { x: 0.82, z: -1.85 },
  ];
  legPositions.forEach((lp) => {
    const leg = cyl(0.02, 0.02, 0.74, 8, M.metal);
    leg.position.set(lp.x, 0.37, lp.z);
    deskGroup.add(leg);

    // Foot cap
    const foot = cyl(0.03, 0.03, 0.02, 8, M.darkMetal);
    foot.position.set(lp.x, 0.01, lp.z);
    deskGroup.add(foot);
  });

  // Cable management tray under desk
  const cableTray = box(0.8, 0.04, 0.1, M.metal);
  cableTray.position.set(0, 0.55, -2.45);
  deskGroup.add(cableTray);

  // ── SIMRS Monitor ──
  const monitorStand = cyl(0.08, 0.1, 0.02, 16, M.metal);
  monitorStand.position.set(0, 0.79, -2.42);
  deskGroup.add(monitorStand);

  const monitorNeck = box(0.04, 0.2, 0.04, M.metal);
  monitorNeck.position.set(0, 0.9, -2.42);
  deskGroup.add(monitorNeck);

  const monitorBody = box(0.55, 0.35, 0.02, M.black);
  monitorBody.position.set(0, 1.18, -2.44);
  deskGroup.add(monitorBody);

  const monitorScreen = box(0.50, 0.30, 0.005, M.screen);
  monitorScreen.position.set(0, 1.19, -2.428);
  deskGroup.add(monitorScreen);

  // Monitor bezel top accent (teal strip)
  const monitorAccent = box(0.50, 0.008, 0.022, M.teal);
  monitorAccent.position.set(0, 1.355, -2.44);
  deskGroup.add(monitorAccent);

  // ★ HOTSPOT: budget_security — above SIMRS monitor
  hotspotPositions.set('budget_security', new THREE.Vector3(0, 1.6, -2.4));

  // ── Keyboard ──
  const keyboard = box(0.35, 0.01, 0.12, M.lightGray);
  keyboard.position.set(0, 0.785, -2.05);
  deskGroup.add(keyboard);

  // Keyboard keys (detail)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 10; c++) {
      const key = box(0.025, 0.005, 0.025, M.offWhite);
      key.position.set(-0.14 + c * 0.032, 0.792, -2.09 + r * 0.035);
      key.castShadow = false;
      deskGroup.add(key);
    }
  }

  // Spacebar
  const spacebar = box(0.14, 0.005, 0.025, M.offWhite);
  spacebar.position.set(0, 0.792, -1.985);
  deskGroup.add(spacebar);

  // ── Mouse ──
  const mouse = box(0.05, 0.015, 0.08, M.offWhite);
  mouse.position.set(0.3, 0.785, -2.05);
  deskGroup.add(mouse);

  // Mouse pad
  const mousePad = box(0.22, 0.003, 0.18, M.lightGray);
  mousePad.position.set(0.3, 0.775, -2.05);
  deskGroup.add(mousePad);

  // ── Emergency Phone ──
  const phoneBase = box(0.14, 0.025, 0.1, M.phone);
  phoneBase.position.set(-0.55, 0.79, -2.15);
  deskGroup.add(phoneBase);

  // Phone body / receiver cradle
  const phoneCradle = box(0.12, 0.015, 0.04, M.phoneRed);
  phoneCradle.position.set(-0.55, 0.81, -2.15);
  deskGroup.add(phoneCradle);

  // Handset
  const handset = box(0.14, 0.02, 0.03, M.phone);
  handset.position.set(-0.55, 0.83, -2.15);
  deskGroup.add(handset);

  // Phone earpiece
  const earpiece = cyl(0.02, 0.02, 0.025, 8, M.phone);
  earpiece.position.set(-0.62, 0.845, -2.15);
  deskGroup.add(earpiece);

  // Phone mouthpiece
  const mouthpiece = cyl(0.02, 0.02, 0.025, 8, M.phone);
  mouthpiece.position.set(-0.48, 0.845, -2.15);
  deskGroup.add(mouthpiece);

  // Phone buttons (red emergency strip)
  const phoneBtn = box(0.08, 0.005, 0.03, M.medRed);
  phoneBtn.position.set(-0.55, 0.805, -2.19);
  deskGroup.add(phoneBtn);

  // ★ HOTSPOT: data_breach — above emergency phone
  hotspotPositions.set('data_breach', new THREE.Vector3(-0.55, 1.2, -2.15));

  // ── Hand Sanitizer on Desk ──
  const sanitizerBody = cyl(0.025, 0.025, 0.1, 12, M.sanitizer);
  sanitizerBody.position.set(0.65, 0.83, -2.35);
  deskGroup.add(sanitizerBody);

  const sanitizerPump = cyl(0.008, 0.008, 0.04, 8, M.sanitizerPump);
  sanitizerPump.position.set(0.65, 0.9, -2.35);
  deskGroup.add(sanitizerPump);

  const sanitizerNozzle = box(0.025, 0.006, 0.006, M.sanitizerPump);
  sanitizerNozzle.position.set(0.67, 0.92, -2.35);
  deskGroup.add(sanitizerNozzle);

  // ── Nameplate ──
  const nameplateBase = box(0.25, 0.04, 0.06, M.nameplate);
  nameplateBase.position.set(0.3, 0.8, -1.85);
  deskGroup.add(nameplateBase);

  // Nameplate text area (white strip)
  const nameplateText = box(0.22, 0.025, 0.002, M.nameplateText);
  nameplateText.position.set(0.3, 0.8, -1.819);
  deskGroup.add(nameplateText);

  // ── Small Potted Succulent ──
  const pot = cyl(0.04, 0.035, 0.05, 12, M.pot);
  pot.position.set(-0.3, 0.8, -2.5);
  deskGroup.add(pot);

  const soilDisc = cyl(0.035, 0.035, 0.005, 12, M.soil);
  soilDisc.position.set(-0.3, 0.827, -2.5);
  deskGroup.add(soilDisc);

  // Succulent leaves
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const leaf = box(0.018, 0.022, 0.008, M.plant);
    leaf.position.set(
      -0.3 + Math.cos(angle) * 0.018,
      0.845,
      -2.5 + Math.sin(angle) * 0.018
    );
    leaf.rotation.y = angle;
    leaf.rotation.z = 0.3;
    deskGroup.add(leaf);
  }
  // Center leaf
  const centerLeaf = box(0.012, 0.025, 0.012, M.plantDark);
  centerLeaf.position.set(-0.3, 0.85, -2.5);
  deskGroup.add(centerLeaf);

  // ── Pen holder ──
  const penHolder = cyl(0.025, 0.025, 0.06, 8, M.lightGray);
  penHolder.position.set(-0.15, 0.81, -2.45);
  deskGroup.add(penHolder);

  // Pens
  const pen1 = cyl(0.003, 0.003, 0.09, 6, M.teal);
  pen1.position.set(-0.15, 0.84, -2.45);
  pen1.rotation.z = 0.05;
  deskGroup.add(pen1);

  const pen2 = cyl(0.003, 0.003, 0.085, 6, M.medRed);
  pen2.position.set(-0.145, 0.835, -2.455);
  pen2.rotation.z = -0.08;
  deskGroup.add(pen2);

  trackGroup(deskGroup);
  addGroup(deskGroup);

  /* ─────────────── 3. Office Chair ────────────────────────── */
  const chairGroup = new THREE.Group();
  chairGroup.name = 'OfficeChair';

  // Chair base (5 wheels)
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const armR = box(0.025, 0.02, 0.2, M.chrome);
    armR.position.set(
      Math.cos(angle) * 0.18,
      0.04,
      -1.5 + Math.sin(angle) * 0.18
    );
    armR.rotation.y = angle;
    chairGroup.add(armR);

    // Wheel
    const wheel = cyl(0.02, 0.02, 0.025, 8, M.darkMetal);
    wheel.position.set(
      Math.cos(angle) * 0.28,
      0.02,
      -1.5 + Math.sin(angle) * 0.28
    );
    wheel.rotation.z = Math.PI / 2;
    chairGroup.add(wheel);
  }

  // Chair stem
  const chairStem = cyl(0.025, 0.025, 0.3, 8, M.chrome);
  chairStem.position.set(0, 0.2, -1.5);
  chairGroup.add(chairStem);

  // Chair seat
  const chairSeat = box(0.42, 0.05, 0.4, M.chair);
  chairSeat.position.set(0, 0.4, -1.5);
  chairGroup.add(chairSeat);

  // Chair seat front curve (rounded feel)
  const seatFront = cyl(0.21, 0.21, 0.05, 16, M.chair);
  seatFront.position.set(0, 0.4, -1.3);
  seatFront.rotation.x = Math.PI / 2;
  seatFront.scale.z = 0.12;
  chairGroup.add(seatFront);

  // Chair back
  const chairBack = box(0.42, 0.55, 0.04, M.chair);
  chairBack.position.set(0, 0.7, -1.72);
  chairBack.rotation.x = 0.05;
  chairGroup.add(chairBack);

  // Lumbar support
  const lumbar = box(0.36, 0.12, 0.04, M.chairDark);
  lumbar.position.set(0, 0.55, -1.7);
  chairGroup.add(lumbar);

  // Headrest
  const headrest = box(0.28, 0.1, 0.04, M.chairDark);
  headrest.position.set(0, 1.02, -1.75);
  chairGroup.add(headrest);

  // Armrests
  const armL = box(0.06, 0.02, 0.22, M.chairDark);
  armL.position.set(-0.24, 0.56, -1.45);
  chairGroup.add(armL);

  const armR = box(0.06, 0.02, 0.22, M.chairDark);
  armR.position.set(0.24, 0.56, -1.45);
  chairGroup.add(armR);

  // Armrest supports
  const armSupportL = box(0.03, 0.14, 0.03, M.chrome);
  armSupportL.position.set(-0.24, 0.48, -1.45);
  chairGroup.add(armSupportL);

  const armSupportR = box(0.03, 0.14, 0.03, M.chrome);
  armSupportR.position.set(0.24, 0.48, -1.45);
  chairGroup.add(armSupportR);

  trackGroup(chairGroup);
  addGroup(chairGroup);

  /* ─────────────── 4. Side Desk / Station (right side) ───── */
  const sideDeskGroup = new THREE.Group();
  sideDeskGroup.name = 'SideDesk';

  // Side desk surface
  const sideTop = box(0.7, 0.03, 0.5, M.desk);
  sideTop.position.set(2.2, 0.74, -1.8);
  sideDeskGroup.add(sideTop);

  // Side desk legs (metal)
  const sdLegPos = [
    { x: 1.9, z: -2.0 },
    { x: 2.5, z: -2.0 },
    { x: 1.9, z: -1.6 },
    { x: 2.5, z: -1.6 },
  ];
  sdLegPos.forEach((lp) => {
    const leg = cyl(0.015, 0.015, 0.72, 8, M.metal);
    leg.position.set(lp.x, 0.37, lp.z);
    sideDeskGroup.add(leg);
  });

  // Side desk shelf (lower)
  const sideShelf = box(0.64, 0.02, 0.44, M.desk);
  sideShelf.position.set(2.2, 0.35, -1.8);
  sideDeskGroup.add(sideShelf);

  // ── Medical Tablet in Charging Dock ──
  // Dock base
  const dockBase = box(0.12, 0.015, 0.08, M.metal);
  dockBase.position.set(2.1, 0.76, -1.85);
  sideDeskGroup.add(dockBase);

  // Dock cradle
  const dockCradle = box(0.1, 0.06, 0.015, M.darkMetal);
  dockCradle.position.set(2.1, 0.79, -1.89);
  dockCradle.rotation.x = -0.2;
  sideDeskGroup.add(dockCradle);

  // Tablet (angled)
  const tablet = box(0.15, 0.22, 0.01, M.black);
  tablet.position.set(2.1, 0.9, -1.9);
  tablet.rotation.x = -0.25;
  sideDeskGroup.add(tablet);

  // Tablet screen
  const tabletScreenMesh = box(0.13, 0.19, 0.005, M.tabletScreen);
  tabletScreenMesh.position.set(2.1, 0.9, -1.895);
  tabletScreenMesh.rotation.x = -0.25;
  sideDeskGroup.add(tabletScreenMesh);

  // ★ HOTSPOT: phishing — above medical tablet
  hotspotPositions.set('phishing', new THREE.Vector3(2.1, 1.3, -1.85));

  // ── Medical Folders Stack ──
  const folderColors = [0x2196f3, 0x4caf50, 0xffc107];
  folderColors.forEach((c, i) => {
    const folderMat = M.folder(c);
    allMaterials.push(folderMat);
    const folder = box(0.2, 0.015, 0.28, folderMat);
    folder.position.set(2.38, 0.765 + i * 0.018, -1.75);
    folder.rotation.y = 0.05 * (i - 1);
    sideDeskGroup.add(folder);
  });

  // ── Small Organizer Box ──
  const organizer = box(0.1, 0.06, 0.08, M.lightGray);
  organizer.position.set(2.38, 0.79, -1.95);
  sideDeskGroup.add(organizer);

  // Organizer divider
  const orgDiv = box(0.002, 0.05, 0.07, M.metal);
  orgDiv.position.set(2.38, 0.79, -1.95);
  sideDeskGroup.add(orgDiv);

  trackGroup(sideDeskGroup);
  addGroup(sideDeskGroup);

  /* ─────────────── 5. Digital Patient Info Board (left wall) ─ */
  const boardGroup = new THREE.Group();
  boardGroup.name = 'PatientInfoBoard';

  // Board frame
  const boardFrame = box(0.04, 0.75, 1.2, M.darkMetal);
  boardFrame.position.set(-2.97, 1.6, -0.5);
  boardFrame.rotation.y = Math.PI / 2;
  boardGroup.add(boardFrame);

  // Board screen
  const boardScreenMesh = box(0.005, 0.68, 1.14, M.boardScreen);
  boardScreenMesh.position.set(-2.95, 1.6, -0.5);
  boardScreenMesh.rotation.y = Math.PI / 2;
  boardGroup.add(boardScreenMesh);

  // Board top accent (teal strip)
  const boardAccent = box(0.035, 0.015, 1.2, M.teal);
  boardAccent.position.set(-2.97, 1.98, -0.5);
  boardGroup.add(boardAccent);

  // Board bracket left
  const brktL = box(0.06, 0.03, 0.04, M.metal);
  brktL.position.set(-2.98, 1.6, -1.05);
  boardGroup.add(brktL);

  // Board bracket right
  const brktR = box(0.06, 0.03, 0.04, M.metal);
  brktR.position.set(-2.98, 1.6, 0.05);
  boardGroup.add(brktR);

  // ★ HOTSPOT: new_tech — in front of info board
  hotspotPositions.set('new_tech', new THREE.Vector3(-2.3, 1.6, -0.5));

  trackGroup(boardGroup);
  addGroup(boardGroup);

  /* ─────────────── 6. Clinical Meeting Area (front-left) ──── */
  const meetingGroup = new THREE.Group();
  meetingGroup.name = 'MeetingArea';

  // Round meeting table — pedestal base
  const tablePedestal = cyl(0.08, 0.15, 0.65, 16, M.chrome);
  tablePedestal.position.set(-1.5, 0.325, 1.5);
  meetingGroup.add(tablePedestal);

  // Pedestal foot
  const tableFoot = cyl(0.25, 0.25, 0.02, 24, M.chrome);
  tableFoot.position.set(-1.5, 0.01, 1.5);
  meetingGroup.add(tableFoot);

  // Table top (slightly oval)
  const tableTop = cyl(0.5, 0.5, 0.035, 32, M.desk);
  tableTop.position.set(-1.5, 0.67, 1.5);
  meetingGroup.add(tableTop);

  // Table edge rim
  const tableRim = cyl(0.51, 0.51, 0.01, 32, M.deskEdge);
  tableRim.position.set(-1.5, 0.66, 1.5);
  meetingGroup.add(tableRim);

  // 3 meeting chairs
  const meetChairAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
  meetChairAngles.forEach((angle) => {
    const cx = -1.5 + Math.cos(angle) * 0.85;
    const cz = 1.5 + Math.sin(angle) * 0.85;
    const cg = new THREE.Group();

    // Chair seat
    const mSeat = box(0.35, 0.04, 0.35, M.chair);
    mSeat.position.set(0, 0.42, 0);
    cg.add(mSeat);

    // Chair back
    const mBack = box(0.35, 0.3, 0.03, M.chair);
    mBack.position.set(0, 0.6, -0.16);
    mBack.rotation.x = 0.05;
    cg.add(mBack);

    // Chair legs (4)
    const chairLegOff = [
      { x: -0.14, z: -0.14 },
      { x: 0.14, z: -0.14 },
      { x: -0.14, z: 0.14 },
      { x: 0.14, z: 0.14 },
    ];
    chairLegOff.forEach((lo) => {
      const cLeg = cyl(0.012, 0.012, 0.4, 6, M.chrome);
      cLeg.position.set(lo.x, 0.2, lo.z);
      cg.add(cLeg);
    });

    cg.position.set(cx, 0, cz);
    cg.rotation.y = -angle + Math.PI;
    meetingGroup.add(cg);
  });

  // ★ HOTSPOT: outsourcing — above meeting table
  hotspotPositions.set('outsourcing', new THREE.Vector3(-1.5, 1.1, 1.5));

  // Small projector screen on nearby wall
  const projFrame = box(0.03, 0.5, 0.7, M.frame);
  projFrame.position.set(-2.97, 1.7, 1.8);
  meetingGroup.add(projFrame);

  const projScreen = box(0.005, 0.44, 0.64, M.frameInner);
  projScreen.position.set(-2.96, 1.7, 1.8);
  meetingGroup.add(projScreen);

  // Projector casing on ceiling
  const projector = box(0.12, 0.06, 0.1, M.lightGray);
  projector.position.set(-1.5, 2.94, 1.5);
  meetingGroup.add(projector);

  const projLens = cyl(0.02, 0.02, 0.03, 8, M.darkMetal);
  projLens.position.set(-1.5, 2.91, 1.55);
  projLens.rotation.x = Math.PI / 2;
  meetingGroup.add(projLens);

  trackGroup(meetingGroup);
  addGroup(meetingGroup);

  /* ─────────────── 7. Medical Records Cabinet (back-right) ── */
  const cabinetGroup = new THREE.Group();
  cabinetGroup.name = 'RecordsCabinet';

  // Main cabinet body
  const cabBody = box(0.5, 1.6, 0.45, M.cabinet);
  cabBody.position.set(2.35, 0.8, -2.5);
  cabinetGroup.add(cabBody);

  // 4 drawer faces with handles
  for (let i = 0; i < 4; i++) {
    const drawerFace = box(0.46, 0.34, 0.01, M.lightGray);
    drawerFace.position.set(2.35, 0.2 + i * 0.39, -2.27);
    cabinetGroup.add(drawerFace);

    // Drawer handle
    const handle = box(0.12, 0.015, 0.02, M.cabinetHandle);
    handle.position.set(2.35, 0.28 + i * 0.39, -2.26);
    cabinetGroup.add(handle);

    // Drawer label slot
    const labelSlot = box(0.08, 0.04, 0.005, M.chrome);
    labelSlot.position.set(2.35, 0.22 + i * 0.39, -2.265);
    cabinetGroup.add(labelSlot);
  }

  // Cabinet top surface detail
  const cabTop = box(0.5, 0.01, 0.45, M.deskEdge);
  cabTop.position.set(2.35, 1.605, -2.5);
  cabinetGroup.add(cabTop);

  // Label 'Rekam Medis Elektronik' sign on top
  const rmeSign = box(0.35, 0.06, 0.02, M.teal);
  rmeSign.position.set(2.35, 1.65, -2.35);
  cabinetGroup.add(rmeSign);

  // White text area on sign
  const rmeText = box(0.32, 0.04, 0.005, M.nameplateText);
  rmeText.position.set(2.35, 1.65, -2.339);
  cabinetGroup.add(rmeText);

  // ── Binder Rack next to cabinet ──
  const binderRack = box(0.3, 1.0, 0.25, M.cabinet);
  binderRack.position.set(1.75, 0.5, -2.5);
  cabinetGroup.add(binderRack);

  // Binder rack shelves
  for (let s = 0; s < 3; s++) {
    const shelf = box(0.28, 0.01, 0.24, M.lightGray);
    shelf.position.set(1.75, 0.15 + s * 0.35, -2.5);
    cabinetGroup.add(shelf);
  }

  // Colored binders
  const binderColors = [0xe53935, 0x2196f3, 0x4caf50, 0xff9800, 0x9c27b0];
  binderColors.forEach((c, i) => {
    const bMat = M.folder(c);
    allMaterials.push(bMat);
    const binder = box(0.04, 0.22, 0.2, bMat);
    binder.position.set(1.63 + i * 0.055, 0.25, -2.5);
    cabinetGroup.add(binder);
  });

  // More binders on 2nd shelf
  const binderColors2 = [0x00897b, 0x1565c0, 0xef6c00];
  binderColors2.forEach((c, i) => {
    const bMat = M.folder(c);
    allMaterials.push(bMat);
    const binder = box(0.04, 0.22, 0.2, bMat);
    binder.position.set(1.65 + i * 0.055, 0.6, -2.5);
    cabinetGroup.add(binder);
  });

  // ── Red Cross on wall above cabinet ──
  const crossVert = box(0.04, 0.16, 0.01, M.medRed);
  crossVert.position.set(2.35, 2.0, -2.97);
  cabinetGroup.add(crossVert);

  const crossHoriz = box(0.16, 0.04, 0.01, M.medRed);
  crossHoriz.position.set(2.35, 2.0, -2.97);
  cabinetGroup.add(crossHoriz);

  // Cross backing (white circle)
  const crossBacking = cyl(0.12, 0.12, 0.005, 24, M.white);
  crossBacking.position.set(2.35, 2.0, -2.975);
  crossBacking.rotation.x = Math.PI / 2;
  cabinetGroup.add(crossBacking);

  // ★ HOTSPOT: compliance_audit — above cabinet
  hotspotPositions.set('compliance_audit', new THREE.Vector3(2.35, 2.0, -2.3));

  trackGroup(cabinetGroup);
  addGroup(cabinetGroup);

  /* ─────────────── 8. Hospital Wall Decor ─────────────────── */
  const decorGroup = new THREE.Group();
  decorGroup.name = 'WallDecor';

  // ── Medical Symbol on back wall (left of center) ──
  const medCircle = cyl(0.15, 0.15, 0.01, 24, M.white);
  medCircle.position.set(-1.2, 2.2, -2.98);
  medCircle.rotation.x = Math.PI / 2;
  decorGroup.add(medCircle);

  const medCrossV = box(0.05, 0.2, 0.012, M.medRed);
  medCrossV.position.set(-1.2, 2.2, -2.975);
  decorGroup.add(medCrossV);

  const medCrossH = box(0.2, 0.05, 0.012, M.medRed);
  medCrossH.position.set(-1.2, 2.2, -2.975);
  decorGroup.add(medCrossH);

  // ── 'Cuci Tangan' poster frame ──
  const ctFrame = box(0.02, 0.35, 0.25, M.frame);
  ctFrame.position.set(-2.97, 1.6, 0.8);
  decorGroup.add(ctFrame);

  const ctInner = box(0.005, 0.30, 0.20, M.frameInner);
  ctInner.position.set(-2.96, 1.6, 0.8);
  decorGroup.add(ctInner);

  // Blue header strip on poster
  const ctHeader = box(0.006, 0.05, 0.20, M.teal);
  ctHeader.position.set(-2.955, 1.72, 0.8);
  decorGroup.add(ctHeader);

  // ── Hospital Accreditation Certificate ──
  const certFrame = box(0.02, 0.28, 0.35, M.frame);
  certFrame.position.set(-2.97, 2.1, -1.6);
  decorGroup.add(certFrame);

  const certInner = box(0.005, 0.23, 0.30, M.frameBeige);
  certInner.position.set(-2.96, 2.1, -1.6);
  decorGroup.add(certInner);

  // Gold accent on certificate
  const certAccent = box(0.006, 0.02, 0.28, M.nameplate);
  certAccent.position.set(-2.955, 2.19, -1.6);
  decorGroup.add(certAccent);

  // ── Emergency Evacuation Plan (green frame) ──
  const evacFrame = box(0.3, 0.25, 0.02, M.medGreen);
  evacFrame.position.set(0.8, 2.1, -2.97);
  decorGroup.add(evacFrame);

  const evacInner = box(0.25, 0.2, 0.005, M.frameGreen);
  evacInner.position.set(0.8, 2.1, -2.96);
  decorGroup.add(evacInner);

  // Grid lines on evacuation plan
  for (let i = 0; i < 4; i++) {
    const eLine = box(0.22, 0.002, 0.006, M.medGreen);
    eLine.position.set(0.8, 2.03 + i * 0.045, -2.955);
    decorGroup.add(eLine);
  }
  for (let i = 0; i < 3; i++) {
    const eLine = box(0.002, 0.17, 0.006, M.medGreen);
    eLine.position.set(0.72 + i * 0.06, 2.1, -2.955);
    decorGroup.add(eLine);
  }

  // ── Wall Clock (back wall) ──
  const clockRim = cyl(0.14, 0.14, 0.02, 24, M.clockRim);
  clockRim.position.set(-0.3, 2.4, -2.98);
  clockRim.rotation.x = Math.PI / 2;
  decorGroup.add(clockRim);

  const clockFace = cyl(0.12, 0.12, 0.015, 24, M.clockFace);
  clockFace.position.set(-0.3, 2.4, -2.97);
  clockFace.rotation.x = Math.PI / 2;
  decorGroup.add(clockFace);

  // Clock hour markers
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const markerLen = i % 3 === 0 ? 0.025 : 0.015;
    const marker = box(0.005, markerLen, 0.003, M.darkMetal);
    marker.position.set(
      -0.3 + Math.sin(a) * 0.095,
      2.4 + Math.cos(a) * 0.095,
      -2.965
    );
    marker.rotation.z = -a;
    decorGroup.add(marker);
  }

  // Clock hands
  const hourHand = box(0.006, 0.06, 0.004, M.darkMetal);
  hourHand.position.set(-0.3, 2.43, -2.96);
  hourHand.rotation.z = 0.5;
  decorGroup.add(hourHand);

  const minuteHand = box(0.004, 0.08, 0.004, M.darkMetal);
  minuteHand.position.set(-0.3, 2.44, -2.958);
  minuteHand.rotation.z = -0.8;
  decorGroup.add(minuteHand);

  // Clock center dot
  const clockCenter = cyl(0.008, 0.008, 0.005, 8, M.medRed);
  clockCenter.position.set(-0.3, 2.4, -2.957);
  clockCenter.rotation.x = Math.PI / 2;
  decorGroup.add(clockCenter);

  trackGroup(decorGroup);
  addGroup(decorGroup);

  /* ─────────────── 9. Medical Props ───────────────────────── */
  const propsGroup = new THREE.Group();
  propsGroup.name = 'MedicalProps';

  // ── Wall-mounted Hand Sanitizer Dispenser (left wall) ──
  const wallSanBase = box(0.04, 0.18, 0.08, M.sanitizer);
  wallSanBase.position.set(-2.96, 1.15, 0.3);
  propsGroup.add(wallSanBase);

  // Dispenser push plate
  const pushPlate = box(0.015, 0.04, 0.06, M.sanitizerPump);
  pushPlate.position.set(-2.94, 1.08, 0.3);
  propsGroup.add(pushPlate);

  // Dispenser nozzle
  const wallNozzle = cyl(0.008, 0.008, 0.02, 6, M.chrome);
  wallNozzle.position.set(-2.93, 1.05, 0.3);
  wallNozzle.rotation.z = Math.PI / 2;
  propsGroup.add(wallNozzle);

  // Dispenser label
  const sanLabel = box(0.006, 0.06, 0.05, M.teal);
  sanLabel.position.set(-2.935, 1.18, 0.3);
  propsGroup.add(sanLabel);

  // ── First Aid Box (red box on wall) ──
  const faidBox = box(0.06, 0.2, 0.25, M.medRed);
  faidBox.position.set(-2.96, 1.6, 2.3);
  propsGroup.add(faidBox);

  // White cross on first aid box
  const faidCrossV = box(0.007, 0.1, 0.03, M.white);
  faidCrossV.position.set(-2.925, 1.6, 2.3);
  propsGroup.add(faidCrossV);

  const faidCrossH = box(0.007, 0.03, 0.1, M.white);
  faidCrossH.position.set(-2.925, 1.6, 2.3);
  propsGroup.add(faidCrossH);

  // ── Stethoscope Hook (near desk, left wall) ──
  const hookBase = box(0.03, 0.03, 0.04, M.chrome);
  hookBase.position.set(-2.96, 1.3, -1.5);
  propsGroup.add(hookBase);

  const hookArm = box(0.06, 0.015, 0.015, M.chrome);
  hookArm.position.set(-2.93, 1.3, -1.5);
  propsGroup.add(hookArm);

  // Stethoscope (simple tubing loop)
  const stethoTube = new THREE.TorusGeometry(0.06, 0.005, 8, 16, Math.PI * 1.5);
  const stethoMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.4 });
  allMaterials.push(stethoMat);
  allGeometries.push(stethoTube);
  const stethoscope = new THREE.Mesh(stethoTube, stethoMat);
  stethoscope.position.set(-2.9, 1.22, -1.5);
  stethoscope.rotation.y = Math.PI / 2;
  stethoscope.castShadow = true;
  propsGroup.add(stethoscope);

  // Stethoscope chest piece
  const chestPiece = cyl(0.015, 0.015, 0.008, 8, M.chrome);
  chestPiece.position.set(-2.9, 1.155, -1.5);
  propsGroup.add(chestPiece);

  // ── Vital Signs Reference Chart (frame, right wall area) ──
  const vitalFrame = box(0.25, 0.18, 0.015, M.frame);
  vitalFrame.position.set(0.4, 2.1, -2.97);
  propsGroup.add(vitalFrame);

  const vitalInner = box(0.22, 0.15, 0.005, M.frameInner);
  vitalInner.position.set(0.4, 2.1, -2.965);
  propsGroup.add(vitalInner);

  // Chart lines (tiny detail)
  for (let i = 0; i < 3; i++) {
    const chartLine = box(0.18, 0.003, 0.006, M.teal);
    chartLine.position.set(0.4, 2.06 + i * 0.035, -2.96);
    propsGroup.add(chartLine);
  }

  // ── Small whiteboard / notepad on back wall ──
  const noteFrame = box(0.4, 0.3, 0.015, M.frame);
  noteFrame.position.set(-0.8, 1.7, -2.97);
  propsGroup.add(noteFrame);

  const noteInner = box(0.36, 0.26, 0.005, M.white);
  noteInner.position.set(-0.8, 1.7, -2.965);
  propsGroup.add(noteInner);

  // Marker tray
  const markerTray = box(0.25, 0.02, 0.03, M.lightGray);
  markerTray.position.set(-0.8, 1.54, -2.96);
  propsGroup.add(markerTray);

  // Dry-erase markers
  const markerColors = [0xe53935, 0x1565c0, 0x2e7d32];
  markerColors.forEach((c, i) => {
    const mMat = M.folder(c);
    allMaterials.push(mMat);
    const mrk = cyl(0.006, 0.006, 0.08, 6, mMat);
    mrk.position.set(-0.88 + i * 0.06, 1.55, -2.955);
    mrk.rotation.z = Math.PI / 2;
    propsGroup.add(mrk);
  });

  trackGroup(propsGroup);
  addGroup(propsGroup);

  /* ─────────────── 10. Garden View (outside window) ──────── */
  const gardenGroup = new THREE.Group();
  gardenGroup.name = 'GardenView';

  // Green ground
  const gardenGround = plane(8, 8, M.grass);
  gardenGround.rotation.x = -Math.PI / 2;
  gardenGround.position.set(6, -0.1, 0);
  gardenGroup.add(gardenGround);

  // Garden path
  const gPath = plane(1.0, 5, M.gardenPath);
  gPath.rotation.x = -Math.PI / 2;
  gPath.position.set(5, -0.08, 0);
  gardenGroup.add(gPath);

  // Sky / backdrop
  const skyBackdrop = plane(10, 5, new THREE.MeshStandardMaterial({
    color: 0x87ceeb,
    emissive: 0x87ceeb,
    emissiveIntensity: 0.3,
    roughness: 1.0,
  }));
  skyBackdrop.rotation.y = -Math.PI / 2;
  skyBackdrop.position.set(10, 2.5, 0);
  gardenGroup.add(skyBackdrop);
  allMaterials.push(skyBackdrop.material);

  // Trees (4 varied trees)
  const treeConfigs = [
    { x: 5.5, z: -1.5, trunkH: 1.2, foliageR: 0.6, color: 0x388e3c },
    { x: 7.0, z: 0.5, trunkH: 1.5, foliageR: 0.8, color: 0x2e7d32 },
    { x: 6.0, z: 1.8, trunkH: 1.0, foliageR: 0.5, color: 0x43a047 },
    { x: 8.0, z: -0.5, trunkH: 1.8, foliageR: 0.9, color: 0x1b5e20 },
  ];

  treeConfigs.forEach((tc) => {
    // Trunk
    const trunk = cyl(0.06, 0.08, tc.trunkH, 8, M.treeTrunk);
    trunk.position.set(tc.x, tc.trunkH / 2, tc.z);
    gardenGroup.add(trunk);

    // Foliage — layered spheres for more natural look
    const foliageMat = M.treeFoliage(tc.color);
    allMaterials.push(foliageMat);

    const foliageMain = new THREE.Mesh(
      new THREE.SphereGeometry(tc.foliageR, 12, 10),
      foliageMat
    );
    foliageMain.position.set(tc.x, tc.trunkH + tc.foliageR * 0.6, tc.z);
    foliageMain.castShadow = true;
    gardenGroup.add(foliageMain);
    allGeometries.push(foliageMain.geometry);

    // Secondary smaller foliage cluster
    const foliage2 = new THREE.Mesh(
      new THREE.SphereGeometry(tc.foliageR * 0.7, 10, 8),
      foliageMat
    );
    foliage2.position.set(
      tc.x + tc.foliageR * 0.4,
      tc.trunkH + tc.foliageR * 0.3,
      tc.z + tc.foliageR * 0.3
    );
    foliage2.castShadow = true;
    gardenGroup.add(foliage2);
    allGeometries.push(foliage2.geometry);
  });

  // Garden bench
  const benchSeat = box(0.6, 0.04, 0.25, M.bench);
  benchSeat.position.set(5.0, 0.35, 1.0);
  gardenGroup.add(benchSeat);

  const benchBackRest = box(0.6, 0.25, 0.03, M.bench);
  benchBackRest.position.set(5.0, 0.52, 0.87);
  gardenGroup.add(benchBackRest);

  // Bench legs
  const benchLegL = box(0.04, 0.33, 0.2, M.darkMetal);
  benchLegL.position.set(4.75, 0.165, 1.0);
  gardenGroup.add(benchLegL);

  const benchLegR = box(0.04, 0.33, 0.2, M.darkMetal);
  benchLegR.position.set(5.25, 0.165, 1.0);
  gardenGroup.add(benchLegR);

  // Small flower bushes near bench
  const bushColors = [0x66bb6a, 0x81c784, 0x4caf50];
  bushColors.forEach((c, i) => {
    const bushMat = M.treeFoliage(c);
    allMaterials.push(bushMat);
    const bush = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 8),
      bushMat
    );
    bush.position.set(4.5 + i * 0.5, 0.15, -2.0);
    bush.scale.y = 0.7;
    gardenGroup.add(bush);
    allGeometries.push(bush.geometry);
  });

  // Flower dots on bushes
  const flowerMat = new THREE.MeshStandardMaterial({ color: 0xff7043, roughness: 0.6 });
  allMaterials.push(flowerMat);
  for (let i = 0; i < 6; i++) {
    const flower = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 6, 6),
      flowerMat
    );
    flower.position.set(
      4.5 + Math.random() * 1.0,
      0.2 + Math.random() * 0.1,
      -2.0 + (Math.random() - 0.5) * 0.2
    );
    gardenGroup.add(flower);
    allGeometries.push(flower.geometry);
  }

  trackGroup(gardenGroup);
  addGroup(gardenGroup);

  /* ─────────────── 11. Additional Floor Details ───────────── */
  const floorDetailGroup = new THREE.Group();
  floorDetailGroup.name = 'FloorDetails';

  // Area rug under meeting table (subtle teal-tinted)
  const rugMat = new THREE.MeshStandardMaterial({
    color: 0xd0e8e4,
    roughness: 0.85,
    metalness: 0.0,
  });
  allMaterials.push(rugMat);

  const rug = cyl(0.8, 0.8, 0.005, 32, rugMat);
  rug.position.set(-1.5, 0.003, 1.5);
  rug.receiveShadow = true;
  rug.castShadow = false;
  floorDetailGroup.add(rug);

  // Rug border ring
  const rugBorderGeo = new THREE.TorusGeometry(0.8, 0.015, 4, 32);
  const rugBorderMat = new THREE.MeshStandardMaterial({ color: 0x00897b, roughness: 0.7 });
  allMaterials.push(rugBorderMat);
  allGeometries.push(rugBorderGeo);
  const rugBorder = new THREE.Mesh(rugBorderGeo, rugBorderMat);
  rugBorder.position.set(-1.5, 0.006, 1.5);
  rugBorder.rotation.x = -Math.PI / 2;
  floorDetailGroup.add(rugBorder);

  // Trash bin (near desk)
  const binBody = cyl(0.08, 0.07, 0.25, 12, M.lightGray);
  binBody.position.set(1.1, 0.125, -1.9);
  floorDetailGroup.add(binBody);

  const binRim = cyl(0.082, 0.082, 0.015, 12, M.chrome);
  binRim.position.set(1.1, 0.255, -1.9);
  floorDetailGroup.add(binRim);

  // Small plant / standing plant near window
  const standPlantPot = cyl(0.1, 0.08, 0.25, 12, M.pot);
  standPlantPot.position.set(2.4, 0.125, 0.5);
  floorDetailGroup.add(standPlantPot);

  const standPlantSoil = cyl(0.09, 0.09, 0.01, 12, M.soil);
  standPlantSoil.position.set(2.4, 0.255, 0.5);
  floorDetailGroup.add(standPlantSoil);

  // Plant stems
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + 0.3;
    const stemHeight = 0.3 + Math.random() * 0.2;
    const stem = cyl(0.006, 0.006, stemHeight, 6, M.plantDark);
    stem.position.set(
      2.4 + Math.cos(angle) * 0.03,
      0.27 + stemHeight / 2,
      0.5 + Math.sin(angle) * 0.03
    );
    stem.rotation.z = Math.sin(angle) * 0.15;
    stem.rotation.x = Math.cos(angle) * 0.15;
    floorDetailGroup.add(stem);

    // Leaf at top
    const leafMesh = box(0.05, 0.003, 0.03, M.plant);
    leafMesh.position.set(
      2.4 + Math.cos(angle) * 0.05,
      0.27 + stemHeight,
      0.5 + Math.sin(angle) * 0.05
    );
    leafMesh.rotation.y = angle;
    leafMesh.rotation.z = 0.3;
    floorDetailGroup.add(leafMesh);
  }

  trackGroup(floorDetailGroup);
  addGroup(floorDetailGroup);

  /* ─────────────── 12. Desk Accessories & Extras ──────────── */
  const extrasGroup = new THREE.Group();
  extrasGroup.name = 'DeskExtras';

  // USB hub on desk
  const usbHub = box(0.08, 0.015, 0.03, M.lightGray);
  usbHub.position.set(0.55, 0.785, -2.1);
  extrasGroup.add(usbHub);

  // USB ports (small indentations)
  for (let i = 0; i < 3; i++) {
    const port = box(0.012, 0.008, 0.004, M.darkMetal);
    port.position.set(0.53 + i * 0.02, 0.79, -2.085);
    extrasGroup.add(port);
  }

  // Coffee/tea cup
  const cupBody = cyl(0.028, 0.025, 0.07, 10, M.white);
  cupBody.position.set(-0.65, 0.815, -2.4);
  extrasGroup.add(cupBody);

  // Cup handle
  const cupHandleGeo = new THREE.TorusGeometry(0.018, 0.004, 6, 8, Math.PI);
  allGeometries.push(cupHandleGeo);
  const cupHandle = new THREE.Mesh(cupHandleGeo, M.white);
  cupHandle.position.set(-0.625, 0.815, -2.4);
  cupHandle.rotation.y = Math.PI / 2;
  extrasGroup.add(cupHandle);

  // Coaster
  const coaster = cyl(0.04, 0.04, 0.003, 12, M.teal);
  coaster.position.set(-0.65, 0.778, -2.4);
  extrasGroup.add(coaster);

  // ID badge on desk
  const badge = box(0.05, 0.003, 0.08, M.white);
  badge.position.set(0.15, 0.782, -1.85);
  extrasGroup.add(badge);

  // Badge lanyard attachment
  const lanyardClip = box(0.015, 0.005, 0.01, M.chrome);
  lanyardClip.position.set(0.15, 0.785, -1.81);
  extrasGroup.add(lanyardClip);

  // Badge photo area
  const badgePhoto = box(0.025, 0.002, 0.03, M.lightGray);
  badgePhoto.position.set(0.15, 0.784, -1.84);
  extrasGroup.add(badgePhoto);

  // Badge teal accent strip
  const badgeStrip = box(0.045, 0.002, 0.008, M.teal);
  badgeStrip.position.set(0.15, 0.784, -1.87);
  extrasGroup.add(badgeStrip);

  // Small desk calendar
  const calBase = box(0.08, 0.06, 0.02, M.white);
  calBase.position.set(0.55, 0.81, -2.45);
  calBase.rotation.x = -0.15;
  extrasGroup.add(calBase);

  // Calendar teal header
  const calHeader = box(0.075, 0.012, 0.021, M.teal);
  calHeader.position.set(0.55, 0.84, -2.447);
  calHeader.rotation.x = -0.15;
  extrasGroup.add(calHeader);

  // Door (suggestion on right side of back wall)
  const doorFrame = box(0.06, 2.2, 0.06, M.frame);
  doorFrame.position.set(-2.5, 1.1, -2.97);
  extrasGroup.add(doorFrame);

  const doorFrameR = box(0.06, 2.2, 0.06, M.frame);
  doorFrameR.position.set(-1.7, 1.1, -2.97);
  extrasGroup.add(doorFrameR);

  const doorFrameTop = box(0.86, 0.06, 0.06, M.frame);
  doorFrameTop.position.set(-2.1, 2.22, -2.97);
  extrasGroup.add(doorFrameTop);

  // Door panel
  const doorPanel = box(0.74, 2.14, 0.04, M.lightGray);
  doorPanel.position.set(-2.1, 1.07, -2.97);
  extrasGroup.add(doorPanel);

  // Door handle
  const doorHandle = box(0.06, 0.015, 0.03, M.chrome);
  doorHandle.position.set(-1.8, 1.0, -2.945);
  extrasGroup.add(doorHandle);

  // Door small window
  const doorWindow = box(0.2, 0.3, 0.005, M.glass);
  doorWindow.position.set(-2.1, 1.8, -2.945);
  extrasGroup.add(doorWindow);

  // Door sign placeholder
  const doorSign = box(0.15, 0.05, 0.005, M.teal);
  doorSign.position.set(-2.1, 2.0, -2.944);
  extrasGroup.add(doorSign);

  trackGroup(extrasGroup);
  addGroup(extrasGroup);

  /* ─────────────── 13. Lighting ───────────────────────────── */
  const lightGroup = new THREE.Group();
  lightGroup.name = 'Lighting';

  // Ambient — clinical brightness
  const ambient = new THREE.AmbientLight(0xf0f5ff, 0.6);
  lightGroup.add(ambient);

  // Hemisphere light for soft fill
  const hemi = new THREE.HemisphereLight(0xf0f8ff, 0xd0d8e0, 0.4);
  lightGroup.add(hemi);

  // Main overhead (simulating LED panels)
  const mainLight = new THREE.DirectionalLight(0xf5f8ff, 0.8);
  mainLight.position.set(0, 2.9, 0);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  mainLight.shadow.camera.near = 0.1;
  mainLight.shadow.camera.far = 6;
  mainLight.shadow.camera.left = -3.5;
  mainLight.shadow.camera.right = 3.5;
  mainLight.shadow.camera.top = 3.5;
  mainLight.shadow.camera.bottom = -3.5;
  mainLight.shadow.bias = -0.001;
  lightGroup.add(mainLight);
  lightGroup.add(mainLight.target);

  // Secondary ceiling light
  const fillLight = new THREE.DirectionalLight(0xf0f5ff, 0.3);
  fillLight.position.set(-1.5, 2.8, 1.5);
  lightGroup.add(fillLight);

  // Monitor glow — teal PointLight
  const monitorGlow = new THREE.PointLight(0x00897b, 0.3, 2.0);
  monitorGlow.position.set(0, 1.2, -2.3);
  lightGroup.add(monitorGlow);

  // Tablet glow
  const tabletGlow = new THREE.PointLight(0x34a853, 0.15, 1.5);
  tabletGlow.position.set(2.1, 0.95, -1.85);
  lightGroup.add(tabletGlow);

  // Board glow
  const boardGlow = new THREE.PointLight(0x00897b, 0.2, 2.0);
  boardGlow.position.set(-2.6, 1.6, -0.5);
  lightGroup.add(boardGlow);

  // Window light — warm natural light
  const windowLight = new THREE.PointLight(0xfff8e1, 0.5, 5.0);
  windowLight.position.set(3.5, 2.0, 0);
  windowLight.castShadow = false;
  lightGroup.add(windowLight);

  // Secondary warm window fill
  const windowFill = new THREE.PointLight(0xffe0b2, 0.2, 4.0);
  windowFill.position.set(2.5, 1.0, 0);
  lightGroup.add(windowFill);

  scene.add(lightGroup);
  allGroups.push(lightGroup);

  /* ═══════════════════════════════════════════════════════════════
     Cleanup
     ═══════════════════════════════════════════════════════════════ */
  function cleanup() {
    // Remove all groups from scene
    allGroups.forEach((group) => {
      // Dispose all meshes in the group
      group.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
      scene.remove(group);
    });

    // Dispose any additionally tracked geometries
    allGeometries.forEach((g) => {
      if (g.dispose) g.dispose();
    });

    // Dispose any additionally tracked materials
    allMaterials.forEach((m) => {
      if (m.dispose) m.dispose();
    });

    // Clear arrays
    allGroups.length = 0;
    allGeometries.length = 0;
    allMaterials.length = 0;
  }

  return { hotspotPositions, cleanup };
}
