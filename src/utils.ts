import type { ConfettiConfig, ConfettiParticle } from './types';

export const DEFAULT_COLORS = [
  '#26ccff',
  '#a25afd',
  '#ff5e7e',
  '#88ff5a',
  '#fcff42',
  '#ffa62d',
  '#ff36ff',
  '#1e90ff',
  '#9400d3',
  '#ff1493',
  '#32cd32',
  '#ffd700',
  '#ff6347',
  '#00ffff',
  '#ff00ff',
  '#00ff00',
  '#ff0000',
  '#0000ff',
  '#ffff00',
];

export const DEFAULT_CONFIG: Required<ConfettiConfig> = {
  particleCount: 50,
  angle: 90,
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  duration: 3000,
  colors: DEFAULT_COLORS,
  scalar: 1,
  origin: { x: 0.5, y: 0.5 },
  shapes: ['square'],
  tilt: true,
  tiltAngleIncrement: 10,
  tickDuration: 200,
  ticks: 200,
  disableForReducedMotion: false,
  usePerformanceMode: false,
};

export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const randomFromArray = <T>(arr: T[]): T => {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === undefined) {
    throw new Error('Array is empty');
  }
  return item;
};

/** Wall-clock cleanup timeout derived from tick count at 60fps (canvas-confetti default). */
export const durationFromTicks = (ticks: number): number => {
  return Math.round((ticks / 60) * 1000);
};

/**
 * Create particles using canvas-confetti randomPhysics / updateFetti semantics.
 */
export const createConfettiParticles = (
  config: Required<ConfettiConfig>,
  screenWidth: number,
  screenHeight: number,
): ConfettiParticle[] => {
  const particles: ConfettiParticle[] = [];
  const radAngle = degreesToRadians(config.angle);
  const radSpread = degreesToRadians(config.spread);
  const flat = !config.tilt;
  const timestamp = Date.now();

  for (let i = 0; i < config.particleCount; i++) {
    const baseWidth = (6 + Math.random() * 4) * config.scalar;
    const aspectRatio = 0.5 + Math.random() * 0.3;

    particles.push({
      id: `confetti-${timestamp}-${i}-${Math.random()}`,
      color: randomFromArray(config.colors),
      shape: randomFromArray(config.shapes),
      x: (config.origin.x ?? 0.5) * screenWidth,
      y: (config.origin.y ?? 0.5) * screenHeight,
      width: baseWidth,
      height: baseWidth * aspectRatio,
      angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
      velocity: config.startVelocity * 0.5 + Math.random() * config.startVelocity,
      gravity: config.gravity * 3,
      decay: config.decay,
      drift: config.drift,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      tiltAngle: flat ? 0 : (Math.random() * 0.5 + 0.25) * Math.PI,
      random: Math.random() + 2,
      flat,
      opacity: 1,
    });
  }

  return particles;
};
