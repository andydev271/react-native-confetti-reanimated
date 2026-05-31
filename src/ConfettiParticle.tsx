import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
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

/** canvas-confetti: `rgba(..., 1 - progress)` where progress = tick / totalTicks */
function opacityForProgress(progress: number): number {
  'worklet';
  return Math.max(0, 1 - progress);
}

export const ConfettiParticle: React.FC<Props> = ({ particle, config, duration, onComplete }) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const notifyComplete = useCallback(() => {
    onCompleteRef.current?.();
  }, []);

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
  const hasNotifiedComplete = useSharedValue(false);

  const totalTicks = useSharedValue(
    Math.max(1, Math.round(config.ticks ?? config.tickDuration ?? (duration / 1000) * 60)),
  );

  useEffect(() => {
    tick.value = 0;
    velocity.value = particle.velocity;
    translateX.value = 0;
    translateY.value = 0;
    opacity.value = 1;
    isComplete.value = false;
    hasNotifiedComplete.value = false;
    wobble.value = particle.wobble;
    wobbleSpeed.value = particle.wobbleSpeed;
    tiltAngle.value = particle.tiltAngle;
    random.value = particle.random;

    const ticks = Math.max(
      1,
      Math.round(config.ticks ?? config.tickDuration ?? (duration / 1000) * 60),
    );
    totalTicks.value = ticks;

    return () => {
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      cancelAnimation(opacity);
    };
    // Only re-init when this particle identity or lifetime changes — not when parent re-renders.
  }, [particle.id, duration, config.ticks, config.tickDuration]);

  useFrameCallback(() => {
    'worklet';

    if (isComplete.value) {
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
    const progress = Math.min(1, tick.value / totalTicks.value);
    opacity.value = opacityForProgress(progress);

    if (tick.value >= totalTicks.value) {
      isComplete.value = true;
      opacity.value = 0;
      if (!hasNotifiedComplete.value) {
        hasNotifiedComplete.value = true;
        runOnJS(notifyComplete)();
      }
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    const flat = particle.flat;
    const wobbleX = flat
      ? translateX.value + 10 * config.scalar
      : translateX.value + 10 * config.scalar * Math.cos(wobble.value);
    const wobbleY = flat
      ? translateY.value + 10 * config.scalar
      : translateY.value + 10 * config.scalar * Math.sin(wobble.value);

    const x1 = translateX.value + random.value * tiltCos.value;
    const y1 = translateY.value + random.value * tiltSin.value;
    const x2 = wobbleX + random.value * tiltCos.value;
    const y2 = wobbleY + random.value * tiltSin.value;

    // canvas-confetti: path fill uses wobble/tilt span — keeps strips thin while tumbling
    const scaleX = Math.max(0.25, Math.min(1.15, Math.abs(x2 - x1) * 0.1));
    const scaleY = Math.max(0.25, Math.min(1.15, Math.abs(y2 - y1) * 0.1));

    return {
      transform: [
        { translateX: x2 },
        { translateY: y2 },
        { rotate: `${(wobble.value * Math.PI) / 10}rad` },
        { scaleX },
        { scaleY },
      ],
      opacity: opacity.value,
    };
  });

  const renderShape = () => {
    if (particle.shape === 'circle') {
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
