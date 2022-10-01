<template>
    <Suspense>
      <template #default>
        <div class="dummyDivNeededForSuspenseToWork"> <!--https://qdmana.com/2022/03/202203271244076861.html-->
           <HorizontalScrollerOrders/>
          <div class="tab-content p-3" id="myTabContent">
            <div class="row" ref="row">   
                <div v-if="loaded===false" class="loader"></div>
                <Card v-else  @click="gotoDetails(card)" :key="card.id" v-for="card in cards" :info="card" />   <!-- vrijednost varijable se prenosi u props info komponente card, dakle u info stavljamo da želimo proslijediti informaciju card, : uputa da vue ne uzima varijabblu kao običan string nego da pogleda unutra što se nalazi i to preda childu-->
                <span v-if="store.searchText!== '' && !cards.length">No results found!</span>
                <span v-if="!cards.length">Currently no results in this subcategory</span>
            </div>
          </div>
        </div>
      </template>
      
      <!--Skeleton loader - unfinished-->
      <template #fallback>
        <div class="dummyDivNeededForSuspenseToWork">
          <!-- <HorizontalScroller/> -->
         {{'Loading'}}
         Loading..
          <div class="tab-content p-3" id="myTabContent">
            <div class="row" ref="row">   
                <Card :key="card.id" v-for="card in cards" :info="card" />     
            </div>
           </div>
          </div>
        </template>
  
    </Suspense>
</template>
  
  <script>
  import Card from '@/components/staff/OrderCard.vue'
  import HorizontalScrollerOrders from '@/components/staff/HorizontalScrollerOrders.vue'
  import store from '@/store.js'
  import { Orders } from '@/services';
  import _ from 'lodash';

  
  export default {
    name: 'CurrentTabOrders',
    props: ['info'],  
  
    components:{ Card, HorizontalScrollerOrders },
  
    data() { 
          return {
              store,
              cards: [],
              loaded : false
          }
      },
  
     async created() {
          setTimeout(() => { this.getOrders() }, 1000) 

          this.$watch(
            (vm) => [vm.store.selected_order_status],
            async (val)  => {
              this.getOrders()
                        
              //loader turns off after cards are fetched or after 2 seconds of unsuccessful fetching
              // if (this.cards.length !== 0)  setTimeout(() => { this.loaded=true}, 2000)
              // else this.loaded=true

              //quickfix for barman when it loads content for chef first - cannot fix that without major refactoring and causing weaknesses on other parts of app
              setTimeout(() => { this.loaded=true}, 2000)

              this.store.searchText = ''
          
            },
            {
              immediate: true, //immediate set to true means we watch the initial value of the reactive properties.
              deep: true, //deep set to true means we watch for changes of properties in all levels of an object.
            }
        );
        
          //checks for new orders every 30 seconds
          setInterval(async() =>{
            this.getOrders()
            
          },30000)
     },

  
      methods: {
          gotoDetails(card) {
              this.store.searchText = ''
              if(this.store.userType !== 'customer' && this.store.userType !== 'manager'){
                    sessionStorage.setItem("current_type", this.store.type);
              } 

              this.$router.push({ path: `/orders/${card._id}` });
          },

          filterOrders(orders){
            // refactor this later cause now it resembles for loop too much (even though filter is a for loop)
            let filteredOrders = orders.filter(order => {
                  let found = false
                  order = order.items.filter(item => {
                      if( item.type.toLowerCase() === this.store.type.toLowerCase() && found === false ){
                        found = true
                      }
                  });

                  if (found) return order;
              });
             

            //if in my_orders filter again by updatedBy (its our order if we participated in creating or updating it)
            if(this.$route.path === '/my_orders'){
              filteredOrders = filteredOrders.filter(order => order.orderInfo.updatedBy === this.store.username ||  order.orderInfo.createdBy === this.store.username ||  order.orderInfo.foodAcceptedBy === this.store.username || order.orderInfo.drinkAcceptedBy === this.store.username);
            }
           
            return filteredOrders
          },



          async getOrders(){
            //simplest way to make barman see onyl drinks, chef food and waiter all(through type filter)
            if(this.store.userType === 'barman') this.store.type = 'Drink'

            let orders = await Orders.fetchOrders(this.store.searchText, this.store.type, this.store.selected_order_status);
            this.cards = this.filterOrders(orders)
          }
  
  
    },
  
      watch: {
        'store.searchText': _.debounce(async function(val) {
          this.getOrders()
        }, 500),

        'store.type': {
        handler: async function(newValue) {
          this.getOrders()

          try{
            this.store.clientHeightRow = this.$refs.row.clientHeight || 0
          }catch(e){}
        }
      },
  
    },


    mounted(){
      setTimeout(()=>{  
          try{
            this.store.clientHeightRow = this.$refs.row.clientHeight || 0
          }catch(e){}   
        },3000)
        
    },


    beforeUnmount(){
      this.store.searchText = ''
    }
  
    
  
  
  }
   
  
</script>
   
  
  
<style lang="scss">
  
.row{
    justify-content: space-evenly;
    display:flex;
}

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 0.5s linear infinite;
}


.dummyDivNeededForSuspenseToWork{
    margin-top:20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); 
    }
}


@media(min-width:1200px){
    .tab-content{
        padding-top: 50px;
    }
    }

</style>