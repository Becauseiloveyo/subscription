import { defineGkdGlobalGroups } from '@gkd-kit/define';

export default defineGkdGlobalGroups([
  {
    key: 0,
    name: '开屏广告-全局增强',
    desc: '参考成熟订阅的误触排除思路，只在应用启动后的短时间内匹配明确的跳过控件；应用快照精准规则优先。',
    categoryKey: 0,
    fastQuery: true,
    matchTime: 10000,
    forcedTime: 10000,
    priorityTime: 10000,
    actionMaximum: 2,
    resetMatch: 'app',
    actionCd: 600,
    rules: [
      {
        key: 0,
        name: '多形态跳过按钮',
        excludeMatches:
          '[text="取消" || text="下一步" || text="完成" || text*="退出" || text*="阅读并同意" || text*="跳过片头" || text*="跳过片尾" || text*="跳过视频"][visibleToUser=true]',
        anyMatches: [
          '[text*="跳过"][text.length<10][width<500][height<300][visibleToUser=true]',
          '[text*="跳 过"][text.length<10][width<500][height<300][visibleToUser=true]',
          '[text*="跳過"][text.length<10][width<500][height<300][visibleToUser=true]',
          '[desc*="跳过"][desc.length<10][width<500][height<300][visibleToUser=true]',
          '[desc*="跳過"][desc.length<10][width<500][height<300][visibleToUser=true]',
          '[vid~="(?is).*skip.*"][width<500][height<300][visibleToUser=true]',
          '[id$="tt_splash_skip_btn"][visibleToUser=true]',
        ],
      },
    ],
  },
  {
    key: 20,
    name: '更新提示-全局暂不更新',
    desc: '默认关闭。只有同时出现明确版本更新文案和负向按钮时才点击。',
    categoryKey: 2,
    enable: false,
    fastQuery: true,
    matchTime: 10000,
    actionMaximum: 1,
    resetMatch: 'app',
    actionCd: 1000,
    rules: [
      {
        key: 0,
        matches: [
          '[text*="版本更新" || text*="发现新版本" || text*="新版本" || text*="升级版本"][visibleToUser=true]',
          '@[text="暂不更新" || text="以后再说" || text="下次再说" || text="忽略本次" || text="暂不升级"][visibleToUser=true]',
        ],
      },
    ],
  },
  {
    key: 50,
    name: '评价提示-全局关闭',
    desc: '默认关闭。仅在明确评价/好评提示出现时点击暂不评价类按钮。',
    categoryKey: 5,
    enable: false,
    fastQuery: true,
    matchTime: 8000,
    actionMaximum: 1,
    resetMatch: 'activity',
    rules: [
      {
        key: 0,
        matches: [
          '[text*="评价" || text*="好评" || text*="评分"][visibleToUser=true]',
          '@[text="暂不" || text="以后再说" || text="下次再说" || text="不了，谢谢"][visibleToUser=true]',
        ],
      },
    ],
  },
  {
    key: 60,
    name: '通知提示-全局关闭',
    desc: '默认关闭。只处理应用自己的通知开启引导，不处理 Android 系统权限弹窗。',
    categoryKey: 6,
    enable: false,
    fastQuery: true,
    matchTime: 10000,
    actionMaximum: 1,
    resetMatch: 'activity',
    rules: [
      {
        key: 0,
        matches: [
          '[text*="通知" || text*="消息提醒" || text*="开启提醒"][visibleToUser=true]',
          '@[text="暂不开启" || text="以后再说" || text="下次再说" || text="暂不" || text="取消"][visibleToUser=true]',
        ],
      },
    ],
  },
]);
