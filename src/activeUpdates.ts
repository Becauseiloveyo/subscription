import { defineGkdApp } from '@gkd-kit/define';

/**
 * 近期活跃订阅覆盖层
 * 参考来源：
 * - Lin-arm/GKD_subscription
 * - aoguai/subscription
 * - ganlinte/GKD-subscription
 * - YaChengMu/gkd_subscription_min
 *
 * 原则：
 * 1. 只吸收近期仍维护、低误触、可解释的广告/弹窗规则。
 * 2. 功能性自动操作（自动上滑、自动授权、自动支付确认等）不纳入。
 * 3. 非开屏广告默认关闭，由分类/规则组按需开启。
 */

const bili = defineGkdApp({
  id: 'tv.danmaku.bili',
  name: '哔哩哔哩',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      categoryKey: 0,
      order: -2500,
      matchRoot: true,
      fastQuery: true,
      actionMaximum: 2,
      resetMatch: 'app',
      priorityTime: 10000,
      rules: [
        {
          key: 0,
          actionCd: 300,
          matches: '[vid="count_down" || vid="skip"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 80,
      name: '局部广告-视频页广告',
      categoryKey: 8,
      enable: false,
      fastQuery: true,
      rules: [
        {
          key: 0,
          matchTime: 10000,
          actionMaximum: 1,
          activityIds: [
            'com.bilibili.ship.theseus.detail.UnitedBizDetailsActivity',
            'com.bilibili.video.videodetail.VideoDetailsActivity',
          ],
          matches: '[vid="toast_x"]',
        },
        {
          key: 1,
          activityIds: 'com.bilibili.ship.theseus.detail.UnitedBizDetailsActivity',
          matches:
            '@[vid="close"][visibleToUser=true] - [text$="免费领B站大会员"]',
        },
        {
          key: 2,
          activityIds: 'com.bilibili.ship.theseus.detail.UnitedBizDetailsActivity',
          matches:
            '@[text="取消"] - [text="后将展示广告"] <2 View < View < ComposeView < LinearLayout < RecyclerView < FrameLayout <n FrameLayout < [vid="video_container"]',
        },
      ],
    },
    {
      key: 81,
      name: '局部广告-直播间悬浮广告',
      categoryKey: 8,
      enable: false,
      fastQuery: true,
      activityIds: 'com.bilibili.bililive.room.ui.roomv3.LiveRoomActivityV3',
      rules: [
        {
          key: 0,
          matches:
            '[vid="shopping_close" || vid="live_game_card_close" || vid="match_close" || vid="iv_pop_rank_guide_card_close" || vid="card_close"][clickable=true]',
        },
      ],
    },
  ],
});

const coolapk = defineGkdApp({
  id: 'com.coolapk.market',
  name: '酷安',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      categoryKey: 0,
      order: -2500,
      fastQuery: true,
      matchTime: 10000,
      resetMatch: 'app',
      priorityTime: 10000,
      excludeActivityIds: [
        '.view.feed.',
        '.view.node.DynamicNodePageActivity',
      ],
      rules: [
        {
          key: 0,
          actionMaximum: 1,
          matches:
            '@View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0] <n FrameLayout[childCount>2][text=null][desc=null] >(n+6) [text*="第三方应用" || text*="扭动手机" || text*="点击或上滑" || text*="省钱好物" || text*="扭一扭" || text*="Shake"]',
        },
        {
          key: 1,
          actionMaximum: 1,
          matches:
            'TextView - @View[clickable=true][width<200] <(2,3) FrameLayout <2 FrameLayout < FrameLayout < [vid="ad_container"]',
        },
        {
          key: 2,
          actionCd: 300,
          actionMaximum: 5,
          excludeMatches: '[text*="搜索"]',
          matches:
            '[!(vid="item_view") && !(vid="card_view")] > [text*="跳过" || text*="Skip"][text.length<10][width<500 && height<300][visibleToUser=true]',
        },
      ],
    },
    {
      key: 100,
      name: '分段广告-信息流广告',
      categoryKey: 10,
      enable: false,
      fastQuery: true,
      rules: [
        {
          key: 0,
          matches:
            '@[vid="close_view"] <<n [vid="coolapk_card_view"][visibleToUser=true]',
        },
        {
          key: 1,
          preKeys: [0],
          anyMatches: [
            '@[clickable=true] >(1,2) [text="不感兴趣"][visibleToUser=true]',
            '[text="不感兴趣"][clickable=true][visibleToUser=true]',
          ],
        },
      ],
    },
  ],
});

