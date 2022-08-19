<template>
   <div id="loadingDiv" >
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
  position:relative;
  width: 100%;
  height: 100%;
  margin:35% 0px;
}

#loadingGif  {
 width: 100%;
}

#logoMain{
  width:150px;
  position: absolute;
  z-index: 999;
  top:50%;
  left:25%
}

</style>