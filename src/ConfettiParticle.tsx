import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import type { ConfettiParticle as ConfettiParticleType } from './types';

interface Props {
  particle: ConfettiParticleType;
  duration: number;
  onComplete?: () => void;
}

export const ConfettiParticle: React.FC<Props> = ({ particle, duration, onComplete }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(particle.rotation);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Animate the particle
    translateX.value = withTiming(particle.velocity.x * (duration / 16), {
      duration,
      easing: Easing.linear,
    });

    translateY.value = withTiming(particle.velocity.y * (duration / 16), {
      duration,
      easing: Easing.bezier(0.33, 1, 0.68, 1), // Custom easing for gravity effect
    });

    rotation.value = withTiming(
      particle.rotation + particle.rotationVelocity * (duration / 16),
      {
        duration,
        easing: Easing.linear,
      }
    );

    opacity.value = withTiming(
      0,
      {
        duration,
        easing: Easing.linear,
      },
      finished => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      }
    );
  }, [duration, onComplete, opacity, particle, rotation, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const renderShape = () => {
    const baseStyle = [
      styles.particle,
      {
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
      },
    ];

    if (particle.shape === 'circle') {
      return (
        <Animated.View style={[...baseStyle, styles.circle, animatedStyle]} />
      );
    } else if (particle.shape === 'triangle') {
      return (
        <Animated.View style={[...baseStyle, styles.transparent, animatedStyle]}>
          <Animated.View
            style={[
              styles.triangle,
              {
                borderLeftWidth: particle.size / 2,
                borderRightWidth: particle.size / 2,
                borderBottomWidth: particle.size,
                borderBottomColor: particle.color,
              },
            ]}
          />
        </Animated.View>
      );
    }

    // Square (default)
    return <Animated.View style={[...baseStyle, animatedStyle]} />;
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
  transparent: {
    backgroundColor: 'transparent',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

