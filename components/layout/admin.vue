<template>
  <el-container class="external-container">
    <el-aside :class="open ? 'menu-container' : 'menu-container-close'">
      <el-menu
        :default-active="$route.path"
        :unique-opened="true"
        :router="true"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-sideBar"
        @select="handleSelect"
      >
        <nav-menu
          :nav-list="navList"
          :user-type="userType"
          :isCollapse="isCollapse"
        ></nav-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="hearder">
          <div class="left"><i :class="icon" @click="onIconClick"></i></div>
          <div class="right">
            <div class="user">
              <el-dropdown>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span @click="onExitClick">
                      <iconfont icon="icon-tuichudenglu"></iconfont>
                      退出登录
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <nuxt />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import request from "@/plugins/axios.js";
import NavMenu from "@/components/navMenu";
import Iconfont from "@/components/Iconfont.vue";

export default {
  name: 'layoutIndex',
  components: {
    NavMenu,
    Iconfont
  },
  data() {
    return {
      isCollapse: false,
      userType: 'admin',
      navList: [],
      isMobile: false,
      icon: 'el-icon-s-fold',
      open: true
    };
  },
  created() {
    this.getRouteData();
  },
  mounted() {
    this.isMobile = /iPhone|iPod|Android.*Mobile|Windows Phone/i.test(navigator.userAgent);
  },
  methods: {
    async getRouteData() {
      // 获取路由数据，这里可以添加逻辑来获取路由数据
      // 例如：从服务器获取路由数据
      const { code, data = [] } = await request({
        url: '/api/user/routes',
        headers: {
          // isToken: false
        },
        method: 'get',
        timeout: 40000
      });
      if (code === 200) {
        this.navList = data;
        if (data?.length > 0) {
          this.$router.push(data[0].path);
        }
      }
    },
    onExitClick() {
      // 退出登录
      this.$router.push('/auth/login');
    },
    onIconClick() {
    // 折叠菜单
      this.isCollapse = !this.isCollapse;
      this.open = !this.open;
      this.icon = this.open ? 'el-icon-s-fold' : 'el-icon-s-unfold';
    },
    handleSelect(key, keyPath) {
      // 处理菜单选择事件，可以在这里添加逻辑来更新右侧内容
      console.log('key', key);
      console.log('keyPath', keyPath);
      // 根据key来更新右侧内容
      // if (key === '/') {
      //   this.$router.push('/');
      // } else if (key === '/about') {
      //   this.$router.push('/about');
      //   // 可以在这里添加逻辑来加载或更新右侧内容
      // }
    }
  }
  // ...
};
</script>

<style>
  .external-container {
    height: 100vh;
  }
  .menu-container-close {
    width: 63px !important;
    overflow: auto;
  }
  .menu-container {
    width: 12vw !important;
    overflow: auto;
  }

  @media (min-width: 768px) {
    .menu-container {
      width: 12vw !important;
    }
  }

  @media (min-width: 1024px) {
    .menu-container {
      width: 12% !important; /* 适应大屏幕 */
    }
  }

  .hearder {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
    .user {
      width: 40px;
      height: 40px;
    }
  }

  .main {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
  .el-menu {
    height: 100%;
  }

  .el-header {
    background-color: #f1f1f1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #f1f1f1;
    text-align: center;
  }

  .el-main {
    background-color: #f7f7f7;
    color: #333;
  }
</style>
