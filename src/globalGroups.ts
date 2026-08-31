import { defineGkdGlobalGroups } from '@gkd-kit/define';

const OPEN_AD_ORDER = -1000;
const UPDATE_PROMPT_ORDER = -900;
const YOUTH_MODE_ORDER = -800;

const disabledOpenAdAppIds = [
  'com.tencent.mm', // 微信：小程序广告由模块接管
  'li.songe.gkd', // GKD 自身
  'mark.via',
  'mark.via.gp',
  'com.mmbox.xbrowser',
  'com.mmbox.xbrowser.pro',
  'com.mycompany.app.soulbrowser',
  'com.android.packageinstaller',
  'com.google.android.packageinstaller',
  'com.miui.packageinstaller',
  'com.samsung.android.packageinstaller',
  'com.oplus.appdetail',
];

const COMMON_PREFIX =
  '[name!$=".CheckBox"][name!$=".EditText"][name!$=".ProgressBar"][childCount=0][visibleToUser=true][height>0&&width>0&&width<500&&height<300][top>0&&left>0]';

const OPEN_AD_TIME_EXCLUDES =
  '[!(text~="([01]?[0-9]|2[0-3])[:：][0-5][0-9]")][!(desc~="([01]?[0-9]|2[0-3])[:：][0-5][0-9]")]';

const OPEN_AD_EXCLUDE_MATCHES =
  '[text="Submit" || text="书签" || text="NEXT" || text="覆盖" || text="帮助" || text="取消" || text^="下一步" || text^="完成" || text*="退出" || text*="阅读并同意" || text*="跳过片" || text*="跳过视频" || ((text*="搜索" || text="历史记录" || text$="在搜") && text.length>3 && text.length<7) || ((text^="选择") && (text*="偏好" || text*="兴趣" || text*="喜好" || text*="行业"))][visibleToUser=true]';

const FAST_SKIP_VIDS =
  '[vid="tt_splash_skip_btn"||vid="btn_skip"||vid="skip_btn"||vid="skip_button"||vid="skipButton"||vid="ad_skip"||vid="ad_skip_btn"||vid="splash_skip"||vid="splash_skip_btn"||vid="splash_skip_button"||vid="tme_ad_skip_button"||vid="skip_ad_button"||vid="ksad_splash_skip_view"||vid="ksad_skip_view"||vid="ms_skipView"]';

const FAST_COUNTDOWN_VIDS =
  '[vid="count_down"||vid="count_down_view"||vid="countDown"||vid="countDownView"||vid="gdt_count_down_view"||vid="GdtCountDownView"||vid="ui_count_down"]';

const OPEN_AD_FALLBACK = `${COMMON_PREFIX}[((text.length<10&&(text*="跳过"||text*="跳 过"||text*="跳過"||text*="跳 過"||text~="(?is).*skip.*")&&text!*="视频"&&text!*="片头"&&text!*="片尾")||(vid~="(?is).*skip.*"&&vid!~="(?is).*video.*"&&vid!~="(?is).*head.*"&&vid!~="(?is).*tail.*"&&!(text="帮助")&&!(text="取消")&&!(text*="退出"))||(desc.length<10&&(desc*="跳过"||desc*="跳過"||desc~="(?is).*skip.*")))]${OPEN_AD_TIME_EXCLUDES}`;

