<template>
  <div class="container">
    <div class="content" id="landingContent"></div>
    <div class="content" id="aboutContent"></div>
    <div class="content"></div>
    <div class="content"></div>
    <div class="content"></div>
  </div>
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
  background-color: blue;
}

#aboutContent{
  background-color: pink;
}

</style>
