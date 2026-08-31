import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.jd.jdhealth',
  name: '京东健康',
  groups: [
    {
      key: 1,
      name: '开屏广告-京东健康极速跳过',
      desc: '针对京东健康启动广告优化：优先匹配右上角“跳过/跳过 N”倒计时按钮，节点一进入无障碍树即点击。',
      categoryKey: 0,
      fastQuery: true,
      order: -3000,
      matchTime: 10000,
      forcedTime: 10000,
      priorityTime: 10000,
      priorityActionMaximum: 1,
      actionMaximum: 1,
      resetMatch: 'app',
      actionCd: 100,
      rules: [
        {
          key: 0,
          name: '极速-跳过倒计时',
          matches:
            '@[text^="跳过"][text.length<8][width<400][height<220][visibleToUser=true]',
        },
        {
          key: 1,
          name: '极速-跳 过倒计时',
          matches:
            '@[text^="跳 过"][text.length<9][width<400][height<220][visibleToUser=true]',
        },
        {
          key: 2,
          name: '兼容-desc跳过',
          matches:
            '@[desc^="跳过"][desc.length<8][width<400][height<220][visibleToUser=true]',
        },
        {
          key: 10,
          name: '兼容-skip资源ID',
          matches: '@[vid*="skip"][width<400][height<220][visibleToUser=true]',
        },
      ],
    },
  ],
});
