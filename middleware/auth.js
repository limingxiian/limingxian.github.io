// middleware/auth.js
export default function ({ store, route, app, redirect, isServer }) {
  // if (isServer) {
  //   // 服务器端逻辑
  //   return redirect('/auth/login');
  // } else {
  //   // 客户端逻辑
  //   console.log('client');
  // }
  if (process.client) {
    if (!store.state.user && !store.state.token && route.path !== '/auth/login') {
      return redirect('/auth/login');
    }
  }
}
