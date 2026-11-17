# PocketPorts

English · [简体中文](docs/README.zh-Hans.md) · [繁體中文](docs/README.zh-Hant.md)

Find the right game port for your device. Compare the upstream projects that bring PC and console games to Android, iPhone, iPad, macOS and Windows.

**Browse by device** · [Android](https://www.xsmth.com/en/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_en_android#catalog?platform=Android) · [iPhone / iPad](https://www.xsmth.com/en/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_en_ios#catalog?platform=iOS) · [macOS](https://www.xsmth.com/en/platforms/macos/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_en_macos) · [Windows](https://www.xsmth.com/en/platforms/windows/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_en_windows)

**Original releases** · [Windows originals](https://www.xsmth.com/en/original-platforms/windows/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_en_origin_windows) · [macOS originals](https://www.xsmth.com/en/original-platforms/macos/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_en_origin_macos)

Device links show where a port runs today. Original-release links show games issued for Windows or Mac OS X / macOS. The full catalog also distinguishes Classic Mac OS, DOS and Linux releases.

## RollerCoaster Tycoon 2 on Android and iPad

| Device | Project guide | What you need |
| --- | --- | --- |
| Android | [OpenRCT2](https://github.com/OpenRCT2/OpenRCT2/wiki/Android) | Install the Android APK and follow the project’s instructions for importing RCT2 and OpenRCT2 data. |
| iPad | [OpenRCT2 Touch](https://github.com/chrissotraidis/OpenRCT2Touch/blob/ipad/readme.md) | Build and sign the touch-oriented iPad fork, then import your RCT2 or RCT Classic data through Files. The maintainer documents a physical iPad Pro test and distributes a source preview. |

[Compare the RollerCoaster Tycoon 2 ports →](https://www.xsmth.com/en/games/openrct2/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_en_rct2#ports)

## Which Android port of Majora’s Mask fits my phone?

| Android project | Approach | Before installing |
| --- | --- | --- |
| [2 Ship 2 Harkinian](https://github.com/linkzenic/2ship2harkinian-Android/blob/android/README.md) | Decompilation | Requires OpenGL ES 3.0. The APK asks for a compatible `MM.z64` and generates `mm.o2r` on the device. |
| [Zelda64 Recompiled](https://github.com/linkzenic/Zelda64Recomp-Android/blob/android-port/README.md) | Static recompilation | The beta uses RT64 and needs a 64-bit ARM device with a working Vulkan driver. The maintainer lists Snapdragon/Adreno handhelds as the primary test devices. |

[Compare the Majora’s Mask ports →](https://www.xsmth.com/en/games/majoras-mask-2ship/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_en_majoras_mask#ports)

## Use the catalog

Each game in [data/catalog.json](data/catalog.json) has a stable ID, names and pages in three languages, and a list of projects. Each project records the target platforms, the upstream evidence for each platform, and the game data the player needs. `original_platforms` lists the original game’s documented platforms and source links. An empty list means the original platforms have not yet been cataloged.

Use Node.js to refresh the snapshot from the published catalog and check it locally.

```sh
node scripts/update-catalog.mjs
node scripts/validate.mjs
```

## Report a correction

Found a moved guide, a new supported platform or an incorrect game-data requirement? [Submit a catalog correction](https://github.com/suiyecc/pocketports-catalog/issues/new?template=correction.yml) with the upstream README, release note or build guide that supports the change. [Contribution guide](CONTRIBUTING.md).

## Reuse

PocketPorts licenses its original catalog material under CC BY 4.0 and the scripts in this repository under MIT. Linked games, code, artwork and trademarks retain their respective rights. [License and attribution](LICENSE).
