// plugins/persisted-state.js
export default ({ app }) => {
  if (process.client) {
    // 从 localStorage 获取状态
    const state = app.$storage.local.getItem('vuex');
    if (state) {
      let result = JSON.parse(state);
      app.store.replaceState(result);
    }

    // 监听 state 的变化并保存到 localStorage
    app.store.watch(
      (state, getters) => getters,
      () => {
        if (app.store.state) {
          app.$storage.local.setItem('vuex', JSON.stringify(app.store.state));
        } else {
          app.$storage.local.removeItem('vuex');
        }
      },
      { deep: true }
    );
  }
};
