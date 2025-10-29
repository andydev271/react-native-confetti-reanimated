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

export default function App() {
  const { confettiRef, fire } = useConfetti();
  const [lastPreset, setLastPreset] = useState<string>('');

  const handlePreset = (name: string, config: ConfettiConfig) => {
    setLastPreset(name);
    fire(config);
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
          Powered by Reanimated 3
        </Text>
        {lastPreset ? (
          <Text style={styles.lastPreset}>Last: {lastPreset}</Text>
        ) : null}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preset Effects</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handlePreset('Celebration', presets.celebration)}>
            <Text style={styles.buttonText}>🎊 Celebration</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handlePreset('Fireworks', presets.fireworks)}>
            <Text style={styles.buttonText}>🎆 Fireworks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handlePreset('Realistic', presets.realistic)}>
            <Text style={styles.buttonText}>✨ Realistic</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => handlePreset('Snow', presets.snow)}>
            <Text style={styles.buttonText}>❄️ Snow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => handlePreset('Stars', presets.stars)}>
            <Text style={styles.buttonText}>⭐ Stars</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Directional</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.accentButton]}
            onPress={() => handlePreset('Left Cannon', presets.leftCannon)}>
            <Text style={styles.buttonText}>⬅️ Left Cannon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.accentButton]}
            onPress={() => handlePreset('Right Cannon', presets.rightCannon)}>
            <Text style={styles.buttonText}>➡️ Right Cannon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.accentButton]}
            onPress={() => handlePreset('Bottom Cannon', presets.bottomCannon)}>
            <Text style={styles.buttonText}>⬆️ Bottom Cannon</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Effects</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={() =>
              handleCustom(
                {
                  particleCount: 150,
                  spread: 180,
                  colors: ['#ff0000', '#00ff00', '#0000ff'],
                  origin: { y: 0.4 },
                },
                'RGB Explosion'
              )
            }>
            <Text style={styles.buttonText}>🌈 RGB Explosion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={() =>
              handleCustom(
                {
                  particleCount: 100,
                  spread: 70,
                  startVelocity: 60,
                  gravity: 2,
                  colors: ['#FFD700', '#FFA500'],
                  shapes: ['circle'],
                },
                'Golden Rain'
              )
            }>
            <Text style={styles.buttonText}>💰 Golden Rain</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={() =>
              handleCustom(
                {
                  particleCount: 200,
                  spread: 360,
                  startVelocity: 25,
                  decay: 0.92,
                  gravity: 0.8,
                  drift: 2,
                  shapes: ['square', 'circle', 'triangle'],
                  colors: ['#ff69b4', '#ff1493', '#c71585'],
                },
                'Pink Party'
              )
            }>
            <Text style={styles.buttonText}>💕 Pink Party</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={() => {
              handleCustom(
                {
                  particleCount: 50,
                  angle: 60,
                  spread: 55,
                  origin: { x: 0, y: 0.6 },
                  colors: ['#26ccff', '#a25afd', '#ff5e7e'],
                },
                'Side Burst (Left)'
              );
              setTimeout(() => {
                fire({
                  particleCount: 50,
                  angle: 120,
                  spread: 55,
                  origin: { x: 1, y: 0.6 },
                  colors: ['#26ccff', '#a25afd', '#ff5e7e'],
                });
              }, 250);
            }}>
            <Text style={styles.buttonText}>🎯 Double Side Burst</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={() => {
              const duration = 3000;
              const animationEnd = Date.now() + duration;
              const interval = setInterval(() => {
                if (Date.now() > animationEnd) {
                  clearInterval(interval);
                  return;
                }
                fire({
                  particleCount: 20,
                  angle: 60 + Math.random() * 60,
                  spread: 55,
                  origin: { x: Math.random(), y: Math.random() * 0.5 },
                  colors: ['#bb0000', '#ffffff'],
                });
              }, 200);
              setLastPreset('Continuous Burst');
            }}>
            <Text style={styles.buttonText}>💥 Continuous Burst (3s)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Built with react-native-confetti-reanimated
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
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6c757d',
  },
});

