# PocketPorts 掌上移植圖鑑

[English](../README.md) · [简体中文](README.zh-Hans.md) · 繁體中文

依裝置查找主機與 PC 遊戲的移植專案，比較 Android、iPhone、iPad、macOS、Windows 和 Linux 對應的原始碼、安裝方式與原版檔案需求。

**依遊玩裝置瀏覽** · [Android](https://www.xsmth.com/zh-hant/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_android#catalog?platform=Android) · [iPhone / iPad](https://www.xsmth.com/zh-hant/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_ios#catalog?platform=iOS) · [macOS](https://www.xsmth.com/zh-hant/platforms/macos/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_macos) · [Windows](https://www.xsmth.com/zh-hant/platforms/windows/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_windows) · [Linux](https://www.xsmth.com/zh-hant/platforms/linux/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_linux)

**PC 原作移植** · [macOS](https://www.xsmth.com/zh-hant/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_pc_macos#catalog?origin=PC&platform=macOS) · [iPhone / iPad](https://www.xsmth.com/zh-hant/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_pc_ios#catalog?origin=PC&platform=iOS) · [Android](https://www.xsmth.com/zh-hant/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_pc_android#catalog?origin=PC&platform=Android) · [Linux](https://www.xsmth.com/zh-hant/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_pc_linux#catalog?origin=PC&platform=Linux)

**依原作發行系統瀏覽** · [Windows 原作](https://www.xsmth.com/zh-hant/original-platforms/windows/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_origin_windows) · [macOS 原作](https://www.xsmth.com/zh-hant/original-platforms/macos/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_origin_macos)

例如，想在 Mac 上玩 Windows 老遊戲，可以在站內同時選擇原作發行系統 Windows 和目標平台 macOS。經典 Mac OS、DOS 和 Linux 的原作發行紀錄也可單獨查詢。

## 《模擬樂園 2》在 Android 和 iPad 上各用哪個專案？

| 裝置 | 專案說明 | 需要準備什麼 |
| --- | --- | --- |
| Android | [OpenRCT2](https://github.com/OpenRCT2/OpenRCT2/wiki/Android) | 安裝 Android APK，再依專案說明匯入 RCT2 原版資料及 OpenRCT2 所需檔案。 |
| iPad | [OpenRCT2 Touch](https://github.com/chrissotraidis/OpenRCT2Touch/blob/ipad/readme.md) | 編譯並簽署支援觸控的 iPad 版本，再透過「檔案」匯入自己的 RCT2 或 RCT Classic 資料。維護者記錄了 iPad Pro 實機測試，目前提供原始碼預覽版。 |

[查看 RollerCoaster Tycoon 2 的移植版本與安裝說明 →](https://www.xsmth.com/zh-hant/games/openrct2/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_rct2#ports)

## 《薩爾達傳說 魔吉拉的面具》有兩個 Android 版本，該怎麼選？

| Android 專案 | 實作方式 | 安裝前須知 |
| --- | --- | --- |
| [2 Ship 2 Harkinian](https://github.com/linkzenic/2ship2harkinian-Android/blob/android/README.md) | 反編譯移植 | 裝置須支援 OpenGL ES 3.0。首次開啟 APK 時選取相容的 `MM.z64`，應用程式會在裝置上產生 `mm.o2r`。 |
| [Zelda64 Recompiled](https://github.com/linkzenic/Zelda64Recomp-Android/blob/android-port/README.md) | 靜態重編譯 | 這個測試版採用 RT64，需要 64 位元 ARM 裝置和可用的 Vulkan 驅動程式。維護者列出的主要測試機型是搭載 Snapdragon／Adreno 的掌機。 |

[查看《魔吉拉的面具》的移植版本與安裝說明 →](https://www.xsmth.com/zh-hant/games/majoras-mask-2ship/?utm_source=github&utm_medium=referral&utm_campaign=pocketports_launch&utm_content=readme_zh_hant_majoras_mask#ports)

## 取用目錄資料

[data/catalog.json](../data/catalog.json) 為每款遊戲提供穩定 ID、三語名稱、三語詳情頁及專案清單。各專案附上目標平台、每個平台對應的上游依據，以及執行時需要的遊戲資料。 `original_platforms` 列出已核對的原作發行系統及出處。空陣列表示這項資料尚待整理。

執行下列指令即可使用 Node.js 從已發布的目錄更新快照並於本機驗證。

```sh
node scripts/update-catalog.mjs
node scripts/validate.mjs
```

## 回報資料錯誤

若安裝文件已移動、支援裝置有異動，或原版檔案需求記載有誤，可[回報目錄錯誤](https://github.com/suiyecc/pocketports-catalog/issues/new?template=correction.yml)，並附上能核對的專案 README、版本公告或編譯文件。[貢獻指南](../CONTRIBUTING.md)

## 授權與標示出處

PocketPorts 原創的目錄內容採用 CC BY 4.0，本儲存庫的腳本採用 MIT。連結所指的遊戲、程式碼、美術及商標由各權利人管理。[授權條款與標示方式](../LICENSE)
