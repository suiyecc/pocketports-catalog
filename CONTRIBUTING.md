# Contributing to PocketPorts

Corrections and new project suggestions are welcome in English, 简体中文 or 繁體中文. [Open the catalog correction form](https://github.com/suiyecc/pocketports-catalog/issues/new?template=correction.yml).

## What helps a maintainer verify a change

- Identify the game and the specific project. For an existing entry, include its PocketPorts game ID or game page and the upstream `owner/repository`.
- Identify what changed. A device that can run the port and a system that received an original release are separate pieces of information. For example, an iPadOS source build does not by itself establish that the original game shipped for Mac.
- Link the strongest public evidence. Use the project's platform guide, build instructions or dated release for a port. For an original release, use the developer, publisher or another reliable edition-specific source.
- Describe the observed limitation when it matters. An APK, a build recipe and a test reported on one physical device answer different questions. If you tested a port yourself, include the app version, device and OS.

Please link to instructions and list required filenames where useful. Keep ROMs, extracted game data, keys, copyrighted artwork and personal contact information out of public issues. The [private contact form](https://www.xsmth.com/en/contact/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=contributing_contact) is available for rights notices.

## Updating the snapshot

`data/catalog.json` is generated from the published PocketPorts catalog. Maintainers verify the evidence, update the source listing and regenerate the snapshot. For a factual correction, open an issue so the change also reaches the website and survives the next export.

Run these commands from the repository root after updating the source listing:

```sh
node scripts/update-catalog.mjs
node scripts/validate.mjs
```

[License and attribution](LICENSE)
