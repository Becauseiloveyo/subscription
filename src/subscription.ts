import { defineGkdSubscription } from '@gkd-kit/define';
import appList from './appList';
import categories from './categories';
import globalGroups from './globalGroups';
import chaoxingApp from './chaoxingApp';
import jdHealthApp from './jdHealthApp';
import wechatApp from './wechatApp';

export default defineGkdSubscription({
  id: 2026061301,
  name: 'Becauseiloveyo 自用订阅',
  version: 13,
  author: 'Becauseiloveyo',
  updateUrl:
    'https://raw.githubusercontent.com/Becauseiloveyo/subscription/main/dist/gkd.json5',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/Becauseiloveyo/subscription',
  categories,
  globalGroups,
  apps: [
    ...appList.filter(
      (app) =>
        app.id !== 'com.tencent.mm' &&
        app.id !== 'com.jd.jdhealth' &&
        app.id !== 'com.chaoxing.mobile',
    ),
    wechatApp,
    jdHealthApp,
    chaoxingApp,
  ],
});
