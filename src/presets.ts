import type { ConfettiConfig } from './types';

/**
 * Predefined confetti presets for common use cases
 */

/**
 * Basic celebration with confetti from the center
 */
export const celebration: ConfettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
};

/**
 * Fireworks effect
 */
export const fireworks: ConfettiConfig = {
  particleCount: 150,
  spread: 360,
  startVelocity: 30,
  decay: 0.94,
  scalar: 1.2,
};

/**
 * Confetti from the bottom
 */
export const bottomCannon: ConfettiConfig = {
  particleCount: 50,
  angle: 60,
  spread: 55,
  origin: { y: 0.8, x: 0.5 },
  startVelocity: 55,
};

/**
 * Confetti from left side
 */
export const leftCannon: ConfettiConfig = {
  particleCount: 50,
  angle: 45,
  spread: 55,
  origin: { x: 0, y: 0.6 },
  startVelocity: 55,
};

/**
 * Confetti from right side
 */
export const rightCannon: ConfettiConfig = {
  particleCount: 50,
  angle: 135,
  spread: 55,
  origin: { x: 1, y: 0.6 },
  startVelocity: 55,
};

/**
 * Realistic looking confetti
 */
export const realistic: ConfettiConfig = {
  particleCount: 200,
  spread: 160,
  origin: { y: 0.5 },
  startVelocity: 35,
  gravity: 1.5,
  drift: 1,
  tilt: true,
  shapes: ['square', 'circle', 'triangle'],
  scalar: 0.8,
};

/**
 * Snow effect
 */
export const snow: ConfettiConfig = {
  particleCount: 100,
  spread: 180,
  origin: { y: -0.1 },
  startVelocity: 0,
  gravity: 0.3,
  drift: 1,
  colors: ['#ffffff', '#e8f4ff', '#c9e5ff'],
  shapes: ['circle'],
  scalar: 0.6,
  angle: 270,
};

/**
 * Stars effect
 */
export const stars: ConfettiConfig = {
  particleCount: 50,
  spread: 360,
  startVelocity: 20,
  decay: 0.95,
  gravity: 0.5,
  colors: ['#FFD700', '#FFA500', '#FFFF00'],
  shapes: ['circle'],
  scalar: 0.5,
};

/**
 * School pride (custom colors)
 */
export const schoolPride: ConfettiConfig = {
  particleCount: 100,
  spread: 160,
  origin: { y: 0.6 },
  colors: ['#bb0000', '#ffffff'],
};

export const presets = {
  celebration,
  fireworks,
  bottomCannon,
  leftCannon,
  rightCannon,
  realistic,
  snow,
  stars,
  schoolPride,
};

