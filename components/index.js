export const AuthButton = () => import('../..\\components\\AuthButton.vue' /* webpackChunkName: "components/auth-button" */).then(c => wrapFunctional(c.default || c))
export const Container = () => import('../..\\components\\Container.vue' /* webpackChunkName: "components/container" */).then(c => wrapFunctional(c.default || c))
export const FormDialog = () => import('../..\\components\\FormDialog.vue' /* webpackChunkName: "components/form-dialog" */).then(c => wrapFunctional(c.default || c))
export const Iconfont = () => import('../..\\components\\Iconfont.vue' /* webpackChunkName: "components/iconfont" */).then(c => wrapFunctional(c.default || c))
export const MyPagination = () => import('../..\\components\\MyPagination.vue' /* webpackChunkName: "components/my-pagination" */).then(c => wrapFunctional(c.default || c))
export const MyTable = () => import('../..\\components\\MyTable.vue' /* webpackChunkName: "components/my-table" */).then(c => wrapFunctional(c.default || c))
export const NavMenu = () => import('../..\\components\\navMenu.vue' /* webpackChunkName: "components/nav-menu" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = () => import('../..\\components\\NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../..\\components\\Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))
export const LayoutAdmin = () => import('../..\\components\\layout\\admin.vue' /* webpackChunkName: "components/layout-admin" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
