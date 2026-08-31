import { defineGkdApp } from '@gkd-kit/define';

const commonSplashRules = [
  {
    key: 0,
    name: '低误触开屏跳过',
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
];

const commonPopupRules = [
  {
    key: 0,
    matches:
      '@[text="关闭" || text="以后再说" || text="暂不" || text="稍后再说" || text="下次再说"][visibleToUser=true]',
  },
  {
    key: 1,
    matches:
      '@[desc="关闭" || desc*="关闭弹窗" || desc*="关闭广告"][visibleToUser=true]',
  },
];

const commonUpdateRules = [
  {
    key: 0,
    matches: [
      '[text*="版本更新" || text*="发现新版本" || text*="新版本"][visibleToUser=true]',
      '@[text="暂不更新" || text="以后再说" || text="下次再说" || text="忽略本次" || text="暂不升级"][visibleToUser=true]',
    ],
  },
];

const commonYouthRules = [
  {
    key: 0,
    matches: [
      '[text*="青少年模式" || text*="未成年人"][visibleToUser=true]',
      '@[text="我知道了" || text="知道了" || text="暂不开启" || text="不开启" || text="不再提醒"][visibleToUser=true]',
    ],
  },
];

const commonRatingRules = [
  {
    key: 0,
    matches: [
      '[text*="评价" || text*="好评" || text*="评分"][visibleToUser=true]',
      '@[text="暂不" || text="以后再说" || text="下次再说" || text="不了，谢谢"][visibleToUser=true]',
    ],
  },
];

const commonNoticeRules = [
  {
    key: 0,
    matches: [
      '[text*="通知" || text*="消息提醒" || text*="开启提醒"][visibleToUser=true]',
      '@[text="暂不开启" || text="以后再说" || text="下次再说" || text="暂不"][visibleToUser=true]',
    ],
  },
];

const commonLocalAdRules = [
  {
    key: 0,
    matches: [
      '[text="广告" || text="廣告" || text*="广告推广"][visibleToUser=true]',
      '@[text="关闭广告" || text="關閉廣告" || desc*="关闭广告" || desc*="關閉廣告" || desc*="关闭此广告"][visibleToUser=true]',
    ],
  },
];

const commonFullscreenAdRules = [
  {
    key: 0,
    matches: [
      '[text="广告" || text="廣告" || text*="广告"][visibleToUser=true]',
      '@[text="关闭广告" || text="關閉廣告" || text="直接关闭" || text="直接關閉" || desc*="关闭广告" || desc*="關閉廣告"][visibleToUser=true]',
    ],
  },
];

const preciseApps = [
  defineGkdApp({
    id: 'com.chaoxing.mobile',
    name: '学习通',
    groups: [
      {
        key: 1,
        name: '开屏广告-快照精准',
        desc: '根据用户快照：MainTabActivity 推广页，点击右下角跳过按钮。',
        categoryKey: 0,
        fastQuery: true,
        matchTime: 10000,
        forcedTime: 3000,
        priorityTime: 10000,
        actionMaximum: 1,
        resetMatch: 'app',
        activityIds: 'com.chaoxing.mobile.main.ui.MainTabActivity',
        rules: [
          {
            key: 0,
            matches:
              '@[vid="jump_view"][clickable=true][visibleToUser=true] > [vid="btn_jump"][text^="跳过"][visibleToUser=true]',
          },
        ],
      },
    ],
  }),
  defineGkdApp({
    id: 'com.youkagames.gameplatform',
    name: '新物集',
    groups: [
      {
        key: 1,
        name: '开屏广告-快照精准',
        desc: '根据用户快照：SplashActivity 顶部右侧倒计时跳过。',
        categoryKey: 0,
        fastQuery: true,
        matchTime: 10000,
        forcedTime: 3000,
        priorityTime: 10000,
        actionMaximum: 1,
        resetMatch: 'app',
        activityIds: 'com.youkagames.gameplatform.activity.SplashActivity',
        rules: [
          {
            key: 0,
            matches:
              '@[vid="rl_time_count"][clickable=true][visibleToUser=true] > [vid="tv_time_count"][text*="跳过"][visibleToUser=true]',
          },
        ],
      },
    ],
  }),
  defineGkdApp({
    id: 'com.Kingdee.Express',
    name: '快递100',
    groups: [
      {
        key: 1,
        name: '开屏广告-快照精准',
        desc: '根据用户快照：SplashActivity 右上角 ms_skipView 跳过控件。',
        categoryKey: 0,
        fastQuery: true,
        matchTime: 10000,
        forcedTime: 3000,
        priorityTime: 10000,
        actionMaximum: 1,
        resetMatch: 'app',
        activityIds: 'com.Kingdee.Express.module.splash.SplashActivity',
        rules: [
          {
            key: 0,
            matches: [
              '[vid="rl_splash_container"][visibleToUser=true]',
              '@[vid="ms_skipView"][visibleToUser=true]',
            ],
          },
        ],
      },
    ],
  }),
  defineGkdApp({
    id: 'tv.danmaku.bili',
    name: '哔哩哔哩',
    groups: [
      {
        key: 1,
        name: '开屏广告-快照精准',
        desc: '根据用户快照：MainActivityV2 开屏广告，点击右下角 count_down 跳过按钮。',
        categoryKey: 0,
        fastQuery: true,
        matchTime: 10000,
        forcedTime: 3000,
        priorityTime: 10000,
        actionMaximum: 1,
        resetMatch: 'app',
        actionCd: 800,
        activityIds: 'tv.danmaku.bili.MainActivityV2',
        rules: [
          {
            key: 0,
            matches: [
              '[vid="label_ad"][text="广告"][visibleToUser=true]',
              '@[vid="count_down"][text^="跳过"][clickable=true][visibleToUser=true]',
            ],
          },
        ],
      },
      {
        key: 30,
        name: '青少年模式-提示关闭',
        categoryKey: 3,
        enable: false,
        fastQuery: true,
        matchTime: 8000,
        actionMaximum: 1,
        rules: commonYouthRules,
      },
      {
        key: 80,
        name: '局部广告-明确关闭',
        categoryKey: 8,
        enable: false,
        fastQuery: true,
        matchTime: 10000,
        actionMaximum: 1,
        resetMatch: 'activity',
        rules: commonLocalAdRules,
      },
      {
        key: 90,
        name: '全屏广告-明确关闭',
        categoryKey: 9,
        enable: false,
        fastQuery: true,
        matchTime: 15000,
        actionMaximum: 1,
        resetMatch: 'activity',
        rules: commonFullscreenAdRules,
      },
    ],
  }),
  defineGkdApp({
    id: 'com.MobileTicket',
    name: '铁路12306',
    groups: [
      {
        key: 1,
        name: '开屏广告-快照精准',
        desc: '根据用户快照：MainActivity 广告页，点击右上角跳过区域。',
        categoryKey: 0,
        fastQuery: true,
        matchTime: 10000,
        forcedTime: 3000,
        priorityTime: 10000,
        actionMaximum: 1,
        resetMatch: 'app',
        activityIds: 'com.MobileTicket.ui.activity.MainActivity',
        rules: [
          {
            key: 0,
            matches: [
              '[vid="img_adContent"][desc="广告"][visibleToUser=true]',
              '@[vid="fl_skip_wrong"][clickable=true][visibleToUser=true] > [vid="tv_skip"][visibleToUser=true]',
            ],
          },
        ],
      },
    ],
  }),
  defineGkdApp({
    id: 'com.dragon.read',
    name: '番茄免费小说',
    groups: [
      {
        key: 90,
        name: '全屏广告-电商券弹窗',
        desc: '根据用户快照关闭“惊喜电商券即将失效”弹窗，不点击“去使用”。',
        categoryKey: 9,
        fastQuery: true,
        matchTime: 10000,
        actionMaximum: 1,
        resetMatch: 'activity',
        activityIds: 'com.dragon.read.pages.main.MainFragmentActivity',
        rules: [
          {
            key: 0,
            matches: [
              '[text="惊喜电商券即将失效"][visibleToUser=true]',
              '@[desc="dialog_close_icon"][clickable=true][visibleToUser=true]',
            ],
          },
        ],
      },
    ],
  }),
  defineGkdApp({
    id: 'com.qidian.QDReader',
    name: '起点读书',
    groups: [
      {
        key: 1,
        name: '开屏广告-快照精准',
        desc: '根据用户快照：SplashImageActivity 右上角 splash_skip_button。',
        categoryKey: 0,
        fastQuery: true,
        matchTime: 10000,
        forcedTime: 3000,
        priorityTime: 10000,
        actionMaximum: 1,
        resetMatch: 'app',
        activityIds: 'com.qidian.QDReader.ui.activity.SplashImageActivity',
        rules: [
          {
            key: 0,
            matches:
              '@[vid="splash_skip_button"][text^="跳过"][clickable=true][visibleToUser=true]',
          },
        ],
      },
      {
        key: 20,
        name: '更新提示-暂不更新',
        categoryKey: 2,
        enable: false,
        fastQuery: true,
        matchTime: 8000,
        actionMaximum: 1,
        resetMatch: 'app',
        rules: commonUpdateRules,
      },
    ],
  }),
];

type CommonAppConfig = {
  id: string;
  name: string;
  popup?: boolean;
  update?: boolean;
  youth?: boolean;
  ad?: boolean;
  notice?: boolean;
  rating?: boolean;
};

const commonApps: CommonAppConfig[] = [
  {
    id: 'com.tencent.mobileqq',
    name: 'QQ',
    popup: true,
    update: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.eg.android.AlipayGphone',
    name: '支付宝',
    update: true,
    notice: true,
  },
  {
    id: 'com.taobao.taobao',
    name: '淘宝',
    popup: true,
    update: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.jingdong.app.mall',
    name: '京东',
    popup: true,
    update: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.xunmeng.pinduoduo',
    name: '拼多多',
    popup: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.taobao.idlefish',
    name: '闲鱼',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.sankuai.meituan',
    name: '美团',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'me.ele',
    name: '饿了么',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.ss.android.ugc.aweme',
    name: '抖音',
    youth: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.ss.android.ugc.aweme.lite',
    name: '抖音极速版',
    youth: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.smile.gifmaker',
    name: '快手',
    youth: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.kuaishou.nebula',
    name: '快手极速版',
    youth: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.xingin.xhs',
    name: '小红书',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.zhihu.android',
    name: '知乎',
    popup: true,
    update: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.sina.weibo',
    name: '微博',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.baidu.netdisk',
    name: '百度网盘',
    popup: true,
    update: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.quark.browser',
    name: '夸克',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.UCMobile',
    name: 'UC浏览器',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.tencent.mtt',
    name: 'QQ浏览器',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.baidu.searchbox',
    name: '百度',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.autonavi.minimap',
    name: '高德地图',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.baidu.BaiduMap',
    name: '百度地图',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.tencent.qqlive',
    name: '腾讯视频',
    popup: true,
    ad: true,
    youth: true,
    notice: true,
  },
  {
    id: 'com.qiyi.video',
    name: '爱奇艺',
    popup: true,
    ad: true,
    youth: true,
    notice: true,
  },
  {
    id: 'com.youku.phone',
    name: '优酷',
    popup: true,
    ad: true,
    youth: true,
    notice: true,
  },
  {
    id: 'com.hunantv.imgo.activity',
    name: '芒果TV',
    popup: true,
    ad: true,
    youth: true,
    notice: true,
  },
  {
    id: 'com.netease.cloudmusic',
    name: '网易云音乐',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.tencent.qqmusic',
    name: 'QQ音乐',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.kugou.android',
    name: '酷狗音乐',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'cn.wps.moffice_eng',
    name: 'WPS Office',
    popup: true,
    update: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.coolapk.market',
    name: '酷安',
    popup: true,
    update: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.tencent.news',
    name: '腾讯新闻',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.netease.newsreader.activity',
    name: '网易新闻',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.ss.android.article.news',
    name: '今日头条',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.smzdm.client.android',
    name: '什么值得买',
    popup: true,
    update: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.achievo.vipshop',
    name: '唯品会',
    popup: true,
    update: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.dianping.v1',
    name: '大众点评',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.sdu.didi.psnger',
    name: '滴滴出行',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'ctrip.android.view',
    name: '携程旅行',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.tencent.weread',
    name: '微信读书',
    popup: true,
    ad: true,
    notice: true,
    rating: true,
  },
  {
    id: 'com.kuaikan.comic',
    name: '快看漫画',
    popup: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.hupu.games',
    name: '虎扑',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'air.tv.douyu.android',
    name: '斗鱼直播',
    popup: true,
    youth: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.duowan.kiwi',
    name: '虎牙直播',
    popup: true,
    youth: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.miui.player',
    name: '小米音乐',
    popup: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.miui.video',
    name: '小米视频',
    popup: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.android.browser',
    name: '小米浏览器',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.xiaomi.market',
    name: '小米应用商店',
    popup: true,
    update: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.google.android.youtube',
    name: 'YouTube',
    popup: true,
    ad: true,
    notice: true,
  },
  { id: 'org.telegram.messenger', name: 'Telegram', popup: true, notice: true },
  { id: 'com.spotify.music', name: 'Spotify', popup: true, notice: true },
  { id: 'com.netflix.mediaclient', name: 'Netflix', popup: true, notice: true },
  { id: 'com.openai.chatgpt', name: 'ChatGPT', popup: true, notice: true },
  {
    id: 'com.android.vending',
    name: 'Google Play',
    popup: true,
    update: true,
    notice: true,
  },
  {
    id: 'com.facebook.katana',
    name: 'Facebook',
    popup: true,
    ad: true,
    notice: true,
  },
  {
    id: 'com.instagram.android',
    name: 'Instagram',
    popup: true,
    ad: true,
    notice: true,
  },
  { id: 'com.twitter.android', name: 'X', popup: true, ad: true, notice: true },
];

const commonAppList = commonApps.map((app) =>
  defineGkdApp({
    id: app.id,
    name: app.name,
    groups: [
      {
        key: 0,
        name: '开屏广告-常见跳过',
        desc: '未使用本机快照验证；采用带误触排除的开屏跳过规则。',
        categoryKey: 0,
        fastQuery: true,
        matchTime: 10000,
        forcedTime: 10000,
        priorityTime: 10000,
        actionMaximum: 2,
        resetMatch: 'app',
        actionCd: 600,
        rules: commonSplashRules,
      },
      ...(app.popup
        ? [
            {
              key: 10,
              name: '弹窗处理-常见关闭',
              desc: '默认关闭。仅匹配明确的关闭或负向按钮。',
              categoryKey: 1,
              enable: false,
              fastQuery: true,
              matchTime: 8000,
              actionMaximum: 1,
              resetMatch: 'activity' as const,
              rules: commonPopupRules,
            },
          ]
        : []),
      ...(app.update
        ? [
            {
              key: 20,
              name: '更新提示-暂不更新',
              desc: '默认关闭。要求同时存在版本更新文案与负向按钮。',
              categoryKey: 2,
              enable: false,
              fastQuery: true,
              matchTime: 8000,
              actionMaximum: 1,
              resetMatch: 'app' as const,
              rules: commonUpdateRules,
            },
          ]
        : []),
      ...(app.youth
        ? [
            {
              key: 30,
              name: '青少年模式-提示关闭',
              desc: '默认关闭。只匹配青少年/未成年人提示中的负向按钮。',
              categoryKey: 3,
              enable: false,
              fastQuery: true,
              matchTime: 8000,
              actionMaximum: 1,
              resetMatch: 'app' as const,
              rules: commonYouthRules,
            },
          ]
        : []),
      ...(app.rating
        ? [
            {
              key: 50,
              name: '评价提示-暂不评价',
              desc: '默认关闭。',
              categoryKey: 5,
              enable: false,
              fastQuery: true,
              matchTime: 8000,
              actionMaximum: 1,
              resetMatch: 'activity' as const,
              rules: commonRatingRules,
            },
          ]
        : []),
      ...(app.notice
        ? [
            {
              key: 60,
              name: '通知提示-暂不开启',
              desc: '默认关闭。只处理应用自己的通知开启引导。',
              categoryKey: 6,
              enable: false,
              fastQuery: true,
              matchTime: 8000,
              actionMaximum: 1,
              resetMatch: 'activity' as const,
              rules: commonNoticeRules,
            },
          ]
        : []),
      ...(app.ad
        ? [
            {
              key: 80,
              name: '局部广告-明确关闭',
              desc: '默认关闭。要求广告标识与明确“关闭广告”控件同时存在。',
              categoryKey: 8,
              enable: false,
              fastQuery: true,
              matchTime: 10000,
              actionMaximum: 1,
              resetMatch: 'activity' as const,
              rules: commonLocalAdRules,
            },
            {
              key: 90,
              name: '全屏广告-明确关闭',
              desc: '默认关闭。仅点击明确写有“关闭广告/直接关闭”的控件。',
              categoryKey: 9,
              enable: false,
              fastQuery: true,
              matchTime: 15000,
              actionMaximum: 1,
              resetMatch: 'activity' as const,
              rules: commonFullscreenAdRules,
            },
          ]
        : []),
    ],
  }),
);

export default [...preciseApps, ...commonAppList];
