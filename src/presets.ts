import type { ConfettiConfig } from './types';

/**
 * Predefined confetti presets for common use cases
 */

/**
 * Basic Cannon - The default basic blast of confetti
 */
export const basicCannon: ConfettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
};

/**
 * Random Direction - Random amount in random directions
 */
export const randomDirection: ConfettiConfig = {
  particleCount: Math.floor(200 + Math.random() * 100),
  angle: Math.random() * 360,
  spread: 180 + Math.random() * 180,
  origin: {
    x: Math.random(),
    y: Math.random() - 0.2,
  },
  startVelocity: 30 + Math.random() * 20,
};

/**
 * Realistic Look - Mix multiple effects to avoid "flattened cone"
 * Fires 3 bursts with varying parameters for natural look
 */
export const realistic: ConfettiConfig = {
  particleCount: 100, // Per burst (will fire 3x)
  spread: 70,
  startVelocity: 45,
  decay: 0.91,
  scalar: 1,
  origin: { y: 0.7 },
};

/**
 * Fireworks - From the sides
 */
export const fireworks: ConfettiConfig = {
  particleCount: 100,
  spread: 360,
  startVelocity: 30,
  decay: 0.94,
  scalar: 1.2,
  origin: { y: 0.6 },
};

/**
 * Stars - Burst of star shapes
 */
export const stars: ConfettiConfig = {
  particleCount: 50,
  spread: 360,
  startVelocity: 20,
  decay: 0.95,
  gravity: 0.5,
  shapes: ['star'],
  scalar: 1.5, // Scaled appropriately for star character
  colors: ['#FFD700', '#FFA500', '#FFFF00'],
};

/**
 * Left Cannon - Confetti from left side
 */
export const leftCannon: ConfettiConfig = {
  particleCount: 50,
  angle: 60,
  spread: 55,
  origin: { x: 0, y: 0.6 },
  startVelocity: 55,
};

/**
 * Right Cannon - Confetti from right side
 */
export const rightCannon: ConfettiConfig = {
  particleCount: 50,
  angle: 120,
  spread: 55,
  origin: { x: 1, y: 0.6 },
  startVelocity: 55,
};

/**
 * Bottom Cannon - Confetti from bottom
 */
export const bottomCannon: ConfettiConfig = {
  particleCount: 50,
  angle: 90,
  spread: 45,
  origin: { y: 1, x: 0.5 },
  startVelocity: 55,
};

export const presets = {
  basicCannon,
  randomDirection,
  realistic,
  fireworks,
  stars,
  leftCannon,
  rightCannon,
  bottomCannon,
};

