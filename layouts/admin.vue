<template>
  <div class="full-height">
    <my-layout>
      <template #header>
        <!-- 这里可以放置页面特有的头部内容 -->
      </template>
      <template #default>
        <nuxt />
      </template>
    </my-layout>
  </div>
</template>

<script>
import MyLayout from '~/components/layout/admin.vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      user: state => state.user,
      token: state => state.token,
    }),
  },
  components: {
    MyLayout
  },
  data() {
    console.log('state', this.$store.state);
    return {
    }
  },
};
</script>

<style>
.full-height {
  height: 100vh; /* 或者使用100%，取决于需求 */
}
</style>
