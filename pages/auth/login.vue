<template>
  <div class="login">
    <div class="login-form">
      <el-form @submit.native.prevent="login">
        <el-form-item>
          <el-input v-model="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="password" placeholder="密码"></el-input>
        </el-form-item>
        <div class="footer-btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // 这里应该是调用API进行登录，并在成功后更新Vuex状态
      // 假设登录成功后
      this.$store.dispatch('Login', { username: this.username, password: this.password }).then(() => {
        this.$router.push('/admin');
      }).catch((error) => {
        console.error(error);
      });
    }
  }
};
</script>
<style>
.login {
  height: 100vh;
  background-image: url('@/assets/images/loginBg.jpg');
  background-size: cover;
}
.login-form {
  width: 20%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.footer-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
