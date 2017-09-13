<template>
  <header>
    <div class="public">
      <router-link to="/">
        <img src="../assets/logo_new.png" alt="logo">
      </router-link>
      <div class="userBox">
        <div class="noLogin" v-if="nickName == ''">
          <span @click="isUserLogin = true">登录</span>|<span @click="isUserRegister = true">注册</span>
        </div>
        <div class="login" v-else>
          <span>{{nickName}}</span>|<span @click="logOut">登出</span>
        </div>
        <span class="iconfont icon-gouwuche"></span>
      </div>
    </div>
      <transition name="fade">
      <div class="model" v-if="isUserLogin">
        <span class="iconfont icon-close" @click="isUserLogin = false"></span>
        <h2>Login in</h2>
        <p :class="['tip', {'err': userErrTip != ''}]" v-if="userErrTip != ''">
          <span class="iconfont icon-error"></span>{{userErrTip}}
        </p>
        <label>
          <input type="text" class="userName" v-model="userName" placeholder="userName">
          <span class="iconfont icon-user"></span>
        </label>
        <label>
          <input type="password" class="userPwd" v-model="userPwd" placeholder="password">
          <span class="iconfont icon-password"></span>
        </label>
        <button class="btn" @click="login">登录</button>
      </div>
      </transition>
      <div class="mark" @click="isUserLogin = false" v-if="isUserLogin">
      </div>
      <transition name="fade">
      <div class="model" v-if="isUserRegister">
        <span class="iconfont icon-close" @click="isUserRegister = false"></span>
        <h2>Register</h2>
        <label>
          <input type="text" class="userName" v-model="userName" placeholder="userName">
          <span class="iconfont icon-user"></span>
        </label>
        <label>
          <input type="text" class="userPwd" v-model="userPwd" placeholder="password">
          <span class="iconfont icon-password"></span>
        </label>
        <label>
          <input type="text" class="userPwd" v-model="userPwd" placeholder="confirm password">
          <span class="iconfont icon-password"></span>
        </label>
        <button class="btn">注册</button>
      </div>
      </transition>
      <div class="mark" @click="isUserRegister = false" v-if="isUserRegister">
      </div>
  </header>
</template>
<script>
  import VueModel from './Model.vue'
  import axios from 'axios'
  export default {
    name: 'Header',
    data () {
      /**
       * {String} nickName 当前用户名 默认 ''
       * {String} userName 输入框用户名（login时） 默认 ''
       * {String} userPwd  输入框密码(login时) 默认 ''
       * {String} userErrTip 用户登录错误信息 默认 ''
       * {Boolean} isUserLogin 用户登录模态框是否显示 默认 false
       * {Boolean} isUserRegister 用户注册模态框是否显示 默认 false
       */
      return {
        nickName: '',
        userName: '',
        userPwd: '',
        userErrTip: '',
        isUserLogin: false,
        isUserRegister: false
      }
    },
    methods: {
      login () {
        if (!this.userName.trim() || !this.userPwd.trim()) {
          this.userErrTip = '用户名或密码不能为空！'
          return
        }
        axios.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then(res => {
          let resDate = res.data
          if (resDate.status === 200) {
            this.isUserLogin = false
            this.nickName = resDate.result.userName
          } else {
            this.userErrTip = resDate.msg
          }
        })
      },
      logOut () {
        axios.post('/users/logout').then(res => {
          if (res.data.status === 200) {
            this.nickName = ''
          }
        })
      },
      checkLogin () {
        axios.get('/users/cheklogin').then(res => {
          let resData = res.data
          if (resData.status === 200) {
            this.nickName = JSON.parse(resData.result).userName
          }
        })
      }
    },
    mounted () {
      this.checkLogin()
    },
    components: {
      VueModel
    }
  }
</script>
<style scoped>
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 4rem;
    box-shadow: 1px 1px 2px 2px #ccc;
    font-size: 1.2rem;
    background-color: #fff;
    z-index: 100;
  }
  .tip {
    font-size: 1rem;
    line-height: 2rem;
  }
  .tip .iconfont {
    margin-right: 0.2rem;
  }
  .tip.err {
    color: red;
  }
  .tip.err .iconfont {
    color: red;
  }
  .userBox{
    float: right;
    line-height: 4rem;
    vertical-align: top;
  }
  .userBox .login,
  .userBox .noLogin {
    display: inline-block;
  }
  .userBox span {
    cursor: pointer;
    margin: 0 0.4rem;
  }
  img {
    height: 4rem;
    float: left;
  }
  .icon-gouwuche {
    font-size: 1.4rem;
    color: #f60;
  }
  .icon-gouwuche:hover {
    color: #e65f05;
  }
</style>
