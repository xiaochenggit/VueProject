import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import GoodList from '@/views/GoodList'
import Title from '@/components/Title'
import Img from '@/components/Img'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'GoodList',
      component: GoodList,
      children: [
        {
          path: 'title',
          name: 'Title',
          component: Title
        },
        {
          path: 'img',
          name: 'Img',
          component: Img
        }
      ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
