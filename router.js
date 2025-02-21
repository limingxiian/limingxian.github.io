import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _789f9716 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _58e7bc51 = () => interopDefault(import('..\\pages\\admin\\about.vue' /* webpackChunkName: "pages/admin/about" */))
const _8c8c62b8 = () => interopDefault(import('..\\pages\\admin\\user-list.vue' /* webpackChunkName: "pages/admin/user-list" */))
const _6c5c811e = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _14c067ef = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _789f9716,
    name: "admin"
  }, {
    path: "/admin/about",
    component: _58e7bc51,
    name: "admin-about"
  }, {
    path: "/admin/user-list",
    component: _8c8c62b8,
    name: "admin-user-list"
  }, {
    path: "/auth/login",
    component: _6c5c811e,
    name: "auth-login"
  }, {
    path: "/",
    component: _14c067ef,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
