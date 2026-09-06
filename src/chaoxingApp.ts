import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.chaoxing.mobile',
  name: '学习通',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      desc: '学习通专属极速开屏规则：兼容新版 SplashActivity 的“跳过3s/2s/1s”以及旧版 MainTabActivity 的 jump_view 结构；避免使用全局宽泛规则误触组织邀请码等页面。',
      categoryKey: 0,
      order: -4000,
      fastQuery: true,
      matchRoot: true,
      matchTime: 10000,
      forcedTime: 10000,
      priorityTime: 10000,
      priorityActionMaximum: 1,
      actionMaximum: 1,
      resetMatch: 'app',
      actionCd: 80,
      rules: [
        {
          key: 0,
          name: '新版SplashActivity-点击跳过父控件',
          fastQuery: true,
          activityIds: '.activity.SplashActivity',
          matches:
            '@[clickable=true][visibleToUser=true] > [text^="跳过"][text.length<10][visibleToUser=true]',
          snapshotUrls: 'https://i.gkd.li/i/26644070',
        },
        {
          key: 1,
          name: '新版SplashActivity-跳过文本直点兜底',
          fastQuery: true,
          activityIds: '.activity.SplashActivity',
          matches:
            '@[text^="跳过"][text.length<10][width<500][height<300][visibleToUser=true]',
        },
        {
          key: 2,
          name: '旧版MainTabActivity-jump_view精准',
          fastQuery: true,
          activityIds: 'com.chaoxing.mobile.main.ui.MainTabActivity',
          matches:
            '@[vid="jump_view"][clickable=true][visibleToUser=true] > [vid="btn_jump"][text^="跳过"][visibleToUser=true]',
        },
        {
          key: 3,
          name: '旧版MainTabActivity-btn_jump兜底',
          fastQuery: true,
          activityIds: 'com.chaoxing.mobile.main.ui.MainTabActivity',
          matches:
            '@[vid="btn_jump"][text^="跳过"][text.length<10][visibleToUser=true]',
        },
      ],
    },
    {
      key: 10,
      name: '权限提示-通知权限',
      desc: '默认关闭。关闭学习通自己的通知权限提示。',
      categoryKey: 7,
      enable: false,
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          activityIds: '.main.ui.MainTabActivity',
          matches: '[vid="vNotificationItemClose"]',
        },
      ],
    },
  ],
});
