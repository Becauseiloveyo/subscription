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
      name: '小程序开屏广告-安全跳过',
      desc: '只点击明确的“跳过/跳過”文本，不匹配微信右上角的小程序关闭控件。',
      categoryKey: 0,
      fastQuery: true,
      matchTime: 12000,
      forcedTime: 12000,
      priorityTime: 12000,
      resetMatch: 'activity',
      actionMaximum: 2,
      actionCd: 600,
      activityIds: appBrandActivityIds,
      rules: [
        {
          key: 0,
          name: '广告文本 + 精确跳过',
          actionDelay: 900,
          matches: [
            '[text="广告" || text="廣告"][visibleToUser=true]',
            '@TextView[text="跳过" || text="跳過"][visibleToUser=true]',
          ],
        },
        {
          key: 1,
          name: '短文本跳过兜底',
          actionDelay: 900,
          matches:
            '@TextView[text*="跳过" || text*="跳過"][text.length<10][visibleToUser=true]',
        },
      ],
    },
    {
      key: 10,
      name: '小程序全屏/插屏广告-安全关闭',
      desc: '默认关闭。只匹配明确写有“关闭广告/直接关闭”的控件，不匹配微信右上角关闭键。',
      categoryKey: 1,
      enable: false,
      fastQuery: true,
      matchTime: 20000,
      resetMatch: 'activity',
      actionMaximum: 1,
      actionCd: 800,
      actionDelay: 600,
      activityIds: appBrandActivityIds,
      rules: [
        {
          key: 0,
          name: '明确关闭广告文本',
          matches:
            '@[text="关闭广告" || text="關閉廣告" || text="直接关闭" || text="直接關閉"][visibleToUser=true]',
        },
        {
          key: 1,
          name: '明确关闭广告描述',
          matches:
            '@[desc*="关闭广告" || desc*="關閉廣告" || desc*="关闭此广告" || desc*="關閉此廣告"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 11,
      name: '小程序激励视频-结束后关闭',
      desc: '默认关闭。仅在奖励到账或广告结束后点击明确的关闭广告控件。',
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
            '@[desc*="关闭广告" || desc*="關閉廣告" || text="关闭广告" || text="關閉廣告"][visibleToUser=true]',
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
