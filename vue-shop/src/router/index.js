import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/IndexPage'
import DetailPage from '@/pages/DetailPage'
import DetailChild from '@/pages/DetailChild'
import orderListPage from '@/pages/orderList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  	{
   	    path: '/',
   	    component: IndexPage
  	},{
  		path: '/detail',
  		component: DetailPage,
  		redirect:'/detail/count', // 重定向
  		children: [ // 子路由
  			{
  				path: ':product',
  				component: DetailChild
  			}
  		]
  	},{
      path: '/orderlist',
      component: orderListPage
    }
  ]
})
