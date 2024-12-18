<template>
  <div :id="containerId" class="container">
    <el-container>
      <div class="content">
        <div class="header">
          <div class="header-title">{{ containerTitle }}</div>
          <div class="header-btns">
            <AuthButton v-if="hasPermission || !isAuthBtn" type="primary" size="medium" icon="el-icon-circle-plus-outline" label="新增" :perms="perms" @click="handleAdd"></AuthButton>
            <AuthButton v-if="hasPermission || !isAuthBtn" type="danger" size="medium" icon="el-icon-delete" label="删除" :perms="perms" @click="handleDel"></AuthButton>
            <AuthButton v-if="hasPermission || !isAuthBtn" size="medium" icon="el-icon-download" label="导出" :perms="perms" @click="handleDownLoad"></AuthButton>
            <AuthButton v-if="hasPermission || !isAuthBtn" size="medium" icon="el-icon-upload2" label="导入" :perms="perms" @click="handleImport"></AuthButton>
          </div>
        </div>
        <div class="main">
          <slot name="main"></slot>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import { hasPermission } from '@/permission/index.js';

export default {
  name: 'Container',
  props: {
    containerId: {
      type: String,
      default: 'container'
    },
    containerTitle: {
      type: String,
      default: '查询结果',
      required: true
    },
    isAuthBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasPermission: false,
      perms: null
    }
  },
  methods: {
    handleAdd() {
      this.$emit('handleAdd', {});
    },
    handleDel() {
      this.$emit('handleDel', {});
    },
    handleDownLoad() {
      this.$emit('handleDownLoad', {});
    },
    handleImport() {
      this.$emit('handleImport', {});
    },
  },
  mounted() {
    this.hasPermission = hasPermission('sys:menu:add');
    console.log('this.$router', this.$router);
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 12px;
}
@media (max-width: 768px) {
  .container {
    width: 100%;
    height: 100%;
    padding: 6px;
  }
}
.header {
  width: 100%;
  height: 90px;
}
.main {
  width: 100%;
  height: calc(100% - 90px);
}
.header-title {
    text-align: start;
    line-height: 40px;
    padding-left: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
}

.header-btns {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
}

.el-container {
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
}

.operator {
  margin-right: 6px;
}
</style>
