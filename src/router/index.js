import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import nft from '@/views/nft/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'home',
        component: home
    },{
      path: '/nft',
      name: 'nft',
      component: nft
    }
  ],
  mode: 'history'
})
