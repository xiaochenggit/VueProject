<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>总价 {{count}}</p>
    <router-link :to="{path: '/apple'}">Apple</router-link>
    <router-link :to="{path: '/banner'}">Banner</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    count() {
      return this.$store.getters.getCount;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
