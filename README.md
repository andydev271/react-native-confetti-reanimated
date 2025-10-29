# 🎉 react-native-confetti-reanimated

A high-performance confetti component for React Native, powered by [Reanimated 4](https://docs.swmansion.com/react-native-reanimated/). Inspired by [canvas-confetti](https://github.com/catdad/canvas-confetti), fully compatible with Expo.

[![npm version](https://img.shields.io/npm/v/react-native-confetti-reanimated.svg)](https://www.npmjs.com/package/react-native-confetti-reanimated)
[![license](https://img.shields.io/npm/l/react-native-confetti-reanimated.svg)](https://github.com/andydev271/react-native-confetti-reanimated/blob/main/LICENSE)

## Features

- 🚀 **High Performance** - Built with Reanimated 4 for smooth 60fps animations on UI thread
- 📱 **Expo Compatible** - Works seamlessly with Expo managed workflow
- 🎨 **Fully Customizable** - Control colors, shapes, physics, and more
- 🎭 **Multiple Shapes** - Supports squares, circles, and stars
- 🎯 **Preset Effects** - Ready-to-use effects like fireworks, stars, and realistic confetti
- 🌈 **Canvas Confetti API** - Familiar API inspired by canvas-confetti
- 📦 **TypeScript** - Full TypeScript support
- 🔧 **Lightweight** - Minimal dependencies

## Installation

```bash
npm install react-native-confetti-reanimated react-native-reanimated
```

Or with Expo:

```bash
npx expo install react-native-confetti-reanimated react-native-reanimated
```

### Setup

Add the Babel plugin to your `babel.config.js`:

**For Expo projects (SDK 50+):**

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated plugin is automatically included in Expo SDK 50+
  };
};
```

**For React Native CLI projects:**

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    'react-native-reanimated/plugin',
  ],
};
```

> ⚠️ **Important**: For Expo, plugins are auto-included. For React Native CLI, add both plugins (worklets before reanimated). Restart your app after changes.

## Quick Start

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { ConfettiCanvas, useConfetti } from 'react-native-confetti-reanimated';

export default function App() {
  const { confettiRef, fire } = useConfetti();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="🎉 Celebrate!" onPress={() => fire()} />
      <ConfettiCanvas ref={confettiRef} />
    </View>
  );
}
```

## Usage Examples

### Using Presets

```tsx
import { presets } from 'react-native-confetti-reanimated';

// Basic cannon burst
fire(presets.basicCannon);

// Random direction (different each time)
fire(presets.randomDirection);

// Realistic confetti (mixed bursts)
fire(presets.realistic);

// Fireworks effect (continuous from sides)
fire(presets.fireworks);

// Stars burst
fire(presets.stars);
```

### Custom Configuration

```tsx
fire({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  shapes: ['square', 'circle', 'triangle'],
  startVelocity: 45,
  gravity: 1,
  decay: 0.9,
});
```

### Directional Effects

```tsx
// Left cannon
fire(presets.leftCannon);

// Right cannon
fire(presets.rightCannon);

// Bottom cannon (shoot upward)
fire(presets.bottomCannon);
```

### Continuous Effect

```tsx
const startContinuous = () => {
  const interval = setInterval(() => {
    fire({ particleCount: 10 });
  }, 200);

  // Stop after 3 seconds
  setTimeout(() => clearInterval(interval), 3000);
};
```

## API Reference

### `ConfettiCanvas`

Main component that renders confetti particles.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerStyle` | `StyleProp<ViewStyle>` | `undefined` | Custom style for container |
| `zIndex` | `number` | `1000` | Z-index of confetti layer |
| `fullScreen` | `boolean` | `true` | Whether to cover full screen |

### `useConfetti()`

Hook for controlling confetti.

**Returns:**
- `confettiRef` - Ref to pass to ConfettiCanvas
- `fire(config?)` - Function to trigger confetti
- `reset()` - Clear all confetti

### Configuration Options

```typescript
interface ConfettiConfig {
  particleCount?: number;      // Default: 50
  angle?: number;              // Default: 90 (degrees)
  spread?: number;             // Default: 45 (degrees)
  startVelocity?: number;      // Default: 45
  decay?: number;              // Default: 0.9
  gravity?: number;            // Default: 1
  drift?: number;              // Default: 0
  duration?: number;           // Default: 3000 (ms)
  colors?: string[];           // Default: vibrant colors
  scalar?: number;             // Default: 1
  origin?: { x?: number; y?: number }; // Default: { x: 0.5, y: 0.5 }
  shapes?: Array<'square' | 'circle' | 'star'>; // Default: ['square']
  tilt?: boolean;              // Default: true
  tiltAngleIncrement?: number; // Default: 10
}
```

### Available Presets

```typescript
presets.basicCannon      // 🎊 Basic celebration burst
presets.randomDirection  // 🎲 Random direction & amount
presets.realistic        // ✨ Realistic confetti (mixed bursts)
presets.fireworks        // 🎆 Continuous fireworks from sides
presets.stars            // ⭐ Golden star burst
presets.leftCannon       // ⬅️ Left side cannon
presets.rightCannon      // ➡️ Right side cannon
presets.bottomCannon     // ⬆️ Bottom cannon
```

## Example App

Check out the `example` directory for a complete demo app with all features:
- 🎊 Basic Cannon
- 🎲 Random Direction  
- ✨ Realistic Look
- 🎆 Fireworks
- ⭐ Stars

```bash
cd example
npm install
npm start
```

Then use Expo Go to scan the QR code or press `i` for iOS / `a` for Android.

## Platform Support

- ✅ iOS
- ✅ Android  
- ✅ Expo (SDK 50+, tested with SDK 54)

## Requirements

- React ≥ 18.0.0 (tested with React 19)
- React Native ≥ 0.74 (New Architecture/Fabric required)
- React Native Reanimated ≥ 4.0.0
- Expo SDK ≥ 50 (tested with SDK 54)

> **Note**: Reanimated 4 requires React Native's New Architecture (Fabric). Expo SDK 50+ has this enabled by default.

## Troubleshooting

### Confetti not appearing?

1. Ensure `ConfettiCanvas` is in your component tree
2. Verify Babel plugin is configured (`react-native-worklets/plugin`)
3. Restart your app completely after Babel changes
4. Clear Metro cache: `npx react-native start --reset-cache`
5. Make sure you're using React Native New Architecture (Fabric)

### Performance issues?

- Reduce `particleCount` (recommended: 50-100)
- Shorten `duration` (recommended: 2-3 seconds)
- Ensure you're using the latest version of Reanimated

### TypeScript errors?

```bash
npm install --save-dev @types/react @types/react-native
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT © [Andy A](https://github.com/andydev271)

## Credits

- Inspired by [canvas-confetti](https://github.com/catdad/canvas-confetti) by @catdad
- Built with [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) v4
- Uses [react-native-worklets](https://github.com/software-mansion/react-native-worklets)

## Links

- 📦 [npm](https://www.npmjs.com/package/react-native-confetti-reanimated)
- 🐛 [Issues](https://github.com/andydev271/react-native-confetti-reanimated/issues)
- 💬 [Discussions](https://github.com/andydev271/react-native-confetti-reanimated/discussions)

---

Made with ❤️ and confetti
