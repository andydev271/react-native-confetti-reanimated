import React, { useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import type { ConfettiConfig, ConfettiMethods } from './types';
import { createConfettiParticles, DEFAULT_CONFIG } from './utils';
import { ConfettiParticle } from './ConfettiParticle';
import type { ConfettiParticle as ConfettiParticleType } from './types';

export interface ConfettiCanvasProps {
  /**
   * Style for the confetti container
   */
  containerStyle?: any;
  
  /**
   * Z-index for the confetti container
   * @default 1000
   */
  zIndex?: number;

  /**
   * Whether confetti should be allowed to go outside of safe area
   * @default true
   */
  fullScreen?: boolean;
}

export const ConfettiCanvas = React.forwardRef<ConfettiMethods, ConfettiCanvasProps>(
  ({ containerStyle, zIndex = 1000, fullScreen = true }, ref) => {
    const [particles, setParticles] = useState<ConfettiParticleType[]>([]);
    const [activeCount, setActiveCount] = useState(0);
    const { width, height } = useWindowDimensions();

    const fire = useCallback(
      (config: ConfettiConfig = {}): Promise<null> => {
        return new Promise(resolve => {
          const mergedConfig = {
            ...DEFAULT_CONFIG,
            ...config,
            origin: {
              ...DEFAULT_CONFIG.origin,
              ...config.origin,
            },
          };

          const newParticles = createConfettiParticles(mergedConfig, width, height);
          setParticles(prev => [...prev, ...newParticles]);
          setActiveCount(prev => prev + newParticles.length);

          // Resolve after the duration
          setTimeout(() => {
            resolve(null);
          }, mergedConfig.duration);
        });
      },
      [width, height]
    );

    const reset = useCallback(() => {
      setParticles([]);
      setActiveCount(0);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        const confetti = fire as ConfettiMethods;
        confetti.reset = reset;
        return confetti;
      },
      [fire, reset]
    );

    const handleParticleComplete = useCallback((particleId: string) => {
      setActiveCount(prev => prev - 1);
      setParticles(prev => {
        // Clean up completed particles periodically
        if (prev.length > 100) {
          return prev.filter(p => p.id !== particleId).slice(-50);
        }
        return prev;
      });
    }, []);

    return (
      <View
        style={[
          styles.container,
          fullScreen && styles.fullScreen,
          { zIndex },
          containerStyle,
        ]}
        pointerEvents="none">
        {particles.map(particle => (
          <ConfettiParticle
            key={particle.id}
            particle={particle}
            duration={DEFAULT_CONFIG.duration}
            onComplete={() => handleParticleComplete(particle.id)}
          />
        ))}
      </View>
    );
  }
);

ConfettiCanvas.displayName = 'ConfettiCanvas';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fullScreen: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

