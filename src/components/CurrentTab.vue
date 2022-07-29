<template>
  <Suspense>
    <!--u bookmarksima se nalaze bolji dizajni pa implementirati to kasnije--> 
    <template #default>
      <div class="dummyDivNeededForSuspenseToWork"> <!--https://qdmana.com/2022/03/202203271244076861.html-->
         <HorizontalScroller/>
        <div class="tab-content p-3" id="myTabContent">
          <div class="row">   
              <Card  @click="gotoDetails(card)" :key="card.id" v-for="card in cards" :info="card" />   <!-- vrijednost varijable se prenosi u props info komponente card, dakle u info stavljamo da želimo proslijediti informaciju card, : uputa da vue ne uzima varijabblu kao običan string nego da pogleda unutra što se nalazi i to preda childu-->
              <span v-if="store.searchText!== '' && !cards.length">No results found!</span>
              <span v-if="!cards.length">Currently no results in this subcategory</span>
          </div>
        </div>
      </div>
    </template>
    
    <template #fallback>
      <div class="dummyDivNeededForSuspenseToWork">
        <!-- <HorizontalScroller/> -->
       {{'Loading'}}
       Loading..
        <div class="tab-content p-3" id="myTabContent">
          <div class="row">   
              <Card :key="card.id" v-for="card in cards" :info="card" />     
          </div>
         </div>
        </div>
      </template>

  </Suspense>
</template>

<script>
import Card from '@/components/Card.vue'
import CardSkeleton from '@/components/CardSkeleton.vue'
import HorizontalScroller from '@/components/HorizontalScroller.vue'
import store from '@/store.js'
import { Products } from '@/services';
import _ from 'lodash';
import { watch, ref } from 'vue';


export default {
  name: 'CurrentTab',
  props: ['info'],  

  components:{ Card, HorizontalScroller, CardSkeleton },

  data() { 
        return {
            store,
            cards: []
        }
    },

   async created() {
        this.$watch(
        (vm) => [vm.store.type, vm.store.category, vm.store.selectedSubCategory],
        async (val)  => {
          this.cards = await Products.fetchProducts();
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
            this.store.searchText = ''
            this.$router.push({ path: `/food_list/${card.id}` });
        },


  },

    watch: {
      //deprecated or not?
      'store.searchText': _.debounce(async function(val) {
          this.cards = await Products.fetchProducts(val);
      }, 500),

  },

  


}
 

</script>
 


<style lang="scss">


</style>