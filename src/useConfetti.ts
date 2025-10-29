import { useRef, useCallback } from 'react';
import type { ConfettiConfig, ConfettiMethods } from './types';

/**
 * Hook to use confetti imperatively
 * Returns a ref to pass to ConfettiCanvas and a fire function
 */
export const useConfetti = () => {
  const confettiRef = useRef<ConfettiMethods>(null);

  const fire = useCallback((config?: ConfettiConfig) => {
    return confettiRef.current?.(config);
  }, []);

  const reset = useCallback(() => {
    confettiRef.current?.reset();
  }, []);

  return {
    confettiRef,
    fire,
    reset,
  };
};

