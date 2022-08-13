<template>
    <Suspense>
    <!--source: https://ismail9k.github.io/vue3-carousel/getting-started.html#basic-using-->
    <carousel v-if="filteredCards.length!==0" v-bind="settings" :breakpoints="breakpoints">
        <slide v-for="slide in filteredCards" :key="slide">
          <div class="carousel__item">
            <SimilarMealsCard  @click="gotoDetails(slide)" :key="slide.id" :info="slide" />
          </div>     
        </slide>

        <template #addons>
        <navigation />
        <pagination />
        </template>
    </carousel>
        
    </Suspense>
</template>

<script>

import store from '@/store.js'
import SimilarMealsCard from '@/components/SimilarMealsCard.vue'
import { Products } from '@/services';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  name: 'Slider',
  props: ['info'],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    SimilarMealsCard
  },

  data() { 
        return {
            store,
            cards: [],
            filteredCards: [],
            settings:{
                //"items-to-show": 3,
                "wrap-around": true,
                //"autoplay": 4000
            },
             breakpoints: {
                // 350px and up
                350: {
                  itemsToShow: 2,
                  snapAlign: 'center',
                },
                700: {
                  itemsToShow: 2.5,
                  snapAlign: 'center',
                },
                1024: {
                  itemsToShow: 3.5,
                  snapAlign: 'center',
                },
              },

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
   
    //ovo nije najtocnije - testirati na kraju
    this.filteredCards = this.cards.filter(item => item.category === this.store.category && item.id !== this.$route.params.id )
  }
 
}
 

</script>


<style lang="scss">

.carousel{
   margin-top:40px;
}

.carousel__next, .carousel__prev{
  background-color: #0078D4;
  color:white;
  margin-top: -20px;
  display: none; //I don't want to show arrows currently
}

.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}

.carousel__slide {
  padding: 10px;
}


.carousel__item {
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
  padding: 10px;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
  padding: 10px;
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
  padding: 10px;
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
  padding: 10px;
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
  padding: 10px;
}

.carousel__pagination-button{
  background-color: hsl(206, 41%, 68%);
}

.carousel__pagination-button--active{
  background-color: #0078D4;
}

ol{
  padding-inline-start: 0px;
}



@media (max-width:900px){
 .carousel{
    max-width: 100vw;
  }
}

@media (min-width:900px){
 #contentHolder{
  position: absolute; 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 600px;
 }

 .carousel{
  width:600px;
 }

}

</style>