const qq = defineGkdApp({
  id: 'com.tencent.mobileqq',
  name: 'QQ',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      categoryKey: 0,
      order: -2500,
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      priorityTime: 10000,
      excludeActivityIds: [
        'com.tencent.mobileqq.activity.ChatActivity',
        'com.tencent.mobileqq.search.activity.UniteSearchActivity',
      ],
      rules: [
        {
          key: 0,
          excludeMatches: '[vid="root"]',
          matches: 'TextView[text^="跳过"][text.length<=10][vid!="title"]',
        },
      ],
    },
    {
      key: 80,
      name: '局部广告-明确关闭',
      categoryKey: 8,
      enable: false,
      rules: [
        {
          key: 0,
          fastQuery: true,
          activityIds: [
            'com.qzone.reborn.base.QZoneTransparentShellActivity',
            'com.qzone.reborn.base.QZoneShellActivity',
          ],
          matches:
            '@[desc="关闭广告"][visibleToUser=true] <4 RelativeLayout <2 LinearLayout <2 LinearLayout < FrameLayout <n RecyclerView < FrameLayout - FrameLayout >2 [text="详情"]',
        },
        {
          key: 1,
          fastQuery: true,
          activityIds: 'com.qzone.reborn.feedx.activity.QZoneFriendFeedXActivity',
          matches: '@[desc="关闭"] - [text="推荐你试试这些玩法"]',
        },
      ],
    },
    {
      key: 100,
      name: '分段广告-QQ空间广告卡片',
      categoryKey: 10,
      enable: false,
      fastQuery: true,
      rules: [
        {
          key: 0,
          activityIds: [
            'com.qzone.reborn.feedpro.activity.QzoneFriendFeedProActivity',
            '.guild.base.QPublicFragmentActivityForMainWebActivity',
            'com.qzone.reborn.base.QZoneShellActivity',
          ],
          matches: '@[clickable=true] > [text="广告"][visibleToUser=true]',
        },
        {
          key: 50,
          preKeys: [0],
          activityIds: [
            'com.qzone.reborn.feedpro.activity.QzoneFriendFeedProActivity',
            '.guild.base.QPublicFragmentActivityForMainWebActivity',
            'com.qzone.reborn.base.QZoneShellActivity',
          ],
          matches:
            '@[clickable=true] >(1,2) [text^="关闭"][text*="条"][text.length<10]',
        },
        {
          key: 100,
          preKeys: [50],
          activityIds: [
            'com.qzone.reborn.feedpro.activity.QzoneFriendFeedProActivity',
            '.guild.base.QPublicFragmentActivityForMainWebActivity',
            'com.qzone.reborn.base.QZoneShellActivity',
          ],
          matches: '[text="直接关闭"][clickable=true]',
        },
      ],
    },
  ],
});

const neteaseMusic = defineGkdApp({
  id: 'com.netease.cloudmusic',
  name: '网易云音乐',
  groups: [
    {
      key: 100,
      name: '分段广告-卡片广告',
      categoryKey: 10,
      enable: false,
      rules: [
        {
          key: 0,
          fastQuery: true,
          activityIds: [
            '.activity.MainActivity',
            '.music.biz.comment.activity.CommentActivity',
            '.music.biz.voice.player.revisionV1.ProgramPlayerActivityV1',
          ],
          matches:
            '[vid="tag_ad_banner" || vid="adTagView" || vid="closeAction"][clickable=true]',
        },
        {
          key: 90,
          fastQuery: true,
          activityIds: [
            '.activity.MainActivity',
            '.music.biz.comment.activity.CommentActivity',
            '.music.biz.voice.player.revisionV1.ProgramPlayerActivityV1',
          ],
          anyMatches: [
            '[text="直接关闭"][clickable=true]',
            '@[clickable=true] > [text="不感兴趣"]',
          ],
        },
        {
          key: 91,
          fastQuery: true,
          activityIds: '.music.biz.search.activity.SearchActivity',
          matches: '[vid="adTagView" || vid="adTagViewNew"][clickable=true]',
        },
        {
          key: 92,
          preKeys: [91],
          fastQuery: true,
          activityIds: '.music.biz.search.activity.SearchActivity',
          matches: '[text="直接关闭"]',
        },
      ],
    },
    {
      key: 80,
      name: '局部广告-卡片广告',
      categoryKey: 8,
      enable: false,
      fastQuery: true,
      rules: [
        {
          key: 0,
          activityIds: '.activity.PlayerActivity',
          matches: '[vid="iv_ad_close"]',
        },
        {
          key: 1,
          activityIds: '.music.biz.search.activity.SearchActivity',
          matches: '[vid="adCloseIV"][visibleToUser=true]',
        },
      ],
    },
  ],
});

