# Examples

## Basic Usage

### Simple Button Press

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { ConfettiCanvas, useConfetti } from 'react-native-confetti-reanimated';

export default function BasicExample() {
  const { confettiRef, fire } = useConfetti();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="🎉 Celebrate" onPress={() => fire()} />
      <ConfettiCanvas ref={confettiRef} />
    </View>
  );
}
```

## Using Presets

### Celebration

```tsx
import { presets } from 'react-native-confetti-reanimated';

fire(presets.celebration);
```

### Fireworks

```tsx
fire(presets.fireworks);
```

### Snow Effect

```tsx
fire(presets.snow);
```

### Stars

```tsx
fire(presets.stars);
```

## Custom Configurations

### Birthday Celebration

```tsx
fire({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF1493'],
});
```

### Success Notification

```tsx
fire({
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ['#00C851', '#007E33'],
  shapes: ['circle'],
});
```

### Rainbow Effect

```tsx
fire({
  particleCount: 200,
  spread: 180,
  colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
  origin: { y: 0.5 },
});
```

### Golden Rain

```tsx
fire({
  particleCount: 100,
  angle: 90,
  spread: 45,
  startVelocity: 60,
  gravity: 2,
  colors: ['#FFD700', '#FFA500'],
  shapes: ['circle'],
});
```

## Directional Effects

### Left Cannon

```tsx
fire(presets.leftCannon);

// Or custom:
fire({
  particleCount: 50,
  angle: 45,
  spread: 55,
  origin: { x: 0, y: 0.6 },
  startVelocity: 55,
});
```

### Right Cannon

```tsx
fire(presets.rightCannon);

// Or custom:
fire({
  particleCount: 50,
  angle: 135,
  spread: 55,
  origin: { x: 1, y: 0.6 },
  startVelocity: 55,
});
```

### Double Side Burst

```tsx
function doubleBurst() {
  fire({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.6 },
  });

  setTimeout(() => {
    fire({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
    });
  }, 250);
}
```

## Advanced Techniques

### Continuous Effect

```tsx
function ContinuousConfetti() {
  const { confettiRef, fire, reset } = useConfetti();
  const [isActive, setIsActive] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  const startContinuous = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      fire({
        particleCount: 10,
        angle: 90,
        spread: 45,
        origin: { y: 0.7 },
      });
    }, 200);
  };

  const stopContinuous = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    reset();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title={isActive ? 'Stop' : 'Start Continuous'}
        onPress={isActive ? stopContinuous : startContinuous}
      />
      <ConfettiCanvas ref={confettiRef} />
    </View>
  );
}
```

### Random Positions

```tsx
function randomBurst() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      fire({
        particleCount: 30,
        angle: Math.random() * 360,
        spread: 60,
        origin: {
          x: Math.random(),
          y: Math.random(),
        },
      });
    }, i * 200);
  }
}
```

### Victory Screen

```tsx
function celebrateVictory() {
  // Bottom left
  fire({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.8 },
    colors: ['#FFD700', '#FFA500'],
  });

  // Bottom right
  setTimeout(() => {
    fire({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ['#FFD700', '#FFA500'],
    });
  }, 100);

  // Center burst
  setTimeout(() => {
    fire({
      particleCount: 100,
      spread: 360,
      startVelocity: 25,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF6347'],
    });
  }, 200);
}
```

### Trigger on Mount

```tsx
function AchievementScreen() {
  const { confettiRef, fire } = useConfetti();

  useEffect(() => {
    // Trigger confetti when component mounts
    fire(presets.celebration);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 48 }}>🏆 Achievement Unlocked!</Text>
      <ConfettiCanvas ref={confettiRef} />
    </View>
  );
}
```

## Custom Colors

### Warm Theme

```tsx
fire({
  particleCount: 100,
  colors: ['#FF6B6B', '#FFE66D', '#FF8C42', '#FFA07A', '#FA8072'],
});
```

### Cool Theme

```tsx
fire({
  particleCount: 100,
  colors: ['#4ECDC4', '#45B7D1', '#5F9EA0', '#00CED1', '#1E90FF'],
});
```

### Pastel Theme

```tsx
fire({
  particleCount: 100,
  colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'],
});
```

## Physics Customization

### Floaty (Low Gravity)

```tsx
fire({
  particleCount: 100,
  gravity: 0.5,
  decay: 0.95,
  startVelocity: 25,
});
```

### Fast Fall (High Gravity)

```tsx
fire({
  particleCount: 100,
  gravity: 2,
  decay: 0.85,
  startVelocity: 50,
});
```

### With Drift

```tsx
fire({
  particleCount: 100,
  drift: 2, // Drift to the right
  gravity: 1,
});
```

## Tips

- **Performance**: Keep `particleCount` between 50-100 for best performance
- **Duration**: Use 2-3 seconds for most effects
- **Colors**: Limit to 5-7 colors for best visual impact
- **Origin**: `{ x: 0.5, y: 0.6 }` (center, slightly below middle) works well for most cases
- **Shapes**: Mix shapes for more realistic effects: `['square', 'circle', 'triangle']`
