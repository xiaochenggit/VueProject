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
  width: 1300px;
  margin: 0 auto;
}
p {
  margin: 0px;
}
ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
.main {
    padding-top: 4.4rem;
    padding-bottom: 2rem;
}
.left {
  float: left;
}
.right {
  float: right;
}
.btn {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}
dl, dd{
  padding: 0;
  margin: 0;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
</style>
