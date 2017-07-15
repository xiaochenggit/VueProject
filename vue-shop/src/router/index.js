import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/IndexPage'
import DetailPage from '@/pages/DetailPage'
import DetailChild from '@/pages/DetailChild'
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
  		redirect:'/detail/count',
  		children: [
  			{
  				path: ':product',
  				component: DetailChild
  			}
  		]
  	}
  ]
})
