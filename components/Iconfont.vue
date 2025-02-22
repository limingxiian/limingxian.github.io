<template>
  <i :class="`iconfont ${icon}`" :style="style" :id="id" @click="handleClick"></i>
</template>

<script>
export default {
  props: {
    id: {
      type:String,
      default: ''
    },
    icon: {
      type: String,
      required: true
    },
    style: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClick() {
      this.$emit('handleClick')
    }
  }
};
</script>
