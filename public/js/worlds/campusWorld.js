/**
 * campusWorld.js — CIO Simulator Campus / University World
 * Builds a warm, scholarly university IT office with academic character.
 * Features: SIAKAD monitor, smart board, discussion area, academic archive,
 *           campus garden view, globe, graduation cap, trophies, and more.
 */
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   Material Palette — Warm Academic Tones
   ═══════════════════════════════════════════════════════════════ */
function makeMaterials() {
  return {
    // Room
    floor:       new THREE.MeshStandardMaterial({ color: 0xc4a76c, roughness: 0.65, metalness: 0.03 }),
    wall:        new THREE.MeshStandardMaterial({ color: 0xfff3e0, roughness: 0.9, metalness: 0.0 }),
    ceiling:     new THREE.MeshStandardMaterial({ color: 0xfffbf0, roughness: 0.95 }),
    baseboard:   new THREE.MeshStandardMaterial({ color: 0xa0845c, roughness: 0.55, metalness: 0.05 }),
    windowFrame: new THREE.MeshStandardMaterial({ color: 0x8d6e3f, roughness: 0.4, metalness: 0.1 }),
    glass:       new THREE.MeshStandardMaterial({ color: 0xc8e6ff, transparent: true, opacity: 0.15, roughness: 0.05, metalness: 0.2 }),

    // Furniture
    desk:      new THREE.MeshStandardMaterial({ color: 0xa0845c, roughness: 0.45, metalness: 0.03 }),
    deskEdge:  new THREE.MeshStandardMaterial({ color: 0x8b6e40, roughness: 0.4, metalness: 0.05 }),
    metal:     new THREE.MeshStandardMaterial({ color: 0x8d7748, roughness: 0.3, metalness: 0.6 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x5c4a2e, roughness: 0.35, metalness: 0.5 }),
    leather:   new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.55, metalness: 0.05 }),
    chairSeat: new THREE.MeshStandardMaterial({ color: 0x7a5230, roughness: 0.5, metalness: 0.05 }),

    // Electronics
    black:  new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 }),
    screen: new THREE.MeshStandardMaterial({ color: 0x0a1628, emissive: 0x1565c0, emissiveIntensity: 0.5, roughness: 0.2, metalness: 0.3 }),
    screenAmber: new THREE.MeshStandardMaterial({ color: 0x1a1408, emissive: 0xfbbc04, emissiveIntensity: 0.35, roughness: 0.2, metalness: 0.25 }),
    laptopScreen: new THREE.MeshStandardMaterial({ color: 0x0a1020, emissive: 0xfbbc04, emissiveIntensity: 0.4, roughness: 0.2, metalness: 0.25 }),
    phone: new THREE.MeshStandardMaterial({ color: 0x2a2a30, roughness: 0.5, metalness: 0.15 }),

    // Lamp
    lampBrass:     new THREE.MeshStandardMaterial({ color: 0xb8942e, roughness: 0.25, metalness: 0.75 }),
    lampShadeGreen: new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.5, metalness: 0.05, side: THREE.DoubleSide }),

    // Whiteboard / Smart Board
    whiteboard:      new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.25, metalness: 0.05 }),
    whiteboardFrame: new THREE.MeshStandardMaterial({ color: 0x8d6e3f, roughness: 0.4, metalness: 0.15 }),
    projector:       new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.4, metalness: 0.3 }),

    // Props
    mug:      new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.4 }),
    mugInner: new THREE.MeshStandardMaterial({ color: 0x3b2010, roughness: 0.5 }),
    mugLogo:  new THREE.MeshStandardMaterial({ color: 0x1565c0, roughness: 0.4 }),
    plant:    new THREE.MeshStandardMaterial({ color: 0x2d6a27, roughness: 0.8 }),
    plantDark: new THREE.MeshStandardMaterial({ color: 0x1b4d1b, roughness: 0.8 }),
    pot:      new THREE.MeshStandardMaterial({ color: 0xb07040, roughness: 0.65 }),
    potDecor: new THREE.MeshStandardMaterial({ color: 0xd4a060, roughness: 0.6 }),
    soil:     new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.95 }),
    trophy:   new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.15, metalness: 0.9 }),

    // Books & Academic
    book:   (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0.05 }),
    folder: (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 }),

    // Wall Decor
    frame:      new THREE.MeshStandardMaterial({ color: 0x6b4e2e, roughness: 0.4, metalness: 0.1 }),
    frameInner: new THREE.MeshStandardMaterial({ color: 0xfaf0e6, roughness: 0.5 }),
    frameGold:  new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.25, metalness: 0.7 }),
    clockFace:  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }),
    clockRim:   new THREE.MeshStandardMaterial({ color: 0x6b4e2e, roughness: 0.3, metalness: 0.4 }),
    uniBlue:    new THREE.MeshStandardMaterial({ color: 0x1565c0, roughness: 0.4, metalness: 0.1 }),
    accentGold: new THREE.MeshStandardMaterial({ color: 0xfbbc04, roughness: 0.3, metalness: 0.4 }),
    accentGreen: new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.5, metalness: 0.1 }),

    // Bulletin board
    cork: new THREE.MeshStandardMaterial({ color: 0xc49a6c, roughness: 0.9, metalness: 0.0 }),

    // Campus garden
    grass:      new THREE.MeshStandardMaterial({ color: 0x4a8c3f, roughness: 0.9 }),
    grassLight: new THREE.MeshStandardMaterial({ color: 0x6aac5f, roughness: 0.85 }),
    treeTrunk:  new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.8 }),
    foliageDark: new THREE.MeshStandardMaterial({ color: 0x2d6a27, roughness: 0.8 }),
    foliageLight: new THREE.MeshStandardMaterial({ color: 0x4a9e3f, roughness: 0.75 }),
    pathway:    new THREE.MeshStandardMaterial({ color: 0xc4a882, roughness: 0.8 }),
    bench:      new THREE.MeshStandardMaterial({ color: 0x6b4e2e, roughness: 0.6 }),
    fountain:   new THREE.MeshStandardMaterial({ color: 0x9e9e9e, roughness: 0.4, metalness: 0.3 }),
    water:      new THREE.MeshStandardMaterial({ color: 0x64b5f6, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.7 }),
    flowerRed:  new THREE.MeshStandardMaterial({ color: 0xe53935, roughness: 0.7 }),
    flowerYellow: new THREE.MeshStandardMaterial({ color: 0xfdd835, roughness: 0.7 }),
    flowerPink: new THREE.MeshStandardMaterial({ color: 0xf06292, roughness: 0.7 }),
    flowerPurple: new THREE.MeshStandardMaterial({ color: 0xab47bc, roughness: 0.7 }),

    // Globe
    globeOcean: new THREE.MeshStandardMaterial({ color: 0x2196f3, roughness: 0.4, metalness: 0.15 }),
    globeLand:  new THREE.MeshStandardMaterial({ color: 0x4caf50, roughness: 0.6 }),
    globeStand: new THREE.MeshStandardMaterial({ color: 0x8d7748, roughness: 0.3, metalness: 0.6 }),

    // Nameplate
    nameplate:     new THREE.MeshStandardMaterial({ color: 0x8d7748, roughness: 0.25, metalness: 0.65 }),
    nameplateText: new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 }),

    // Discussion area chairs
    chairBlue:   new THREE.MeshStandardMaterial({ color: 0x1565c0, roughness: 0.5, metalness: 0.05 }),
    chairOrange: new THREE.MeshStandardMaterial({ color: 0xe65100, roughness: 0.5, metalness: 0.05 }),
    chairGreen:  new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.5, metalness: 0.05 }),
    chairRed:    new THREE.MeshStandardMaterial({ color: 0xc62828, roughness: 0.5, metalness: 0.05 }),

    // Easel whiteboard
    easelWood: new THREE.MeshStandardMaterial({ color: 0x8b6e40, roughness: 0.6, metalness: 0.0 }),
  };
}

/* ── Geometry Helpers ─────────────────────────────────────────── */

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
   buildCampusWorld — main export
   ═══════════════════════════════════════════════════════════════ */
