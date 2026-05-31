# Changelog

All notable changes to this project will be documented in this file.

## [0.1.11] - 2026-05-31

### Fixed
- **Ghost bursts at end of animation**: `ConfettiParticle` no longer resets when the parent re-renders (e.g. per-particle cleanup). `onComplete` is held in a ref; init effect depends on `particle.id` and lifetime config only.

## [0.1.10] - 2026-05-31

### Fixed
- Revert oversized “solid block” look: removed `PixelRatio` size boost; thin strips (width 6–10px, height ~30% of width).
- Restore canvas-style dynamic `scaleX`/`scaleY` from wobble/tilt so rectangles read as tumbling paper, not flat chips.
- Smaller circles (4–7px) instead of enlarged dots.

## [0.1.9] - 2026-05-31

### Fixed
- **Larger party-style particles**: Increased strip dimensions with light density scaling; default shapes `square` + `circle`.
- **Full-size rendering**: Removed transform `scaleX`/`scaleY` that shrank rectangles to tiny dots; use wobble rotation like canvas-confetti.
- **Longer fall**: Default `ticks` 250 so pieces travel further before the animation ends.
- **End fade**: New `fadeTicks` (default 60) — full opacity until the last ~1s, then fade out (matches “party” finish).

## [0.1.8] - 2026-05-30

### Fixed
- **canvas-confetti parity**: Physics now use the same tick-based `updateFetti` model as [canvas-confetti](https://github.com/catdad/canvas-confetti) (scalar velocity, `gravity * 3`, one step per frame).
- Removed wall-clock delta integration that made animations feel too slow or inconsistent vs web.
- Lifecycle is driven by `ticks` (default 200), not extended `duration` alone.

### Changed
- Particle model uses `angle2D`, scalar `velocity`, and per-particle `gravity`/`decay`/`drift` matching canvas-confetti.

## [0.1.7] - 2026-01-28

### Changed
- **Rotation speed adjustment**: Rotation now slows down more dramatically as particles fall
- Increased speedBoost divisor from 20 to 35 for more pronounced speed-based rotation reduction
- Particles rotate faster when moving fast and slow down rotation more as they decelerate

## [0.1.6] - 2026-01-28

### Fixed
- **Frame-rate independence**: Fixed animation speed inconsistency between simulators and real devices
- Physics calculations now use delta-time instead of frame-based updates
- Optimized to use `frameInfo.timestamp` and `timeSincePreviousFrame` for better performance
- Confetti animation speed is now consistent across all devices (30fps, 60fps, 120fps)
- Improved handling of edge cases (first frame, background resume)

## [0.1.5] - 2026-01-28

### Fixed
- **Frame-rate independence**: Fixed animation speed inconsistency between simulators and real devices
- Physics calculations now use delta-time instead of frame-based updates
- Confetti animation speed is now consistent across all devices (30fps, 60fps, 120fps)
- Improved handling of edge cases (first frame, background resume)

## [0.1.4] - 2026-01-23

### Fixed
- Respect `ticks`/`tickDuration` to control animation length and fade timing
- Derive duration from ticks when provided for consistent fall/fade behavior

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

[0.1.7]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.7
[0.1.6]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.6
[0.1.5]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.5
[0.1.4]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.4
[0.1.3]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.3
[0.1.2]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.2
[0.1.1]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.1
[0.1.0]: https://github.com/andydev271/react-native-confetti-reanimated/releases/tag/v0.1.0
