<template>
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
          <WaiterMenu v-for="card in cards" :key="card.name" :info="card"/>
    </div>
  </div>

</template>

<script>
import WaiterMenu from './WaiterMenu.vue';


export default {
    name: "Waiter",
    data() {
        return {
          cards: undefined
        };
    },
    methods: {},
    components: { WaiterMenu },

    mounted(){
      this.cards = [
        {
          src: require('@/assets/waiterCallsSquare.png'),
          name: 'Calls',
          path: '/calls'
        },
        {
          src: require('@/assets/waiterNewOrderSquare.png'),
          name: 'New order',
          path: '/food_list'
        },
        {
          src: require('@/assets/waiterAllOrdersSquare.png'),
          name: 'Orders',
          path: '/orders'
        }
      ]
    }
}
 

</script>


<style lang="scss" scoped>
.row{
  width:100%;
  height: 50%;
  margin:auto;
}



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