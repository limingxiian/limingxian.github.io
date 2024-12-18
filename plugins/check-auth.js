// plugins/check-auth.js
import Vue from 'vue';
import StoreFn from '@/store'; // 确保路径正确

const store = StoreFn();

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (!store.state.token && to.path !== '/auth/login') {
      // 如果路由需要认证且 token 不存在，则重定向到登录页面
      next('/auth/login');
    } else {
      // 否则继续
      next();
    }
  });
};
