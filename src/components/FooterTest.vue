<template>
   <!-- <div id="contentDiv" class="container" >
        <div id="imageDiv">
            <img src="@/assets/foodInfo.jpg"/>
        </div>
        <div id="dataDiv">
            {{info.name}}
            <small style="font-size:12px;">Chosen additions: garlic, ketchup, salami, nectar</small>
            {{info.price}}
        </div>
        <div id="quantityDiv">
            2
        </div>
        
   </div> -->
   <div style="width:100%; height:1000px; background-color:blue " id="page-container">
        <div id="content-wrap">
        all other page content
        </div>
       
        <Footer id="footer"></Footer>
   </div>
</template>

<script>
import FoodInfo from '@/views/FoodInfo.vue'
import Footer from './Footer.vue';

//test it from Checkout view
export default {
    name: "FooterTest",
    props: ["info"],
    data() {
        return {
            cards: [],
        };
    },
    methods: {},
    components: { FoodInfo, Footer }
}
 

</script>


<style lang="scss">
#page-container {
  position: relative;
  min-height: 100vh;
   background-color: yellow;
}

#content-wrap {
  padding-bottom: 2.5rem;    /* Footer height */
   background-color: pink;
   height:1000px; 
}

#footer {
  position: absolute;
  background-color: blue;
  bottom: 0;
  width: 100%;
  height: 2.5rem;            /* Footer height */
}

// #imageDiv, #dataDiv, #quantityDiv{
//     float:left;
// }

// #contentDiv{
//     width: 80%;
//     height: 80px;
//     background-color: pink;
//     text-align: left;
    
// }

// #contentDiv > div{
//     float:left;
// }

// #imageDiv > img {
//     height: 75px;
//     width: 75px;
//     border-radius: 10px;
// }

// small{
//     color:gray;
// }

// #dataDiv{
//     width: 140px;
//     height: 80px;
//     margin-left: 25px;
//     text-align: center;
// }

// #quantityDiv{
//     width: 50px;
//     height: 80px;
//     margin-left: 5px;
//     text-align: center;
// }
</style>