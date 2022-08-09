<template>
    <Suspense>
    <!--source: https://ismail9k.github.io/vue3-carousel/getting-started.html#basic-using-->
    <carousel v-bind="setting" style="margin-top:10px;">
        <slide v-for="slide in cards.length" :key="slide">
        <Card  @click="gotoDetails(card)" :key="card.id" v-for="card in cards" :info="card" />
        </slide>

        <template #addons>
        <navigation />
        <pagination />
        </template>
    </carousel>
        
    </Suspense>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import Card from '@/components/Card.vue'
import { Products } from '@/services';


export default {
  name: 'Slider',
  props: ['info'],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Card
  },

  data() { 
        return {
            cards: [],
            settings:{
                "items-to-show": 6,
                
            }
        }
  },  

  methods:{
    gotoDetails(card) {
            this.store.searchText = ''
            this.$router.push({ path: `/food_list/${card.id}` });
        },
  },

  async mounted(){
     this.cards = await Products.fetchProducts();
  }
 
}
 

</script>


<style lang="scss">


</style>