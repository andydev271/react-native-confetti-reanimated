# 🎉 react-native-confetti-reanimated

A high-performance confetti component for React Native, powered by [Reanimated 4](https://docs.swmansion.com/react-native-reanimated/). Uses the same tick-based physics as [canvas-confetti](https://github.com/catdad/canvas-confetti). Works with Expo.

[![npm version](https://img.shields.io/npm/v/react-native-confetti-reanimated.svg)](https://www.npmjs.com/package/react-native-confetti-reanimated)
[![license](https://img.shields.io/npm/l/react-native-confetti-reanimated.svg)](https://github.com/andydev271/react-native-confetti-reanimated/blob/main/LICENSE)

## Features

- 🚀 **UI-thread animation** — Reanimated 4 `useFrameCallback`
- 📱 **Expo compatible** — SDK 50+ (tested with SDK 54)
- 🎨 **canvas-confetti parity** — Same `updateFetti` model (scalar velocity, `gravity * 3`, tick lifecycle)
- 🎭 **Shapes** — Squares, circles, stars
- 🎯 **Presets** — Cannon, fireworks, stars, and more
- 📦 **TypeScript** — Full types included

## Installation

```bash
npm install react-native-confetti-reanimated react-native-reanimated
```

Expo:

```bash
npx expo install react-native-confetti-reanimated react-native-reanimated
```

### Setup

**Expo (SDK 50+):** Reanimated is included in `babel-preset-expo`. Restart the app after install.

**React Native CLI:** Add to `babel.config.js` (worklets before reanimated):

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-worklets/plugin', 'react-native-reanimated/plugin'],
};
```

## Quick Start

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { ConfettiCanvas, useConfetti } from 'react-native-confetti-reanimated';

export default function App() {
  const { confettiRef, fire } = useConfetti();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Celebrate!" onPress={() => fire()} />
      <ConfettiCanvas ref={confettiRef} fullScreen zIndex={9999} />
    </View>
  );
}
```

## Usage Examples

### Presets

```tsx
import { presets } from 'react-native-confetti-reanimated';

fire(presets.basicCannon);
fire(presets.fireworks);
fire(presets.stars);
```

### Match web `canvas-confetti` defaults

```tsx
fire({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.8 },
  colors: ['#FFD700', '#FFA500', '#FF6347', '#4169E1', '#32CD32'],
  // ticks: 200 is the default (same as canvas-confetti)
});
```

### Custom burst

```tsx
fire({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  shapes: ['square', 'circle', 'star'],
  startVelocity: 45,
  gravity: 1,
  decay: 0.9,
  ticks: 200,
});
```

## API Reference

### `ConfettiCanvas`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerStyle` | `StyleProp<ViewStyle>` | — | Container style |
| `zIndex` | `number` | `1000` | Layer z-index |
| `fullScreen` | `boolean` | `true` | Cover the screen |

### `useConfetti()`

Returns `{ confettiRef, fire, reset }`.

- Pass `confettiRef` to `ConfettiCanvas`.
- `fire(config?)` launches a burst (returns a `Promise` resolved after cleanup timeout).
- `reset()` clears all particles.

### `ConfettiConfig`

| Option | Default | Description |
|--------|---------|-------------|
| `particleCount` | `50` | Number of pieces |
| `angle` | `90` | Launch angle (degrees) |
| `spread` | `45` | Spread (degrees) |
| `startVelocity` | `45` | Initial speed |
| `decay` | `0.9` | Velocity multiplier per tick |
| `gravity` | `1` | Passed as `gravity * 3` per tick (canvas-confetti) |
| `drift` | `0` | Horizontal drift per tick |
| `ticks` | `250` | Animation steps (one per frame, like canvas-confetti) |
| `fadeTicks` | `60` | Opacity fade only in the last N steps (~1s at 60fps) |
| `duration` | derived | Cleanup timeout in ms; default `ticks / 60 * 1000` |
| `colors` | built-in palette | Hex/rgb strings |
| `scalar` | `1` | Particle size scale |
| `origin` | `{ x: 0.5, y: 0.5 }` | Normalized 0–1 position |
| `shapes` | `['square']` | `'square' \| 'circle' \| 'star'` |
| `tilt` | `true` | 3D tilt / wobble (set `false` for flat mode) |

### Physics model (v0.1.8+)

Animation length is controlled by **`ticks`** (default **200**), with **one physics step per frame** — the same model as canvas-confetti:

- `x += cos(angle2D) * velocity + drift`
- `y += sin(angle2D) * velocity + (gravity * 3)`
- `velocity *= decay`
- Opacity fades with `tick / totalTicks`

Prefer **`ticks`** over very large `duration` values. Low `gravity` / `startVelocity` on the app side will look slower than web even when the library is correct.

### Presets

`presets.basicCannon`, `randomDirection`, `realistic`, `fireworks`, `stars`, `leftCannon`, `rightCannon`, `bottomCannon`

### Utilities

```ts
import { durationFromTicks, DEFAULT_CONFIG } from 'react-native-confetti-reanimated';

durationFromTicks(200); // 3333 ms cleanup timeout
```

## Example app

```bash
cd example
npm install
npm start
```

## Platform support

- iOS
- Android
- Expo (SDK 50+)

## Requirements

- React ≥ 18
- React Native ≥ 0.74 (New Architecture / Fabric)
- React Native Reanimated ≥ 4

## Troubleshooting

**Confetti not showing**

1. `ConfettiCanvas` must be mounted (e.g. global provider + `zIndex`).
2. Restart Metro after Babel changes: `npx expo start --clear`.
3. Confirm Reanimated 4 + Fabric are enabled.

**Looks slower or faster than web**

- Use the same `particleCount`, `spread`, `startVelocity`, `gravity`, `decay`, and `ticks` as canvas-confetti (defaults are aligned in v0.1.8).
- Tick-based animation completes in `ticks / refreshRate` seconds (e.g. 200 frames ≈ 3.3s at 60Hz, ≈ 1.7s at 120Hz), same as web in the browser.

**Performance**

- Keep `particleCount` around 50–120 for mobile.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT © [Andy A](https://github.com/andydev271)

## Credits

- [canvas-confetti](https://github.com/catdad/canvas-confetti) by @catdad
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
