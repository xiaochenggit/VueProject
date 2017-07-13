import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index';
import Banner from '@/components/Banner';
import Apple from '@/components/Apple';
import ChildBanner from '@/components/ChildBanner';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/banner'
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/apple/:color/detail/:type',
      name: 'Apple',
      component: Apple
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner,
      children: [
      	{
      		path:'child',
      		component: ChildBanner
      	}
      ]
    }
  ]
})