const pinduoduo = defineGkdApp({
  id: 'com.xunmeng.pinduoduo',
  name: '拼多多',
  groups: [
    {
      key: 90,
      name: '全屏广告-活动/红包/下单后弹窗',
      categoryKey: 9,
      enable: false,
      rules: [
        {
          key: 0,
          fastQuery: true,
          action: 'back',
          activityIds: [
            '.ui.activity.HomeActivity',
            '.ui.activity.MainFrameActivity',
          ],
          excludeMatches:
            '[text="我的订单" || text="聊天"][bottom<500][visibleToUser=true]',
          matches:
            '[text="开心收下" || text="去抢购" || text="立即抽免单" || text="去刮奖" || text="立即领取" || text="去领大额金币" || text="送你大额现金" || text*="红包助手" || text="立即充值" || text="打款金额"][top>600][visibleToUser=true]',
        },
        {
          key: 1,
          activityIds: [
            '.activity.NewPageMaskActivity',
            '.ui.activity.HomeActivity',
          ],
          action: 'clickCenter',
          matches: 'Button[text="关闭弹窗" || desc="关闭弹窗"][clickable=true]',
        },
      ],
    },
    {
      key: 80,
      name: '局部广告-商品详情视频讲解',
      categoryKey: 8,
      enable: false,
      fastQuery: true,
      activityIds: '.activity.NewPageActivity',
      rules: '[vid="iv_float_window_close"]',
    },
  ],
});

