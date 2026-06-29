/**
 * corporateWorld.js — Corporate Office World for CIO Simulator
 * Builds a premium, detailed CIO corner-office using Three.js geometry.
 * Refactored from office.js into a standalone world module.
 */
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════
   Material Palette (hardcoded corporate theme)
   ═══════════════════════════════════════════════════════════════ */
function makeMaterials() {
  return {
    floor: new THREE.MeshStandardMaterial({
      color: 0x3d2b1f,
      roughness: 0.7,
      metalness: 0.05,
    }),
    wall: new THREE.MeshStandardMaterial({
      color: 0xe8e0d8,
      roughness: 0.9,
      metalness: 0.0,
    }),
    ceiling: new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.95,
    }),
    desk: new THREE.MeshStandardMaterial({
      color: 0x5c3a21,
      roughness: 0.4,
      metalness: 0.05,
    }),
    deskEdge: new THREE.MeshStandardMaterial({
      color: 0x4a2e18,
      roughness: 0.35,
      metalness: 0.08,
    }),
    metal: new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.25,
      metalness: 0.8,
    }),
    darkMetal: new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.3,
      metalness: 0.7,
    }),
    chair: new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.5,
      metalness: 0.1,
    }),
    leather: new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.55,
      metalness: 0.05,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: 0xaaddff,
      transparent: true,
      opacity: 0.18,
      roughness: 0.05,
      metalness: 0.3,
    }),
    windowFrame: new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.3,
      metalness: 0.6,
    }),
    screen: new THREE.MeshStandardMaterial({
      color: 0x111122,
      emissive: 0x4488ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.3,
    }),
    laptopScreen: new THREE.MeshStandardMaterial({
      color: 0x112211,
      emissive: 0x44ff88,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.3,
    }),
    black: new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 }),
    phone: new THREE.MeshStandardMaterial({
      color: 0x222233,
      roughness: 0.5,
      metalness: 0.15,
    }),
    mug: new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.4 }),
    mugInner: new THREE.MeshStandardMaterial({
      color: 0x3b2010,
      roughness: 0.5,
    }),
    plant: new THREE.MeshStandardMaterial({ color: 0x2d5a27, roughness: 0.8 }),
    pot: new THREE.MeshStandardMaterial({ color: 0x8b5e3c, roughness: 0.7 }),
    soil: new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.95 }),
    rug: new THREE.MeshStandardMaterial({
      color: 0x2a1f15,
      roughness: 0.9,
      metalness: 0.0,
    }),
    rugBorder: new THREE.MeshStandardMaterial({
      color: 0x1a73e8,
      roughness: 0.85,
    }),
    book: (c) =>
      new THREE.MeshStandardMaterial({
        color: c,
        roughness: 0.6,
        metalness: 0.05,
      }),
    whiteboard: new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.3,
      metalness: 0.05,
    }),
    whiteboardFrame: new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.3,
      metalness: 0.5,
    }),
    trophy: new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.9,
    }),
    lampShade: new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.4,
      metalness: 0.3,
      side: THREE.DoubleSide,
    }),
    credenza: new THREE.MeshStandardMaterial({
      color: 0x4a3020,
      roughness: 0.45,
      metalness: 0.05,
    }),
    folder: (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 }),
    coatRack: new THREE.MeshStandardMaterial({
      color: 0x3d2b1f,
      roughness: 0.5,
      metalness: 0.15,
    }),
    clockFace: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
    }),
    clockRim: new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.6,
    }),
    frame: new THREE.MeshStandardMaterial({
      color: 0x3d2b1f,
      roughness: 0.4,
      metalness: 0.1,
    }),
    frameInner: new THREE.MeshStandardMaterial({
      color: 0xfaf0e6,
      roughness: 0.5,
    }),
    baseboard: new THREE.MeshStandardMaterial({
      color: 0xd5ccc3,
      roughness: 0.6,
    }),
  };
}

/* ── Helpers ─────────────────────────────────────────────────── */

function box(w, h, d, mat, allGeometries, allMaterials) {
  const g = new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  if (allGeometries) allGeometries.push(g);
  return m;
}

function cyl(rT, rB, h, seg, mat, allGeometries) {
  const g = new THREE.CylinderGeometry(rT, rB, h, seg);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  if (allGeometries) allGeometries.push(g);
  return m;
}

function makePlane(w, h, mat, allGeometries) {
  const g = new THREE.PlaneGeometry(w, h);
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  if (allGeometries) allGeometries.push(g);
  return m;
}

/* ═══════════════════════════════════════════════════════════════
   buildCorporateWorld — main export
   ═══════════════════════════════════════════════════════════════ */
