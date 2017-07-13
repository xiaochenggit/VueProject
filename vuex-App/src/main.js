// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, price) {
      state.count += price
    },
    reduce (state, price) {
      state.count -= price;
    }
  },
  getters: {
  	getCount(state) {
  		return state.count;
  	}
  },
  // dispatch
  actions: {
    increment (context,price) {
      context.commit('increment',price)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
