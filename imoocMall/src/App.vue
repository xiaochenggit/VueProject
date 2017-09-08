<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './css/normalize.css'
export default {
  name: 'app'
}
</script>

<style>
html {
  height: 100%;
}
body {
  position: relative;
  font-size: 12px;
  min-height: 100%;
}
#app {
  font-family: Arial , 'Avenir', Helvetica,  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.public {
  width: 1380px;
  margin: 0 auto;
}
p {
  margin: 0px;
}
</style>
