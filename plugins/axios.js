// plugins/axios.js
import axios from 'axios';
import { getToken, tansParams } from '@/utils/publicService.js'
import errorCode from '@/utils/errorCode.js'
import { Message, MessageBox, Notification } from 'element-ui';
import StoreFn from '@/store'

const store = StoreFn();

// 是否显示重新登录
export let isRelogin = { show: false };

let service = null

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 对应国际化资源文件后缀
axios.defaults.headers['Content-Language'] = 'zh_CN'

service = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000', // 可以根据实际情况设置
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  // 在发送请求之前做些什么
  return config;
}, error => {
  console.log(error)
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  // 二进制数据则直接返回
  if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
    return res.data
  }

  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true;
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
        isRelogin.show = false;
        store.dispatch('LogOut').then(() => {
          location.href = process.env.VUE_APP_CONTEXT_PATH + "index";
        })
      }).catch(() => {
        isRelogin.show = false;
      });
    }
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
  } else if (code === 500) {
    Message({ message: msg, type: 'error' })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    Notification.error({ title: msg })
    return Promise.reject('error')
  } else {
    return res.data
  }
}, error => {
  console.log(error)
  let { message } = error;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常";
  }
  Message({ message: message, type: 'error', duration: 5 * 1000 })
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return service({
    url: '/api/user/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return service({
    url: '/api/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return service({
    url: '/api/user/logout',
    method: 'post'
  })
}

export default service;
