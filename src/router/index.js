import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FoodList from '@/views/FoodList.vue'

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // iskoristiti ovaj lazy loading ili maknuti, ali za login ne treba LL
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/food_list',
    name: 'food_list',
    component: FoodList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
