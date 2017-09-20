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
        <span class="iconfont icon-gouwuche" @click="goCart"><span v-if="cartCount">{{cartCount}}</span></span>
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
        userName: '',
        userPwd: '',
        userErrTip: '',
        isUserLogin: false,
        isUserRegister: false
      }
    },
    computed: {
      nickName () {
        return this.$store.state.nickName
      },
      cartCount () {
        return this.$store.state.cartCount
      }
    },
    methods: {
      // 登录
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
            this.$store.commit('updateUserInfo', resDate.result.userName)
            this.getCartCount()
          } else {
            this.userErrTip = resDate.msg
          }
        })
      },
      // 登出
      logOut () {
        axios.post('/users/logout').then(res => {
          if (res.data.status === 200) {
            this.$store.commit('updateUserInfo', '')
            this.$store.state.cartCount = 0
          }
        })
      },
      // 验证是否登录
      checkLogin () {
        axios.get('/users/cheklogin').then(res => {
          let resData = res.data
          if (resData.status === 200) {
            this.$store.commit('updateUserInfo', JSON.parse(resData.result).userName)
            this.getCartCount()
          }
        })
      },
      // 获得购物车数量
      getCartCount () {
        axios.get('/users/cartcount').then(res => {
          let resData = res.data
          if (resData.status === 200) {
            this.$store.state.cartCount = 0
            this.$store.commit('updateCartCount', resData.result)
          }
        })
      },
      goCart () {
        this.$router.push({name: 'Cart'})
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
    position: relative;
  }
  .icon-gouwuche:hover {
    color: #e65f05;
  }
  .icon-gouwuche span{
    color: #fff;
    background-color: red;
    font-size: 0.8rem;
    line-height: 1rem;
    display: inline-block;
    padding: 0 0.5rem;
    border-radius: 0.4rem;
    position: absolute;
    top: 0;
    left: 1rem;
    font-weight: bold;
  }
  .model {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #fff;
    position: fixed;
    z-index: 9999;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.3rem;
    width: 22rem;
    top: 10rem;
  }
  .model .icon-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
  }
  .model label::after{
    display: block;
    width: 0px;
    height: 0px;
    overflow: hidden;
    content: '';
    clear: both;
    margin-bottom: 1rem;
  }
  .model label {
    display: inline-block;
    position: relative;
    width: 100%;
  }
  .model .icon-user,
  .model .icon-password{
    left: 1rem;
    position: absolute;
    top: 0.5rem;
    color: #555;
  }
  .model h2 {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    display: inline-block;
    width: 100%;
  }
  .model input{
    outline: none;
    border: 1px solid #d8d2d2;
    line-height: 2rem;
    font-size: 1rem;
    padding-left: 2rem;
    border-radius: 0.2rem;
    color: #000;
    width: 100%;
    box-sizing: border-box;
  }
  .model .btn{
    font-size: 1rem;
    text-align: center;
    width: 100%;
    line-height: 1.8rem;
    background-color: #337ab7;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.2rem;
    border: 1px solid #2e6da4;
  }
  .model .btn:hover{
    background-color: #204d74;
    border-color: #122b40;
  }
  .mark {
    top: 0px;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9998;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    top: -20rem;
  }
</style>
