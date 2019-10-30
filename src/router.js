import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: () => import('./views/TodoApp.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('./views/Menu.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('./views/Form.vue')
    },
    { path: '/user/:id?', component: () => import('./views/User.vue'),
      children: [
        { path: '/', component: () => import('./views/Menu.vue') },
        { path: 'profile', component: () => import('./views/Form.vue') },
      ]
    },
    {
      path: '/doc',
      // name: 'document',
      component: () => import('./views/Document.vue')
    }
  ]
})

