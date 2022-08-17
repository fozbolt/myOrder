import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FoodList from '@/views/FoodList.vue'
import {Auth} from "@/services/index.js";

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
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/food_list',
    name: 'food_list',
    component: FoodList,
    // children: [
    //   {
    //     path: '/:id',
    //     props: true,
    //     name: 'FoodInfo',
    //     component: () => import(/* webpackChunkName: "FoodInfo" */ '../views/FoodInfo.vue')
    //   }
    // ]
  },
  {
      path: '/food_list/:id',
      props: true,
      name: 'FoodInfo',
      component: () => import(/* webpackChunkName: "FoodInfo" */ '../views/FoodInfo.vue')
  },
  {
    path: '/checkout',
    props: true,
    name: 'Chekout',
    component: () => import(/* webpackChunkName: "Checkout" */ '../views/Checkout.vue')
 },
 {
    path: '/placed_order',
    props: true,
    name: 'PlacedOrder',
    component: () => import(/* webpackChunkName: "PlacedOrder" */ '../views/PlacedOrder.vue')  
},
{
    path: '/order_status',
    props: true,
    name: 'OrderStatus',
    component: () => import(/* webpackChunkName: "OrderStatus" */ '../views/OrderStatus.vue')  
},
{
  path: '/order_feedback',
  props: true,
  name: 'LeaveFeedback',
  component: () => import(/* webpackChunkName: "LeaveFeedback" */ '../views/LeaveFeedback.vue')  
},
{
  path: '/finish_order',
  props: true,
  name: 'FinishedOrder',
  component: () => import(/* webpackChunkName: "FinishedOrder" */ '../views/FinishedOrder.vue')  
}
]





const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' }); //to get on top of the view
}
})




// izvrši prije svake rute
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const user = Auth.getUser();
 
  // ako korisnik nije ulogiran
  if (authRequired && !user) {
    return next('/login');
  }
  //ako jer korisnik ulogiran ne dopusti na /login i /register
  if (user && !authRequired) {
    return next('/');
  }
  next();
});


export default router
