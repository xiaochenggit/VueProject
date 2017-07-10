import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hi from '@/components/Hi'
import Class from '@/components/Class'
import If from '@/components/If'
import Tem from '@/components/tem'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/hi',
      name: 'hi',
      component: Hi
    },
    {
      path: '/class',
      name: 'class',
      component: Class
    },
    {
      path: '/if',
      name: 'if',
      component: If
    },
    {
      path: '/tem',
      name: 'tem',
      component: Tem
    }
  ]
})
