<template>
  <div class="vue-model">
      <transition name='fade'>
      <div class="model" v-if="isShow">
        <span class="iconfont icon-close" @click="close"></span>
        <h2>{{ message }}</h2>
        <slot name="btngroup"></slot>
      </div>
      </transition>
      <div class="mark" @click="close" v-if="isShow">
      </div>
  </div>
</template>
<script>
export default {
  name: 'Model',
  data () {
    return {
      timer: ''
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default () {
        return true
      }
    },
    message: {
      type: String,
      default () {
        return '模态框!'
      }
    },
    isTimer: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  methods: {
    close () {
      this.timer && clearTimeout(this.timer)
      this.$emit('close')
    }
  },
  watch: {
    // 观察 isShow 当 isShow 为真时 判断是否添加计时器
    isShow () {
      if (this.isShow && this.isTimer) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.close()
        }, 3000)
      }
    }
  }
}
</script>
<style>
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
  .btngroup {
    margin: 1rem 0px;
  }
  .btngroup .btn {
    width: 40%;
    border-radius: 0.2rem;
  }
  .btngroup .cancel {
    background-color: #fff;
    border-color: #ccc;
    color: #333;
  }
  .btngroup .cancel:hover{
    background-color: #ccc;
    border-color: #333;
  }
</style>