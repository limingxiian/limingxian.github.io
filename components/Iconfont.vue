<template>
  <i :class="`iconfont ${icon}`"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>