export function buildCampusWorld(scene) {
  const M = makeMaterials();
  const hotspotPositions = new Map();

  /** Track everything for cleanup */
  const allGroups = [];
  const allGeometries = [];
  const allMaterials = [];
  const allLights = [];

  // Collect all materials for cleanup
  for (const val of Object.values(M)) {
    if (val instanceof THREE.Material) {
      allMaterials.push(val);
    }
  }

  /** Add a group to scene and track it */
  function addGroup(group) {
    scene.add(group);
    allGroups.push(group);
    return group;
  }

  /** Add a light to scene and track it */
  function addLight(light) {
    scene.add(light);
    allLights.push(light);
    return light;
  }

  /** Track dynamically created materials (book/folder lambdas) */
  function trackMat(mat) {
    allMaterials.push(mat);
    return mat;
  }

  // Set scene background
  scene.background = new THREE.Color(0xfff8e1);

  /* ─────────────── 1. Room Shell ──────────────────────────── */
  const roomGroup = new THREE.Group();
  roomGroup.name = 'CampusRoom';

  // Floor — warm light wood parquet
  const floor = plane(6, 6, M.floor);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  roomGroup.add(floor);

  // Parquet pattern lines on floor
  for (let i = -2.5; i <= 2.5; i += 0.5) {
    const line = box(6, 0.002, 0.008, M.deskEdge);
    line.position.set(0, 0.002, i);
    line.receiveShadow = true;
    line.castShadow = false;
    roomGroup.add(line);
  }
  for (let i = -2.5; i <= 2.5; i += 0.5) {
    const line = box(0.008, 0.002, 6, M.deskEdge);
    line.position.set(i, 0.002, 0);
    line.receiveShadow = true;
    line.castShadow = false;
    roomGroup.add(line);
  }

  // Ceiling
  const ceil = plane(6, 6, M.ceiling);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = 3;
  roomGroup.add(ceil);

  // Back wall (Z = -3)
  const backWall = plane(6, 3, M.wall);
  backWall.position.set(0, 1.5, -3);
  roomGroup.add(backWall);

  // Left wall (X = -3)
  const leftWall = plane(6, 3, M.wall);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-3, 1.5, 0);
  roomGroup.add(leftWall);

  // Right wall (X = 3) – with window opening
  const rwLower = plane(6, 0.8, M.wall);
  rwLower.rotation.y = -Math.PI / 2;
  rwLower.position.set(3, 0.4, 0);
  roomGroup.add(rwLower);

  const rwUpper = plane(6, 0.6, M.wall);
  rwUpper.rotation.y = -Math.PI / 2;
  rwUpper.position.set(3, 2.7, 0);
  roomGroup.add(rwUpper);

  const rwSide1 = plane(1.0, 1.6, M.wall);
  rwSide1.rotation.y = -Math.PI / 2;
  rwSide1.position.set(3, 1.6, 2.5);
  roomGroup.add(rwSide1);

  const rwSide2 = plane(1.0, 1.6, M.wall);
  rwSide2.rotation.y = -Math.PI / 2;
  rwSide2.position.set(3, 1.6, -2.5);
  roomGroup.add(rwSide2);

  // Wood baseboards
  const bbThick = 0.05, bbHeight = 0.12;
  const bbBack = box(6, bbHeight, bbThick, M.baseboard);
  bbBack.position.set(0, bbHeight / 2, -2.97);
  roomGroup.add(bbBack);
  const bbLeft = box(bbThick, bbHeight, 6, M.baseboard);
  bbLeft.position.set(-2.97, bbHeight / 2, 0);
  roomGroup.add(bbLeft);
  const bbRight = box(bbThick, bbHeight, 6, M.baseboard);
  bbRight.position.set(2.97, bbHeight / 2, 0);
  roomGroup.add(bbRight);

  // Ceiling recessed light fixtures (visual)
  const lightFixturePositions = [[0, -0.8], [-1.2, 0.8], [1.2, 0.8]];
  for (const [lx, lz] of lightFixturePositions) {
    const fixture = cyl(0.12, 0.12, 0.02, 16, M.metal);
    fixture.position.set(lx, 2.97, lz);
    fixture.castShadow = false;
    roomGroup.add(fixture);
    const fixtureGlow = cyl(0.1, 0.1, 0.01, 16,
      new THREE.MeshStandardMaterial({ color: 0xfff5d0, emissive: 0xffe0a0, emissiveIntensity: 0.8, roughness: 0.3 }));
    trackMat(fixtureGlow.material);
    fixtureGlow.position.set(lx, 2.955, lz);
    fixtureGlow.castShadow = false;
    roomGroup.add(fixtureGlow);
  }

  addGroup(roomGroup);

  /* ─────────────── Window & Campus Garden View ───────────── */
  const windowGroup = new THREE.Group();
  windowGroup.name = 'CampusWindow';

  // Window glass
  const windowGlass = plane(4, 1.6, M.glass);
  windowGlass.rotation.y = -Math.PI / 2;
  windowGlass.position.set(2.98, 1.6, 0);
  windowGroup.add(windowGlass);

  // Wood window frame bars
  const wfMat = M.windowFrame;
  const wHBar = box(0.04, 0.04, 4, wfMat);
  wHBar.position.set(2.99, 1.6, 0);
  windowGroup.add(wHBar);

  for (const vz of [-1.33, 0, 1.33]) {
    const vBar = box(0.04, 1.6, 0.04, wfMat);
    vBar.position.set(2.99, 1.6, vz);
    windowGroup.add(vBar);
  }

  // Frame border
  const wfT = box(0.05, 0.06, 4.1, wfMat); wfT.position.set(2.99, 2.4, 0); windowGroup.add(wfT);
  const wfB = box(0.05, 0.06, 4.1, wfMat); wfB.position.set(2.99, 0.8, 0); windowGroup.add(wfB);
  const wfL = box(0.05, 1.7, 0.06, wfMat); wfL.position.set(2.99, 1.6, 2.03); windowGroup.add(wfL);
  const wfR = box(0.05, 1.7, 0.06, wfMat); wfR.position.set(2.99, 1.6, -2.03); windowGroup.add(wfR);

  // Window sill
  const sill = box(0.15, 0.04, 4.2, M.desk);
  sill.position.set(2.92, 0.8, 0);
  windowGroup.add(sill);

  /* ── Campus Garden Backdrop ─── */
  const gardenGroup = new THREE.Group();
  gardenGroup.name = 'CampusGarden';

  // Green ground
  const gardenGround = plane(8, 6, M.grass);
  gardenGround.rotation.x = -Math.PI / 2;
  gardenGround.position.set(6, -0.05, 0);
  gardenGround.receiveShadow = false;
  gardenGroup.add(gardenGround);

  // Gentle hill
  const hill = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 4),
    M.grassLight
  );
  hill.position.set(7.5, -1.8, -1);
  hill.scale.set(1, 0.3, 1);
  hill.receiveShadow = false;
  hill.castShadow = false;
  gardenGroup.add(hill);

  // Trees (various shapes)
  function makeTree(x, z, trunkH, foliageType, foliageR, foliageMat) {
    const tGroup = new THREE.Group();
    // Trunk
    const trunk = cyl(0.06, 0.08, trunkH, 8, M.treeTrunk);
    trunk.position.set(0, trunkH / 2, 0);
    trunk.castShadow = false;
    tGroup.add(trunk);

    if (foliageType === 'sphere') {
      const foliage = new THREE.Mesh(new THREE.SphereGeometry(foliageR, 10, 10), foliageMat);
      foliage.position.set(0, trunkH + foliageR * 0.6, 0);
      foliage.castShadow = false;
      tGroup.add(foliage);
      // Secondary foliage ball
      const f2 = new THREE.Mesh(new THREE.SphereGeometry(foliageR * 0.7, 8, 8), foliageMat);
      f2.position.set(foliageR * 0.5, trunkH + foliageR * 0.2, foliageR * 0.3);
      f2.castShadow = false;
      tGroup.add(f2);
    } else {
      // Cone / pine
      const foliage = new THREE.Mesh(
        new THREE.ConeGeometry(foliageR, foliageR * 2.5, 8),
        foliageMat
      );
      foliage.position.set(0, trunkH + foliageR * 1.2, 0);
      foliage.castShadow = false;
      tGroup.add(foliage);
    }

    tGroup.position.set(x, 0, z);
    return tGroup;
  }

  gardenGroup.add(makeTree(4.5, -1.5, 1.5, 'sphere', 0.6, M.foliageDark));
  gardenGroup.add(makeTree(5.5, 0.5, 1.8, 'cone', 0.5, M.foliageLight));
  gardenGroup.add(makeTree(6.5, -0.5, 2.0, 'sphere', 0.7, M.foliageDark));
  gardenGroup.add(makeTree(4.8, 1.8, 1.3, 'sphere', 0.5, M.foliageLight));
  gardenGroup.add(makeTree(7.0, 1.2, 1.6, 'cone', 0.4, M.foliageDark));

  // Pathway
  const pathwayMain = box(0.5, 0.02, 3.5, M.pathway);
  pathwayMain.position.set(5.0, 0.01, 0);
  pathwayMain.castShadow = false;
  gardenGroup.add(pathwayMain);

  // Garden bench
  const benchGroup = new THREE.Group();
  const benchSeat = box(0.5, 0.04, 0.2, M.bench);
  benchSeat.position.set(0, 0.35, 0);
  benchGroup.add(benchSeat);
  const benchBack = box(0.5, 0.25, 0.03, M.bench);
  benchBack.position.set(0, 0.5, -0.1);
  benchGroup.add(benchBack);
  for (const bx of [-0.2, 0.2]) {
    const benchLeg = box(0.04, 0.33, 0.04, M.darkMetal);
    benchLeg.position.set(bx, 0.165, 0);
    benchLeg.castShadow = false;
    benchGroup.add(benchLeg);
  }
  benchGroup.position.set(5.5, 0, -1.0);
  benchGroup.rotation.y = 0.3;
  gardenGroup.add(benchGroup);

  // Fountain (cylinder + sphere)
  const fountainGroup = new THREE.Group();
  const fBase = cyl(0.35, 0.4, 0.15, 16, M.fountain);
  fBase.position.set(0, 0.075, 0);
  fBase.castShadow = false;
  fountainGroup.add(fBase);
  const fBasin = cyl(0.3, 0.3, 0.08, 16, M.fountain);
  fBasin.position.set(0, 0.19, 0);
  fBasin.castShadow = false;
  fountainGroup.add(fBasin);
  const fWater = cyl(0.28, 0.28, 0.03, 16, M.water);
  fWater.position.set(0, 0.23, 0);
  fWater.castShadow = false;
  fountainGroup.add(fWater);
  const fPillar = cyl(0.05, 0.06, 0.4, 12, M.fountain);
  fPillar.position.set(0, 0.43, 0);
  fPillar.castShadow = false;
  fountainGroup.add(fPillar);
  const fTop = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), M.fountain);
  fTop.position.set(0, 0.65, 0);
  fTop.castShadow = false;
  fountainGroup.add(fTop);
  fountainGroup.position.set(6.0, 0, 0.5);
  gardenGroup.add(fountainGroup);

  // Flower patches
  const flowerMats = [M.flowerRed, M.flowerYellow, M.flowerPink, M.flowerPurple];
  const flowerPositions = [
    [4.3, 0.8], [4.6, 0.6], [4.2, -0.3],
    [5.8, 1.5], [6.2, -1.2], [6.8, 0.0],
    [5.2, -1.8], [7.0, -0.8],
  ];
  for (let i = 0; i < flowerPositions.length; i++) {
    const [fx, fz] = flowerPositions[i];
    const fPatch = box(0.15 + Math.random() * 0.1, 0.04, 0.15 + Math.random() * 0.1, flowerMats[i % flowerMats.length]);
    fPatch.position.set(fx, 0.03, fz);
    fPatch.castShadow = false;
    gardenGroup.add(fPatch);
  }

  windowGroup.add(gardenGroup);
  addGroup(windowGroup);

  /* ─────────────── 2. IT Manager Desk ────────────────────── */
  const deskGroup = new THREE.Group();
  deskGroup.name = 'ITManagerDesk';

  const deskY = 0.75;
  const deskThick = 0.05;

  // Main desk surface — academic solid wood style
  const deskTop = box(2.0, deskThick, 0.9, M.desk);
  deskTop.position.set(0, deskY, -2.1);
  deskGroup.add(deskTop);

  // Desk edge trim
  const edgeFront = box(2.04, 0.04, 0.04, M.deskEdge);
  edgeFront.position.set(0, deskY - 0.02, -1.64);
  deskGroup.add(edgeFront);
  const edgeBack = box(2.04, 0.04, 0.04, M.deskEdge);
  edgeBack.position.set(0, deskY - 0.02, -2.54);
  deskGroup.add(edgeBack);
  const edgeLeft = box(0.04, 0.04, 0.94, M.deskEdge);
  edgeLeft.position.set(-1.02, deskY - 0.02, -2.1);
  deskGroup.add(edgeLeft);
  const edgeRight = box(0.04, 0.04, 0.94, M.deskEdge);
  edgeRight.position.set(1.02, deskY - 0.02, -2.1);
  deskGroup.add(edgeRight);

  // Desk drawers (left side panel)
  const drawerPanel = box(0.45, 0.55, 0.85, M.desk);
  drawerPanel.position.set(-0.75, deskY - 0.32, -2.1);
  deskGroup.add(drawerPanel);
  // Drawer handles
  for (let di = 0; di < 3; di++) {
    const dHandle = box(0.06, 0.01, 0.015, M.metal);
    dHandle.position.set(-0.75, deskY - 0.1 - di * 0.18, -1.67);
    deskGroup.add(dHandle);
  }

  // Right side panel (modesty)
  const rightPanel = box(0.04, 0.55, 0.85, M.desk);
  rightPanel.position.set(0.98, deskY - 0.32, -2.1);
  deskGroup.add(rightPanel);

  // Desk legs (front visible ones)
  const legH = deskY - deskThick / 2;
  const fLeg1 = box(0.06, legH, 0.06, M.deskEdge);
  fLeg1.position.set(-0.5, legH / 2, -1.66);
  deskGroup.add(fLeg1);
  const fLeg2 = box(0.06, legH, 0.06, M.deskEdge);
  fLeg2.position.set(0.5, legH / 2, -1.66);
  deskGroup.add(fLeg2);

  /* ── SIAKAD Monitor ─── */
  const monitorGroup = new THREE.Group();
  monitorGroup.name = 'SIAKADMonitor';

  // Screen with blue/amber emissive
  const screenMesh = box(0.55, 0.35, 0.02, M.screen);
  screenMesh.position.set(0, 0.3, 0);
  monitorGroup.add(screenMesh);

  // SIAKAD UI accent bars on screen
  const uiBar1 = box(0.50, 0.025, 0.001, M.screenAmber);
  uiBar1.position.set(0, 0.44, 0.012);
  monitorGroup.add(uiBar1);
  const uiBar2 = box(0.30, 0.015, 0.001, M.screenAmber);
  uiBar2.position.set(-0.1, 0.35, 0.012);
  monitorGroup.add(uiBar2);
  for (let ri = 0; ri < 4; ri++) {
    const row = box(0.42, 0.008, 0.001, trackMat(new THREE.MeshStandardMaterial({
      color: 0x1a3a5c, emissive: 0x1565c0, emissiveIntensity: 0.2, roughness: 0.3
    })));
    row.position.set(0, 0.3 - ri * 0.035, 0.012);
    monitorGroup.add(row);
  }

  // Bezel
  const bTop = box(0.58, 0.015, 0.025, M.black); bTop.position.set(0, 0.48, 0); monitorGroup.add(bTop);
  const bBot = box(0.58, 0.02, 0.025, M.black); bBot.position.set(0, 0.12, 0); monitorGroup.add(bBot);
  const bL = box(0.015, 0.37, 0.025, M.black); bL.position.set(-0.29, 0.3, 0); monitorGroup.add(bL);
  const bR = box(0.015, 0.37, 0.025, M.black); bR.position.set(0.29, 0.3, 0); monitorGroup.add(bR);

  // Stand
  const standNeck = box(0.04, 0.12, 0.04, M.metal);
  standNeck.position.set(0, 0.06, 0.03);
  monitorGroup.add(standNeck);
  const standBase = cyl(0.12, 0.12, 0.015, 16, M.metal);
  standBase.position.set(0, 0.0, 0.05);
  monitorGroup.add(standBase);

  monitorGroup.position.set(-0.2, deskY + deskThick / 2, -2.35);
  deskGroup.add(monitorGroup);

  // ★ HOTSPOT: budget_security — near SIAKAD monitor
  hotspotPositions.set('budget_security', new THREE.Vector3(-0.2, deskY + 0.7, -2.35));

  /* ── Keyboard & Mouse ─── */
  const keyboard = box(0.3, 0.01, 0.1, M.black);
  keyboard.position.set(-0.2, deskY + deskThick / 2 + 0.005, -1.95);
  deskGroup.add(keyboard);
  // Key rows detail
  for (let kr = 0; kr < 3; kr++) {
    const keyRow = box(0.26, 0.002, 0.015, trackMat(new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5 })));
    keyRow.position.set(-0.2, deskY + deskThick / 2 + 0.012, -1.92 - kr * 0.025);
    deskGroup.add(keyRow);
  }

  const mouse = box(0.05, 0.015, 0.08, M.black);
  mouse.position.set(0.15, deskY + deskThick / 2 + 0.007, -1.95);
  deskGroup.add(mouse);
  const mousePad = box(0.22, 0.003, 0.18, trackMat(new THREE.MeshStandardMaterial({ color: 0x1565c0, roughness: 0.7 })));
  mousePad.position.set(0.13, deskY + deskThick / 2 + 0.001, -1.95);
  deskGroup.add(mousePad);

  /* ── Campus Phone ─── */
  const phoneGroup = new THREE.Group();
  phoneGroup.name = 'CampusPhone';
  const phoneBody = box(0.13, 0.03, 0.17, M.phone);
  phoneBody.position.set(0, 0.015, 0);
  phoneGroup.add(phoneBody);
  // Handset
  const handset = box(0.035, 0.025, 0.13, M.black);
  handset.position.set(-0.04, 0.035, 0.0);
  phoneGroup.add(handset);
  // Handset ear / mouth pieces
  const earPiece = box(0.04, 0.015, 0.03, M.black);
  earPiece.position.set(-0.04, 0.04, 0.055);
  phoneGroup.add(earPiece);
  const mouthPiece = box(0.04, 0.015, 0.03, M.black);
  mouthPiece.position.set(-0.04, 0.04, -0.055);
  phoneGroup.add(mouthPiece);
  // Buttons
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const btn = box(0.015, 0.005, 0.015, M.darkMetal);
      btn.position.set(0.02 + bc * 0.022, 0.032, -0.03 + br * 0.025);
      phoneGroup.add(btn);
    }
  }
  phoneGroup.position.set(0.6, deskY + deskThick / 2, -2.0);
  deskGroup.add(phoneGroup);

  // ★ HOTSPOT: data_breach — near campus phone
  hotspotPositions.set('data_breach', new THREE.Vector3(0.6, deskY + 0.35, -2.0));

  /* ── Banker's Desk Lamp (green shade + brass) ─── */
  const lampGroup = new THREE.Group();
  lampGroup.name = 'BankersLamp';

  const lampBase = cyl(0.07, 0.08, 0.02, 16, M.lampBrass);
  lampBase.position.set(0, 0.01, 0);
  lampGroup.add(lampBase);

  // Decorative base ring
  const lampRing = cyl(0.065, 0.065, 0.008, 16, M.lampBrass);
  lampRing.position.set(0, 0.025, 0);
  lampGroup.add(lampRing);

  const lampArm = cyl(0.012, 0.012, 0.22, 8, M.lampBrass);
  lampArm.position.set(0, 0.14, 0);
  lampGroup.add(lampArm);

  // Green shade (half cylinder / elongated shape)
  const shadeGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.05, 16, 1, true, 0, Math.PI);
  const shadeMesh = new THREE.Mesh(shadeGeo, M.lampShadeGreen);
  shadeMesh.position.set(0, 0.27, 0.02);
  shadeMesh.rotation.x = Math.PI;
  shadeMesh.castShadow = true;
  lampGroup.add(shadeMesh);
  allGeometries.push(shadeGeo);

  // Shade top cap
  const shadeCap = box(0.16, 0.005, 0.1, M.lampShadeGreen);
  shadeCap.position.set(0, 0.27, 0.02);
  lampGroup.add(shadeCap);

  // Lamp light
  const lampLight = new THREE.PointLight(0xffd699, 0.7, 3, 2);
  lampLight.position.set(0, 0.22, 0.02);
  lampLight.castShadow = true;
  lampLight.shadow.mapSize.set(512, 512);
  lampGroup.add(lampLight);

  lampGroup.position.set(0.7, deskY + deskThick / 2, -2.4);
  deskGroup.add(lampGroup);

  /* ── Nameplate: 'Kepala IT - UBHINUS' ─── */
  const nameplateGroup = new THREE.Group();
  nameplateGroup.name = 'Nameplate';
  const npBase = box(0.18, 0.04, 0.06, M.nameplate);
  npBase.position.set(0, 0.02, 0);
  nameplateGroup.add(npBase);
  // Text representation (thin bar)
  const npText = box(0.14, 0.015, 0.001, M.nameplateText);
  npText.position.set(0, 0.025, 0.031);
  nameplateGroup.add(npText);
  // Second line
  const npText2 = box(0.1, 0.008, 0.001, M.nameplateText);
  npText2.position.set(0, 0.012, 0.031);
  nameplateGroup.add(npText2);
  nameplateGroup.position.set(-0.5, deskY + deskThick / 2, -1.75);
  deskGroup.add(nameplateGroup);

  /* ── Coffee Mug with university logo feel ─── */
  const mugGroup = new THREE.Group();
  mugGroup.name = 'CoffeeMug';
  const mugBody = cyl(0.03, 0.025, 0.08, 12, M.mug);
  mugBody.position.set(0, 0.04, 0);
  mugGroup.add(mugBody);
  // University logo stripe
  const mugStripe = cyl(0.031, 0.026, 0.015, 12, M.mugLogo);
  mugStripe.position.set(0, 0.035, 0);
  mugGroup.add(mugStripe);
  // Coffee inside
  const coffee = cyl(0.025, 0.025, 0.01, 12, M.mugInner);
  coffee.position.set(0, 0.075, 0);
  mugGroup.add(coffee);
  // Handle
  const handleGeo = new THREE.TorusGeometry(0.02, 0.005, 6, 10, Math.PI);
  const handleMesh = new THREE.Mesh(handleGeo, M.mug);
  handleMesh.position.set(0.03, 0.04, 0);
  handleMesh.rotation.y = Math.PI / 2;
  handleMesh.rotation.z = Math.PI / 2;
  handleMesh.castShadow = true;
  mugGroup.add(handleMesh);
  allGeometries.push(handleGeo);
  mugGroup.position.set(-0.7, deskY + deskThick / 2, -1.85);
  deskGroup.add(mugGroup);

  /* ── Small stack of papers ─── */
  for (let pi = 0; pi < 4; pi++) {
    const paper = box(0.18, 0.003, 0.24, trackMat(new THREE.MeshStandardMaterial({
      color: 0xfafafa, roughness: 0.8
    })));
    paper.position.set(0.35, deskY + deskThick / 2 + 0.003 + pi * 0.004, -2.35);
    paper.rotation.y = (pi - 1.5) * 0.02;
    deskGroup.add(paper);
  }

  /* ── Stack of textbooks on desk ─── */
  const textbookColors = [0x8B0000, 0x1565c0, 0x2e7d32];
  for (let ti = 0; ti < textbookColors.length; ti++) {
    const tb = box(0.15, 0.03, 0.2, trackMat(M.book(textbookColors[ti])));
    tb.position.set(-0.8, deskY + deskThick / 2 + 0.015 + ti * 0.032, -2.25);
    tb.rotation.y = (ti - 1) * 0.05;
    deskGroup.add(tb);
  }

  // Monitor glow
  const monitorGlow = new THREE.PointLight(0x1565c0, 0.25, 2, 2);
  monitorGlow.position.set(-0.2, deskY + 0.5, -2.2);
  deskGroup.add(monitorGlow);

  // Amber accent glow (SIAKAD)
  const amberGlow = new THREE.PointLight(0xfbbc04, 0.15, 1.5, 2);
  amberGlow.position.set(-0.2, deskY + 0.3, -2.3);
  deskGroup.add(amberGlow);

  addGroup(deskGroup);

  /* ─────────────── 3. Office Chair (warm brown leather) ──── */
  const chairGroup = new THREE.Group();
  chairGroup.name = 'ITChair';

  const seat = cyl(0.22, 0.22, 0.06, 16, M.chairSeat);
  seat.position.set(0, 0.48, 0);
  chairGroup.add(seat);

  const backRest = box(0.4, 0.5, 0.04, M.leather);
  backRest.position.set(0, 0.78, -0.2);
  backRest.rotation.x = -0.1;
  chairGroup.add(backRest);

  // Back cushion stitching detail
  const cushionDetail = box(0.34, 0.12, 0.03, M.chairSeat);
  cushionDetail.position.set(0, 0.7, -0.17);
  chairGroup.add(cushionDetail);
  const cushionDetail2 = box(0.34, 0.12, 0.025, M.chairSeat);
  cushionDetail2.position.set(0, 0.85, -0.19);
  chairGroup.add(cushionDetail2);

  // Arm rests
  for (const side of [-1, 1]) {
    const armBase = box(0.04, 0.15, 0.04, M.darkMetal);
    armBase.position.set(side * 0.2, 0.55, -0.05);
    chairGroup.add(armBase);
    const armPad = box(0.06, 0.025, 0.2, M.leather);
    armPad.position.set(side * 0.2, 0.63, -0.05);
    chairGroup.add(armPad);
  }

  // Column
  const chairCol = cyl(0.03, 0.03, 0.25, 8, M.metal);
  chairCol.position.set(0, 0.32, 0);
  chairGroup.add(chairCol);

  // 5-star base
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const arm = box(0.2, 0.02, 0.03, M.darkMetal);
    arm.position.set(Math.cos(angle) * 0.1, 0.18, Math.sin(angle) * 0.1);
    arm.rotation.y = -angle;
    chairGroup.add(arm);
    const wheel = cyl(0.015, 0.015, 0.02, 8, M.black);
    wheel.position.set(Math.cos(angle) * 0.2, 0.17, Math.sin(angle) * 0.2);
    wheel.rotation.z = Math.PI / 2;
    chairGroup.add(wheel);
  }

  chairGroup.position.set(0, 0, -1.3);
  chairGroup.rotation.y = 0.1;
  addGroup(chairGroup);

  /* ─────────────── 4. Side Table (right side) ────────────── */
  const sideTableGroup = new THREE.Group();
  sideTableGroup.name = 'SideTable';

  // Table top
  const stTop = box(0.8, 0.04, 0.45, M.desk);
  stTop.position.set(0, 0.55, 0);
  sideTableGroup.add(stTop);

  // Legs
  for (const [sx, sz] of [[-0.35, -0.18], [0.35, -0.18], [-0.35, 0.18], [0.35, 0.18]]) {
    const stLeg = box(0.04, 0.53, 0.04, M.deskEdge);
    stLeg.position.set(sx, 0.265, sz);
    sideTableGroup.add(stLeg);
  }

  // Shelf below
  const stShelf = box(0.7, 0.02, 0.38, M.desk);
  stShelf.position.set(0, 0.2, 0);
  sideTableGroup.add(stShelf);

  /* ── Student Laptop ─── */
  const laptopGroup = new THREE.Group();
  laptopGroup.name = 'StudentLaptop';
  const lapBase = box(0.28, 0.012, 0.2, M.darkMetal);
  lapBase.position.set(0, 0.006, 0);
  laptopGroup.add(lapBase);
  const lapScreen = box(0.26, 0.18, 0.008, M.laptopScreen);
  lapScreen.position.set(0, 0.1, -0.09);
  lapScreen.rotation.x = -0.3;
  laptopGroup.add(lapScreen);
  const lapBezel = box(0.28, 0.2, 0.003, M.black);
  lapBezel.position.set(0, 0.099, -0.091);
  lapBezel.rotation.x = -0.3;
  laptopGroup.add(lapBezel);
  // Keyboard area
  const lapKeys = box(0.2, 0.002, 0.1, M.black);
  lapKeys.position.set(0, 0.013, 0.02);
  laptopGroup.add(lapKeys);
  // Trackpad
  const trackpad = box(0.06, 0.001, 0.04, trackMat(new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.3, metalness: 0.2 })));
  trackpad.position.set(0, 0.013, 0.07);
  laptopGroup.add(trackpad);

  laptopGroup.position.set(-0.15, 0.57, 0.0);
  sideTableGroup.add(laptopGroup);

  // ★ HOTSPOT: phishing — near student laptop
  hotspotPositions.set('phishing', new THREE.Vector3(1.65, 1.15, -1.2));

  /* ── Academic Folders ─── */
  const folderColors = [0x1565c0, 0xc62828, 0x2e7d32, 0xfbbc04];
  for (let fi = 0; fi < folderColors.length; fi++) {
    const f = box(0.22, 0.008, 0.3, trackMat(M.folder(folderColors[fi])));
    f.position.set(0.22, 0.57 + fi * 0.01, 0.0);
    f.rotation.y = (fi - 1.5) * 0.04;
    sideTableGroup.add(f);
  }

  /* ── Globe (signature academic prop) ─── */
  const globeGroup = new THREE.Group();
  globeGroup.name = 'Globe';

  // Stand base
  const globeStandBase = cyl(0.05, 0.06, 0.015, 12, M.globeStand);
  globeStandBase.position.set(0, 0.007, 0);
  globeGroup.add(globeStandBase);

  // Stand arm (arc)
  const globeArm = cyl(0.008, 0.008, 0.16, 8, M.globeStand);
  globeArm.position.set(0, 0.095, 0);
  globeGroup.add(globeArm);

  // Meridian ring
  const meridianGeo = new THREE.TorusGeometry(0.055, 0.004, 8, 24);
  const meridianMesh = new THREE.Mesh(meridianGeo, M.globeStand);
  meridianMesh.position.set(0, 0.175, 0);
  meridianMesh.rotation.x = Math.PI / 12;
  meridianMesh.castShadow = true;
  globeGroup.add(meridianMesh);
  allGeometries.push(meridianGeo);

  // Globe sphere (ocean)
  const globeSphere = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), M.globeOcean);
  globeSphere.position.set(0, 0.175, 0);
  globeSphere.castShadow = true;
  globeGroup.add(globeSphere);

  // Land masses (small boxes positioned on sphere surface)
  const landPositions = [
    [0.035, 0.19, 0.02], [-0.02, 0.2, 0.03], [0.01, 0.16, -0.04],
    [-0.03, 0.175, -0.03], [0.04, 0.175, -0.01],
  ];
  for (const [lx, ly, lz] of landPositions) {
    const land = box(0.015, 0.012, 0.015, M.globeLand);
    land.position.set(lx, ly, lz);
    land.castShadow = false;
    globeGroup.add(land);
  }

  globeGroup.position.set(-0.3, 0.57, 0.08);
  sideTableGroup.add(globeGroup);

  sideTableGroup.position.set(1.8, 0, -1.2);
  addGroup(sideTableGroup);

  /* ─────────────── 5. Smart Board / Projector Screen ─────── */
  const boardGroup = new THREE.Group();
  boardGroup.name = 'SmartBoard';

  // Large white board
  const board = box(1.4, 0.9, 0.02, M.whiteboard);
  board.position.set(0, 0, 0);
  boardGroup.add(board);

  // Wood frame
  const bfT = box(1.44, 0.04, 0.04, M.whiteboardFrame); bfT.position.set(0, 0.47, 0); boardGroup.add(bfT);
  const bfB = box(1.44, 0.04, 0.04, M.whiteboardFrame); bfB.position.set(0, -0.47, 0); boardGroup.add(bfB);
  const bfL = box(0.04, 0.98, 0.04, M.whiteboardFrame); bfL.position.set(-0.72, 0, 0); boardGroup.add(bfL);
  const bfR = box(0.04, 0.98, 0.04, M.whiteboardFrame); bfR.position.set(0.72, 0, 0); boardGroup.add(bfR);

  // Marker tray at bottom
  const markerTray = box(0.6, 0.03, 0.07, M.whiteboardFrame);
  markerTray.position.set(0, -0.5, 0.04);
  boardGroup.add(markerTray);

  // Markers on tray (3 colors)
  const markerColors = [0x222222, 0xc62828, 0x1565c0];
  for (let mi = 0; mi < markerColors.length; mi++) {
    const marker = cyl(0.008, 0.008, 0.1, 6, trackMat(M.book(markerColors[mi])));
    marker.rotation.z = Math.PI / 2;
    marker.position.set(-0.12 + mi * 0.12, -0.48, 0.045);
    boardGroup.add(marker);
  }

  // Projector shelf above
  const projShelf = box(0.3, 0.03, 0.2, M.whiteboardFrame);
  projShelf.position.set(0, 0.65, 0.05);
  boardGroup.add(projShelf);

  // Small projector on shelf
  const projBody = box(0.2, 0.08, 0.15, M.projector);
  projBody.position.set(0, 0.72, 0.05);
  boardGroup.add(projBody);
  // Projector lens
  const projLens = cyl(0.02, 0.02, 0.03, 12, M.black);
  projLens.rotation.z = Math.PI / 2;
  projLens.position.set(0, 0.7, 0.13);
  boardGroup.add(projLens);

  // Content on board — diagram lines
  for (let li = 0; li < 5; li++) {
    const diagLine = box(0.4 + Math.random() * 0.5, 0.005, 0.001,
      trackMat(new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.5 })));
    diagLine.position.set(-0.1, 0.25 - li * 0.12, 0.012);
    boardGroup.add(diagLine);
  }
  // A small box diagram
  const diagBox = box(0.12, 0.08, 0.001, trackMat(new THREE.MeshStandardMaterial({ color: 0x1565c0, roughness: 0.4 })));
  diagBox.position.set(0.35, 0.1, 0.012);
  boardGroup.add(diagBox);

  boardGroup.position.set(-2.96, 1.6, 0.3);
  boardGroup.rotation.y = Math.PI / 2;
  addGroup(boardGroup);

  // ★ HOTSPOT: new_tech — in front of smart board
  hotspotPositions.set('new_tech', new THREE.Vector3(-2.4, 2.0, 0.3));

  /* ─────────────── 6. Discussion Area (front-left) ───────── */
  const discussGroup = new THREE.Group();
  discussGroup.name = 'DiscussionArea';

  // Round wood table
  const dTableTop = cyl(0.45, 0.45, 0.035, 24, M.desk);
  dTableTop.position.set(0, 0.72, 0);
  discussGroup.add(dTableTop);

  const dTableLeg = cyl(0.04, 0.06, 0.68, 12, M.deskEdge);
  dTableLeg.position.set(0, 0.35, 0);
  discussGroup.add(dTableLeg);

  const dTableBase = cyl(0.2, 0.2, 0.025, 16, M.deskEdge);
  dTableBase.position.set(0, 0.012, 0);
  discussGroup.add(dTableBase);

  // Colorful chairs (4 different colors — youthful campus feel)
  const chairMats = [M.chairBlue, M.chairOrange, M.chairGreen, M.chairRed];
  for (let ci = 0; ci < 4; ci++) {
    const angle = (ci / 4) * Math.PI * 2 + Math.PI / 4;
    const dist = 0.7;
    const mChair = new THREE.Group();

    // Seat (colored)
    const mSeat = cyl(0.14, 0.14, 0.04, 12, chairMats[ci]);
    mSeat.position.set(0, 0.45, 0);
    mChair.add(mSeat);

    // Back (colored)
    const mBack = box(0.24, 0.28, 0.025, chairMats[ci]);
    mBack.position.set(0, 0.64, -0.13);
    mBack.rotation.x = -0.08;
    mChair.add(mBack);

    // Metal legs
    for (const [lx, lz] of [[-0.08, 0.06], [0.08, 0.06], [-0.08, -0.08], [0.08, -0.08]]) {
      const mLeg = cyl(0.01, 0.01, 0.43, 6, M.metal);
      mLeg.position.set(lx, 0.215, lz);
      mChair.add(mLeg);
    }

    mChair.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
    mChair.lookAt(new THREE.Vector3(0, 0.5, 0).add(discussGroup.position));
    // Reset the lookAt to only affect Y rotation
    mChair.rotation.x = 0;
    mChair.rotation.z = 0;
    discussGroup.add(mChair);
  }

  // Small whiteboard on easel stand
  const easelGroup = new THREE.Group();
  easelGroup.name = 'EaselWhiteboard';

  // Easel legs
  const easelLeg1 = cyl(0.015, 0.015, 1.2, 6, M.easelWood);
  easelLeg1.position.set(-0.12, 0.6, -0.15);
  easelLeg1.rotation.x = 0.1;
  easelGroup.add(easelLeg1);
  const easelLeg2 = cyl(0.015, 0.015, 1.2, 6, M.easelWood);
  easelLeg2.position.set(0.12, 0.6, -0.15);
  easelLeg2.rotation.x = 0.1;
  easelGroup.add(easelLeg2);
  const easelBackLeg = cyl(0.015, 0.015, 1.0, 6, M.easelWood);
  easelBackLeg.position.set(0, 0.5, 0.2);
  easelBackLeg.rotation.x = -0.25;
  easelGroup.add(easelBackLeg);

  // Small whiteboard on easel
  const easelBoard = box(0.5, 0.35, 0.015, M.whiteboard);
  easelBoard.position.set(0, 1.0, -0.1);
  easelGroup.add(easelBoard);
  const easelFrame = box(0.52, 0.37, 0.005, M.whiteboardFrame);
  easelFrame.position.set(0, 1.0, -0.11);
  easelGroup.add(easelFrame);

  // Easel tray
  const easelTray = box(0.3, 0.015, 0.03, M.easelWood);
  easelTray.position.set(0, 0.82, -0.08);
  easelGroup.add(easelTray);

  easelGroup.position.set(1.0, 0, 0.3);
  discussGroup.add(easelGroup);

  discussGroup.position.set(-1.8, 0, 1.0);
  addGroup(discussGroup);

  // ★ HOTSPOT: outsourcing — above discussion table
  hotspotPositions.set('outsourcing', new THREE.Vector3(-1.8, 1.2, 1.0));

  /* ─────────────── 7. Academic Archive / Bookshelf ───────── */
  const shelfGroup = new THREE.Group();
  shelfGroup.name = 'AcademicArchive';

  const shelfW = 1.1, shelfH = 2.3, shelfD = 0.32;

  // Sides
  const shSideL = box(0.035, shelfH, shelfD, M.desk);
  shSideL.position.set(-shelfW / 2, shelfH / 2, 0);
  shelfGroup.add(shSideL);
  const shSideR = box(0.035, shelfH, shelfD, M.desk);
  shSideR.position.set(shelfW / 2, shelfH / 2, 0);
  shelfGroup.add(shSideR);
  // Top
  const shTopCap = box(shelfW + 0.04, 0.035, shelfD + 0.02, M.desk);
  shTopCap.position.set(0, shelfH + 0.017, 0);
  shelfGroup.add(shTopCap);
  // Back
  const shBack = box(shelfW, shelfH, 0.012, M.deskEdge);
  shBack.position.set(0, shelfH / 2, -shelfD / 2 + 0.006);
  shelfGroup.add(shBack);
  // Crown molding
  const shCrown = box(shelfW + 0.06, 0.04, 0.04, M.deskEdge);
  shCrown.position.set(0, shelfH + 0.04, shelfD / 2 - 0.02);
  shelfGroup.add(shCrown);

  // Shelves (5 levels)
  const shelfLevels = [0.0, 0.45, 0.9, 1.35, 1.8];
  for (const sy of shelfLevels) {
    const shelf = box(shelfW, 0.025, shelfD, M.desk);
    shelf.position.set(0, sy, 0);
    shelfGroup.add(shelf);
  }

  // LOTS of books (this is a university — many more books!)
  const bookColors = [
    0x8B0000, 0x00008B, 0x006400, 0x8B4513, 0x4B0082,
    0xB8860B, 0x2F4F4F, 0x8B008B, 0xCD853F, 0x191970,
    0x556B2F, 0x800020, 0x1C1C1C, 0x4169E1, 0xA0522D,
    0x1565c0, 0x2e7d32, 0xc62828, 0xe65100, 0x6a1b9a,
  ];

  function addBooksToShelf(shelfY, count, offsetX) {
    let x = offsetX - (shelfW / 2 - 0.06);
    for (let i = 0; i < count; i++) {
      const bh = 0.14 + Math.random() * 0.18;
      const bw = 0.018 + Math.random() * 0.014;
      const bd = 0.18 + Math.random() * 0.08;
      const bookMat = trackMat(M.book(bookColors[(i * 3 + Math.floor(shelfY * 11)) % bookColors.length]));
      const bk = box(bw, bh, bd, bookMat);
      bk.position.set(x + bw / 2, shelfY + 0.025 + bh / 2, 0.0);
      bk.rotation.y = (Math.random() - 0.5) * 0.03;
      // Some books lean slightly
      if (Math.random() > 0.8) bk.rotation.z = (Math.random() - 0.5) * 0.08;
      shelfGroup.add(bk);
      x += bw + 0.004;
    }
    return x;
  }

  addBooksToShelf(0.0, 12, 0);
  addBooksToShelf(0.45, 10, 0.02);
  addBooksToShelf(0.9, 11, 0);

  // Academic journals (thin, uniform — shelf level 3)
  const journalColors = [0x1565c0, 0x1565c0, 0x2e7d32, 0x2e7d32, 0xc62828, 0xc62828];
  let jx = -(shelfW / 2 - 0.06);
  for (let ji = 0; ji < journalColors.length; ji++) {
    const journal = box(0.008, 0.22, 0.2, trackMat(M.book(journalColors[ji])));
    journal.position.set(jx + 0.004, 1.35 + 0.025 + 0.11, 0.0);
    shelfGroup.add(journal);
    jx += 0.013;
  }

  // Thesis binders (labeled-looking — also on shelf level 3)
  const binderColors = [0x222266, 0x226622, 0x662222, 0x664400];
  for (let bi = 0; bi < binderColors.length; bi++) {
    const binder = box(0.05, 0.24, 0.22, trackMat(M.book(binderColors[bi])));
    binder.position.set(0.1 + bi * 0.065, 1.35 + 0.025 + 0.12, 0.0);
    shelfGroup.add(binder);
    // Label
    const label = box(0.035, 0.05, 0.001, M.frameInner);
    label.position.set(0.1 + bi * 0.065, 1.35 + 0.025 + 0.15, 0.112);
    shelfGroup.add(label);
  }

  // More books on shelf level 4
  addBooksToShelf(1.8, 8, 0.1);

  /* ── Trophies / Piala Lomba on top shelf area ─── */
  // Trophy 1 — tall gold trophy
  const trophy1 = new THREE.Group();
  const t1Base = cyl(0.035, 0.04, 0.02, 12, M.darkMetal);
  t1Base.position.set(0, 0.01, 0);
  trophy1.add(t1Base);
  const t1Stem = cyl(0.008, 0.012, 0.08, 8, M.trophy);
  t1Stem.position.set(0, 0.06, 0);
  trophy1.add(t1Stem);
  const t1Cup = cyl(0.03, 0.012, 0.04, 12, M.trophy);
  t1Cup.position.set(0, 0.12, 0);
  trophy1.add(t1Cup);
  const t1Star = new THREE.Mesh(new THREE.OctahedronGeometry(0.015, 0), M.trophy);
  t1Star.position.set(0, 0.15, 0);
  t1Star.castShadow = true;
  trophy1.add(t1Star);
  trophy1.position.set(-0.35, shelfH + 0.035, 0);
  shelfGroup.add(trophy1);

  // Trophy 2 — smaller
  const trophy2 = new THREE.Group();
  const t2Base = cyl(0.03, 0.035, 0.015, 12, M.darkMetal);
  t2Base.position.set(0, 0.007, 0);
  trophy2.add(t2Base);
  const t2Stem = cyl(0.006, 0.01, 0.06, 8, M.trophy);
  t2Stem.position.set(0, 0.045, 0);
  trophy2.add(t2Stem);
  const t2Top = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), M.trophy);
  t2Top.position.set(0, 0.085, 0);
  t2Top.castShadow = true;
  trophy2.add(t2Top);
  trophy2.position.set(-0.2, shelfH + 0.035, 0);
  shelfGroup.add(trophy2);

  // Trophy 3 — plaque style
  const trophy3 = new THREE.Group();
  const t3Plaque = box(0.06, 0.08, 0.015, M.trophy);
  t3Plaque.position.set(0, 0.04, 0);
  trophy3.add(t3Plaque);
  const t3Inner = box(0.045, 0.06, 0.001, M.darkMetal);
  t3Inner.position.set(0, 0.04, 0.009);
  trophy3.add(t3Inner);
  trophy3.position.set(0.0, shelfH + 0.035, 0.05);
  shelfGroup.add(trophy3);

  /* ── Graduation Cap (mortarboard) ─── */
  const gradCapGroup = new THREE.Group();
  gradCapGroup.name = 'GraduationCap';

  // Flat square top
  const capTop = box(0.08, 0.005, 0.08, M.black);
  capTop.position.set(0, 0.04, 0);
  gradCapGroup.add(capTop);

  // Dome/skull cap
  const capDome = cyl(0.03, 0.035, 0.03, 12, M.black);
  capDome.position.set(0, 0.02, 0);
  gradCapGroup.add(capDome);

  // Button on top
  const capButton = cyl(0.005, 0.005, 0.008, 8, M.accentGold);
  capButton.position.set(0, 0.047, 0);
  gradCapGroup.add(capButton);

  // Tassel (hanging cord)
  const tassel1 = cyl(0.003, 0.003, 0.05, 4, M.accentGold);
  tassel1.position.set(0.04, 0.02, 0.04);
  tassel1.rotation.z = 0.4;
  gradCapGroup.add(tassel1);
  const tasselEnd = cyl(0.006, 0.004, 0.015, 6, M.accentGold);
  tasselEnd.position.set(0.06, -0.01, 0.04);
  gradCapGroup.add(tasselEnd);

  gradCapGroup.position.set(0.3, shelfH + 0.035, 0);
  shelfGroup.add(gradCapGroup);

  shelfGroup.position.set(1.8, 0, -2.65);
  addGroup(shelfGroup);

  // ★ HOTSPOT: compliance_audit — near academic archive
  hotspotPositions.set('compliance_audit', new THREE.Vector3(1.8, 1.8, -2.65));

  /* ─────────────── 8. Campus-specific Wall Decor ─────────── */
  const decorGroup = new THREE.Group();
  decorGroup.name = 'WallDecor';

  /* ── University Logo / Crest (shield shape) on back wall ─── */
  const crestGroup = new THREE.Group();
  crestGroup.name = 'UniversityCrest';

  // Shield shape (hexagon approximation)
  const shieldGeo = new THREE.CylinderGeometry(0.18, 0.12, 0.02, 6);
  const shieldMesh = new THREE.Mesh(shieldGeo, M.uniBlue);
  shieldMesh.rotation.x = Math.PI / 2;
  shieldMesh.castShadow = true;
  crestGroup.add(shieldMesh);
  allGeometries.push(shieldGeo);

  // Gold border ring
  const crestRingGeo = new THREE.RingGeometry(0.15, 0.19, 6);
  const crestRing = new THREE.Mesh(crestRingGeo, M.accentGold);
  crestRing.position.z = 0.012;
  crestGroup.add(crestRing);
  allGeometries.push(crestRingGeo);

  // Inner emblem (star)
  const emblemGeo = new THREE.OctahedronGeometry(0.04, 0);
  const emblem = new THREE.Mesh(emblemGeo, M.accentGold);
  emblem.position.z = 0.013;
  emblem.rotation.z = Math.PI / 4;
  emblem.scale.set(1, 1, 0.3);
  crestGroup.add(emblem);

  // Frame
  const crestFrame = box(0.5, 0.5, 0.02, M.frame);
  crestFrame.position.z = -0.005;
  crestGroup.add(crestFrame);

  crestGroup.position.set(-0.8, 2.2, -2.96);
  decorGroup.add(crestGroup);

  /* ── 'Visi Misi' Frame ─── */
  const vmFrame = new THREE.Group();
  const vmOuter = box(0.4, 0.3, 0.015, M.frame);
  vmFrame.add(vmOuter);
  const vmInner = box(0.34, 0.24, 0.012, M.frameInner);
  vmInner.position.z = 0.005;
  vmFrame.add(vmInner);
  // Title bar
  const vmTitle = box(0.2, 0.02, 0.001, trackMat(new THREE.MeshStandardMaterial({ color: 0x1565c0, roughness: 0.4 })));
  vmTitle.position.set(0, 0.08, 0.012);
  vmFrame.add(vmTitle);
  // Text lines
  for (let vl = 0; vl < 4; vl++) {
    const vLine = box(0.25 - vl * 0.02, 0.005, 0.001, trackMat(new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.5 })));
    vLine.position.set(0, 0.04 - vl * 0.028, 0.012);
    vmFrame.add(vLine);
  }
  vmFrame.position.set(0.1, 2.2, -2.96);
  decorGroup.add(vmFrame);

  /* ── Accreditation Banner (vertical, gold/blue) ─── */
  const accredFrame = new THREE.Group();
  const accOuter = box(0.15, 0.35, 0.012, M.frameGold);
  accredFrame.add(accOuter);
  const accInner = box(0.12, 0.3, 0.01, M.uniBlue);
  accInner.position.z = 0.004;
  accredFrame.add(accInner);
  // "A" accreditation
  const accA = box(0.05, 0.06, 0.001, M.accentGold);
  accA.position.set(0, 0.05, 0.01);
  accredFrame.add(accA);
  // Star below
  const accStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.015, 0), M.accentGold);
  accStar.position.set(0, -0.05, 0.01);
  accStar.rotation.z = Math.PI / 4;
  accStar.scale.set(1, 1, 0.3);
  accredFrame.add(accStar);
  accredFrame.position.set(0.55, 2.15, -2.96);
  decorGroup.add(accredFrame);

  /* ── Academic Calendar (poster) ─── */
  const calFrame = new THREE.Group();
  const calOuter = box(0.35, 0.45, 0.012, M.frame);
  calFrame.add(calOuter);
  const calInner = box(0.3, 0.4, 0.01, M.frameInner);
  calInner.position.z = 0.004;
  calFrame.add(calInner);
  // Calendar grid lines
  for (let cr = 0; cr < 5; cr++) {
    const cRow = box(0.26, 0.003, 0.001, trackMat(new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.5 })));
    cRow.position.set(0, 0.1 - cr * 0.06, 0.012);
    calFrame.add(cRow);
  }
  for (let cc = 0; cc < 6; cc++) {
    const cCol = box(0.003, 0.28, 0.001, trackMat(new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.5 })));
    cCol.position.set(-0.11 + cc * 0.045, -0.03, 0.012);
    calFrame.add(cCol);
  }
  // Title
  const calTitle = box(0.18, 0.015, 0.001, M.uniBlue);
  calTitle.position.set(0, 0.17, 0.012);
  calFrame.add(calTitle);
  calFrame.position.set(-0.8, 1.5, -2.96);
  calFrame.rotation.y = 0;
  decorGroup.add(calFrame);

  /* ── Graduation Photo Frame ─── */
  const gradPhoto = new THREE.Group();
  const gpOuter = box(0.2, 0.25, 0.015, M.frame);
  gradPhoto.add(gpOuter);
  const gpInner = box(0.16, 0.2, 0.012, trackMat(new THREE.MeshStandardMaterial({ color: 0xe8d5b7, roughness: 0.5 })));
  gpInner.position.z = 0.005;
  gradPhoto.add(gpInner);
  // Silhouette (simple figure representation)
  const gpFigure = box(0.04, 0.08, 0.001, trackMat(new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.5 })));
  gpFigure.position.set(0, -0.02, 0.012);
  gradPhoto.add(gpFigure);
  const gpHead = cyl(0.015, 0.015, 0.005, 8, trackMat(new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.5 })));
  gpHead.rotation.x = Math.PI / 2;
  gpHead.position.set(0, 0.04, 0.012);
  gradPhoto.add(gpHead);
  gradPhoto.position.set(0.4, 1.55, -2.96);
  decorGroup.add(gradPhoto);

  /* ── Wall Clock ─── */
  const clockGroup = new THREE.Group();
  clockGroup.name = 'WallClock';
  const clockBody = cyl(0.13, 0.13, 0.03, 24, M.clockRim);
  clockBody.rotation.x = Math.PI / 2;
  clockGroup.add(clockBody);
  const cFace = new THREE.Mesh(new THREE.CircleGeometry(0.11, 24), M.clockFace);
  cFace.position.z = 0.016;
  clockGroup.add(cFace);
  // Hour markers
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const tickLen = i % 3 === 0 ? 0.018 : 0.01;
    const tick = box(0.004, tickLen, 0.002, M.black);
    tick.position.set(Math.sin(a) * 0.09, Math.cos(a) * 0.09, 0.017);
    tick.rotation.z = -a;
    clockGroup.add(tick);
  }
  // Hands
  const hourHand = box(0.005, 0.055, 0.002, M.black);
  hourHand.position.set(0.01, 0.023, 0.018);
  hourHand.rotation.z = -0.8;
  clockGroup.add(hourHand);
  const minHand = box(0.003, 0.075, 0.002, M.darkMetal);
  minHand.position.set(-0.015, 0.032, 0.019);
  minHand.rotation.z = 0.4;
  clockGroup.add(minHand);
  const centerDot = cyl(0.006, 0.006, 0.005, 8, M.accentGold);
  centerDot.rotation.x = Math.PI / 2;
  centerDot.position.z = 0.019;
  clockGroup.add(centerDot);
  clockGroup.position.set(0.8, 2.3, -2.96);
  decorGroup.add(clockGroup);

  /* ── Campus Map / Poster on left wall ─── */
  const mapFrame = new THREE.Group();
  const mapOuter = box(0.4, 0.3, 0.012, M.frame);
  mapFrame.add(mapOuter);
  const mapInner = box(0.34, 0.24, 0.01, trackMat(new THREE.MeshStandardMaterial({ color: 0xe8f5e9, roughness: 0.5 })));
  mapInner.position.z = 0.004;
  mapFrame.add(mapInner);
  // Building blocks on map
  for (let mb = 0; mb < 5; mb++) {
    const mapBldg = box(0.04 + Math.random() * 0.03, 0.03 + Math.random() * 0.02, 0.001,
      trackMat(new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.5 })));
    mapBldg.position.set(-0.1 + Math.random() * 0.2, -0.05 + Math.random() * 0.15, 0.012);
    mapFrame.add(mapBldg);
  }
  // Paths on map
  const mapPath1 = box(0.2, 0.004, 0.001, trackMat(new THREE.MeshStandardMaterial({ color: 0xbcaaa4, roughness: 0.5 })));
  mapPath1.position.set(0, 0, 0.012);
  mapFrame.add(mapPath1);
  mapFrame.rotation.y = Math.PI / 2;
  mapFrame.position.set(-2.96, 1.5, -0.8);
  decorGroup.add(mapFrame);

  addGroup(decorGroup);

  /* ─────────────── 9. Campus Props ────────────────────────── */
  const propsGroup = new THREE.Group();
  propsGroup.name = 'CampusProps';

  /* ── Large Potted Plant (decorative pot) ─── */
  const bigPlant = new THREE.Group();
  bigPlant.name = 'BigPlant';

  const bPot = cyl(0.14, 0.11, 0.25, 12, M.pot);
  bPot.position.set(0, 0.125, 0);
  bigPlant.add(bPot);
  // Decorative band
  const potBand = cyl(0.145, 0.145, 0.025, 12, M.potDecor);
  potBand.position.set(0, 0.1, 0);
  bigPlant.add(potBand);
  const bPotRim = cyl(0.15, 0.14, 0.03, 12, M.pot);
  bPotRim.position.set(0, 0.26, 0);
  bigPlant.add(bPotRim);
  const bSoil = cyl(0.12, 0.12, 0.02, 12, M.soil);
  bSoil.position.set(0, 0.27, 0);
  bigPlant.add(bSoil);

  // Trunk
  const trunk = cyl(0.025, 0.035, 0.55, 8, trackMat(M.book(0x5c3a21)));
  trunk.position.set(0, 0.55, 0);
  trunk.rotation.z = 0.04;
  bigPlant.add(trunk);

  // Large foliage
  const foliagePositions = [
    [0, 0.9, 0, 0.18],
    [0.1, 0.8, 0.08, 0.12],
    [-0.08, 0.82, -0.06, 0.12],
    [0.05, 0.98, -0.05, 0.1],
    [-0.05, 0.95, 0.06, 0.11],
    [0.08, 0.92, 0.04, 0.09],
  ];
  for (const [fx, fy, fz, fr] of foliagePositions) {
    const foliage = new THREE.Mesh(
      new THREE.SphereGeometry(fr, 8, 8),
      Math.random() > 0.5 ? M.plant : M.plantDark
    );
    foliage.position.set(fx, fy, fz);
    foliage.castShadow = true;
    bigPlant.add(foliage);
  }

  bigPlant.position.set(-2.4, 0, 2.3);
  propsGroup.add(bigPlant);

  /* ── Bulletin Board (near discussion area) ─── */
  const bulletinGroup = new THREE.Group();
  bulletinGroup.name = 'BulletinBoard';

  const bbBoard = box(0.6, 0.5, 0.02, M.cork);
  bulletinGroup.add(bbBoard);
  const bbFrame = box(0.64, 0.54, 0.01, M.frame);
  bbFrame.position.z = -0.008;
  bulletinGroup.add(bbFrame);

  // Colorful pins / notes
  const pinColors = [0xf44336, 0x2196f3, 0x4caf50, 0xffc107, 0x9c27b0, 0xff9800];
  const pinPositions = [
    [-0.18, 0.12], [0.1, 0.15], [-0.05, -0.08], [0.2, -0.05],
    [-0.2, -0.12], [0.15, 0.05], [-0.1, 0.18], [0.05, -0.15],
  ];
  for (let pi = 0; pi < pinPositions.length; pi++) {
    const [px, py] = pinPositions[pi];
    // Note paper
    const note = box(0.06 + Math.random() * 0.04, 0.05 + Math.random() * 0.03, 0.001,
      trackMat(new THREE.MeshStandardMaterial({ color: pinColors[pi % pinColors.length], roughness: 0.7 })));
    note.position.set(px, py, 0.012);
    bulletinGroup.add(note);
    // Pin
    const pin = cyl(0.004, 0.004, 0.01, 6,
      trackMat(new THREE.MeshStandardMaterial({ color: pinColors[(pi + 2) % pinColors.length], roughness: 0.3, metalness: 0.5 })));
    pin.rotation.x = Math.PI / 2;
    pin.position.set(px, py + 0.02, 0.015);
    bulletinGroup.add(pin);
  }

  bulletinGroup.rotation.y = Math.PI / 2;
  bulletinGroup.position.set(-2.96, 1.6, 1.8);
  propsGroup.add(bulletinGroup);

  /* ── Pen/Pencil Holder on desk ─── */
  const penHolder = cyl(0.025, 0.025, 0.07, 8, M.uniBlue);
  penHolder.position.set(-0.55, deskY + deskThick / 2 + 0.035, -2.35);
  propsGroup.add(penHolder);
  // Pens
  const penColors = [0x1565c0, 0xc62828, 0x2e7d32, 0x222222];
  for (let pi = 0; pi < penColors.length; pi++) {
    const pen = cyl(0.003, 0.003, 0.1, 6, trackMat(M.book(penColors[pi])));
    pen.position.set(-0.55 + (pi - 1.5) * 0.007, deskY + deskThick / 2 + 0.08, -2.35);
    pen.rotation.z = (pi - 1.5) * 0.06;
    propsGroup.add(pen);
  }

  addGroup(propsGroup);

  /* ─────────────── 10. Lighting ──────────────────────────── */

  // Warm ceiling spots
  const cLight1 = new THREE.PointLight(0xffe0a0, 0.4, 6, 2);
  cLight1.position.set(0, 2.8, -0.8);
  addLight(cLight1);

  const cLight2 = new THREE.PointLight(0xffe0a0, 0.3, 5, 2);
  cLight2.position.set(-1.2, 2.8, 0.8);
  addLight(cLight2);

  const cLight3 = new THREE.PointLight(0xffe0a0, 0.25, 5, 2);
  cLight3.position.set(1.2, 2.8, 0.8);
  addLight(cLight3);

  // Window golden hour light (strong warm)
  const windowLight = new THREE.PointLight(0xffd699, 0.6, 8);
  windowLight.position.set(2.5, 2.0, 0);
  addLight(windowLight);

  // Secondary window fill light
  const windowFill = new THREE.PointLight(0xffe8c0, 0.2, 5);
  windowFill.position.set(2.0, 0.5, 0);
  addLight(windowFill);

  // Ambient hemisphere light for warm fill
  const hemiLight = new THREE.HemisphereLight(0xfff8e1, 0xc4a76c, 0.3);
  scene.add(hemiLight);
  allLights.push(hemiLight);

  /* ═══════════════════════════════════════════════════════════════
     Cleanup Function
     ═══════════════════════════════════════════════════════════════ */
  function cleanup() {
    // Remove all groups and traverse to dispose geometries
    for (const group of allGroups) {
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
    }

    // Remove all standalone lights
    for (const light of allLights) {
      scene.remove(light);
    }

    // Dispose tracked geometries
    for (const geo of allGeometries) {
      geo.dispose();
    }

    // Dispose tracked materials
    for (const mat of allMaterials) {
      if (mat && mat.dispose) mat.dispose();
    }

    // Clear arrays
    allGroups.length = 0;
    allGeometries.length = 0;
    allMaterials.length = 0;
    allLights.length = 0;
  }

  return { hotspotPositions, cleanup };
}
