import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConfettiCanvas, useConfetti, presets } from 'react-native-confetti-reanimated';
import type { ConfettiConfig } from 'react-native-confetti-reanimated';

// Array of random angles to choose from (like canvas-confetti)
const RANDOM_ANGLES = [60, 75, 90, 105, 120];

export default function App() {
  const { confettiRef, fire } = useConfetti();
  const [lastPreset, setLastPreset] = useState<string>('');

  const handlePreset = (name: string, config: ConfettiConfig) => {
    setLastPreset(name);
    
    // Handle random direction with CRAZY randomness (like canvas-confetti)
    if (name === 'Random Direction') {
      fire({
        ...config,
        particleCount: Math.floor(Math.random() * 50) + 50, // 50-100 particles
        angle: Math.random() * 360, // Any direction!
        spread: Math.random() * 70 + 60, // 60-130 spread
        startVelocity: Math.random() * 35 + 25, // 25-60 velocity
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2, // Random position
        },
      });
    }
    // Handle Realistic with 5 simultaneous bursts (avoid flattened cone)
    else if (name === 'Realistic') {
      // Fire 5 bursts SIMULTANEOUSLY with different parameters
      fire({ ...config, spread: 26, startVelocity: 55 });
      fire({ ...config, spread: 60 });
      fire({ ...config, spread: 100, decay: 0.91, scalar: 0.8 });
      fire({ ...config, spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire({ ...config, spread: 120, startVelocity: 45 });
    }
    // Handle Fireworks with RAPID overlapping bursts (like canvas-confetti)
    else if (name === 'Fireworks') {
      const duration = 15 * 1000; // 15 seconds of fireworks
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, particleCount: 50 };
      
      const fireworksLoop = () => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return;
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        // Fire BOTH sides simultaneously for massive overlap
        fire({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.1, y: Math.random() * 0.5 + 0.3 },
        });
        fire({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.1 + 0.9, y: Math.random() * 0.5 + 0.3 },
        });
        
        // MUCH faster interval for continuous overlapping effect!
        setTimeout(fireworksLoop, 250);
      };
      
      fireworksLoop(); // Start immediately
    }
    // Handle Stars with RAPID overlapping bursts (like canvas-confetti)
    else if (name === 'Stars') {
      const defaults: ConfettiConfig = {
        spread: 360,
        particleCount: 50,
        startVelocity: 20,
        decay: 0.95,
        gravity: 0.5,
        shapes: ['star'],
        scalar: 1.5,
        colors: ['#FFD700', '#FFA500', '#FFFF00'],
      };
      
      // Fire multiple bursts immediately (overlapping)
      fire(defaults);
      fire({ ...defaults, particleCount: 25 });
      fire({ ...defaults, particleCount: 25 });
      
      // Add a few more for dramatic effect
      setTimeout(() => {
        fire({ ...defaults, particleCount: 30 });
        fire({ ...defaults, particleCount: 20 });
      }, 50);
    }
    // Normal presets
    else {
      fire(config);
    }
  };

  const handleCustom = (config: ConfettiConfig, name: string) => {
    setLastPreset(name);
    fire(config);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>🎉 Confetti Demo</Text>
        <Text style={styles.subtitle}>
          Powered by Reanimated 4
        </Text>
        {lastPreset ? (
          <Text style={styles.lastPreset}>Last: {lastPreset}</Text>
        ) : null}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Canvas-Confetti Examples</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handlePreset('Basic Cannon', presets.basicCannon)}>
            <Text style={styles.buttonText}>🎉 Basic Cannon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handlePreset('Random Direction', presets.randomDirection)}>
            <Text style={styles.buttonText}>🎲 Random Direction</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handlePreset('Realistic', presets.realistic)}>
            <Text style={styles.buttonText}>✨ Realistic</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handlePreset('Fireworks', presets.fireworks)}>
            <Text style={styles.buttonText}>🎆 Fireworks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => handlePreset('Stars', presets.stars)}>
            <Text style={styles.buttonText}>⭐ Stars</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            react-native-confetti-reanimated
          </Text>
          <Text style={styles.footerSubtext}>
            Compatible with canvas-confetti
          </Text>
        </View>
      </ScrollView>

      <ConfettiCanvas ref={confettiRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 4,
  },
  lastPreset: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#007bff',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  accentButton: {
    backgroundColor: '#28a745',
  },
  customButton: {
    backgroundColor: '#17a2b8',
  },
  warningButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
});

