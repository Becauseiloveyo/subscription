import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.tencent.mm',
  name: '微信',
  groups: [
    {
      key: 40,
      name: '快捷确认-电脑登录确认',
      desc: '默认关闭。仅在电脑登录确认页按需启用。微信小程序广告交由本机模块处理，不再由 GKD 接管。',
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
