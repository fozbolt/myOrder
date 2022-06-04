<template>
  <!-- <div class="container"> -->
    <div class="content" id="landingContent">
      <picture id="landingImage">
        <source media="(min-width: 900px)" srcset="../assets/HeroMedium.png">
        <img src="../assets/HeroMobile.png" alt="Default hero image">
      </picture>
    </div>

    <div class="content" id="aboutContent"></div>
    <div class="content"></div>
    <div class="content"></div>
    <div class="content"></div>
  <!--</div> -->
</template>

<script>

//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    
  }
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


</style>
