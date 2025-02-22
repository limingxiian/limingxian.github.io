import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { setToken, removeToken } from '@/utils/publicService.js'
import { login, logout } from '@/plugins/axios'

Vue.use(Vuex)

export const state = () => ({
  // 定义 state
  token: null,
  user: null,
  permission: [],
  avatar: null
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token || null;
    if (process.client && token) {
      this.app.$storage.local.setItem('token', token);
    }
  },
  SET_USER(state, user) {
    state.user = user || null;
    if (process.client && user) {
      this.app.$storage.local.setItem('user', JSON.stringify(user));
    }
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION(state, permission) {
    state.permission = permission;
  }
}

export const actions = {
  // 登录
  Login({ commit, dispatch }, userInfo) {
    const username = userInfo.username.trim()
    const password = userInfo.password
    const code = userInfo.code
    const uuid = userInfo.uuid
    return new Promise((resolve, reject) => {
      login(username, password, code, uuid).then(res => {
        setToken(res.data.token)
        this.app.$storage.local.setItem('user', JSON.stringify(res.data))
        this.app.$storage.local.setItem('token', res.data.token)
        const avatar = (res.data.avatar == "" || res.data.avatar == null) ? require("@/assets/images/user.png") : res.data.avatar;
        commit('SET_USER', res.data)
        commit('SET_TOKEN', res.data.token)
        commit('SET_PERMISSIONS', res.data.permissions)
        commit('SET_AVATAR', avatar)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出系统
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        this.app.$storage.local.removeItem('user')
        this.app.$storage.local.removeItem('token')
        this.app.$storage.local.removeItem('vuex')
        commit('SET_USER', null)
        commit('SET_TOKEN', null)
        commit('SET_PERMISSIONS', [])
        commit('SET_AVATAR', null)
        removeToken()

        // 重定向到登录页面
        this.$router.push('/auth/login');
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

// 方式一：直接暴露出actions、state、mutations
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
// 方式二：按模块规划
// const store = new Vuex.Store({
//   modules: {
//     user,
//   },
//   getters
// })

export default function (ctx) {
  // 通过上下文(ctx)可以访问到Nuxt.js的上下文对象
  return store
}
