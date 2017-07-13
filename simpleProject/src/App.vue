<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/hi">Hi</router-link>
    <router-link to='/class'>Class 与 Style 绑定</router-link>
    <router-link to='/if'>条件渲染</router-link>
    <router-link to='/tem'>模板</router-link>
    <router-link to='/slot'>Slot</router-link>
    <router-link to='/trans'>过渡</router-link>
    <router-link to='/direactive'>自定义指令</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
