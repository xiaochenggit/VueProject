<template>
  <div id="app">
    <router-link :to="{path: '/apple/red/detail/3'}">Apple</router-link>
    <router-link :to="{path: '/banner'}">Banner</router-link>
    <router-link :to="{path: '/banner/child'}">Banner Child</router-link>
    <transition name='fade' mode='out-in'>
       <keep-alive>
         <router-view></router-view>
       </keep-alive>
    </transition>
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active,
.fade-leave-active{
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
</style>
