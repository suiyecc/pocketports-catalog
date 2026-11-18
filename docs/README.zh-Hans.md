# PocketPorts 掌上移植图鉴

[English](../README.md) · 简体中文 · [繁體中文](README.zh-Hant.md)

按设备查找主机和 PC 游戏的移植项目，比较 Android、iPhone、iPad、macOS、Windows 和 Linux 对应的上游仓库、安装方式及所需原版文件。

**按游玩设备浏览** · [Android](https://www.xsmth.com/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_android#catalog?platform=Android) · [iPhone / iPad](https://www.xsmth.com/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_ios#catalog?platform=iOS) · [macOS](https://www.xsmth.com/platforms/macos/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_macos) · [Windows](https://www.xsmth.com/platforms/windows/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_windows) · [Linux](https://www.xsmth.com/platforms/linux/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_linux)

**PC 原作移植** · [macOS](https://www.xsmth.com/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_pc_macos#catalog?origin=PC&platform=macOS) · [iPhone / iPad](https://www.xsmth.com/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_pc_ios#catalog?origin=PC&platform=iOS) · [Android](https://www.xsmth.com/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_pc_android#catalog?origin=PC&platform=Android) · [Linux](https://www.xsmth.com/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_pc_linux#catalog?origin=PC&platform=Linux)

**按原作发行系统浏览** · [Windows 原作](https://www.xsmth.com/original-platforms/windows/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_origin_windows) · [macOS 原作](https://www.xsmth.com/original-platforms/macos/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_origin_macos)

例如，想在 Mac 上玩 Windows 老游戏，可以在站内同时选择「原作发行系统」Windows 和「目标平台」macOS。经典 Mac OS、DOS 和 Linux 的原作发行记录也可单独查询。

## 《过山车大亨 2》在 Android 和 iPad 上分别用哪个项目？

| 设备 | 项目方说明 | 需要准备什么 |
| --- | --- | --- |
| Android | [OpenRCT2](https://github.com/OpenRCT2/OpenRCT2/wiki/Android) | 安装 Android APK，再按项目说明导入 RCT2 原版数据和 OpenRCT2 所需文件。 |
| iPad | [OpenRCT2 Touch](https://github.com/chrissotraidis/OpenRCT2Touch/blob/ipad/readme.md) | 构建并签名这个支持触控的 iPad 分支，再通过「文件」导入自己的 RCT2 或 RCT Classic 数据。维护者记录了 iPad Pro 真机测试，当前提供源码预览。 |

[查看《过山车大亨 2》的移植对照及安装说明 →](https://www.xsmth.com/games/openrct2/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_rct2#ports)

## 《塞尔达传说：魔吉拉的假面》的两个 Android 版本怎么选？

| Android 项目 | 实现方式 | 安装前先看 |
| --- | --- | --- |
| [2 Ship 2 Harkinian](https://github.com/linkzenic/2ship2harkinian-Android/blob/android/README.md) | 反编译移植 | 需要 OpenGL ES 3.0。首次启动 APK 时选择兼容的 `MM.z64`，应用会在设备上生成 `mm.o2r`。 |
| [Zelda64 Recompiled](https://github.com/linkzenic/Zelda64Recomp-Android/blob/android-port/README.md) | 静态重编译 | 这个测试版使用 RT64，需要 64 位 ARM 设备和可用的 Vulkan 驱动。维护者列出的主要测试机型是骁龙／Adreno 掌机。 |

[查看《魔吉拉的假面》的移植对照及安装说明 →](https://www.xsmth.com/games/majoras-mask-2ship/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hans_majoras_mask#ports)

## 复用目录数据

[data/catalog.json](../data/catalog.json) 为每款游戏提供稳定 ID、三语名称、三语详情页和项目列表。每个项目记录目标平台、各平台对应的上游依据和运行所需的游戏数据。 `original_platforms` 列出已核实的原作发行系统和资料出处。空数组表示原作发行系统尚待整理。

运行以下命令可用 Node.js 从已发布目录更新快照并在本地校验。

```sh
node scripts/update-catalog.mjs
node scripts/validate.mjs
```

## 报告资料错误

安装文档迁址、新增平台支持，或发现原版文件要求有误时，可以[提交目录纠错](https://github.com/suiyecc/pocketports-catalog/issues/new?template=correction.yml)，并附能证明改动的上游 README、发行记录或构建说明。[贡献指南](../CONTRIBUTING.md)

## 许可与署名

PocketPorts 原创的目录内容采用 CC BY 4.0，本仓库的脚本采用 MIT。链接到的游戏、代码、美术和商标由各自权利人管理。[许可及署名方式](../LICENSE)
