
import { getToken, setToken, removeToken } from '@/utils/publicService.js'
import { login, getInfo, logout } from '@/plugins/axios'
const user = {
  state: {
    user: null,
    token: getToken() || null,
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      // 同时保存到 localStorage
      if (process.client) {
        this.app.$storage.local.setItem('user', JSON.stringify(user));
        Cookies.set(TokenKey, token)
      }
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    nuxtClientInit({ commit }) {
      // 客户端初始化时从 localStorage 获取数据
      const user = this.app.$storage.local.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      const token = user?.token || null;
      if (token) {
        commit('SET_TOKEN', token);
      }
      if (user) {
        commit('SET_USER', user);
      }
    },
    async nuxtServerInit({ commit }, { req }) {
      console.log('user', req.user);
      console.log('token', req.token);
      console.log('auth', req.auth);
      // 假设你有一个 API 来获取用户信息
      const user = req.user; // 从请求对象中获取用户信息
      const token = req.token; // 从请求对象中获取 token
      // if (user) {
      //   commit('SET_USER', user);
      // }
      // if (token) {
      //   commit('SET_TOKEN', token);
      // }
    },
    // 登录
    Login({ commit, dispatch }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.data.token)
          commit('SET_USER', res.data)
          commit('SET_TOKEN', res.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.data.user
          const avatar = (user.avatar == "" || user.avatar == null) ? require("@/assets/images/user.png") : user.avatar;
          if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.data.roles)
            commit('SET_PERMISSIONS', res.data.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_USER', null)
          commit('SET_TOKEN', null)
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()

          // 重定向到登录页面
          this.$router.push('/auth/login');
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', null)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
