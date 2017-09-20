// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import { currency } from './js/currency'
// 缓存加载
Vue.use(infiniteScroll)
// 图片加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/dist/error.png',
  loading: '/static/dist/loading.gif',
  attempt: 1
})
Vue.use(Vuex)
Vue.filter('currency', currency)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, count) {
      state.cartCount += count
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
