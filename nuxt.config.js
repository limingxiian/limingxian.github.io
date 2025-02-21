import Vue from "vue";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  buildDir: 'build', // 默认值是 'dist'
  head: {
    title: 'my-first-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.css',
    '@/assets/iconfont.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/mock/index',
    '@/plugins/storage.js',
    '~/plugins/i18n.js',
    { src: '@/plugins/persisted-state.js', ssr: false },
    { src: '@/plugins/check-auth.js', ssr: false } // 确保在客户端模式下运行
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  router: {
    middleware: ['auth'],
    beforeEach: (to, from, next) => {
      // 这里可以访问 Vue 实例，但无法直接访问 store
      // 使用上面创建的插件来检查 token
      checkAuth({ app: { router: Vue.prototype.$nuxt.$router } })(to, from, next);
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // "@nuxtjs/i18n",
  ],
  // i18n: {
  //   langDir: 'locales/', // 语言文件目录
  //   locales: [
  //     {
  //       code: 'en',
  //       iso: 'en',
  //       name: 'English',
  //       file: 'en.json',
  //     },
  //     {
  //       code: 'zh',
  //       iso: 'zh',
  //       name: '简体中文',
  //       file: 'zh.json',
  //     },
  //   ],
  //   defaultLocale: 'zh', // 默认语言
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieKey: 'i18n_redirected',
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/, 'axios'],
  },
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.prod.example.com' : 'https://api.dev.example.com'
  },
}
