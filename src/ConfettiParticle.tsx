import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useFrameCallback,
  cancelAnimation,
} from 'react-native-reanimated';
import type { ConfettiParticle as ConfettiParticleType, ConfettiConfig } from './types';

interface Props {
  particle: ConfettiParticleType;
  config: Required<ConfettiConfig>;
  duration: number;
  onComplete?: () => void;
}

export const ConfettiParticle: React.FC<Props> = ({ particle, config, duration, onComplete }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(particle.rotation);
  const opacity = useSharedValue(1);

  // Velocity state
  const velX = useSharedValue(particle.velocity.x);
  const velY = useSharedValue(particle.velocity.y);
  const startTime = useSharedValue(Date.now());
  const lastFrameTime = useSharedValue(Date.now());
  const isComplete = useSharedValue(false);

  // Canvas-confetti realistic wobble and tilt variables
  const wobble = useSharedValue(Math.random() * 10);
  const wobbleSpeed = useSharedValue(Math.min(0.11, Math.random() * 0.1 + 0.05));
  const tiltAngle = useSharedValue(particle.tiltAngle);
  const tiltSin = useSharedValue(0);
  const tiltCos = useSharedValue(0);
  const random = useSharedValue(Math.random() + 2);
  const tick = useSharedValue(0);
  const totalTicks = useSharedValue(
    Math.max(1, Math.round((config.ticks ?? config.tickDuration ?? (duration / 1000) * 60))),
  );

  useEffect(() => {
    const now = Date.now();
    startTime.value = now;
    lastFrameTime.value = now;
    tick.value = 0;
    totalTicks.value = Math.max(
      1,
      Math.round((config.ticks ?? config.tickDuration ?? (duration / 1000) * 60)),
    );

    // Cleanup callback
    const timer = setTimeout(() => {
      isComplete.value = true;
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearTimeout(timer);
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      cancelAnimation(rotation);
      cancelAnimation(opacity);
    };
  }, [
    config.tickDuration,
    config.ticks,
    duration,
    onComplete,
    opacity,
    isComplete,
    startTime,
    lastFrameTime,
    totalTicks,
    translateX,
    translateY,
    rotation,
    tick,
  ]);

  // Real-time physics simulation using frame callback
  // Frame-rate independent: uses deltaTime to ensure consistent speed across devices
  useFrameCallback((frameInfo) => {
    'worklet';

    if (isComplete.value) {
      return;
    }

    // Use frameInfo.timestamp for better performance (runs on UI thread)
    // Fallback to Date.now() if timestamp not available
    const currentTime = frameInfo?.timestamp ?? Date.now();
    const elapsed = currentTime - startTime.value;
    if (elapsed >= duration) {
      isComplete.value = true;
      return;
    }

    // Calculate deltaTime normalized to 60fps (16.67ms per frame)
    // This ensures consistent animation speed regardless of device frame rate
    // Use timeSincePreviousFrame if available, otherwise calculate manually
    const frameDelta = frameInfo?.timeSincePreviousFrame ?? (currentTime - lastFrameTime.value);
    
    // Handle first frame or invalid deltas
    if (frameDelta <= 0 || frameDelta > 1000) {
      lastFrameTime.value = currentTime;
      return; // Skip this frame
    }
    
    const deltaTime = frameDelta / 16.67;
    lastFrameTime.value = currentTime;

    // Clamp deltaTime to prevent large jumps (e.g., when app resumes from background)
    // Max 2.0 means we allow up to 2x normal frame time (30fps equivalent)
    const clampedDelta = Math.min(deltaTime, 2.0);

    // Update position based on current velocity (scaled by deltaTime for frame-rate independence)
    // Velocity is in pixels per frame at 60fps, so we scale by deltaTime
    translateX.value += velX.value * clampedDelta;
    translateY.value += velY.value * clampedDelta;

    // Apply gravity (increases downward velocity) - realistic physics!
    // Gravity is per frame at 60fps, so scale by deltaTime
    velY.value += config.gravity * clampedDelta;

    // Apply drift (horizontal wind)
    velX.value += config.drift * clampedDelta;

    // Apply decay (air resistance) - decay per frame, so raise to power of deltaTime
    velX.value *= Math.pow(config.decay, clampedDelta);
    velY.value *= Math.pow(config.decay, clampedDelta);

    // Update rotation - particles spin faster when moving fast, slower when slowing down
    // More pronounced slowdown: rotation reduces more dramatically as speed decreases
    const speed = Math.sqrt(velX.value * velX.value + velY.value * velY.value);
    // Increased divisor from 20 to 35 makes rotation more tied to speed (slows down more as particles fall)
    const speedBoost = 1 + speed / 35;
    rotation.value += particle.rotationVelocity * speedBoost * clampedDelta;

    // Canvas-confetti wobble effect (creates side-to-side flutter)
    wobble.value += wobbleSpeed.value * clampedDelta;

    // Canvas-confetti tilt animation (creates 3D tumbling effect)
    tiltAngle.value += 0.1 * clampedDelta;
    tiltSin.value = Math.sin(tiltAngle.value);
    tiltCos.value = Math.cos(tiltAngle.value);
    random.value = Math.random() + 2;

    // Update tick for progressive opacity fade (time-based, not frame-based)
    // Use elapsed time instead of frame count for frame-rate independence
    const progress = Math.min(1, elapsed / duration);
    tick.value = progress * totalTicks.value;

    // Canvas-confetti progressive fade: opacity decreases linearly over lifetime
    opacity.value = 1 - progress;
  });

  const animatedStyle = useAnimatedStyle(() => {
    // Canvas-confetti wobble calculation (circular motion)
    const wobbleX = 10 * config.scalar * Math.cos(wobble.value);
    const wobbleY = 10 * config.scalar * Math.sin(wobble.value);

    // Canvas-confetti 3D-like positioning with tilt
    const x1 = translateX.value + random.value * tiltCos.value;
    const y1 = translateY.value + random.value * tiltSin.value;
    const x2 = translateX.value + wobbleX + random.value * tiltCos.value;
    const y2 = translateY.value + wobbleY + random.value * tiltSin.value;

    // Dynamic scaling based on wobble (creates 3D depth perception)
    const scaleX = Math.abs(x2 - x1) * 0.1;
    const scaleY = Math.abs(y2 - y1) * 0.1;

    return {
      transform: [
        { translateX: x2 },
        { translateY: y2 },
        { rotate: `${rotation.value}deg` },
        { scaleX: Math.max(0.3, scaleX) }, // Prevent too small
        { scaleY: Math.max(0.3, scaleY) },
      ],
      opacity: opacity.value,
    };
  });

  const renderShape = () => {
    if (particle.shape === 'circle') {
      // Circles for snow - perfectly round
      const size = particle.width;
      return (
        <Animated.View
          style={[
            styles.particle,
            styles.circle,
            {
              width: size,
              height: size,
              backgroundColor: particle.color,
            },
            animatedStyle,
          ]}
        />
      );
    }

    if (particle.shape === 'star') {
      // Stars using Unicode character
      const fontSize = particle.width * 1.5;
      return (
        <Animated.Text
          style={[
            styles.particle,
            styles.star,
            {
              fontSize,
              color: particle.color,
              textShadowColor: particle.color,
            },
            animatedStyle,
          ]}>
          ★
        </Animated.Text>
      );
    }

    // Rectangles - sharp, thin confetti strips
    return (
      <Animated.View
        style={[
          styles.particle,
          {
            width: particle.width,
            height: particle.height,
            backgroundColor: particle.color,
          },
          animatedStyle,
        ]}
      />
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: particle.x,
          top: particle.y,
        },
      ]}>
      {renderShape()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  particle: {
    position: 'absolute',
  },
  circle: {
    borderRadius: 999,
  },
  star: {
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
});
