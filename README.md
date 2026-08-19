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

- 已有快照的应用优先使用快照精准规则。
- 参考活跃公开订阅的分类、误触排除与规则组织方式，但不整库复制。
- 默认只启用“开屏广告”。
- 弹窗、更新、青少年、评价、通知、权限、局部广告、全屏广告、分段广告、功能类等均默认关闭，按需开启。
- 不默认启用自动登录、自动授权、支付确认、红包领取等高风险动作。
- 微信小程序规则以本机实际误触反馈为最高优先级，不使用会误点右上角关闭键的泛化 ImageView 规则。

## 规则分类

- 开屏广告
- 弹窗处理
- 更新提示
- 青少年模式
- 快捷确认
- 评价提示
- 通知提示
- 权限提示
- 局部广告
- 全屏广告
- 分段广告
- 功能类
- 其他

## 当前覆盖

源码覆盖 60 余个常见应用，包括：

- 微信、QQ、支付宝、淘宝、京东、拼多多、闲鱼
- 抖音、快手、哔哩哔哩、小红书、知乎、微博
- 百度网盘、夸克、UC、QQ 浏览器、小米浏览器
- 高德地图、百度地图、滴滴、携程
- 腾讯视频、爱奇艺、优酷、芒果 TV、小米视频
- 网易云音乐、QQ 音乐、酷狗音乐、小米音乐
- WPS、酷安、今日头条、什么值得买
- YouTube、Telegram、Spotify、Netflix、ChatGPT

## 精准快照规则

目前包含用户快照校准的以下应用：

- 学习通
- 新物集
- 快递100
- 哔哩哔哩
- 铁路12306
- 微信小程序
- 番茄免费小说
- 起点读书

## 参考思路

本订阅会关注以下公开项目的最新规则设计并进行重新实现、筛选和本机校准：

- `mrlctate/gkd-mrlc`
- `Lin-arm/GKD_subscription`
- GKD 官方 `subscription-template`

不会直接把大型订阅全部合并进来，避免规则阻塞、耗电增加和误触扩大。

## 开发与构建

```bash
pnpm install
pnpm run check
pnpm run build
```

修改 `src/**` 并推送到 `main` 后，GitHub Actions 会自动构建并提交 `dist/**`。
