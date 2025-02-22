<template>
  <div class="search-container">
    <div class="search-title">查询条件</div>
      <div class="search-content">
        <div class="search-content-form" ref="searchContent" :style="!toggle && { maxHeight: '45px' }">
          <el-form :model="values" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="输入1">
                  <el-input v-model="values.input1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="输入2">
                  <el-input v-model="values.input2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="输入3">
                  <el-input v-model="values.input3"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="输入4">
                  <el-input v-model="values.input4"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="输入5">
                  <el-input v-model="values.input5"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="输入6">
                  <el-input v-model="values.input6"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="输入7">
                  <el-input v-model="values.input7"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div >
          <el-button type="primary" size="medium" @click="handleSearchClick">查询</el-button>
          <el-button size="medium" @click="handleResetClick">重置</el-button>
          <iconfont :icon="toggle ? 'icon-open icon-style' : 'icon-close icon-style'" id="toggle-btn" @handleClick="handleToggleClick"></iconfont>
        </div>
      </div>
  </div>
</template>

<script>
import Iconfont from "@/components/Iconfont.vue";

export default {
  props: {
    values: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Array,
      default: () => []
    },
  },
  components: {
    Iconfont
  },
  data() {
    return {
      toggle: false,
    }
  },
  methods: {
    // 查询
    handleSearchClick() {
      this.$emit('onSearch')
    },
    // 重置
    handleResetClick() {

    },
    handleToggleClick(){
      const t = this;
      this.toggle = !this.toggle;
      this.$nextTick(() => {
        // 确保 DOM 更新后获取高度
        const height = t.$refs.searchContent.offsetHeight;
        t.$emit('getContentHeight', height);
      });
    }
  }
}
</script>

<style scoped>
.search-container {
  width: 100%;
  transition: max-height 0.3s ease;
  padding: 12px;
}
.search-title {
  text-align: start;
  line-height: 40px;
  padding-left: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
}
.search-content {
  display: flex;
  justify-content: space-around;
}
.search-content-form {
  overflow: hidden;
  transition: max-height 0.3s ease;
  flex: 4 1;
  padding-right: 30px;
}
.icon-style {
  cursor: pointer;
  color: #409eff;
}
</style>
