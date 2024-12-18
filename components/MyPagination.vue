<template>
  <el-pagination
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
    style="line-height: 32px;display: flex;justify-content: flex-end;margin-top: 12px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-bind="pageProps"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    pageProps: {
      type: Object,
      default: () => ({})
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    pageSize: {
      type: Number,
      default: 100
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    }
  }
}
</script>

<style>

</style>
