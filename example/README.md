# Confetti Example App

Demo app showcasing react-native-confetti-reanimated features.

## Running the Example

### Installation

```bash
cd example
npm install
```

### Start the App

```bash
npm start
```

Then:
- Scan QR code with Expo Go app
- Press `i` for iOS simulator
- Press `a` for Android emulator

### Features Demonstrated

#### Preset Effects
- 🎊 Celebration
- 🎆 Fireworks
- ✨ Realistic
- ❄️ Snow
- ⭐ Stars

#### Directional
- ⬅️ Left Cannon
- ➡️ Right Cannon
- ⬆️ Bottom Cannon

#### Custom Effects
- 🌈 RGB Explosion
- 💰 Golden Rain
- 💕 Pink Party
- 🎯 Double Side Burst
- 💥 Continuous Burst

## Recording Demos

To create demo GIFs for the README:

### iOS Simulator

```bash
xcrun simctl io booted recordVideo demo.mov
# Press Ctrl+C to stop
ffmpeg -i demo.mov -vf "fps=30,scale=320:-1" demo.gif
```

### Android Emulator

```bash
adb shell screenrecord /sdcard/demo.mp4
# Press Ctrl+C to stop
adb pull /sdcard/demo.mp4
ffmpeg -i demo.mp4 -vf "fps=30,scale=320:-1" demo.gif
```

Save the GIF to `../assets/demo.gif`

## Troubleshooting

### App won't start?

1. Clear cache: `expo start -c`
2. Update Expo Go app
3. Ensure you're on the same network

### Confetti not appearing?

1. Check that Reanimated and Worklets are installed
2. Verify Babel config has both plugins
3. Restart the app completely

## Learn More

- [Main README](../README.md)
- [Examples Documentation](../docs/EXAMPLES.md)
- [Installation Guide](../INSTALLATION.md)
