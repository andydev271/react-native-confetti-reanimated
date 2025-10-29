# Release v0.1.2

## Quick Publish Steps

```bash
# 1. Final build
cd /var/www/github/react-native-confetti-reanimated
npm run prepare

# 2. Commit and tag
git add .
git commit -m "Release v0.1.2: Canvas-confetti exact physics"
git tag -a v0.1.2 -m "v0.1.2"

# 3. Push to GitHub
git push origin main
git push origin v0.1.2

# 4. Publish to npm
npm login  # if needed
npm publish

# 5. Create GitHub Release
# https://github.com/andydev271/react-native-confetti-reanimated/releases/new
# Tag: v0.1.2
# Copy description from CHANGELOG.md
```

## Verification

```bash
# Check npm
npm view react-native-confetti-reanimated

# Test install
mkdir /tmp/test && cd /tmp/test
npm init -y
npm install react-native-confetti-reanimated@0.1.2
```

Done! 🎉