export function buildCorporateWorld(scene) {
  const M = makeMaterials();
  const hotspotPositions = new Map();

  // Tracking arrays for cleanup
  const allObjects = [];
  const allMaterials = [];
  const allGeometries = [];
  const allLights = [];

  // Collect all static materials for disposal
  for (const [key, val] of Object.entries(M)) {
    if (val instanceof THREE.Material) {
      allMaterials.push(val);
    }
    // 'book' and 'folder' are factory functions — their outputs tracked on creation
  }

  // Set scene background to corporate palette
  scene.background = new THREE.Color(0xf8fafd);

  // Local helper wrappers that auto-track geometries
  function b(w, h, d, mat) {
    return box(w, h, d, mat, allGeometries);
  }
  function c(rT, rB, h, seg, mat) {
    return cyl(rT, rB, h, seg, mat, allGeometries);
  }
  function p(w, h, mat) {
    return makePlane(w, h, mat, allGeometries);
  }

  // Factory material tracker — wraps book/folder to also track the created material
  function bookMat(color) {
    const m = M.book(color);
    allMaterials.push(m);
    return m;
  }
  function folderMat(color) {
    const m = M.folder(color);
    allMaterials.push(m);
    return m;
  }

  // Helper to add object to scene and track it
  function addToScene(obj) {
    scene.add(obj);
    allObjects.push(obj);
  }

  // Helper to add light to scene and track it
  function addLight(light) {
    scene.add(light);
    allLights.push(light);
  }

  /* ─────────────── 1. Room Shell ──────────────────────────── */
  const roomGroup = new THREE.Group();
  roomGroup.name = "Room";

  // Floor
  const floor = p(6, 6, M.floor);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  roomGroup.add(floor);

  // Ceiling
  const ceil = p(6, 6, M.ceiling);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = 3;
  roomGroup.add(ceil);

  // Back wall (Z = -3)
  const backWall = p(6, 3, M.wall);
  backWall.position.set(0, 1.5, -3);
  roomGroup.add(backWall);

  // Left wall (X = -3)
  const leftWall = p(6, 3, M.wall);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-3, 1.5, 0);
  roomGroup.add(leftWall);

  // Right wall (X = 3) – partial, with window opening
  // Right wall lower section (below window)
  const rwLower = p(6, 0.8, M.wall);
  rwLower.rotation.y = -Math.PI / 2;
  rwLower.position.set(3, 0.4, 0);
  roomGroup.add(rwLower);

  // Right wall upper section (above window)
  const rwUpper = p(6, 0.6, M.wall);
  rwUpper.rotation.y = -Math.PI / 2;
  rwUpper.position.set(3, 2.7, 0);
  roomGroup.add(rwUpper);

  // Right wall side columns (flanking window)
  const rwLeft = p(1.0, 1.6, M.wall);
  rwLeft.rotation.y = -Math.PI / 2;
  rwLeft.position.set(3, 1.6, 2.5);
  roomGroup.add(rwLeft);

  const rwRight = p(1.0, 1.6, M.wall);
  rwRight.rotation.y = -Math.PI / 2;
  rwRight.position.set(3, 1.6, -2.5);
  roomGroup.add(rwRight);

  // Baseboards
  const bbThick = 0.05,
    bbHeight = 0.12;
  const bbBack = b(6, bbHeight, bbThick, M.baseboard);
  bbBack.position.set(0, bbHeight / 2, -2.97);
  roomGroup.add(bbBack);

  const bbLeft = b(bbThick, bbHeight, 6, M.baseboard);
  bbLeft.position.set(-2.97, bbHeight / 2, 0);
  roomGroup.add(bbLeft);

  const bbRight = b(bbThick, bbHeight, 6, M.baseboard);
  bbRight.position.set(2.97, bbHeight / 2, 0);
  roomGroup.add(bbRight);

  addToScene(roomGroup);

  /* ─────────────── 9. Window & City View ─────────────────── */
  const windowGroup = new THREE.Group();
  windowGroup.name = "Window";

  // Window glass
  const windowGlass = p(4, 1.6, M.glass);
  windowGlass.rotation.y = -Math.PI / 2;
  windowGlass.position.set(2.98, 1.6, 0);
  windowGroup.add(windowGlass);

  // Window frame bars
  const frameMat = M.windowFrame;
  const hBar = b(0.03, 0.04, 4, frameMat);
  hBar.position.set(2.99, 1.6, 0);
  windowGroup.add(hBar);

  const vBar1 = b(0.03, 1.6, 0.04, frameMat);
  vBar1.position.set(2.99, 1.6, -1.0);
  windowGroup.add(vBar1);

  const vBar2 = b(0.03, 1.6, 0.04, frameMat);
  vBar2.position.set(2.99, 1.6, 1.0);
  windowGroup.add(vBar2);

  // Frame border
  const fT = b(0.04, 0.06, 4.1, frameMat);
  fT.position.set(2.99, 2.4, 0);
  windowGroup.add(fT);
  const fB = b(0.04, 0.06, 4.1, frameMat);
  fB.position.set(2.99, 0.8, 0);
  windowGroup.add(fB);
  const fL = b(0.04, 1.7, 0.06, frameMat);
  fL.position.set(2.99, 1.6, 2.03);
  windowGroup.add(fL);
  const fR = b(0.04, 1.7, 0.06, frameMat);
  fR.position.set(2.99, 1.6, -2.03);
  windowGroup.add(fR);

  // Window light coming in
  const windowLight = new THREE.PointLight(0xffeedd, 0.4, 6);
  windowLight.position.set(2.5, 2.0, 0);
  windowGroup.add(windowLight);
  allLights.push(windowLight);
  addToScene(windowGroup);

  /* ─────────────── 8-a. Area Rug ─────────────────────────── */
  const rugGroup = new THREE.Group();
  rugGroup.name = "Rug";
  const rugBase = p(3.0, 2.4, M.rug);
  rugBase.rotation.x = -Math.PI / 2;
  rugBase.position.set(0, 0.005, -1.0);
  rugGroup.add(rugBase);
  const rugBorderMesh = p(3.2, 2.6, M.rugBorder);
  rugBorderMesh.rotation.x = -Math.PI / 2;
  rugBorderMesh.position.set(0, 0.003, -1.0);
  rugGroup.add(rugBorderMesh);
  addToScene(rugGroup);

  /* ─────────────── 2. CIO Desk ───────────────────────────── */
  const deskGroup = new THREE.Group();
  deskGroup.name = "CIODesk";

  const deskY = 0.75;
  const deskThick = 0.05;

  // Main desk surface
  const deskTop = b(2.0, deskThick, 0.9, M.desk);
  deskTop.position.set(0, deskY, -2.1);
  deskGroup.add(deskTop);

  // Desk edge trim
  const edgeFront = b(2.04, 0.03, 0.03, M.deskEdge);
  edgeFront.position.set(0, deskY - 0.02, -1.64);
  deskGroup.add(edgeFront);
  const edgeBack = b(2.04, 0.03, 0.03, M.deskEdge);
  edgeBack.position.set(0, deskY - 0.02, -2.54);
  deskGroup.add(edgeBack);

  // L-extension (right wing)
  const deskWing = b(0.7, deskThick, 0.6, M.desk);
  deskWing.position.set(1.15, deskY, -1.55);
  deskGroup.add(deskWing);

  // Desk legs (4 + 2 for wing)
  const legH = deskY - deskThick / 2;
  const legPositions = [
    [-0.95, -2.5],
    [0.95, -2.5],
    [-0.95, -1.68],
    [0.95, -1.68],
    [1.45, -1.28],
    [1.45, -1.82],
  ];
  for (const [lx, lz] of legPositions) {
    const leg = b(0.05, legH, 0.05, M.metal);
    leg.position.set(lx, legH / 2, lz);
    deskGroup.add(leg);
  }

  // Modesty panel
  const modesty = b(1.9, 0.45, 0.02, M.desk);
  modesty.position.set(0, 0.3, -1.67);
  deskGroup.add(modesty);

  // Cable tray under desk
  const cableTray = b(0.6, 0.03, 0.15, M.darkMetal);
  cableTray.position.set(0, 0.1, -2.3);
  deskGroup.add(cableTray);

  /* ── Monitor ─── */
  const monitorGroup = new THREE.Group();
  monitorGroup.name = "Monitor";
  // Screen
  const screenMesh = b(0.55, 0.35, 0.02, M.screen);
  screenMesh.position.set(0, 0.3, 0);
  monitorGroup.add(screenMesh);
  // Bezel
  const bezelMat = M.black;
  const bTop = b(0.58, 0.015, 0.025, bezelMat);
  bTop.position.set(0, 0.48, 0);
  monitorGroup.add(bTop);
  const bBot = b(0.58, 0.02, 0.025, bezelMat);
  bBot.position.set(0, 0.12, 0);
  monitorGroup.add(bBot);
  const bL = b(0.015, 0.37, 0.025, bezelMat);
  bL.position.set(-0.29, 0.3, 0);
  monitorGroup.add(bL);
  const bR = b(0.015, 0.37, 0.025, bezelMat);
  bR.position.set(0.29, 0.3, 0);
  monitorGroup.add(bR);
  // Stand neck
  const standNeck = b(0.04, 0.12, 0.04, M.metal);
  standNeck.position.set(0, 0.06, 0.03);
  monitorGroup.add(standNeck);
  // Stand base
  const standBase = c(0.12, 0.12, 0.015, 16, M.metal);
  standBase.position.set(0, 0.0, 0.05);
  monitorGroup.add(standBase);

  monitorGroup.position.set(-0.2, deskY + deskThick / 2, -2.35);
  deskGroup.add(monitorGroup);

  hotspotPositions.set(
    "budget_security",
    new THREE.Vector3(-0.2, deskY + 0.7, -2.35),
  );

  /* ── Keyboard & Mouse ─── */
  const keyboard = b(0.3, 0.01, 0.1, M.black);
  keyboard.position.set(-0.2, deskY + deskThick / 2 + 0.005, -1.95);
  deskGroup.add(keyboard);

  const mouse = b(0.05, 0.015, 0.08, M.black);
  mouse.position.set(0.15, deskY + deskThick / 2 + 0.007, -1.95);
  deskGroup.add(mouse);

  // Mouse pad
  const mousePad = b(0.22, 0.003, 0.18, M.chair);
  mousePad.position.set(0.13, deskY + deskThick / 2 + 0.001, -1.95);
  deskGroup.add(mousePad);

  /* ── Desk Lamp ─── */
  const lampGroup = new THREE.Group();
  lampGroup.name = "DeskLamp";
  const lampBase = c(0.06, 0.07, 0.02, 16, M.metal);
  lampBase.position.set(0, 0.01, 0);
  lampGroup.add(lampBase);
  const lampArm = c(0.012, 0.012, 0.3, 8, M.metal);
  lampArm.position.set(0, 0.17, 0);
  lampArm.rotation.z = 0.15;
  lampGroup.add(lampArm);
  const lampShadeGeo = new THREE.ConeGeometry(0.08, 0.1, 16, 1, true);
  allGeometries.push(lampShadeGeo);
  const lampShade = new THREE.Mesh(lampShadeGeo, M.lampShade);
  lampShade.position.set(0.02, 0.34, 0);
  lampShade.rotation.z = Math.PI;
  lampShade.castShadow = true;
  lampGroup.add(lampShade);
  // Lamp light
  const lampLight = new THREE.PointLight(0xffcc88, 0.6, 3, 2);
  lampLight.position.set(0.02, 0.3, 0);
  lampLight.castShadow = true;
  lampLight.shadow.mapSize.set(512, 512);
  lampGroup.add(lampLight);
  allLights.push(lampLight);

  lampGroup.position.set(0.7, deskY + deskThick / 2, -2.4);
  deskGroup.add(lampGroup);

  /* ── Phone ─── */
  const phoneGroup = new THREE.Group();
  phoneGroup.name = "Phone";
  const phoneBody = b(0.12, 0.025, 0.16, M.phone);
  phoneBody.position.set(0, 0.012, 0);
  phoneGroup.add(phoneBody);
  // Handset
  const handset = b(0.03, 0.02, 0.12, M.black);
  handset.position.set(-0.04, 0.03, 0.0);
  phoneGroup.add(handset);
  // Small buttons area
  const btnArea = b(0.06, 0.003, 0.06, M.darkMetal);
  btnArea.position.set(0.02, 0.026, 0);
  phoneGroup.add(btnArea);

  phoneGroup.position.set(0.6, deskY + deskThick / 2, -2.0);
  deskGroup.add(phoneGroup);

  hotspotPositions.set(
    "data_breach",
    new THREE.Vector3(0.6, deskY + 0.35, -2.0),
  );

  /* ── Coffee Mug ─── */
  const mugGroup = new THREE.Group();
  mugGroup.name = "Mug";
  const mugBody = c(0.03, 0.025, 0.08, 12, M.mug);
  mugBody.position.set(0, 0.04, 0);
  mugGroup.add(mugBody);
  // Coffee inside
  const coffee = c(0.025, 0.025, 0.01, 12, M.mugInner);
  coffee.position.set(0, 0.075, 0);
  mugGroup.add(coffee);
  // Handle
  const handleGeo = new THREE.TorusGeometry(0.02, 0.005, 6, 10, Math.PI);
  allGeometries.push(handleGeo);
  const handleMesh = new THREE.Mesh(handleGeo, M.mug);
  handleMesh.position.set(0.03, 0.04, 0);
  handleMesh.rotation.y = Math.PI / 2;
  handleMesh.rotation.z = Math.PI / 2;
  handleMesh.castShadow = true;
  mugGroup.add(handleMesh);

  mugGroup.position.set(-0.7, deskY + deskThick / 2, -1.85);
  deskGroup.add(mugGroup);

  /* ── Pen Holder ─── */
  const penHolder = c(0.025, 0.025, 0.07, 8, M.darkMetal);
  penHolder.position.set(-0.55, deskY + deskThick / 2 + 0.035, -2.35);
  deskGroup.add(penHolder);
  // Pens
  for (let i = 0; i < 3; i++) {
    const pen = c(
      0.003,
      0.003,
      0.1,
      6,
      bookMat(i === 0 ? 0x2244aa : i === 1 ? 0xaa2222 : 0x222222),
    );
    pen.position.set(
      -0.55 + (i - 1) * 0.008,
      deskY + deskThick / 2 + 0.08,
      -2.35,
    );
    pen.rotation.z = (i - 1) * 0.08;
    deskGroup.add(pen);
  }

  /* ── Small Desk Plant ─── */
  const smallPlant = new THREE.Group();
  const sPot = c(0.035, 0.03, 0.04, 8, M.pot);
  sPot.position.set(0, 0.02, 0);
  smallPlant.add(sPot);
  const sSoil = c(0.033, 0.033, 0.005, 8, M.soil);
  sSoil.position.set(0, 0.042, 0);
  smallPlant.add(sSoil);
  for (let i = 0; i < 5; i++) {
    const leafGeo = new THREE.SphereGeometry(0.02, 6, 6);
    allGeometries.push(leafGeo);
    const leaf = new THREE.Mesh(leafGeo, M.plant);
    leaf.scale.set(1, 1.3, 0.6);
    leaf.position.set(
      Math.cos(i * 1.25) * 0.02,
      0.06 + i * 0.008,
      Math.sin(i * 1.25) * 0.02,
    );
    leaf.castShadow = true;
    smallPlant.add(leaf);
  }
  smallPlant.position.set(0.5, deskY + deskThick / 2, -2.45);
  deskGroup.add(smallPlant);

  // Monitor glow light
  const monitorGlow = new THREE.PointLight(0x4488ff, 0.3, 2, 2);
  monitorGlow.position.set(-0.2, deskY + 0.5, -2.2);
  deskGroup.add(monitorGlow);
  allLights.push(monitorGlow);

  addToScene(deskGroup);

  /* ─────────────── 3. Executive Chair ────────────────────── */
  const chairGroup = new THREE.Group();
  chairGroup.name = "ExecutiveChair";

  // Seat
  const seat = c(0.22, 0.22, 0.06, 16, M.chair);
  seat.position.set(0, 0.48, 0);
  chairGroup.add(seat);

  // Back rest
  const backRest = b(0.4, 0.5, 0.04, M.leather);
  backRest.position.set(0, 0.78, -0.2);
  backRest.rotation.x = -0.1;
  chairGroup.add(backRest);

  // Back cushion detail
  const cushion = b(0.34, 0.12, 0.03, M.chair);
  cushion.position.set(0, 0.7, -0.17);
  chairGroup.add(cushion);

  // Arm rests
  for (const side of [-1, 1]) {
    const armBase = b(0.04, 0.15, 0.04, M.darkMetal);
    armBase.position.set(side * 0.2, 0.55, -0.05);
    chairGroup.add(armBase);
    const armPad = b(0.06, 0.02, 0.2, M.chair);
    armPad.position.set(side * 0.2, 0.63, -0.05);
    chairGroup.add(armPad);
  }

  // Chair column
  const column = c(0.03, 0.03, 0.25, 8, M.metal);
  column.position.set(0, 0.32, 0);
  chairGroup.add(column);

  // Chair base (5-star)
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const arm = b(0.2, 0.02, 0.03, M.darkMetal);
    arm.position.set(Math.cos(angle) * 0.1, 0.18, Math.sin(angle) * 0.1);
    arm.rotation.y = -angle;
    chairGroup.add(arm);
    // Caster wheel
    const wheel = c(0.015, 0.015, 0.02, 8, M.black);
    wheel.position.set(Math.cos(angle) * 0.2, 0.17, Math.sin(angle) * 0.2);
    wheel.rotation.z = Math.PI / 2;
    chairGroup.add(wheel);
  }

  chairGroup.position.set(0, 0, -1.3);
  chairGroup.rotation.y = 0.1;
  addToScene(chairGroup);

  /* ─────────────── 4. Credenza / Side Table ─────────────── */
  const credenzaGroup = new THREE.Group();
  credenzaGroup.name = "Credenza";

  // Main body
  const credBody = b(1.0, 0.5, 0.45, M.credenza);
  credBody.position.set(0, 0.25, 0);
  credenzaGroup.add(credBody);

  // Top surface (slightly different shade)
  const credTop = b(1.02, 0.02, 0.47, M.desk);
  credTop.position.set(0, 0.51, 0);
  credenzaGroup.add(credTop);

  // Drawer handles
  for (let i = -1; i <= 1; i++) {
    const handle = b(0.08, 0.01, 0.015, M.metal);
    handle.position.set(i * 0.3, 0.25, 0.235);
    credenzaGroup.add(handle);
  }

  // Legs
  for (const [lx, lz] of [
    [-0.45, -0.18],
    [0.45, -0.18],
    [-0.45, 0.18],
    [0.45, 0.18],
  ]) {
    const leg = b(0.03, 0.04, 0.03, M.metal);
    leg.position.set(lx, 0.0, lz);
    credenzaGroup.add(leg);
  }

  /* ── Laptop on Credenza ─── */
  const laptopGroup = new THREE.Group();
  laptopGroup.name = "Laptop";
  // Base
  const lapBase = b(0.28, 0.012, 0.2, M.darkMetal);
  lapBase.position.set(0, 0.006, 0);
  laptopGroup.add(lapBase);
  // Screen (angled)
  const lapScreen = b(0.26, 0.18, 0.008, M.laptopScreen);
  lapScreen.position.set(0, 0.1, -0.09);
  lapScreen.rotation.x = -0.3;
  laptopGroup.add(lapScreen);
  // Screen bezel
  const lapBezel = b(0.28, 0.2, 0.003, M.black);
  lapBezel.position.set(0, 0.099, -0.091);
  lapBezel.rotation.x = -0.3;
  laptopGroup.add(lapBezel);
  // Keyboard area
  const lapKeys = b(0.2, 0.002, 0.1, M.black);
  lapKeys.position.set(0, 0.013, 0.02);
  laptopGroup.add(lapKeys);

  laptopGroup.position.set(-0.15, 0.52, 0.0);
  credenzaGroup.add(laptopGroup);

  // Folder stack on credenza
  const folderColors = [0x3355aa, 0xaa3333, 0x338833, 0xccaa33];
  for (let i = 0; i < folderColors.length; i++) {
    const f = b(0.22, 0.008, 0.3, folderMat(folderColors[i]));
    f.position.set(0.3, 0.52 + i * 0.01, 0.0);
    f.rotation.y = (i - 1.5) * 0.03;
    credenzaGroup.add(f);
  }

  credenzaGroup.position.set(1.8, 0, -1.2);
  addToScene(credenzaGroup);

  hotspotPositions.set("phishing", new THREE.Vector3(1.65, 1.1, -1.2));

  /* ─────────────── 5. Meeting Area ──────────────────────── */
  const meetingGroup = new THREE.Group();
  meetingGroup.name = "MeetingArea";

  // Round table
  const roundTableTop = c(0.4, 0.4, 0.03, 24, M.desk);
  roundTableTop.position.set(0, 0.72, 0);
  meetingGroup.add(roundTableTop);

  const roundTableLeg = c(0.04, 0.06, 0.7, 12, M.metal);
  roundTableLeg.position.set(0, 0.35, 0);
  meetingGroup.add(roundTableLeg);

  const roundTableBase = c(0.2, 0.2, 0.02, 16, M.metal);
  roundTableBase.position.set(0, 0.01, 0);
  meetingGroup.add(roundTableBase);

  // Meeting chairs (3 around table)
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2 + Math.PI / 3;
    const dist = 0.65;
    const mChair = new THREE.Group();

    const mSeat = c(0.15, 0.15, 0.04, 12, M.chair);
    mSeat.position.set(0, 0.45, 0);
    mChair.add(mSeat);

    const mBack = b(0.26, 0.3, 0.025, M.leather);
    mBack.position.set(0, 0.65, -0.14);
    mBack.rotation.x = -0.08;
    mChair.add(mBack);

    const mLeg = c(0.02, 0.02, 0.43, 8, M.metal);
    mLeg.position.set(0, 0.22, 0);
    mChair.add(mLeg);

    mChair.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
    mChair.lookAt(0, 0.5, 0);
    meetingGroup.add(mChair);
  }

  meetingGroup.position.set(-1.8, 0, 0.8);
  addToScene(meetingGroup);

  hotspotPositions.set("outsourcing", new THREE.Vector3(-1.8, 1.2, 0.8));

  /* ── Whiteboard on left wall ─── */
  const wbGroup = new THREE.Group();
  wbGroup.name = "Whiteboard";

  const wbBoard = b(1.2, 0.8, 0.02, M.whiteboard);
  wbBoard.position.set(0, 0, 0);
  wbGroup.add(wbBoard);

  // Frame
  const wfT = b(1.24, 0.03, 0.04, M.whiteboardFrame);
  wfT.position.set(0, 0.41, 0);
  wbGroup.add(wfT);
  const wfB = b(1.24, 0.03, 0.04, M.whiteboardFrame);
  wfB.position.set(0, -0.41, 0);
  wbGroup.add(wfB);
  const wfL = b(0.03, 0.85, 0.04, M.whiteboardFrame);
  wfL.position.set(-0.615, 0, 0);
  wbGroup.add(wfL);
  const wfR = b(0.03, 0.85, 0.04, M.whiteboardFrame);
  wfR.position.set(0.615, 0, 0);
  wbGroup.add(wfR);

  // Marker tray
  const tray = b(0.5, 0.025, 0.06, M.metal);
  tray.position.set(0, -0.44, 0.035);
  wbGroup.add(tray);

  // Markers on tray
  const markerColors = [0x222222, 0xcc2222, 0x2222cc];
  for (let i = 0; i < markerColors.length; i++) {
    const marker = c(0.008, 0.008, 0.1, 6, bookMat(markerColors[i]));
    marker.rotation.z = Math.PI / 2;
    marker.position.set(-0.1 + i * 0.1, -0.42, 0.04);
    wbGroup.add(marker);
  }

  wbGroup.position.set(-2.96, 1.7, 0.3);
  wbGroup.rotation.y = Math.PI / 2;
  addToScene(wbGroup);

  hotspotPositions.set("new_tech", new THREE.Vector3(-2.5, 2.0, 0.3));

  /* ─────────────── 6. Bookshelf ─────────────────────────── */
  const shelfGroup = new THREE.Group();
  shelfGroup.name = "Bookshelf";

  // Main frame
  const shelfW = 0.9,
    shelfH = 2.2,
    shelfD = 0.3;
  // Sides
  const shSideL = b(0.03, shelfH, shelfD, M.desk);
  shSideL.position.set(-shelfW / 2, shelfH / 2, 0);
  shelfGroup.add(shSideL);
  const shSideR = b(0.03, shelfH, shelfD, M.desk);
  shSideR.position.set(shelfW / 2, shelfH / 2, 0);
  shelfGroup.add(shSideR);
  // Top
  const shTop = b(shelfW + 0.03, 0.03, shelfD, M.desk);
  shTop.position.set(0, shelfH, 0);
  shelfGroup.add(shTop);
  // Back
  const shBack = b(shelfW, shelfH, 0.01, M.deskEdge);
  shBack.position.set(0, shelfH / 2, -shelfD / 2 + 0.005);
  shelfGroup.add(shBack);

  // Shelves (4 levels)
  const shelfLevels = [0.0, 0.55, 1.1, 1.65];
  for (const sy of shelfLevels) {
    const shelf = b(shelfW, 0.02, shelfD, M.desk);
    shelf.position.set(0, sy, 0);
    shelfGroup.add(shelf);
  }

  // Books (varied colors and heights)
  const bookColors = [
    0x8b0000, 0x00008b, 0x006400, 0x8b4513, 0x4b0082, 0xb8860b, 0x2f4f4f,
    0x8b008b, 0xcd853f, 0x191970, 0x556b2f, 0x800020, 0x1c1c1c, 0x4169e1,
    0xa0522d,
  ];

  function addBooks(shelfY, count, offsetX) {
    let x = offsetX - 0.35;
    for (let i = 0; i < count; i++) {
      const bh = 0.15 + Math.random() * 0.15;
      const bw = 0.02 + Math.random() * 0.015;
      const bd = 0.18 + Math.random() * 0.06;
      const bk = b(
        bw,
        bh,
        bd,
        bookMat(
          bookColors[(i * 3 + Math.floor(shelfY * 7)) % bookColors.length],
        ),
      );
      bk.position.set(x + bw / 2, shelfY + 0.02 + bh / 2, 0.0);
      bk.rotation.y = (Math.random() - 0.5) * 0.03;
      shelfGroup.add(bk);
      x += bw + 0.005;
    }
    return x;
  }

  addBooks(0.0, 8, 0);
  addBooks(0.55, 7, 0.05);
  addBooks(1.1, 6, 0.0);

  // Binders on shelf level 3
  const binderColors = [0x222266, 0x226622, 0x662222];
  for (let i = 0; i < binderColors.length; i++) {
    const binder = b(0.06, 0.25, 0.22, bookMat(binderColors[i]));
    binder.position.set(-0.25 + i * 0.12, 1.65 + 0.02 + 0.125, 0.0);
    shelfGroup.add(binder);
    // Binder label
    const label = b(0.04, 0.06, 0.001, M.frameInner);
    label.position.set(-0.25 + i * 0.12, 1.65 + 0.02 + 0.15, 0.112);
    shelfGroup.add(label);
  }

  // Trophy / Award
  const trophyGroup = new THREE.Group();
  const tBase = c(0.04, 0.05, 0.02, 12, M.darkMetal);
  tBase.position.set(0, 0.01, 0);
  trophyGroup.add(tBase);
  const tStem = c(0.01, 0.015, 0.08, 8, M.trophy);
  tStem.position.set(0, 0.06, 0);
  trophyGroup.add(tStem);
  const tCup = c(0.035, 0.015, 0.05, 12, M.trophy);
  tCup.position.set(0, 0.12, 0);
  trophyGroup.add(tCup);
  // Star on top
  const starGeo = new THREE.OctahedronGeometry(0.02, 0);
  allGeometries.push(starGeo);
  const star = new THREE.Mesh(starGeo, M.trophy);
  star.position.set(0, 0.16, 0);
  star.castShadow = true;
  trophyGroup.add(star);

  trophyGroup.position.set(0.25, 1.67, 0.0);
  shelfGroup.add(trophyGroup);

  shelfGroup.position.set(1.8, 0, -2.7);
  addToScene(shelfGroup);

  hotspotPositions.set("compliance_audit", new THREE.Vector3(1.8, 1.8, -2.7));

  /* ─────────────── 7. Wall Decor ────────────────────────── */
  const decorGroup = new THREE.Group();
  decorGroup.name = "WallDecor";

  // Company logo frame on back wall
  const logoFrame = new THREE.Group();
  const lFrameOuter = b(0.6, 0.45, 0.02, M.frame);
  logoFrame.add(lFrameOuter);
  const lFrameInner = b(0.52, 0.37, 0.015, M.frameInner);
  lFrameInner.position.z = 0.005;
  logoFrame.add(lFrameInner);
  // Geometric logo pattern (hexagon-ish)
  const logoGeo = new THREE.RingGeometry(0.06, 0.1, 6);
  allGeometries.push(logoGeo);
  const logoMesh = new THREE.Mesh(logoGeo, M.metal);
  logoMesh.position.z = 0.015;
  logoFrame.add(logoMesh);
  // Inner circle
  const logoInnerGeo = new THREE.CircleGeometry(0.04, 16);
  allGeometries.push(logoInnerGeo);
  const logoInnerMat = bookMat(0x2244aa);
  const logoInner = new THREE.Mesh(logoInnerGeo, logoInnerMat);
  logoInner.position.z = 0.016;
  logoFrame.add(logoInner);

  logoFrame.position.set(-0.8, 2.1, -2.96);
  decorGroup.add(logoFrame);

  // Wall Clock
  const clockGroup = new THREE.Group();
  clockGroup.name = "WallClock";
  const clockBody = c(0.12, 0.12, 0.03, 24, M.clockRim);
  clockBody.rotation.x = Math.PI / 2;
  clockGroup.add(clockBody);
  const cFaceGeo = new THREE.CircleGeometry(0.1, 24);
  allGeometries.push(cFaceGeo);
  const cFace = new THREE.Mesh(cFaceGeo, M.clockFace);
  cFace.position.z = 0.016;
  clockGroup.add(cFace);
  // Hour markers
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const tickLen = i % 3 === 0 ? 0.015 : 0.008;
    const tick = b(0.003, tickLen, 0.002, M.black);
    tick.position.set(Math.sin(a) * 0.085, Math.cos(a) * 0.085, 0.017);
    tick.rotation.z = -a;
    clockGroup.add(tick);
  }
  // Clock hands
  const hourHand = b(0.004, 0.05, 0.002, M.black);
  hourHand.position.set(0.01, 0.02, 0.018);
  hourHand.rotation.z = -0.8;
  clockGroup.add(hourHand);
  const minHand = b(0.003, 0.07, 0.002, M.darkMetal);
  minHand.position.set(-0.015, 0.03, 0.019);
  minHand.rotation.z = 0.4;
  clockGroup.add(minHand);
  // Center dot
  const centerDot = c(0.005, 0.005, 0.004, 8, M.black);
  centerDot.rotation.x = Math.PI / 2;
  centerDot.position.z = 0.019;
  clockGroup.add(centerDot);

  clockGroup.position.set(0.6, 2.2, -2.96);
  decorGroup.add(clockGroup);

  // Certificate frames on left wall
  for (let i = 0; i < 2; i++) {
    const certFrame = new THREE.Group();
    const cOuter = b(0.35, 0.28, 0.015, M.frame);
    certFrame.add(cOuter);
    const cInner = b(0.29, 0.22, 0.012, M.frameInner);
    cInner.position.z = 0.004;
    certFrame.add(cInner);
    // "Text" lines
    for (let j = 0; j < 4; j++) {
      const line = b(0.18 - j * 0.02, 0.004, 0.001, bookMat(0x999999));
      line.position.set(0, 0.06 - j * 0.035, 0.012);
      certFrame.add(line);
    }
    certFrame.rotation.y = Math.PI / 2;
    certFrame.position.set(-2.96, 1.8 + i * 0.5, -1.5 + i * 0.8);
    decorGroup.add(certFrame);
  }

  addToScene(decorGroup);

  /* ─────────────── 8. Ambient Details ───────────────────── */
  const detailGroup = new THREE.Group();
  detailGroup.name = "AmbientDetails";

  // Large potted plant (corner)
  const bigPlant = new THREE.Group();
  bigPlant.name = "PottedPlant";

  const bPot = c(0.15, 0.12, 0.25, 12, M.pot);
  bPot.position.set(0, 0.125, 0);
  bigPlant.add(bPot);

  const bPotRim = c(0.16, 0.15, 0.03, 12, M.pot);
  bPotRim.position.set(0, 0.26, 0);
  bigPlant.add(bPotRim);

  const bSoil = c(0.13, 0.13, 0.02, 12, M.soil);
  bSoil.position.set(0, 0.27, 0);
  bigPlant.add(bSoil);

  // Trunk
  const trunk = c(0.02, 0.03, 0.5, 8, bookMat(0x5c3a21));
  trunk.position.set(0, 0.52, 0);
  trunk.rotation.z = 0.05;
  bigPlant.add(trunk);

  // Foliage spheres
  const foliagePositions = [
    [0, 0.85, 0, 0.15],
    [0.08, 0.75, 0.06, 0.1],
    [-0.06, 0.78, -0.05, 0.1],
    [0.04, 0.92, -0.04, 0.08],
    [-0.04, 0.9, 0.05, 0.09],
  ];
  for (const [fx, fy, fz, fr] of foliagePositions) {
    const foliageGeo = new THREE.SphereGeometry(fr, 8, 8);
    allGeometries.push(foliageGeo);
    const foliage = new THREE.Mesh(foliageGeo, M.plant);
    foliage.position.set(fx, fy, fz);
    foliage.castShadow = true;
    bigPlant.add(foliage);
  }

  bigPlant.position.set(-2.5, 0, 2.2);
  detailGroup.add(bigPlant);

  // Coat Rack
  const coatRack = new THREE.Group();
  coatRack.name = "CoatRack";

  const crBase = c(0.15, 0.15, 0.02, 12, M.coatRack);
  crBase.position.set(0, 0.01, 0);
  coatRack.add(crBase);

  const crPole = c(0.02, 0.02, 1.5, 8, M.coatRack);
  crPole.position.set(0, 0.77, 0);
  coatRack.add(crPole);

  // Hooks
  for (let i = 0; i < 4; i++) {
    const hookAngle = (i / 4) * Math.PI * 2;
    const hook = b(0.1, 0.015, 0.015, M.darkMetal);
    hook.position.set(
      Math.cos(hookAngle) * 0.05,
      1.48,
      Math.sin(hookAngle) * 0.05,
    );
    hook.rotation.y = -hookAngle;
    coatRack.add(hook);

    // Hook tip
    const hookTip = b(0.015, 0.03, 0.015, M.darkMetal);
    hookTip.position.set(
      Math.cos(hookAngle) * 0.1,
      1.47,
      Math.sin(hookAngle) * 0.1,
    );
    coatRack.add(hookTip);
  }

  coatRack.position.set(-2.4, 0, -2.3);
  detailGroup.add(coatRack);

  addToScene(detailGroup);

  /* ─────────────── 10. Lighting Details ─────────────────── */
  // Ceiling area light feel (several small point lights)
  const ceilingLight1 = new THREE.PointLight(0xfff8f0, 0.3, 6, 2);
  ceilingLight1.position.set(0, 2.8, -1);
  addLight(ceilingLight1);

  const ceilingLight2 = new THREE.PointLight(0xfff8f0, 0.2, 5, 2);
  ceilingLight2.position.set(-1.5, 2.8, 0.5);
  addLight(ceilingLight2);

  // Ceiling light fixtures (visual)
  for (const [cx, cz] of [
    [0, -1],
    [-1.5, 0.5],
  ]) {
    const fixture = c(0.15, 0.15, 0.02, 16, M.metal);
    fixture.position.set(cx, 2.97, cz);
    addToScene(fixture);
    const fixtureRim = c(0.16, 0.16, 0.005, 16, M.darkMetal);
    fixtureRim.position.set(cx, 2.96, cz);
    addToScene(fixtureRim);
  }

  /* ─────────────── 11. World Theme Accents ───────────────── */
  // Accent panels removed - they served no functional purpose

  /* ─────────────── Cleanup Function ─────────────────────── */
  function cleanup() {
    // Remove all tracked scene objects
    allObjects.forEach((obj) => scene.remove(obj));
    // Remove all tracked lights
    allLights.forEach((l) => {
      // Lights may be children of groups (already removed), but also
      // some are added directly to scene
      if (l.parent === scene) scene.remove(l);
    });
    // Dispose all geometries
    allGeometries.forEach((g) => g.dispose());
    // Dispose all materials
    allMaterials.forEach((m) => m.dispose());
    // Clear scene background
    scene.background = null;
  }

  return { hotspotPositions, cleanup };
}
