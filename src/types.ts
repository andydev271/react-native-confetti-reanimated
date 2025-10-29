export interface ConfettiConfig {
  /**
   * The number of confetti pieces to launch
   * @default 50
   */
  particleCount?: number;

  /**
   * The angle in degrees at which to launch the confetti
   * @default 90
   */
  angle?: number;

  /**
   * How far the confetti can spread from the origin
   * @default 45
   */
  spread?: number;

  /**
   * The starting velocity of the confetti
   * @default 45
   */
  startVelocity?: number;

  /**
   * How fast the confetti decays
   * @default 0.9
   */
  decay?: number;

  /**
   * Gravity to apply to the confetti
   * @default 1
   */
  gravity?: number;

  /**
   * How much to the side the confetti will drift
   * @default 0
   */
  drift?: number;

  /**
   * Time in milliseconds to run the confetti animation
   * @default 3000
   */
  duration?: number;

  /**
   * Array of color strings, in any format (hex, rgb, hsl)
   * @default ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
   */
  colors?: string[];

  /**
   * Scale of the confetti particles
   * @default 1
   */
  scalar?: number;

  /**
   * The x position on the screen where confetti will originate (0-1)
   * 0 is left edge, 0.5 is center, 1 is right edge
   * @default 0.5
   */
  origin?: {
    x?: number;
    y?: number;
  };

  /**
   * Shapes for confetti
   * @default ['square', 'circle']
   */
  shapes?: Array<'square' | 'circle' | 'star'>;

  /**
   * Whether the confetti should be affected by tilt
   * @default true
   */
  tilt?: boolean;

  /**
   * Max angle for tilt
   * @default 10
   */
  tiltAngleIncrement?: number;

  /**
   * The number of times the confetti will move
   * @default 200
   */
  tickDuration?: number;

  /**
   * Disable physics
   * @default false
   */
  disableForReducedMotion?: boolean;

  /**
   * Use performance mode (fewer updates)
   * @default false
   */
  usePerformanceMode?: boolean;
}

export interface ConfettiParticle {
  id: string;
  color: string;
  shape: 'square' | 'circle' | 'star';
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: {
    x: number;
    y: number;
  };
  rotation: number;
  rotationVelocity: number;
  tiltAngle: number;
  opacity: number;
}

export interface ConfettiMethods {
  /**
   * Fire confetti with the given configuration
   */
  (config?: ConfettiConfig): Promise<null>;

  /**
   * Reset confetti
   */
  reset: () => void;
}

