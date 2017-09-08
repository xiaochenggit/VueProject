<template>
  <header>
    <div class="public">
      <img src="../assets/logo_new.png" alt="logo">
      <div class="userBox">
        <span>登录</span>|<span>注册</span>
        <span class="iconfont icon-gouwuche"></span>
      </div>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'Header'
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
  }
  .userBox{
    float: right;
    line-height: 4rem;
    vertical-align: top;
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
