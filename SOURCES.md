# 上游规则来源

最近系统扫描：2026-09-28

本项目不是机械合并公共订阅，而是以“活跃维护 + 低误触 + 自用优先”为原则筛选规则。

## 主要活跃来源

| 仓库 | 最近推送 | 用途 |
| --- | --- | --- |
| Lin-arm/GKD_subscription | 2026-09-28 | 首要参考：开屏、常见 App 精准规则、误触修复、性能优化 |
| aoguai/subscription | 2026-09-26 | 首要参考：广告卡片、弹窗、信息流规则，规则组织精简 |
| ganlinte/GKD-subscription | 2026-09-24 | 高频 App、全屏广告、更新提示 |
| YaChengMu/gkd_subscription_min | 2026-09-17 | 精简自用思路、常见 App 补充 |
| Tsuk1ko/gkd-subscription | 2026-09-19 | 小众功能/QQ/B站相关补充，仅选择低风险规则 |
| AIsouler/gkd-subscription | 2026-08-25 | 自用规则补充、误触修复参考 |
| mrlctate/gkd-mrlc | 2026-08-20 | 大覆盖规则库，作为缺失 App 的补充参考 |
| yandongxu0821/gkd_subscription_rules | 2026-07-22 | 淘宝/拼多多/酷狗等小众场景补充 |
| timyang2005/gkd-merged-subscription | 2026-05-29 | 用于发现其他来源，不直接整库导入 |
| MengNianxiaoyao/gkd-subscription | 2026-09-26 仓库有推送；最近规则版本 v77 | 自用精简策略与历史规则参考 |

## 历史/归档来源

以下项目可以用于历史兼容，但不作为“最新规则”依据：

- AIsouler/GKD_subscription（归档）
- Adpro-Team/GKD_subscription（归档）
- gkd-kit/subscription（归档官方旧订阅）
- jiuqianyuan/GKD_subscription（长时间无规则更新）
- JamisonLeo/GKD-subscription（长时间无规则更新）
- AliusCode/GKD-subscription（自用删减留存）
- 0123z/gkd-subscription（模板性质）
- MINIPuffer/GKD_subscription（长期无规则更新）

## 当前融合策略

1. 用户本人提供的快照和实机验证规则优先级最高。
2. 同一 App 有活跃项目专属规则时，优先使用专属规则，避免全局规则抢点击。
3. 开屏广告默认启用。
4. 局部广告、全屏广告、分段广告、更新提示等默认关闭，按需开启。
5. 不自动吸收自动支付、自动授权、自动登录、自动签到、自动上滑视频等功能性/高风险规则。
6. 微信小程序广告由用户本机模块处理，GKD 不接管。
7. 新增公共规则前优先检查快照、Activity、vid/text 快查能力与误触快照。