const idlefish = defineGkdApp({
  id: 'com.taobao.idlefish',
  name: '闲鱼',
  groups: [
    {
      key: 100,
      name: '分段广告-信息流广告',
      categoryKey: 10,
      enable: false,
      fastQuery: true,
      forcedTime: 100000,
      rules: [
        {
          key: 0,
          action: 'longClick',
          activityIds: '.search_implement.SearchResultActivity',
          matches: '@[longClickable=true] >3 [text="广告"][visibleToUser=true]',
        },
        {
          key: 1,
          action: 'longClick',
          activityIds: [
            '.maincontainer.activity.MainActivity',
            '.detail.DetailActivity',
          ],
          matches:
            '@[longClickable=true][childCount=0][height>width] < [childCount>1] >(1,3,4) [text="广告"][visibleToUser=true]',
        },
        {
          key: 20,
          preKeys: [0, 1, 20],
          actionCd: 500,
          actionDelay: 50,
          activityIds: [
            'com.idlefish.flutterbridge.flutterboost.boost.FishFlutterBoostActivity',
            'com.idlefish.flutterbridge.flutterboost.boost.FishFlutterBoostTransparencyActivity',
          ],
          matches: '[desc="引起不适"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 80,
      name: '局部广告-明确关闭',
      categoryKey: 8,
      enable: false,
      rules: [
        {
          key: 0,
          fastQuery: true,
          activityIds: '.maincontainer.activity.MainActivity',
          matches:
            '@ImageView[clickable=true][width<100] <(2,5) FrameLayout <<(3,4) [vid="fish_layer_container_id"]',
        },
      ],
    },
  ],
});

const xApp = defineGkdApp({
  id: 'com.twitter.android',
  name: 'X',
  groups: [
    {
      key: 100,
      name: '分段广告-主页信息流广告',
      categoryKey: 10,
      enable: false,
      actionCd: 3000,
      fastQuery: true,
      rules: [
        {
          key: 0,
          activityIds: [
            'com.twitter.app.main.MainActivity',
            'com.twitter.app.profiles.ProfileActivity',
          ],
          matches:
            '@[id$="_action"] <2 * + * >(1,3) [text$="广告后播放" || text$="推荐"]',
        },
        {
          key: 1,
          activityIds: [
            'com.twitter.app.main.MainActivity',
            'com.twitter.app.profiles.ProfileActivity',
          ],
          matches:
            '@[vid="tweet_curation_action"] - [vid="tweet_ad_badge_top_right"][visibleToUser=true]',
        },
        {
          key: 10,
          preKeys: [0, 1],
          matches:
            '@[clickable=true] > [text^="我不喜" || text^="屏蔽" || text^="封鎖" || text^="Block"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 90,
      name: '全屏广告-个性化广告提示',
      categoryKey: 9,
      enable: false,
      fastQuery: true,
      activityIds: 'com.twitter.app.main.MainActivity',
      rules:
        '[vid="secondary_button"][clickable=true][getChild(0).getChild(0).getChild(0).text="保留更少相关广告"]',
    },
  ],
});

const douyinLite = defineGkdApp({
  id: 'com.ss.android.ugc.aweme.lite',
  name: '抖音极速版',
  groups: [
    {
      key: 80,
      name: '局部广告-商品/聊天推广',
      categoryKey: 8,
      enable: false,
      fastQuery: true,
      activityIds: 'com.ss.android.ugc.aweme.main.MainActivity',
      rules: [
        {
          key: 0,
          matches: '@[desc="关闭"][clickable=true] - [text*="打个招呼"]',
        },
        {
          key: 1,
          matches:
            '@ImageView[clickable=true] + [focusable=true] >4 [text="购买"][index=1][visibleToUser=true]',
        },
      ],
    },
    {
      key: 90,
      name: '全屏广告-朋友推荐/桌面小组件',
      categoryKey: 9,
      enable: false,
      rules: [
        {
          key: 0,
          fastQuery: true,
          activityIds: 'com.ss.android.ugc.aweme.main.MainActivity',
          matches: '[text="朋友推荐"] +2 [vid="close"][clickable=true]',
        },
        {
          key: 1,
          fastQuery: true,
          activityIds: 'com.ss.android.ugc.aweme.main.MainActivity',
          matches: '@ImageView[clickable=true] - [text$="桌面小组件"]',
        },
      ],
    },
    {
      key: 100,
      name: '分段广告-搜索结果页广告',
      categoryKey: 10,
      enable: false,
      fastQuery: true,
      activityIds: 'com.ss.android.ugc.aweme.search.activity.SearchResultActivity',
      rules: [
        {
          key: 0,
          matches:
            '@[desc="广告反馈"] <3 [childCount=3] + [visibleToUser=true] >5 [text="广告"]',
        },
      ],
    },
  ],
});

const kuaishouLite = defineGkdApp({
  id: 'com.kuaishou.nebula',
  name: '快手极速版',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      categoryKey: 0,
      order: -2500,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      priorityTime: 10000,
      rules: [
        {
          fastQuery: true,
          matches: '[vid="splash_skip_text"]',
        },
      ],
    },
    {
      key: 90,
      name: '全屏广告-朋友推荐/红包弹窗',
      categoryKey: 9,
      enable: false,
      fastQuery: true,
      rules: [
        {
          key: 0,
          activityIds: 'com.yxcorp.gifshow.HomeActivity',
          matches:
            '[vid="popup_view" || vid="content_wrapper"] > [vid="close_btn"][visibleToUser=true]',
        },
        {
          key: 1,
          activityIds: [
            'com.yxcorp.gifshow.HomeActivity',
            'com.yxcorp.plugin.search.SearchActivity',
          ],
          matches:
            '@[clickable=true][width<128][index=parent.childCount.minus(1)] -(1,2) ViewGroup > [text="点击立得奖励" || text^="邀请" || text="红包"]',
        },
      ],
    },
    {
      key: 100,
      name: '分段广告-悬浮广告',
      categoryKey: 10,
      enable: false,
      fastQuery: true,
      activityIds: 'com.yxcorp.gifshow.HomeActivity',
      rules: [
        {
          key: 0,
          matches: '[vid="close_icon" || vid="close_pendant"][visibleToUser=true]',
        },
        {
          key: 1,
          preKeys: [0],
          matches: '[text="确定"][visibleToUser=true]',
        },
      ],
    },
  ],
});

const taobao = defineGkdApp({
  id: 'com.taobao.taobao',
  name: '淘宝',
  groups: [
    {
      key: 90,
      name: '全屏广告-弹窗广告',
      categoryKey: 9,
      enable: false,
      fastQuery: true,
      rules: [
        {
          key: 0,
          activityIds: [
            'com.taobao.tao.welcome.Welcome',
            'com.taobao.tao.TBMainActivity',
            'com.taobao.android.tbabilitykit.pop.StdPopContainerActivity',
            'com.taobao.android.detail.wrapper.activity.DetailActivity',
            'com.alibaba.triver.container.TriverMainActivity',
          ],
          matches: '@[desc="关闭按钮"] - [vid="poplayer_native_state_id"]',
        },
      ],
    },
    {
      key: 80,
      name: '局部广告-浮条/横幅',
      categoryKey: 8,
      enable: false,
      fastQuery: true,
      rules: [
        {
          key: 0,
          activityIds: 'com.taobao.tao.welcome.Welcome',
          matches: '@[desc="关闭浮条"] <<n [vid="poplayer_native_state_id"]',
        },
        {
          key: 1,
          activityIds: 'com.taobao.android.detail.alittdetail.TTDetailActivity',
          matches:
            '@FrameLayout[desc="关闭"][clickable=true][visibleToUser=true] -3 ImageView <<n [vid="bottom_float_dx"]',
        },
      ],
    },
    {
      key: 20,
      name: '更新提示',
      categoryKey: 2,
      enable: false,
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      activityIds: [
        'com.taobao.android.detail.wrapper.activity.DetailActivity',
        'com.taobao.android.order.bundle.TBOrderListActivity',
        'com.taobao.search.sf.MainSearchResultActivity',
        'com.taobao.browser.BrowserActivity',
        'com.taobao.themis.container.app.TMSActivity',
      ],
      rules: '[vid="update_imageview_cancel_v2"]',
    },
  ],
});

const alipay = defineGkdApp({
  id: 'com.eg.android.AlipayGphone',
  name: '支付宝',
  groups: [
    {
      key: 20,
      name: '更新提示',
      categoryKey: 2,
      enable: false,
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          key: 0,
          matches: '[text="立即更新" || text="马上体验"] <n * > [text*="稍后"]',
        },
        {
          key: 1,
          matches: [
            '[text="版本更新" || text^="Version"]',
            '[id="com.alipay.mobile.antui:id/btn_close" || id="com.alipay.mobile.accountauthbiz:id/close_dialog_button"]',
          ],
        },
      ],
    },
    {
      key: 90,
      name: '全屏广告-推荐弹窗',
      categoryKey: 9,
      enable: false,
      fastQuery: true,
      rules: [
        {
          key: 0,
          activityIds: 'com.eg.android.AlipayGphone.AlipayLogin',
          matches:
            '@ImageView[desc="关闭"][clickable=true] < LinearLayout - [id="com.alipay.mobile.advertisement:id/standardlayer_contentview"][desc="推荐广告"]',
        },
        {
          key: 1,
          activityIds: 'com.alipay.mobile.nebulax.xriver.activity.XRiverActivity',
          matches: 'Image[visibleToUser=true][text="关闭弹屏"]',
        },
      ],
    },
    {
      key: 100,
      name: '分段广告-服务消息广告',
      categoryKey: 10,
      enable: false,
      fastQuery: true,
      activityIds: [
        'com.alipay.android.phone.messageboxapp.ui.MsgBoxTabActivity',
        'com.alipay.android.phone.msgboxapp.ui.activity.MBoxTabPageActivity',
      ],
      rules: [
        {
          key: 0,
          matches: '@[clickable=true] > [text="广告"]',
        },
        {
          key: 1,
          preKeys: [0],
          matches: '@[clickable=true] >2 [text="不感兴趣"]',
        },
      ],
    },
  ],
});

export const activeUpdateAppIds = [
  'tv.danmaku.bili',
  'com.coolapk.market',
  'com.tencent.mobileqq',
  'com.netease.cloudmusic',
  'com.xunmeng.pinduoduo',
  'com.taobao.idlefish',
  'com.twitter.android',
  'com.ss.android.ugc.aweme.lite',
  'com.kuaishou.nebula',
  'com.taobao.taobao',
  'com.eg.android.AlipayGphone',
] as const;

export default [
  bili,
  coolapk,
  qq,
  neteaseMusic,
  pinduoduo,
  idlefish,
  xApp,
  douyinLite,
  kuaishouLite,
  taobao,
  alipay,
];