export default defineGkdGlobalGroups([
  {
    key: 0,
    name: '开屏广告-极速多源融合',
    desc: '参考 Lin-arm、aoguai、甘霖、梦念逍遥、AIsouler、Adpro 等订阅的稳定策略：应用专属规则优先，精确 text/vid 快速查询优先，宽泛选择器最后兜底，并强化误触排除。',
    categoryKey: 0,
    order: OPEN_AD_ORDER,
    fastQuery: true,
    matchTime: 10000,
    forcedTime: 10000,
    priorityTime: 10000,
    priorityActionMaximum: 1,
    actionMaximum: 2,
    resetMatch: 'app',
    actionCd: 150,
    disableIfAppGroupMatch: '开屏广告',
    apps: disabledOpenAdAppIds.map((id) => ({ id, enable: false })),
    rules: [
      {
        key: 0,
        name: '极速-精确跳过',
        excludeMatches: OPEN_AD_EXCLUDE_MATCHES,
        anyMatches: [
          '@[text="跳过"][width<500][height<300][visibleToUser=true]',
          '@[text="跳 过"][width<500][height<300][visibleToUser=true]',
          '@[text="跳過"][width<500][height<300][visibleToUser=true]',
          '@[text="跳 過"][width<500][height<300][visibleToUser=true]',
          '@[text="跳过广告"][width<500][height<300][visibleToUser=true]',
        ],
      },
      {
        key: 1,
        name: '极速-常见广告SDK资源ID',
        excludeMatches: OPEN_AD_EXCLUDE_MATCHES,
        matches: `@${FAST_SKIP_VIDS}[childCount=0][visibleToUser=true][width<500&&height<300]${OPEN_AD_TIME_EXCLUDES}`,
      },
      {
        key: 2,
        name: '极速-倒计时资源ID',
        excludeMatches: OPEN_AD_EXCLUDE_MATCHES,
        matches: `@${FAST_COUNTDOWN_VIDS}[childCount=0][visibleToUser=true][width<500&&height<300]${OPEN_AD_TIME_EXCLUDES}`,
      },
      {
        key: 3,
        name: '快速-短文本跳过',
        excludeMatches: OPEN_AD_EXCLUDE_MATCHES,
        matches:
          '@[text*="跳过" || text*="跳過"][text.length<10][text!*="视频"][text!*="片头"][text!*="片尾"][childCount=0][width<500][height<300][visibleToUser=true]',
      },
      {
        key: 4,
        name: '兼容-多特征兜底',
        excludeMatches: OPEN_AD_EXCLUDE_MATCHES,
        matches: `@${OPEN_AD_FALLBACK}`,
      },
      {
        key: 5,
        name: '字节SDK-有广告语境的关闭控件',
        anyMatches: [
          '@View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0] <n FrameLayout[childCount>2][text=null][desc=null] >(n+6) [text*="第三方应用" || text*="扭动手机" || text*="点击或上滑" || text*="省钱好物" || text*="扭一扭"][visibleToUser=true]',
        ],
      },
    ],
  },
  {
    key: 20,
    name: '更新提示-全局安全关闭',
    desc: '默认关闭。参考活跃订阅的更新弹窗规则，并让应用专属“更新提示”规则优先。',
    categoryKey: 2,
    enable: false,
    order: UPDATE_PROMPT_ORDER,
    fastQuery: true,
    matchTime: 10000,
    forcedTime: 10000,
    actionMaximum: 1,
    resetMatch: 'app',
    actionCd: 800,
    disableIfAppGroupMatch: '更新提示',
    rules: [
      {
        key: 0,
        excludeMatches:
          '[text*="全部"][text*="更新" || text*="忽略"][text.length<7][visibleToUser=true] || [text^="继续" || text^="仍然" || text*="权限"][text.length<6][visibleToUser=true] || [text*="来源"][visibleToUser=true]',
        matches: [
          '[text*="内测" || text*="测试版" || text*="新版" || text*="更新" || text*="升级" || text*="体验" || text*="Update" || text*="Upgrade"][text!*="自动"][text!*="成功"][text!*="失败"][text!*="检查更新"][text!*="检测更新"][text!*="卸载"][name!$=".EditText"][childCount=0][visibleToUser=true]',
          '@[text="暂不更新" || text="暂不升级" || text="以后再说" || text="下次再说" || text="忽略本次" || text="稍后" || text="取消" || text="Not now" || text="Later"][text.length<8][childCount=0][visibleToUser=true]',
        ],
      },
    ],
  },
  {
    key: 30,
    name: '青少年模式-全局安全关闭',
    desc: '默认关闭。只有同时识别到青少年/未成年人语境与明确关闭按钮时才执行。',
    categoryKey: 3,
    enable: false,
    order: YOUTH_MODE_ORDER,
    fastQuery: true,
    matchTime: 10000,
    forcedTime: 10000,
    actionMaximum: 1,
    resetMatch: 'app',
    actionCd: 800,
    disableIfAppGroupMatch: '青少年模式',
    rules: [
      {
        key: 0,
        matches: [
          '[text*="青少年" || text*="未成年" || text*="儿童"][text*="模式" || text*="守护"][text.length<15][childCount=0][visibleToUser=true]',
          '@[text="我知道了" || text="知道了" || text="我已知晓" || text*="已满" || text*="不再提" || text="关闭"][text.length<8][childCount=0][visibleToUser=true]',
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
