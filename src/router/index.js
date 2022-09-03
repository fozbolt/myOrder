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
    component: Home,
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/components/manager/Statistics.vue'),
        meta: {title: 'Statistics'}
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('@/components/manager/Products.vue'),
        meta: {title: 'Products'}
      },
      {
        path: 'employees',
        name: 'employees',
        component: () => import('@/components/manager/Employees.vue'),
        meta: {title: 'Employees'}
      },
      
    ]
  },
  {
    path: '/login',
    name: 'login',
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
    //     path: ':id',
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
  },
  {
    path: '/order_details',
    props: true,
    name: 'OrderDetails',
    component: () => import(/* webpackChunkName: "OrderDetails" */ '../views/OrderDetails.vue')  
  }
]





const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' }); //to get on top of the view
}
})





router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']; // '/register' excluded for logic of this app
  const managerPages = ['/statistics', '/products', '/employees']
  const authRequired = !publicPages.includes(to.path);
  const user = Auth.getUser();  

  // ako korisnik nije ulogiran i stranica nije whitelistana
  if (authRequired && !user) {
    return next('/login');
  }
  //ako jer korisnik ulogiran ne dopusti na /login i /register
  if (user && !authRequired) {
    console.log('tu')
    return next('/');
  }

  //forbid manager sites to regular users
  if(user?.type !== 'manager' && managerPages.includes(to.path)){
    return next('/');
  }

  //allow only to customer
  //write this logic or not?

  next();
});


export default router
