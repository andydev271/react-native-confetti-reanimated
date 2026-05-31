# Release v0.1.8

## Publish steps

```bash
cd /path/to/react-native-confetti-reanimated
npm install
npm run typescript
npm run lint
npm run prepare   # builds lib/ via react-native-builder-bob
git add .
git commit -m "Release v0.1.8: canvas-confetti tick physics parity"
git tag -a v0.1.8 -m "v0.1.8"
git push origin main
git push origin v0.1.8
npm publish --access public
```

Create a GitHub release from tag `v0.1.8` and paste the [0.1.8] section from `CHANGELOG.md`.

## Verify

```bash
npm view react-native-confetti-reanimated version
npm pack --dry-run
```

## Consumer upgrade

```bash
npx expo install react-native-confetti-reanimated@0.1.8
```

Use `ticks: 200` (default) and canvas-confetti-style options; avoid long `duration` with very slow custom gravity unless intentional.
