<template>
  <!--diagonal menu design -->
  <!-- <div class="parent hover01">
    <div class="one">
      <img src="@/assets/waiterCalls.png" alt="">
    </div>
    <div class="two"></div>
    <div class="three"></div>
    a
  </div> -->

  <div class="container">
    <div class="row">
          <StaffMenu v-for="card in cards" :key="card.name" :info="card"/>
    </div>
  </div>

</template>

<script>
import StaffMenu from './StaffMenu.vue';
import store from '@/store.js'


export default {
    name: "Staff",
    data() {
        return {
          store,
          cards: undefined
        };
    },
    methods: {},
    components: { StaffMenu },

    created(){
      if (this.store.userType === 'waiter'){
          this.cards = [
            {
              src: require('@/assets/waiterCallsSquare2.png'),
              name: 'Calls',
              path: '/calls',
              selected_state: 'ordered|ready to take over',   //dummy placeholder (only for this card)
              notificationEnabled: true
            },
            {
              src: require('@/assets/waiterFood2Square.png'),
              name: 'New order',
              selected_state: 'ordered|ready to take over', //dummy placeholder (only for this card)
              path: '/food_list'
            },
            {
              src: require('@/assets/waiterOrderReady.png'),
              name: 'Orders',
              path: '/orders',
              selected_state: 'ordered|ready to take over',
              notificationEnabled: true
            },
            {
              src: require('@/assets/myOrderBasket.png'),
              name: 'My orders',
              selected_state: 'ordered|ready to take over',
              path: '/my_orders',
              notificationEnabled: true
            }
        ]
      }else{
        this.cards = [
            {
              src: require('@/assets/waiterFood2Square.png'),
              name: 'New',
              path: '/orders',
              selected_state: 'ordered|ready to take over',
              notificationEnabled: true
            },
            {
              src: require('@/assets/waiterNewOrderSquare.png'),
              name: 'In process',
              selected_state: 'accepted|being prepared',
              path: '/orders'
            },
            {
              src: require('@/assets/waiterOrderReady.png'),
              name: 'Ready',
              selected_state: 'ready|waiting to be served',
              path: '/orders'
            },
            {
              src: require('@/assets/myOrderBasket.png'),
              name: 'My orders',
              selected_state: '',
              path: '/my_orders'
            }
          ]
      }
      
    }
}
 

</script>


<style lang="scss" scoped>
.row{
  width:100%;
  height: 100%;
  margin:auto;
}




/* diagonal menu design */

// .parent {
//   position: relative;
//   width: 100%;
// }
// .one, .two, .three  {
//   position: absolute;
//   height: 600px;
//   width: 49%;
//   /* 50% za bez razmaka*/
// }
// .one {
//   left: 0;
//   top: 0;
//   background-image: url('@/assets/waiterCalls.png');
//   -webkit-clip-path: polygon(0 0, 100% 0%, 50% 100%, 0% 100%);
//   clip-path: polygon(0 0, 75% 0, 50% 100%, 0% 100%); 
//   background-size: 50%;
// }

// .two {
//   left: 25.5%; /* loša ideja ovako fiksno */
//   top: 0;
//   background-image: url('@/assets/waiterNewOrder.png'); /*promijeniti u dinamicki kasnije */
//   -webkit-clip-path: polygon(50% 0, 100% 0%, 100% 100%, 0% 100%);
//   clip-path: polygon(25% 0, 100% 0%, 75% 100%, 0% 100%); 
//   background-size:80%;
// }

// .three {
//   right: 0;
//   top: 0;
//   background-image: url('@/assets/waiterAllOrders.png');
//   -webkit-clip-path: polygon(50% 0, 100% 0%, 100% 100%, 0% 100%);
//   clip-path: polygon(50% 0, 100% 0%, 100% 100%, 25% 100%); 
//   background-size: 50%;
// }

// .hover01 div {
// 	-webkit-transform: scale(1);
// 	transform: scale(1);
// 	-webkit-transition: .3s ease-in-out;
// 	transition: .3s ease-in-out;
// }
// .hover01 div:hover {
// 	-webkit-transform: scale(1.3);
// 	transform: scale(1.3);
//   z-index:1000;
// }





</style>