import type { ConfettiConfig, ConfettiParticle } from './types';

export const DEFAULT_COLORS = [
  '#26ccff',
  '#a25afd',
  '#ff5e7e',
  '#88ff5a',
  '#fcff42',
  '#ffa62d',
  '#ff36ff',
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
  shapes: ['square', 'circle'],
  tilt: true,
  tiltAngleIncrement: 10,
  tickDuration: 200,
  disableForReducedMotion: false,
  usePerformanceMode: false,
};

/**
 * Convert degrees to radians
 */
export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Generate a random number between min and max
 */
export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Pick a random item from an array
 */
export const randomFromArray = <T>(arr: T[]): T => {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === undefined) {
    throw new Error('Array is empty');
  }
  return item;
};

/**
 * Create initial confetti particles
 */
export const createConfettiParticles = (
  config: Required<ConfettiConfig>,
  screenWidth: number,
  screenHeight: number
): ConfettiParticle[] => {
  const particles: ConfettiParticle[] = [];
  const angleInRadians = degreesToRadians(config.angle);
  const spreadInRadians = degreesToRadians(config.spread);

  for (let i = 0; i < config.particleCount; i++) {
    const angle = angleInRadians + randomRange(-spreadInRadians / 2, spreadInRadians / 2);
    const velocity = config.startVelocity * (0.5 + Math.random() * 0.5);
    
    const particle: ConfettiParticle = {
      id: `confetti-${i}-${Date.now()}`,
      color: randomFromArray(config.colors),
      shape: randomFromArray(config.shapes),
      x: (config.origin.x ?? 0.5) * screenWidth,
      y: (config.origin.y ?? 0.5) * screenHeight,
      size: (5 + Math.random() * 5) * config.scalar,
      velocity: {
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
      },
      rotation: Math.random() * 360,
      rotationVelocity: randomRange(-10, 10),
      tiltAngle: config.tilt ? Math.random() * config.tiltAngleIncrement : 0,
      opacity: 1,
    };

    particles.push(particle);
  }

  return particles;
};

/**
 * Update a confetti particle's position
 */
export const updateParticle = (
  particle: ConfettiParticle,
  config: Required<ConfettiConfig>,
  deltaTime: number
): ConfettiParticle => {
  const dt = deltaTime / 16; // Normalize to 60fps

  // Apply gravity
  const newVelocityY = particle.velocity.y - config.gravity * dt;
  
  // Apply drift
  const newVelocityX = particle.velocity.x + config.drift * dt;

  // Update position
  const newX = particle.x + newVelocityX * dt;
  const newY = particle.y - newVelocityY * dt;

  // Update rotation
  const newRotation = particle.rotation + particle.rotationVelocity * dt;

  // Apply decay to opacity
  const newOpacity = particle.opacity * Math.pow(config.decay, dt);

  return {
    ...particle,
    x: newX,
    y: newY,
    velocity: {
      x: newVelocityX,
      y: newVelocityY,
    },
    rotation: newRotation,
    opacity: newOpacity,
  };
};

