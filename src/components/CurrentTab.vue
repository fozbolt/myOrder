<template >
  <Suspense>
    <template #default >
      <div> <!--https://qdmana.com/2022/03/202203271244076861.html-->
        <HorizontalScroller/>
        <div class="tab-content p-3" id="myTabContent">
          <div class="row" ref="row">   
              <div v-if="loaded===false" class="loader"></div>
              <Card v-else  @click="gotoDetails(card)" :key="card._id" v-for="card in cards" :info="card" />   <!-- vrijednost varijable se prenosi u props info komponente card, dakle u info stavljamo da želimo proslijediti informaciju card, : uputa da vue ne uzima varijabblu kao običan string nego da pogleda unutra što se nalazi i to preda childu-->
              <span v-if="store.searchText!== '' && !cards.length">No results found!</span>
              <span v-if="!cards.length">Currently no results in this subcategory</span>
          </div>
        </div>
      </div>
    </template>
    
    <!--Skeleton loader - unfinished-->
    <template #fallback>
      <div>
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
import Card from '@/components/ProductCard.vue'
import HorizontalScroller from '@/components/HorizontalScroller.vue'
import store from '@/store.js'
import { Products } from '@/services';
import _ from 'lodash';

export default {
  name: 'CurrentTab',
  props: ['info'],  

  components:{ Card, HorizontalScroller },

  data() { 
        return {
            store,
            cards: [],
            loaded : false
        }
    },

   async created() {
        this.$watch(
        (vm) => [vm.store.type, vm.store.category, vm.store.selectedSubCategory],
        async (val)  => {
          this.cards = await Products.fetchProducts();

          //loader turns off after cards are fetched or after 2 seconds of unsuccessful fetching
          if (this.cards.length !== 0)  setTimeout(() => { this.loaded=true}, 2000)
              else this.loaded=true


          this.store.searchText = ''
          
        },
        {
          immediate: true, //immediate set to true means we watch the initial value of the reactive properties.
          deep: true, //deep set to true means we watch for changes of properties in all levels of an object.
        }
      );
   },

    methods: {
        gotoDetails(card) {
            if(this.store.userType === 'customer'){
              this.store.searchText = ''
              this.$router.push({ path: `/food_list/${card._id}` });
            }
        },


  },

    watch: {
      //deprecated or not?
      'store.searchText': _.debounce(async function(val) {
          this.cards = await Products.fetchProducts(val);
      }, 500),


  },
  
  mounted(){
  
    try{
        //hardcoded wait for async
        setTimeout(()=>{
          try{
            this.store.clientHeightRow = this.$refs.row.clientHeight
          }catch(e){}
        },3000)
    }catch{}
    
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


@media(min-width:1200px){
  .tab-content{
    padding-top: 50px;
  }
}
</style>