import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FoodList from '@/views/FoodList.vue'
import {Auth} from "@/services/index.js";


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    //manager
    children: [
      {
        path: 'statistics/:chartName',
        name: 'statistics',
        props: true,
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
      {
        path: 'newsletter',
        name: 'newsletter',
        component: () => import('@/components/manager/Newsletter.vue'),
        meta: {title: 'Newsletter'}
      },
      {
        path: 'feedback',
        name: 'feedback',
        component: () => import('@/components/manager/Feedback.vue'),
        meta: {title: 'Feedback'}
      },
      {
        path: 'special_offers',
        name: 'specialOffers',
        component: () => import('@/components/manager/SpecialOffers.vue'),
        meta: {title: 'SpecialOffers'}
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
  },
  {
      path: '/food_list/:id',
      props: true,
      name: 'FoodInfo',
      component: () => import(/* webpackChunkName: "FoodInfo" */ '../views/FoodInfo.vue')
  },
  {
    path: '/checkout',
    name: 'Chekout',
    component: () => import(/* webpackChunkName: "Checkout" */ '../views/Checkout.vue')
  },
  {
      path: '/placed_order',
      name: 'PlacedOrder',
      component: () => import(/* webpackChunkName: "PlacedOrder" */ '../views/PlacedOrder.vue')  
  },
  {
      path: '/order_status',
      name: 'OrderStatus',
      component: () => import(/* webpackChunkName: "OrderStatus" */ '../views/OrderStatus.vue')  
  },
  {
    path: '/order_feedback',
    name: 'LeaveFeedback',
    component: () => import(/* webpackChunkName: "LeaveFeedback" */ '../views/LeaveFeedback.vue')  
  },
  {
    path: '/finish_order',
    name: 'FinishedOrder',
    component: () => import(/* webpackChunkName: "FinishedOrder" */ '../views/FinishedOrder.vue')  
  },
  {
    path: '/order_details',
    name: 'OrderDetails',
    component: () => import(/* webpackChunkName: "OrderDetails" */ '../views/OrderDetails.vue')  
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue')  
  },
  {
    path: '/orders/:id',
    name: 'OrderDetailsStaff',
    props: true,
    component: () => import(/* webpackChunkName: "orders" */ '../views/OrderDetailsStaff.vue')  
  },
  {
    path: '/calls',
    name: 'Calls',
    component: () => import(/* webpackChunkName: "Calls" */ '../views/Calls.vue')  
  },
  {
    path: '/my_orders',
    name: 'MyOrders',
    component: () => import(/* webpackChunkName: "MyOrders" */ '../views/MyOrders.vue')  
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
  const publicPages = ['/login']; // '/register' excluded for logic of this app
  const managerPages = ['/statistics', '/products', '/employees', '/newsletter', '/feedback', '/special_offers']
  const customerAndWaiterPages = ['/checkout', '/food_list']
  const customerPages = ['/finished_order', '/placed_order', 'order_status', 'order_feedback', 'order_details']
  const staffPages = ['/orders', '/calls', '/my_orders']

  const authRequired = !publicPages.includes(to.path);
  const user = Auth.getUser();  

  // if user is not logged in and page(url) isnt whitelisted
  if (authRequired && !user) {
    return next('/login');
  }
  //if user is logged in dont allow  /login and /register
  if (user && !authRequired) {
    return next('/');
  }

  //forbid manager sites to regular users
  if(user?.type !== 'manager' && managerPages.includes(to.path)){
    return next('/');
  }

  //allow only to customer, and waiter
  if((user?.type !== 'waiter' && user?.type !== 'customer')  && customerAndWaiterPages.includes(to.path)){
    return next('/');
  }


  //allow only to customer
  if((user?.type !== 'customer')  && customerPages.includes(to.path)){
    return next('/');
  }

  //allow only to staff
  if((user?.type !== 'waiter' && user?.type !== 'chef' && user?.type !== 'barman')  && staffPages.includes(to.path)){
    return next('/');
  }

  next();
});


export default router
