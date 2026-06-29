/**
 * worldFactory.js — CIO Simulator World Factory
 * Selects and builds the appropriate 3D world based on the theme string.
 * Each world builder returns hotspot positions and a cleanup function.
 */
import { buildCorporateWorld } from './corporateWorld.js';
import { buildHospitalWorld } from './hospitalWorld.js';
import { buildCampusWorld } from './campusWorld.js';

const builders = {
  corporate: buildCorporateWorld,
  hospital: buildHospitalWorld,
  campus: buildCampusWorld
};

/**
 * Build a 3D world in the given scene.
 * @param {THREE.Scene} scene — The Three.js scene to populate
 * @param {string} theme — 'corporate' | 'hospital' | 'campus'
 * @returns {{ hotspotPositions: Map<string, THREE.Vector3>, cleanup: Function }}
 */
export function buildWorld(scene, theme = 'corporate') {
  const builder = builders[theme] || builders.corporate;
  return builder(scene);
}
