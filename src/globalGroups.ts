import { defineGkdGlobalGroups } from '@gkd-kit/define';

export default defineGkdGlobalGroups([
  {
    key: 0,
    name: '开屏广告-全局兜底跳过',
    desc: '仅在进入应用后的短时间内点击明确的跳过按钮；应用快照精准规则优先。',
    categoryKey: 0,
    fastQuery: true,
    matchTime: 10000,
    forcedTime: 3000,
    priorityTime: 10000,
    actionMaximum: 1,
    resetMatch: 'app',
    actionCd: 1000,
    rules: [
      {
        key: 0,
        name: '精确文本：跳过',
        matches: '[text="跳过"][visibleToUser=true]',
      },
      {
        key: 1,
        name: '文本：跳过广告',
        matches: '[text="跳过广告"][visibleToUser=true]',
      },
      {
        key: 2,
        name: '短文本：包含跳过',
        matches: '[text*="跳过"][text.length<8][visibleToUser=true]',
      },
      {
        key: 3,
        name: '描述：包含跳过',
        matches: '[desc*="跳过"][desc.length<12][visibleToUser=true]',
      },
      {
        key: 4,
        name: '英文 Skip',
        matches: '[text~="(?i)^skip[0-9 ]*$"][visibleToUser=true]',
      },
      {
        key: 5,
        name: '倒计时跳过',
        matches: '[text~="^.*[0-9]+(s|秒).*跳过.*$"][visibleToUser=true]',
      },
    ],
  },
  {
    key: 10,
    name: '弹窗处理-常见关闭按钮',
    desc: '默认关闭。用于活动、会员、福利、推荐类弹窗，启用前建议抓快照校准。',
    categoryKey: 1,
    enable: false,
    fastQuery: true,
    matchTime: 8000,
    actionMaximum: 2,
    resetMatch: 'activity',
    actionCd: 1200,
    rules: [
      {
        key: 0,
        matches: '[text="关闭" || text="以后再说" || text="暂不" || text="稍后再说" || text="下次再说"][visibleToUser=true]',
      },
      {
        key: 1,
        matches: '[desc="关闭" || desc*="关闭弹窗" || desc*="关闭广告"][visibleToUser=true]',
      },
      {
        key: 2,
        matches: '[text="×" || text="✕"][visibleToUser=true]',
      },
    ],
  },
  {
    key: 20,
    name: '更新提示-常见暂不更新',
    desc: '默认关闭。只点击明确的负向更新按钮。',
    categoryKey: 2,
    enable: false,
    fastQuery: true,
    matchTime: 8000,
    actionMaximum: 1,
    resetMatch: 'app',
    actionCd: 1200,
    rules: [
      {
        key: 0,
        matches: '[text="暂不更新" || text="以后再说" || text="下次再说" || text="忽略本次"][visibleToUser=true]',
      },
    ],
  },
  {
    key: 30,
    name: '青少年模式-常见关闭',
    desc: '默认关闭。处理青少年模式、未成年人提示等弹窗。',
    categoryKey: 3,
    enable: false,
    fastQuery: true,
    matchTime: 8000,
    actionMaximum: 1,
    resetMatch: 'app',
    actionCd: 1200,
    rules: [
      {
        key: 0,
        matches: '[text="我知道了" || text="知道了" || text="暂不开启" || text="不开启"][visibleToUser=true]',
      },
    ],
  },
]);
