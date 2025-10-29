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
  const isComplete = useSharedValue(false);

  // Canvas-confetti realistic wobble and tilt variables
  const wobble = useSharedValue(Math.random() * 10);
  const wobbleSpeed = useSharedValue(Math.min(0.11, Math.random() * 0.1 + 0.05));
  const tiltAngle = useSharedValue(particle.tiltAngle);
  const tiltSin = useSharedValue(0);
  const tiltCos = useSharedValue(0);
  const random = useSharedValue(Math.random() + 2);
  const tick = useSharedValue(0);
  const totalTicks = useSharedValue((duration / 1000) * 60); // 60fps

  useEffect(() => {
    startTime.value = Date.now();
    tick.value = 0;

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
  }, [duration, onComplete, opacity, isComplete, startTime, translateX, translateY, rotation, tick]);

  // Real-time physics simulation using frame callback
  useFrameCallback(() => {
    'worklet';

    if (isComplete.value) {
      return;
    }

    const elapsed = Date.now() - startTime.value;
    if (elapsed >= duration) {
      isComplete.value = true;
      return;
    }

    // Update position based on current velocity
    translateX.value += velX.value;
    translateY.value += velY.value;

    // Apply gravity (increases downward velocity) - realistic physics!
    velY.value += config.gravity;

    // Apply drift (horizontal wind)
    velX.value += config.drift;

    // Apply decay (air resistance)
    velX.value *= config.decay;
    velY.value *= config.decay;

    // Update rotation - ALL particles spin faster when moving fast, slower when slowing down
    const speed = Math.sqrt(velX.value * velX.value + velY.value * velY.value);
    const speedBoost = 1 + speed / 20;
    rotation.value += particle.rotationVelocity * speedBoost;

    // Canvas-confetti wobble effect (creates side-to-side flutter)
    wobble.value += wobbleSpeed.value;

    // Canvas-confetti tilt animation (creates 3D tumbling effect)
    tiltAngle.value += 0.1;
    tiltSin.value = Math.sin(tiltAngle.value);
    tiltCos.value = Math.cos(tiltAngle.value);
    random.value = Math.random() + 2;

    // Update tick for progressive opacity fade
    tick.value += 1;

    // Canvas-confetti progressive fade: opacity decreases linearly over lifetime
    const progress = tick.value / totalTicks.value;
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
            {
              fontSize,
              color: particle.color,
              textShadowColor: particle.color,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 3,
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
});
