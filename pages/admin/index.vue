<template>
</template>

<script>

export default {
  layout: 'admin',
  middleware: 'auth',
  // 设置meta字段，表示该页面需要认证
  meta: {
    requiresAuth: true
  },
};
</script>

<style>
</style>
