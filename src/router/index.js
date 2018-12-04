import Vue from 'vue'
import Router from 'vue-router'
import card from '@/components/card'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'card',
      component: card
    }
  ]
})
