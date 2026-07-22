# Becauseiloveyo 自用 GKD 订阅

基于 GKD 官方 `subscription-template` 构建的个人订阅。

## 订阅地址

```text
https://raw.githubusercontent.com/Becauseiloveyo/subscription/main/dist/gkd.json5
```

大陆网络可尝试：

```text
https://fastly.jsdelivr.net/gh/Becauseiloveyo/subscription@main/dist/gkd.json5
```

## 当前策略

- 已有快照的应用使用快照精准规则。
- 其他常见应用使用低风险通用规则。
- 默认启用开屏广告跳过。
- 弹窗、更新提示、青少年模式默认关闭。
- 不默认启用自动登录、自动授权、支付确认、红包领取等高风险动作。

## 当前覆盖

当前源码覆盖 60 余个常见应用，重点包括：

- 微信、QQ、支付宝、淘宝、京东、拼多多、闲鱼
- 抖音、快手、哔哩哔哩、小红书、知乎、微博
- 百度网盘、夸克、UC、QQ 浏览器
- 高德地图、百度地图、滴滴、携程
- 腾讯视频、爱奇艺、优酷、芒果 TV
- 网易云音乐、QQ 音乐、酷狗音乐
- WPS、酷安、今日头条、什么值得买
- YouTube、Telegram、Spotify、Netflix、ChatGPT

## 精准快照规则

目前包含你提供快照的以下应用：

- 学习通
- 新物集
- 快递100
- 哔哩哔哩
- 铁路12306
- 微信小程序
- 番茄免费小说
- 起点读书

## 开发与构建

```bash
pnpm install
pnpm run check
pnpm run build
```

修改 `src/**` 并推送到 `main` 后，GitHub Actions 会自动构建并提交 `dist/**`。

## 维护原则

- 修改规则时递增 `src/subscription.ts` 中的 `version`。
- 精准规则优先使用 `activityIds`、`vid` 与快照。
- 无快照规则保持保守，高风险规则默认关闭。
