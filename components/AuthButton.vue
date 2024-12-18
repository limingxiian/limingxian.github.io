<template>
  <el-button :size="!isMobile ? 'mini' : size" :type="type"
    :loading="loading" :disabled="perms && !hasPerms(perms) || disabled" @click="handleClick" :circle="isMobile">
    <i :class="`${icon} ${!isMobile && 'operator'}`" v-if="!iconType"></i>
    <Iconfont v-else :icon="icon" />
    {{!isMobile ? label : ''}}
  </el-button>
</template>

<script>
import { hasPermission } from '@/permission/index.js';
import Iconfont from './Iconfont.vue';

export default {
  name: 'KtButton',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    size: {
      type: String,
      default: 'mini'
    },
    type: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    perms: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: '',
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconType: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isMobile: false
    };
  },
  mounted() {
    this.isMobile = /iPhone|iPod|Android.*Mobile|Windows Phone/i.test(navigator.userAgent);
  },
  methods: {
    handleClick: function () {
      this.$emit('click', {});
    },
    hasPerms: function (perms) {
      return hasPermission(perms);
    }
  }
};
</script>

<style scoped>
.operator {
  margin-right: 6px;
}
</style>
