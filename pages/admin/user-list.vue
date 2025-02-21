<template>
  <div class="userList">
    <div class="user-search">
      <el-input
        v-model="searchValue"
        placeholder="请输入搜索内容"
        clearable
        @keyup.enter="handleSearch"
        @clear="handleSearch"
      >
        <template #append>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
    </div>
    <Container
      containerTitle="用户列表"
      @handleAdd="handleAdd"
    >
      <template v-slot:main>
        <MyTable :tableData="userList" :tableColumns="tableColumns" :tableActions="tableActions" />
        <MyPagination :total="total" :currentPage="currentPage" :pageSizes="[10, 20, 30, 40]" :pageSize="100" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </template>
    </Container>
    <FormDialog
      :title="modalConfig.title"
      :formData="modalConfig.formData"
      :visible="modalConfig.visible"
      :formRules="modalConfig.formRules"
      :formItems="formItems"
      :disabled="modalConfig.disabled"
      :dialogProps="modalConfig.dialogProps"
      @onChange="handleFormChange"
      @cancel="handleCancel"
      @submit="handleSubmit"
    ></FormDialog>
  </div>
</template>

<script>
import request from "@/plugins/axios.js";
import Container from "@/components/Container.vue";
import MyTable from "@/components/MyTable.vue";
import MyPagination from "~/components/MyPagination.vue";
import FormDialog from "~/components/FormDialog.vue";

export default {
  layout: 'admin',
  middleware: 'auth',
  components: {
    Container,
    MyTable,
    MyPagination,
    FormDialog
  },
  data() {
    return {
      userList: [],
      tableColumns: [],
      tableActions: [],
      currentPage: 1,
      total: 0,
      modalConfig: {
        title: '新增用户',
        visible: false,
        disabled: false,
        dialogProps: {
          width: '40%',
        },
        formData: {
          name: '',
          addr: '',
          role: ''
        },
        formRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请输入角色', trigger: 'blur' }
          ]
        }
      },
      formItems: []
    }
  },
  created() {
    this.formItems = [
      {
        label: '姓名',
        prop: 'name',
        type: 'input',
        span: 12,
        itemProps: {
          placeholder: '请输入姓名',
          clearable: true,
        }
      },
      {
        label: '年龄',
        prop: 'age',
        type: 'number',
        span: 12,
        itemProps: {
          placeholder: '请输入年龄',
          clearable: true,
          min: 1,
          max: 200
        }
      },
      {
        label: '角色',
        prop: 'role',
        type: 'select',
        span: 12,
        options: [
          {
            label: '管理员',
            value: 'admin'
          },
          {
            label: '普通用户',
            value: 'user'
          }
        ],
        itemProps: {
          placeholder: '请输入角色',
          clearable: true,
        },
        onChange: (value) => {
          console.log('1111', 1111);
          console.log(value);
        }
      },
      {
        label: '地址',
        prop: 'address',
        type: 'cascader',
        span: 12,
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake'
                  }
                ]
              }
            ]
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men'
                  }
                ]
              }
            ]
          }
        ],
        itemProps: {
          placeholder: '请选择地址',
          clearable: true,
        },
        onChange: (value) => {
          console.log('222', 222);
          console.log(value);
        }
      },
      {
        label: '付费方式',
        prop: 'year',
        type: 'switch',
        span: 12,
        itemProps: {
          'active-text': '按月付费',
          'inactive-text': '按年付费'
        },
      },
      {
        label: '时间',
        prop: 'time',
        type:'timePicker',  // 时间选择器
        span: 12,
        itemProps: {
          'placeholder': '选择时间',
          'value-format': 'yyyy-MM-dd HH:mm:ss',
          'picker-options': {
            selectableRange: '8:30:00 - 20:30:00'
          }
        },
      },
      {
        label: '日期',
        prop: 'date',
        type:'datePicker',  // 日期选择器
        span: 12,
        itemProps: {
          'placeholder': '选择日期',
          'type': 'datetimerange',
          'range-separator': '至',
          'start-placeholder': '开始日期',
          'end-placeholder': '结束日期',
          'format': 'yyyy-MM-dd HH:mm:ss',
          'value-format': 'yyyy-MM-dd HH:mm:ss'
        },
      },
      {
        label: '附件',
        prop: 'file',
        type:'fileUpload',  // 上传
        span: 24,
        limit: {
          acceptStr: 'png,jpg,jpeg',
          accept: 'image/png,image/jpg,image/jpeg',
          maxSize: 10
        },
        itemProps: {
          'placeholder': '请上传附件',
          // 'action': 'URL_ADDRESS'
          'action': 'https://jsonplaceholder.typicode.com/posts/',
          'on-success': (res) => {
            console.log('success', res)
          },
          'on-remove': (res) => {
            console.log('remove', res)
          },
        },
      },
      {
        label: '照片墙',
        prop: 'imgList',
        type:'imageUpload',  // 图片上传
        span: 24,
        limit: {
          acceptStr: 'png,jpg,jpeg',
          accept: 'image/png,image/jpg,image/jpeg',
          maxSize: 10
        },
        itemProps: {
          'placeholder': '请上传图片',
          // 'action': 'URL_ADDRESS'
          'action': 'https://jsonplaceholder.typicode.com/posts/',
          'on-success': (res) => {
            console.log('success', res)
          },
          'on-remove': (res) => {
            console.log('remove', res)
          },
        },
      },
      {
        label: '备注',
        prop: 'remark',
        type:'textarea',  // 文本域
        span: 24,
        itemProps: {
          'placeholder': '请输入备注'
        },
      }
    ]
    this.getList()
  },
  methods: {
    async getList() {
      const res = await request({
        url: '/api/user/list',
        method: 'get',
        timeout: 40000
      })
      if (String(res?.code) === '200') {
        res.data.forEach((item, index) => {
          item.editDisabled = index === 0;
        })
        this.userList = res.data;
        this.total = res?.total || 0;
      }
      this.tableColumns = [
        {
          type: 'index',
          label: '序号',
          width: 80,
        },
        {
          prop: 'name',
          label: '姓名',
          style: {
            width: '30%'
          },
        },
        {
          prop: 'addr',
          label: '地址',
          style: {
            width: '30%'
          },
        },
        {
          prop: 'role',
          label: '角色',
          style: {
            width: '30%'
          },
        }
      ]
      this.tableActions = [
        {
          label: '编辑',
          type: 'edit',
          icon: 'el-icon-edit',
          click: (row) => {
            console.log(row)
          }
        },
        {
          label: '删除',
          type: 'danger',
          icon: 'el-icon-delete',
          click: (row) => {
            console.log(row)
          }
        }
      ]
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleFormChange(val, paramName) {
      this.modalConfig.formData[`${paramName}`] = val;
      console.log('formData', this.modalConfig.formData)
    },
    handleSubmit(form) {
      this.modalConfig.visible = false;
      this.modalConfig.disabled = false;
      this.modalConfig.formData = {
        name: '',
        addr: '',
        role: ''
      }
    },
    handleCancel() {
      this.modalConfig.visible = false;
      this.modalConfig.formData = {
        name: '',
        addr: '',
        role: ''
      }
    },
    handleAdd() {
      this.modalConfig.visible = true;
    }
  }
}
</script>

<style>
.userList {
  width: 100%;
  height: 100%;
}
</style>
