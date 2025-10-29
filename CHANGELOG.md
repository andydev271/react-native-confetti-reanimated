# Changelog

All notable changes to this project will be documented in this file.

## [0.1.3] - 2025-10-29

### Fixed
- TypeScript types: Added 'star' shape to compiled type definitions
- ESLint configuration: Removed project reference and added ignorePatterns to exclude example folder
- ESLint warnings: Fixed trailing commas in function parameters
- Inline style warning: Moved static star styles to StyleSheet

## [0.1.2] - 2025-01-XX

### Added
- **Canvas-confetti exact physics**: Implemented wobble, tilt, and 3D-like scaling from canvas-confetti source
- **Progressive opacity fade**: Particles fade linearly over their lifetime for smooth disappearance
- **20 highly contrasting colors**: Maximum color distinction for realistic confetti appearance
- **Speed-based rotation**: Particles spin faster when moving fast, slower when slowing down
- **Continuous overlapping effects**: Fireworks and stars now burst continuously with overlapping particles

### Changed
- Particles now use canvas-confetti's exact wobble algorithm (circular motion)
- 3D-like depth perception through dynamic scaling based on tilt
- Improved particle dimensions: broader and shorter (6-10px wide, 0.5-0.8 aspect ratio)
- Enhanced spinning: rotation velocity range increased to -50 to 50 degrees/frame

### Removed
- Snow preset (had visibility issues)
- School Pride preset (had timing issues)
- Demo assets and documentation files

### Fixed
- Particle fade now occurs smoothly throughout animation (not just at end)
- Colors are now maximally distinct for clear visibility
- Type errors in example App.tsx and ConfettiParticle.tsx
- Documentation updated to reflect current presets

## [0.1.1] - 2025-10-29

### Fixed
- Fixed Babel configuration for Expo SDK 50+
  - Removed manual worklets plugin (automatically included in Expo preset)
  - Updated documentation with correct Babel setup
  - Fixed "Cannot set properties of undefined (setting 'workletNumber')" error
- Fixed duplicate dependencies issue in example app
- Updated to React 19 and React Native 0.81.5 for Expo SDK 54 compatibility

### Added
- Demo GIF showing confetti effects
- Clearer documentation for Expo vs React Native CLI setup

### Changed
- Updated README with correct Babel configuration instructions
- Improved installation guide for Expo users
- Removed react-native-worklets from installation (included with Reanimated 4)
- Updated peerDependencies to be more flexible

## [0.1.0] - 2025-10-29

### Initial Release

#### Features
- Core confetti component with Reanimated 4
- Support for multiple shapes (square, circle, triangle)
- Customizable colors, physics, and animation parameters
- Preset effects (celebration, fireworks, snow, stars, directional cannons)
- Full TypeScript support
- Expo compatibility (SDK 50+)
- Example app with demonstrations

#### Technical
- React Native Reanimated 4.0+
- React Native Worklets integration
- TypeScript with ES2022 standards
- Runs on UI thread for smooth performance
- Compatible with React Native New Architecture (Fabric)

#### Requirements
- React Native ≥ 0.74
- React Native Reanimated ≥ 4.0.0
- React Native Worklets ≥ 0.5.0
- Expo SDK ≥ 50 (tested with SDK 54)

[0.1.1]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.1
[0.1.0]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.0
