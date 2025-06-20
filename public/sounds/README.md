# Lightsaber Sound Files

This directory contains sound files for the lightsaber cursor feature.

## Directory Structure

```
sounds/
├── lightsaber/
│   ├── standard-ignition.mp3
│   ├── standard-hum.mp3
│   ├── standard-swing.mp3
│   ├── standard-clash.mp3
│   ├── vader-ignition.mp3
│   ├── vader-hum.mp3
│   ├── vader-swing.mp3
│   ├── vader-clash.mp3
│   ├── luke-ignition.mp3
│   ├── luke-hum.mp3
│   ├── luke-swing.mp3
│   ├── luke-clash.mp3
│   ├── obiwan-ignition.mp3
│   ├── obiwan-hum.mp3
│   ├── obiwan-swing.mp3
│   ├── obiwan-clash.mp3
│   ├── kylo-ignition.mp3
│   ├── kylo-hum.mp3
│   ├── kylo-swing.mp3
│   └── kylo-clash.mp3
└── ambient/
    ├── star-wars-subtle.mp3
    ├── imperial-march-subtle.mp3
    ├── force-theme-subtle.mp3
    ├── binary-sunset-subtle.mp3
    └── kylo-theme-subtle.mp3
```

## Sound Types

- **Ignition**: Played when the lightsaber is activated
- **Hum**: Continuous ambient sound while the lightsaber is active
- **Swing**: Played when the lightsaber is swung
- **Clash**: Played when the lightsaber hits something
- **Ambient**: Background music themes that play based on the selected sound font

## Adding New Sound Fonts

To add a new sound font:

1. Add the required sound files to the `lightsaber` directory following the naming convention: `{fontname}-{soundtype}.mp3`
2. Add an ambient theme to the `ambient` directory if desired
3. Update the `getSoundPaths` function in `src/utils/lightsaberUtils.ts` to include the new sound font

## Note

Please ensure all sound files are properly licensed for use in your project. The current placeholder files should be replaced with properly licensed sound files before deployment. 