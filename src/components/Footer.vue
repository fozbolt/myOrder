<template>
   <div class="container">
    <div id="content">
        Footer iz komponente
    </div>
   </div>
</template>

<script>


export default {
  name: 'Footer',

  data() { 
        return {
            cards: [],
        }
  },  

  methods:{

  },
 
}
 

</script>


<style lang="scss">

//ovo samo remeti stvari ali pustiti za sada
// #content{
//     position:absolute;
//     bottom:0;
//     z-index: 9999;
//     min-height: 200px;
//     width: 100%;
//     background-color: yellow;


// }

#content{
    background-color: yellow;
    width: 100%;
    min-height: 200px;
}


</style>