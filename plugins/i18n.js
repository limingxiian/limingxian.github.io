import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ElementLocale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
ElementLocale.use(zhLocale);

Vue.use(VueI18n);

// export default ({ app }, inject) => {
//   console.log('locale', app.i18n);
//   app.i18n = new VueI18n({
//     locale: app.i18n.locale, // 从 Nuxt i18n 模块获取当前语言
//     fallbackLocale: 'en', // 默认语言
//     messages: {
//       en: {
//         ...require('~/locales/en.json'),
//         ...enLocale,
//       },
//       zh: {
//         ...require('~/locales/zh.json'),
//         ...zhLocale,
//       },
//     },
//   });

//   // 设置 Element UI 的语言
//   ElementLocale.i18n((key, value) => app.i18n.t(key, value));
// };
