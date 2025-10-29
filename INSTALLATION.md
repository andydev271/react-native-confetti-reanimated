# Installation Guide

## Quick Install

### With npm

```bash
npm install react-native-confetti-reanimated react-native-reanimated react-native-worklets
```

### With Expo

```bash
npx expo install react-native-confetti-reanimated react-native-reanimated react-native-worklets
```

## Requirements

- React Native ≥ 0.74 (New Architecture/Fabric)
- React Native Reanimated ≥ 4.0.0
- React Native Worklets ≥ 0.5.0
- Expo SDK ≥ 50 (if using Expo)

> **Important**: Reanimated 4 only works with React Native's New Architecture (Fabric). Make sure your app is using Fabric.

## Setup

### For Expo Projects

Update your `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-worklets/plugin',
    ],
  };
};
```

### For React Native CLI Projects

Update your `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
  ],
};
```

> ⚠️ **Critical**: The `react-native-worklets/plugin` must be listed **last** in the plugins array!

### Rebuild

After updating Babel config:

**For Expo:**
```bash
expo start -c
```

**For React Native CLI:**

iOS:
```bash
cd ios && pod install && cd ..
npx react-native start --reset-cache
npx react-native run-ios
```

Android:
```bash
npx react-native start --reset-cache
npx react-native run-android
```

## Verification

Test the installation:

```tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ConfettiCanvas, useConfetti } from 'react-native-confetti-reanimated';

export default function TestConfetti() {
  const { confettiRef, fire } = useConfetti();

  return (
    <View style={styles.container}>
      <Button title="Test 🎉" onPress={() => fire()} />
      <ConfettiCanvas ref={confettiRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

Press the button - you should see confetti! 🎉

## Troubleshooting

### "Cannot find module 'react-native-worklets/plugin'"

**Solution**: Install the worklets package:
```bash
npm install react-native-worklets
```

### "Worklets plugin has to be listed last"

**Solution**: Move `react-native-worklets/plugin` to the end of the plugins array.

### "New Architecture is not enabled"

**Solution**: Make sure you're using:
- React Native 0.74+
- Expo SDK 50+
- New Architecture enabled in your app

For Expo, New Architecture is enabled by default in SDK 50+.

### Build fails on iOS

**Solution**:
```bash
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
npx react-native start --reset-cache
npx react-native run-ios
```

### Build fails on Android

**Solution**:
```bash
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache
npx react-native run-android
```

### Confetti not animating

**Solution**:
1. Verify New Architecture is enabled
2. Check Babel plugin is configured
3. Restart app completely
4. Clear Metro cache

## Next Steps

- 📖 Read the [README](./README.md) for usage examples
- 🎯 Check out the [example app](./example)
- 🐛 [Report issues](https://github.com/andydev271/react-native-confetti-reanimated/issues)
