import { defineGkdApp } from '@gkd-kit/define';

const commonSplashRules = [
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
];

const commonPopupRules = [
  {
    key: 0,
    matches:
      '[text="关闭" || text="以后再说" || text="暂不" || text="稍后再说" || text="下次再说"][visibleToUser=true]',
  },
  {
    key: 1,
    matches:
      '[desc="关闭" || desc*="关闭弹窗" || desc*="关闭广告"][visibleToUser=true]',
  },
];

const commonUpdateRules = [
  {
    key: 0,
    matches:
      '[text="暂不更新" || text="以后再说" || text="下次再说" || text="忽略本次"][visibleToUser=true]',
  },
];

const commonYouthRules = [
  {
    key: 0,
    matches:
      '[text="我知道了" || text="知道了" || text="暂不开启" || text="不开启"][visibleToUser=true]',
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
    id: 'com.tencent.mm',
    name: '微信',
    groups: [
      {
        key: 1,
        name: '小程序开屏广告-快照精准',
        desc: '根据用户快照：微信小程序 AppBrandUI00 内广告，点击“跳过”。',
        categoryKey: 0,
        fastQuery: true,
        matchTime: 12000,
        forcedTime: 5000,
        priorityTime: 12000,
        actionMaximum: 1,
        resetMatch: 'activity',
        actionCd: 1000,
        activityIds: 'com.tencent.mm.plugin.appbrand.ui.AppBrandUI00',
        rules: [
          {
            key: 0,
            matches: [
              '[text="广告"][visibleToUser=true]',
              '[text="秒"][visibleToUser=true]',
              '@[text="跳过"][visibleToUser=true]',
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
  }),
  defineGkdApp({
    id: 'com.dragon.read',
    name: '番茄免费小说',
    groups: [
      {
        key: 10,
        name: '弹窗处理-电商券弹窗',
        desc: '根据用户快照关闭“惊喜电商券即将失效”弹窗，不点击“去使用”。',
        categoryKey: 1,
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
    ],
  }),
];

const commonApps = [
  ['com.tencent.mobileqq', 'QQ', true, true, false],
  ['com.eg.android.AlipayGphone', '支付宝', false, true, false],
  ['com.taobao.taobao', '淘宝', true, true, false],
  ['com.jingdong.app.mall', '京东', true, true, false],
  ['com.xunmeng.pinduoduo', '拼多多', true, false, false],
  ['com.taobao.idlefish', '闲鱼', true, false, false],
  ['com.sankuai.meituan', '美团', true, false, false],
  ['me.ele', '饿了么', true, false, false],
  ['com.ss.android.ugc.aweme', '抖音', false, false, true],
  ['com.ss.android.ugc.aweme.lite', '抖音极速版', false, false, true],
  ['com.smile.gifmaker', '快手', false, false, true],
  ['com.kuaishou.nebula', '快手极速版', false, false, true],
  ['com.xingin.xhs', '小红书', true, false, false],
  ['com.zhihu.android', '知乎', true, true, false],
  ['com.sina.weibo', '微博', true, false, false],
  ['com.baidu.netdisk', '百度网盘', true, true, false],
  ['com.quark.browser', '夸克', true, true, false],
  ['com.UCMobile', 'UC浏览器', true, true, false],
  ['com.tencent.mtt', 'QQ浏览器', true, true, false],
  ['com.baidu.searchbox', '百度', true, true, false],
  ['com.autonavi.minimap', '高德地图', true, false, false],
  ['com.baidu.BaiduMap', '百度地图', true, false, false],
  ['com.tencent.qqlive', '腾讯视频', true, false, false],
  ['com.qiyi.video', '爱奇艺', true, false, false],
  ['com.youku.phone', '优酷', true, false, false],
  ['com.hunantv.imgo.activity', '芒果TV', true, false, false],
  ['com.netease.cloudmusic', '网易云音乐', true, false, false],
  ['com.tencent.qqmusic', 'QQ音乐', true, false, false],
  ['com.kugou.android', '酷狗音乐', true, false, false],
  ['cn.wps.moffice_eng', 'WPS Office', true, true, false],
  ['com.coolapk.market', '酷安', true, true, false],
  ['com.tencent.news', '腾讯新闻', true, true, false],
  ['com.netease.newsreader.activity', '网易新闻', true, true, false],
  ['com.ss.android.article.news', '今日头条', true, true, false],
  ['com.smzdm.client.android', '什么值得买', true, true, false],
  ['com.achievo.vipshop', '唯品会', true, true, false],
  ['com.dianping.v1', '大众点评', true, false, false],
  ['com.sdu.didi.psnger', '滴滴出行', true, false, false],
  ['ctrip.android.view', '携程旅行', true, false, false],
  ['com.tencent.weread', '微信读书', true, false, false],
  ['com.kuaikan.comic', '快看漫画', true, false, false],
  ['com.hupu.games', '虎扑', true, true, false],
  ['air.tv.douyu.android', '斗鱼直播', true, false, true],
  ['com.duowan.kiwi', '虎牙直播', true, false, true],
  ['com.google.android.youtube', 'YouTube', false, false, false],
  ['org.telegram.messenger', 'Telegram', false, false, false],
  ['com.spotify.music', 'Spotify', false, false, false],
  ['com.netflix.mediaclient', 'Netflix', false, false, false],
  ['com.openai.chatgpt', 'ChatGPT', true, false, false],
  ['com.android.vending', 'Google Play', false, false, false],
  ['com.facebook.katana', 'Facebook', true, false, false],
  ['com.instagram.android', 'Instagram', true, false, false],
  ['com.twitter.android', 'X', true, false, false],
] as const;

const commonAppList = commonApps.map(
  ([id, name, popup, update, youth]) =>
    defineGkdApp({
      id,
      name,
      groups: [
        {
          key: 0,
          name: '开屏广告-常见跳过',
          desc: '未使用本机快照验证，仅在应用启动后的短时间内匹配明确跳过按钮。',
          categoryKey: 0,
          fastQuery: true,
          matchTime: 10000,
          forcedTime: 3000,
          priorityTime: 10000,
          actionMaximum: 1,
          resetMatch: 'app',
          actionCd: 1000,
          rules: commonSplashRules,
        },
        ...(popup
          ? [
              {
                key: 10,
                name: '弹窗处理-常见关闭',
                desc: '默认关闭。仅匹配明确的负向或关闭按钮。',
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
        ...(update
          ? [
              {
                key: 20,
                name: '更新提示-暂不更新',
                desc: '默认关闭。不点击立即更新。',
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
        ...(youth
          ? [
              {
                key: 30,
                name: '青少年模式-提示关闭',
                desc: '默认关闭。只匹配常见知道了/暂不开启按钮。',
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
      ],
    }),
);

export default [...preciseApps, ...commonAppList];
