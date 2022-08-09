<template>
  <div >
    <div class="content" id="landingContent">
      <picture id="landingImage">
        <source media="(min-width: 900px)" srcset="@/assets/HeroMedium.png">
        <img src="@/assets/HeroMobile.png" alt="Default hero image">
      </picture>
      <div id="landingText">
        <div>
        <div id="mainText">
          <b>Future is here!</b> Be part of a revolution and order from our <i id="italicText">futuristic</i> app
        </div>
        <div id="subText">
          Join us and tell the world all about it
        </div>
      </div>
  
       <button  @click="this.$router.push('/food_list')" type="button" id="orderNowButton" class="btn btn-primary btn-circle btn-xl">
          Order now 
          <i class="fas fa-long-arrow-right" aria-hidden="true"></i>
          <!--fa-thin se placa-->
          <!-- <i class="fa fa-arrow-right" aria-hidden="true"></i> -->
          <img src="@/assets/rightArrow.png" id="arrowIcon" alt="arrow icon"/>
        </button>
      </div> 

    </div>
     
    <div class="content" id="aboutContent"></div>
    <div class="content"></div>
    <div class="content"></div>
    <div class="content"></div>
  
  </div>
</template>


<script>
import store from '@/store.js';
import LoadingScreen from '@/components/LoadingScreen.vue';

export default {
    name: "Home",
    data() {
        return {
            store
        };
    },
    methods: {},
    components: { LoadingScreen }
}
</script>

<style>

.content {
    height: 100vh;
}

#landingContent{
  width:100%;
  height:120%; 
}


/* absolute or relative? */
#landingImage{
  position: relative;
  top:-50px;
  left:0;
  width:100%;
  height:100%;
  z-index: -1;
}

picture {
  max-width: 100%;
  max-height: 100%;
  display: flex;
 
}
picture img {
 object-fit: cover; 
    height: auto;
    width:100%;
}

#aboutContent{
  background-color: pink;
}

@media (max-width:767px){
 #landingImage{
   height: 100vh
 }
}

#orderNowButton{
  position:relative;
 
}

.btn-circle.btn-xl {
  font-size: 16px;
  text-align: center;
  height: 40px;
  width: fit-content;
  border-radius: 50%;
  margin: 10px 2px 2px 2px;
}


#arrowIcon{
  height: 20px;
  width: 20px;
  color:white;
  margin: 0px 2px 0px 2px;
}

#mainText{
  position: relative;
  width: 281px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  color: #000000;
  backdrop-filter: blur(2px);
}


#subText{
  margin-top:5px;
  position: relative;
  width: 300px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #343030;
  backdrop-filter: blur(2px);
}

#landingText{
  position:absolute;
  top:37.5vh;
  left:5%;
  text-align: left;
}

#italicText{
  color:white
  }
  



</style>
