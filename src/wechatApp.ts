import { defineGkdApp } from '@gkd-kit/define';

const appBrandActivityIds = [
  'com.tencent.mm.plugin.appbrand.ui.AppBrandUI',
  'com.tencent.mm.plugin.appbrand.ui.AppBrandUI00',
  'com.tencent.mm.plugin.appbrand.ui.AppBrandUI01',
  'com.tencent.mm.plugin.appbrand.ui.AppBrandUI02',
  'com.tencent.mm.plugin.appbrand.ui.AppBrandUI03',
  'com.tencent.mm.plugin.appbrand.ui.AppBrandUI04',
  'com.tencent.mm.plugin.appbrand.ui.AppBrandUI05',
  'com.tencent.mm.plugin.appbrand.launching.AppBrandLaunchProxyUI',
];

export default defineGkdApp({
  id: 'com.tencent.mm',
  name: '微信',
  groups: [
    {
      key: 1,
      name: '小程序开屏广告-增强跳过',
      desc: '覆盖常见 AppBrandUI 实例及启动代理页；延迟后点击“跳过”，允许二次点击。',
      categoryKey: 0,
      fastQuery: true,
      matchTime: 10000,
      forcedTime: 10000,
      priorityTime: 10000,
      resetMatch: 'activity',
      actionMaximum: 2,
      actionCd: 500,
      activityIds: appBrandActivityIds,
      rules: [
        {
          key: 0,
          name: '广告文本 + 跳过按钮',
          actionDelay: 800,
          matches: [
            '[text="广告" || text="廣告"][visibleToUser=true]',
            '@[text="跳过" || text="跳過"][visibleToUser=true]',
          ],
        },
        {
          key: 1,
          name: 'WebView 根节点兜底跳过',
          matchRoot: true,
          actionDelay: 500,
          actionCd: 500,
          matches:
            '@TextView[text*="跳过" || text*="跳過"][text.length<10][height<150] <<(25-n) FrameLayout[childCount=2] <(1,2) * < [id="android:id/content"]',
        },
        {
          key: 2,
          name: '短文本跳过兜底',
          actionDelay: 800,
          matches:
            '@[text*="跳过" || text*="跳過"][text.length<10][visibleToUser=true]',
        },
      ],
    },
    {
      key: 10,
      name: '小程序全屏/插屏广告-关闭',
      desc: '关闭小程序内全屏或插屏广告；使用广告文本与关闭控件的组合限制误触。',
      categoryKey: 1,
      fastQuery: true,
      matchTime: 20000,
      resetMatch: 'activity',
      actionMaximum: 2,
      actionCd: 500,
      actionDelay: 500,
      activityIds: appBrandActivityIds,
      rules: [
        {
          key: 0,
          name: '结构化广告关闭按钮',
          excludeMatches:
            '[text="跳过" || text="跳過"][visibleToUser=true]',
          matches:
            '@ImageView[visibleToUser=true][childCount=0][text=null] < FrameLayout[childCount=1] < FrameLayout[childCount=1] <2 FrameLayout[childCount=2] - FrameLayout >4 [text="广告" || text="廣告"]',
        },
        {
          key: 1,
          name: '广告文本 + 关闭描述',
          matches: [
            '[text="广告" || text="廣告"][visibleToUser=true]',
            '@[desc="关闭" || desc="關閉" || desc*="关闭广告" || desc*="關閉廣告"][visibleToUser=true]',
          ],
        },
        {
          key: 2,
          name: '明确关闭广告文本',
          matches:
            '@[text="关闭广告" || text="關閉廣告" || text="直接关闭" || text="直接關閉"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 11,
      name: '小程序激励视频-结束后关闭',
      desc: '默认关闭。启用后仅在出现“奖励已获得/广告已结束”等提示时点击关闭，避免提前关闭导致奖励失效。',
      categoryKey: 1,
      enable: false,
      fastQuery: true,
      matchTime: 120000,
      resetMatch: 'activity',
      actionMaximum: 1,
      actionCd: 800,
      activityIds: appBrandActivityIds,
      rules: [
        {
          key: 0,
          matches: [
            '[text*="奖励已" || text*="獎勵已" || text*="广告已结束" || text*="廣告已結束" || text*="已获得奖励"][visibleToUser=true]',
            '@[desc="关闭" || desc="關閉" || text="关闭广告" || text="關閉廣告"][visibleToUser=true]',
          ],
        },
      ],
    },
    {
      key: 40,
      name: '快捷确认-电脑登录确认',
      desc: '默认关闭。仅在电脑登录确认页按需启用。',
      categoryKey: 4,
      enable: false,
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'activity',
      activityIds: [
        'com.tencent.mm.plugin.webwx.ui.ExtDeviceWXLoginUI',
        'com.tencent.mm.ui.LauncherUI',
      ],
      rules: [
        {
          key: 0,
          matches: [
            '[text^="登录 Windows 微信" || text^="Log in to Weixin for"][visibleToUser=true]',
            '@[text="登录" || text="Log In"][visibleToUser=true]',
          ],
        },
      ],
    },
  ],
});
