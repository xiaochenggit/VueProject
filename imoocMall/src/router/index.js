import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import GoodList from '@/views/GoodList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'

// 缓存加载
Vue.use(Router)

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
    },
    { path: '/orderconfirm/:addressId',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/ordersuccess/:orderId',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
