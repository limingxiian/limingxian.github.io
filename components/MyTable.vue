<template>
  <el-table
    :data="tableData"
    :row-key="rowKey"
    border
    style="width: 100%; height: calc(100% - 50px);"
    header-row-class-name="tableHeader"
    :header-row-style="{ height: '50px', lineHeight: '50px' }"
    @row-click="rowClick"
    v-bind="tableProps"
  >
  <el-table-column
      v-for="(item, index) in tableColumns"
      :key="index"
      :type="item.type"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :style="item.style"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      width="180"
    >
      <template v-slot:default="scope">
        <span
          v-for="(item, index) in tableActions"
          :key="index"
          :type="item.type"
          :style="{
            color: item.type === 'danger' ? '#f56c6c' : '#409eff',
            cursor: scope.row[`${item.type}Disabled`] ? 'not-allowed' : 'pointer'
          }"
          @click="!scope.row[`${item.type}Disabled`] && item.click(scope.row)"
        >
          {{ item.label }}
          <el-divider direction="vertical" v-if="index < (tableActions.length - 1)"></el-divider>
        </span>
        <el-divider direction="vertical" v-if="isRowDel"></el-divider>
        <el-popover
          placement="top"
          width="160"
          v-show="isRowDel"
          v-model="scope.row.popoverVisible">
          <p>确定要删除这条记录吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="scope.row.popoverVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteRow(scope.$index, scope.row)">确定</el-button>
          </div>
          <el-button slot="reference" type="text"><span style="color: #f56c6c;">删除</span></el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumns: {
      type: Array,
      default: () => []
    },
    tableActions: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    rowClick: {
      type: Function,
      default: () => {}
    },
    tableProps: {
      type: Object,
      default: () => {}
    },
    isRowDel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    deleteRow(index, row) {
      console.log('row', row)
      this.$emit('deleteRow', row);
      row.popoverVisible = false;
    }
  }
}
</script>

<style scoped>
.el-table /deep/ .tableHeader .el-table__cell {
  padding: 0;
}

.el-table /deep/ th.el-table__cell {
  background-color: #b8eff7; /* 例如，设置背景色 */
  color: #000000;
  font-weight: bold; /* 设置字体加粗 */
}

.el-table /deep/ .el-table__body-wrapper  {
  overflow-y: scroll;
  height: calc(100% - 50px);
}
</style>
