import type { ConfettiConfig, ConfettiParticle } from './types';

// Canvas-confetti uses highly contrasting, distinct colors for realistic effect
// Each color is maximally different from others for clear visibility
export const DEFAULT_COLORS = [
  // Primary vibrant colors (maximally distinct)
  '#26ccff', // Bright Cyan
  '#a25afd', // Purple
  '#ff5e7e', // Pink
  '#88ff5a', // Lime Green
  '#fcff42', // Yellow
  '#ffa62d', // Orange
  '#ff36ff', // Magenta
  // Secondary distinct colors
  '#1e90ff', // Dodger Blue
  '#9400d3', // Dark Violet
  '#ff1493', // Deep Pink
  '#32cd32', // Lime
  '#ffd700', // Gold
  '#ff6347', // Tomato
  '#00ffff', // Cyan
  '#ff00ff', // Fuchsia
  // Additional contrast colors
  '#00ff00', // Pure Green
  '#ff0000', // Pure Red
  '#0000ff', // Pure Blue
  '#ffff00', // Pure Yellow
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
  shapes: ['square'], // Rectangular strips are most realistic
  tilt: true,
  tiltAngleIncrement: 10,
  tickDuration: 200,
  ticks: 200,
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
  screenHeight: number,
): ConfettiParticle[] => {
  const particles: ConfettiParticle[] = [];
  const angleInRadians = degreesToRadians(config.angle);
  const spreadInRadians = degreesToRadians(config.spread);

  const timestamp = Date.now();
  for (let i = 0; i < config.particleCount; i++) {
    // Add spread variation to the angle
    const spreadVariation = randomRange(-spreadInRadians / 2, spreadInRadians / 2);
    const particleAngle = angleInRadians + spreadVariation;
    // Randomize velocity within range
    const velocityMagnitude = config.startVelocity * (0.5 + Math.random() * 0.5);
    // Create confetti particles - broader and shorter like canvas-confetti
    const baseWidth = (6 + Math.random() * 4) * config.scalar; // 6-10px wide (BROADER)
    const aspectRatio = 0.5 + Math.random() * 0.3; // 0.5-0.8 ratio (SHORTER than wide)
    const particle: ConfettiParticle = {
      id: `confetti-${timestamp}-${i}-${Math.random()}`,
      color: randomFromArray(config.colors),
      shape: randomFromArray(config.shapes),
      x: (config.origin.x ?? 0.5) * screenWidth,
      y: (config.origin.y ?? 0.5) * screenHeight,
      width: baseWidth,
      height: baseWidth * aspectRatio, // Height is SMALLER than width
      velocity: {
        // Canvas-confetti uses pixels per frame (60fps)
        // Use velocity as-is for proper scaling to device
        x: Math.cos(particleAngle) * velocityMagnitude,
        y: -Math.sin(particleAngle) * velocityMagnitude, // Negative = upward initially
      },
      rotation: Math.random() * 360,
      rotationVelocity: randomRange(-50, 50), // Very wide range for dramatic spinning
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
  deltaTime: number,
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
