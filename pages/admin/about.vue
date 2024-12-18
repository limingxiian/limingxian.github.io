<template>
  <div class="about">
    <el-button type="primary" @click="onClick">Click Me!</el-button>
  </div>
</template>

<script>
import request from "@/plugins/axios.js";

export default {
  layout: 'admin',
  middleware: 'auth',
  // 设置meta字段，表示该页面需要认证
  meta: {
    requiresAuth: true
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    console.log('about created')
  },
  methods: {
    async onClick() {
      const { data } = await request({
        url: '/api/user/list',
        method: 'get',
        timeout: 40000
      })
      // this.$store.dispatch('LogOut');
    }
  }
}
</script>

<style>
.about {
  width: 100%;
  height: 100%;
}
</style>
