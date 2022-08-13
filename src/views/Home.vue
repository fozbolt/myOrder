<template>
  <div >
    <div class="homepageContent" id="landingContent">
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
          <!-- <img src="@/assets/rightArrow.png" id="arrowIcon" alt="arrow icon"/> -->
        </button>
      </div> 
    

    </div>
     
    <div class="homepageContent" id="abouthomepageContent"></div>
    <div class="homepageContent"></div>
    <div class="homepageContent"></div>
    <div class="homepageContent">
      <div id="subscribeDiv"></div>
    </div>
    
    <FloatingMenu @focusout="test"/>
    <Footer/>
  </div>
</template>


<script>
import store from '@/store.js';
import LoadingScreen from '@/components/LoadingScreen.vue';
import Footer from '@/components/Footer.vue';
import FloatingMenu from '@/components/FloatingMenu.vue';

export default {
    name: "Home",
    data() {
        return {
            store
        };
    },
    methods: {
      test(){
        console.log('aaa');
      }
    },
    components: { LoadingScreen, Footer, FloatingMenu }
}
</script>

<style>

.homepageContent {
    height: 100vh;
    width: 100%;
}

#landingContent{
    display: flex;
    /* position: relative; */
    align-items: flex-start;
    /* z-index: 2; */
    /* top: -41px; */
    overflow: visible;
    flex-direction: column-reverse;
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

#abouthomepageContent{
  background-color: pink;
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
  font-size: 18px;
  line-height: 18px;
  color: #161515;
  backdrop-filter: blur(2px);
}

#landingText{
  position:sticky;
  position: -webkit-sticky;
  top:35vh;
  left:5vw;
  text-align: left;
  align-self: flex-start; 
  height: auto;
  
}

#italicText{
  color:white
  }
  

#subscribeDiv{
    background-image: url('@/assets/subscribe.jpg');
    height: 100%;
    width: 100%;
    background-size:cover;
}

.fa-long-arrow-right{
  padding-left:2px
}


@media (max-width:767px){
 #landingImage{
   height: 100vh
 }
}

@media (min-width:767px){
 #landingText{
   left:30vw;
   top:15vw
 }
}
</style>
