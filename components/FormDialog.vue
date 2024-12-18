<template>
  <div class="dialog-container">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="handleCanncel"
      v-bind="dialogProps"
    >
      <el-form
        :model="form"
        :label-position="labelPosition"
        :rules="formRules"
        ref="formRef"
        v-bind="formConfig"
      >
        <el-row :gutter="20">
          <template v-for="(item, index) in formItems">
            <el-col :span="item.span || defaultSpan || 24">
              <el-form-item :label="item.label" :prop="item.prop" :type="item.type" :key="index">
                <!-- 文本输入 -->
                <el-input v-model="form[item.prop]" v-if="item.type === 'input'" @change="handleChange($event, item)" v-bind="item.itemProps || {}"></el-input>
                <!-- 计数器 -->
                <el-input-number
                  v-model="form[item.prop]"
                  v-if="item.type === 'number'"
                  @change="handleChange($event, item)"
                  v-bind="item.itemProps || {}"
                ></el-input-number>
                <!-- 下拉选择 -->
                <el-select
                  v-model="form[item.prop]"
                  v-if="item.type === 'select'"
                  @change="handleChange($event, item)"
                  v-bind="item.itemProps || {}"
                >
                  <el-option v-for="(option, idx) in item.options" :key="idx" :label="option.label" :value="option.value"></el-option>
                </el-select>
                <!-- 级联选择 -->
                <el-cascader
                  v-model="form[item.prop]"
                  v-if="item.type === 'cascader'"
                  :options="item.options || []"
                  @change="handleChange($event, item)"
                  v-bind="item.itemProps || {}"
                >
                </el-cascader>
                <!-- 开关 -->
                <el-switch
                  v-model="form[item.prop]"
                  v-if="item.type === 'switch'"
                  v-bind="item.itemProps || {}"
                ></el-switch>
                <!-- TimePicker 时间选择器 -->
                <el-time-picker
                  v-model="form[item.prop]"
                  v-if="item.type === 'timePicker'"
                  @change="handleChange($event, item)"
                  v-bind="item.itemProps || {}"
                ></el-time-picker>
                <!-- DatePicker 日期选择器 -->
                <el-date-picker
                  v-model="form[item.prop]"
                  v-if="item.type === 'datePicker'"
                  @change="handleChange($event, item)"
                  v-bind="item.itemProps || {}"
                ></el-date-picker>
                <!-- 富文本编辑器 -->
                <el-input
                  v-model="form[item.prop]"
                  v-if="item.type === 'textarea'"
                  type="textarea"
                  :rows="3"
                  @change="handleChange($event, item)"
                  v-bind="item.itemProps || {}"
                ></el-input>
                <!-- 上传附件 -->
                <el-upload
                  v-if="item.type === 'fileUpload'"
                  :file-list="fileList"
                  :before-upload="(file) => verticalFile(file, item.limit)"
                  :on-remove="(file, fileList) => handleRemove({file, fileList, type: 'fileList', paramName: item.prop})"
                  :on-change="(file, fileList) => handleFileChange({file, fileList, type: 'fileList', paramName: item.prop})"
                  v-bind="item.itemProps || {}"
                >
                  <el-button
                    size="small"
                    type="primary"
                    v-if="item.itemProps && item.itemProps.limit && item.itemProps.limit > fileList.length || !item?.itemProps?.limit"
                  >点击上传</el-button>
                  <div
                    class="el-upload__tip"
                    slot="tip"
                    v-if="(item.itemProps && item.itemProps.limit && item.itemProps.limit > fileList.length || !item?.itemProps?.limit) && item.limit &&
                      item.limit.maxSize && item.limit.acceptStr"
                  >
                    {{`只能上传${item.limit.acceptStr}文件，且不超过${item.limit.maxSize}MB`}}
                  </div>
                </el-upload>
                <!-- 图片上传 -->
                <el-upload
                  v-if="item.type === 'imageUpload'"
                  list-type="picture-card"
                  :file-list="imgList"
                  :before-upload="(file) => verticalFile(file, item.limit)"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file, fileList) => handleRemove({file, fileList, type: 'imgList', paramName: item.prop})"
                  :on-change="(file, fileList) => handleFileChange({file, fileList, type: 'imgList', paramName: item.prop})"
                  v-bind="item.itemProps || {}"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <!-- 自定义组件 -->
                <component
                  v-if="item.type === 'component'"
                  :is="item.component"
                  v-bind="item.itemProps || {}"
                ></component>
                <!-- 自定义组件 -->
                <component
                  v-if="item.type === 'custom'"
                  :is="item.component"
                  v-bind="item.itemProps || {}"
                ></component>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCanncel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="图片预览" :visible.sync="previewImgVisible" :close-on-click-modal="false">
      <img width="100%" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    formRules: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array,
      default: () => []
    },
    dialogProps: {
      type: Object,
      default: () => ({})
    },
    labelPosition: {
      type: String,
      default: 'top'
    },
    formConfig: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    column: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      form: this.formData,
      defaultSpan: 24 / this.column,
      fileList: [],
      imgList: [],
      previewImgVisible: false, // 图片预览
      previewImgUrl: '', // 图片预览地址
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
    'formData': {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.form = newVal;
        }
      },
      deep: true
    }
  },
  created() {
    this.fileList = [
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }
    ];
  },
  methods: {
    // 上传校验
    verticalFile(file, vertical = {}) {
      const ErrorMsg = '上传的文件不合格！';
      const { maxSize, accept } = vertical;
      const isLtSize = file.size / 1024 / 1024 < maxSize;
      if (!isLtSize) {
        this.$message.error(`${ErrorMsg}: 文件大小错误，上传大小不能超过 ${maxSize}MB!`);
        return isLtSize;
      }
      const isSupportType = accept.indexOf(file.type) !== -1;
      if (!isSupportType) {
        this.$message.error(`${ErrorMsg}, 请上传${accept}格式的文件！`);
        return isSupportType;
      }
      return isLtSize && isSupportType;
    },
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form);
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCanncel() {
      console.log('1111', 1111);
      this.$emit('cancel', {});
      this.dialogVisible = false;
    },
    // 文件上传
    handleFileChange ({file, fileList, type, paramName}) {
      fileList.forEach((item) => {
        if (!item.url && item.raw) {
          item.url = URL.createObjectURL(item.raw);
        }
      })
      this[type] = fileList;
      this.$emit('onChange', fileList, paramName);
    },
    // 文件删除
    handleRemove({file, fileList, type, paramName}) {
      this[type] = fileList;
      this.$emit('onChange', fileList, paramName);
    },
    handleChange(value, formItem) {
      this.$emit('onChange', value, formItem.prop);
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.previewImgUrl = file.url;
      this.previewImgVisible = true;
    }
  }
}
</script>

<style scoped>
.dialog-container /deep/ .el-dialog {
  max-height: 80%;
}
.dialog-container /deep/ .el-dialog__body {
  max-height: 65vh;
  overflow-y: scroll;
}
.el-input-number {
  width: 100%;
}
.el-select {
  width: 100%;
}
.el-cascader {
  width: 100%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
  background-color: #fff;
}
</style>
