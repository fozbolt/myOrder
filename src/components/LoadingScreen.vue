<template>
   <div id="loadingDiv">
      <img id="loadingGif" src="@/assets/PizzaSlowPurple.gif" alt="">
      <img id="logoMain" src="@/assets/logo-main.svg" alt="">
  </div>
</template>

<script>


export default {
  name: 'LoadingScreen',

  data() { 
        return {
            
        }
  },  

  methods:{

  },
 
}
 

</script>


<style lang="scss">

#loadingDiv{
  width: 100vw;
  height: 100vh;
  background-color: #543570 !important;
  display: grid;
  align-content: center;
  align-items: center;
  justify-items: center;
}

#loadingGif  {
 width: 60%;
 max-width:360px;
 display:block;
 margin-bottom:60px;
//  margin-left: auto;
//  margin-right: auto;
}

#logoMain{
  width:200px;
  position: relative;
  z-index: 999;
  display:block;
  // margin-left: auto;
  // margin-right: auto;

}


@media (min-width: 768px){
  #logoMain{
    width:400px;
  }
}

</style>