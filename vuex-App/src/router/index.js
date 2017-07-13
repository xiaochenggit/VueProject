import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Apple from '@/components/apple'
import Banner from '@/components/Banner'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
    	path: '/apple',
    	name: 'Apple',
    	component: Apple
    },{
    	path: '/banner',
    	name: 'Banner',
    	component: Banner
    }
  ]
})
