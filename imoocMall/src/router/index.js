import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
// import Hello from '@/components/Hello'
import GoodList from '@/views/GoodList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import { currency } from '../js/currency'

// 缓存加载
Vue.use(infiniteScroll)
Vue.use(Router)
Vue.use(VueResource)

// 图片加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/dist/error.png',
  loading: '/static/dist/loading.gif',
  attempt: 1
})

Vue.filter('currency', currency)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    }
  ]
})
