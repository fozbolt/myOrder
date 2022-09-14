<template>
    <Suspense>
    <!--source: https://ismail9k.github.io/vue3-carousel/getting-started.html#basic-using-->
    <carousel v-if="cards.length!==0" v-bind="settings" :breakpoints="breakpoints" id="slider">
        <slide v-for="slide in cards" :key="slide">
          <div class="carousel__item">
            <AboutUsCards :key="slide.id" :info="slide" />
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
import AboutUsCards from '@/components/customer/AboutUsCards.vue'
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
    AboutUsCards
  },

  data() { 
        return {
            store,
            cards: [],
            filteredCards: [],
            settings:{
                //"items-to-show": 3,
                "wrapAround": true,
                // "autoplay": 4000
            },
             breakpoints: {
                // 320px and up: https://worship.agency/mobile-screen-sizes-for-2021
                320: {
                  itemsToShow: 1.5,
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
    this.cards = await Products.fetchInfoCards();
  }
 
}
 

</script>

<style lang="scss">

 #slider{
  //  margin-top:40px;
   position: relative;
   top:210px;
   z-index:1;
}

</style>


<style lang="scss" scoped>
::v-deep{

  ol{
    margin-top:10px;
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
    // width: 60% !important;
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
    width: fit-content;
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

  .carousel__pagination{
      display: flex;
      justify-content: center;
      list-style: none;
      align-items: center;
      vertical-align: middle;
      height: 7.5px;
  }

  .carousel__pagination-button{
      width: 45px;
      background-color: #C4C4C4;
      height: 7.5px;
      margin: 0;
      padding: 0;
  }

  .carousel__pagination-button--active{
    background-color: black;
    height: 8.5px;
    overflow: visible;
    padding: 0px 25px;
    border-radius:0;
  }

  ol{
    padding-inline-start: 0px;
  }

  .carousel__pagination > li{
      background-color: #C4C4C4;
      width: 50px;
      height: 8px;
      padding: 0 !important;
      margin: 0;
      display: flex;
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
}

@media(min-width:1024px){
  #slider{
   top:350px;

  .carousel__pagination{
    margin-top: 4vh
  }
}
}

</style>