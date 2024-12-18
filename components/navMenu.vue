<template>
  <div class="navMenu">
    <div v-for="(item, index) in navList" :key="index" class="navMenu-item">
      <nuxt-link v-if="item.children === undefined" :to="item.path">
        <el-menu-item :index="item.path">
          <!-- <svg-icon v-if="item.icon" :icon-class="item.icon" /> -->
          <i v-if="item.icon" :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </nuxt-link>
      <el-submenu v-else-if="item.children !== undefined && item.children.length > 0" :index="item.path">
        <template slot="title">
          <nuxt-link slot="title" :to="item.path">
            <!-- <svg-icon v-if="item.icon" :icon-class="item.icon" /> -->
            <i v-if="item.icon" :class="item.icon"></i>
            {{ isCollapse ? '' : item.name }}
          </nuxt-link>
        </template>
        <el-menu-item-group class="itemGroup">
          <nav-menu :nav-list="item.children" :user-type="userType"></nav-menu>
        </el-menu-item-group>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    userType: {
      type: String,
      default: ""
    },
    navList: {
      type: Array,
      default: () => []
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.navMenu {
  height: 100%;
}
</style>
