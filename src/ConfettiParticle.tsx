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

function opacityForProgress(progress: number, fadeStart: number): number {
  'worklet';
  if (progress <= fadeStart) {
    return 1;
  }
  const fadeSpan = 1 - fadeStart;
  if (fadeSpan <= 0) {
    return 0;
  }
  return 1 - (progress - fadeStart) / fadeSpan;
}

export const ConfettiParticle: React.FC<Props> = ({ particle, config, duration, onComplete }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const velocity = useSharedValue(particle.velocity);
  const opacity = useSharedValue(1);

  const wobble = useSharedValue(particle.wobble);
  const wobbleSpeed = useSharedValue(particle.wobbleSpeed);
  const tiltAngle = useSharedValue(particle.tiltAngle);
  const tiltSin = useSharedValue(0);
  const tiltCos = useSharedValue(0);
  const random = useSharedValue(particle.random);
  const tick = useSharedValue(0);
  const isComplete = useSharedValue(false);

  const totalTicks = useSharedValue(
    Math.max(1, Math.round(config.ticks ?? config.tickDuration ?? (duration / 1000) * 60)),
  );
  const fadeTicks = useSharedValue(
    Math.min(
      Math.max(1, config.fadeTicks ?? 60),
      Math.max(1, Math.round(config.ticks ?? config.tickDuration ?? (duration / 1000) * 60)),
    ),
  );

  useEffect(() => {
    tick.value = 0;
    velocity.value = particle.velocity;
    translateX.value = 0;
    translateY.value = 0;
    opacity.value = 1;
    isComplete.value = false;
    wobble.value = particle.wobble;
    wobbleSpeed.value = particle.wobbleSpeed;
    tiltAngle.value = particle.tiltAngle;
    random.value = particle.random;

    const ticks = Math.max(
      1,
      Math.round(config.ticks ?? config.tickDuration ?? (duration / 1000) * 60),
    );
    totalTicks.value = ticks;
    fadeTicks.value = Math.min(Math.max(1, config.fadeTicks ?? 60), ticks);

    const timer = setTimeout(() => {
      isComplete.value = true;
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      cancelAnimation(opacity);
    };
  }, [
    config.fadeTicks,
    config.tickDuration,
    config.ticks,
    duration,
    onComplete,
    isComplete,
    opacity,
    particle,
    totalTicks,
    fadeTicks,
    translateX,
    translateY,
    tick,
    velocity,
    wobble,
    wobbleSpeed,
    tiltAngle,
    random,
  ]);

  useFrameCallback(() => {
    'worklet';

    if (isComplete.value) {
      return;
    }

    if (tick.value >= totalTicks.value) {
      isComplete.value = true;
      return;
    }

    const flat = particle.flat;

    if (flat) {
      wobble.value = 0;
    } else {
      wobble.value += wobbleSpeed.value;
    }

    if (!flat) {
      tiltAngle.value += 0.1;
      tiltSin.value = Math.sin(tiltAngle.value);
      tiltCos.value = Math.cos(tiltAngle.value);
      random.value = Math.random() + 2;
    } else {
      tiltSin.value = 0;
      tiltCos.value = 0;
      random.value = 1;
    }

    translateX.value += Math.cos(particle.angle2D) * velocity.value + particle.drift;
    translateY.value += Math.sin(particle.angle2D) * velocity.value + particle.gravity;
    velocity.value *= particle.decay;

    tick.value += 1;
    const progress = tick.value / totalTicks.value;
    const fadeStart = 1 - fadeTicks.value / totalTicks.value;
    opacity.value = opacityForProgress(progress, fadeStart);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const flat = particle.flat;
    const wobbleX = flat
      ? translateX.value + 10 * config.scalar
      : translateX.value + 10 * config.scalar * Math.cos(wobble.value);
    const wobbleY = flat
      ? translateY.value + 10 * config.scalar
      : translateY.value + 10 * config.scalar * Math.sin(wobble.value);

    const x2 = wobbleX + random.value * tiltCos.value;
    const y2 = wobbleY + random.value * tiltSin.value;

    return {
      transform: [
        { translateX: x2 },
        { translateY: y2 },
        { rotate: `${(wobble.value * Math.PI) / 10}rad` },
      ],
      opacity: opacity.value,
    };
  });

  const renderShape = () => {
    if (particle.shape === 'circle') {
      const size = Math.max(particle.width, particle.height) * 1.1;
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
      const fontSize = particle.width * 2;
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
