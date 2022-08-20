<template>
    <LoadingScreen v-if="loaded===false && this.$route.path==='/'"></LoadingScreen>

    <div v-else-if="(auth.authenticated || this.$route.path ==='/login') && loaded===true" class="page-container">
    <div class="content-wrap">
      <Navbar @focusout="handleFocusOut" tabindex="0"/>
      <router-view :key="$route.fullPath"/> <!--da refresha i podrute-->
    </div>
      <!-- <Footer class="footer"/> -->
    </div>
</template>


<script>
import store from '@/store.js'
import Navbar from '@/components/Navbar.vue'
import {Auth} from "@/services/index.js";
import { Products } from '@/services';
import Footer from '@/components/Footer.vue'
import * as $ from 'jquery';
import LoadingScreen from '@/components/LoadingScreen.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    LoadingScreen,
},
  data(){
        return{
          email: '',
          password: '',
          store,
          auth: Auth.state,
          loaded: false,
          
        }
  },

  methods:{
  
    handleFocusOut() {
        $(document).click(function (event) {

        /// If *navbar-collapse* is not among targets of event
        if (!$(event.target).is('.navbar-collapse *')) {
          $('.navbar-collapse').collapse('hide');
        }

      }); 
    },

    setLoader(){
        //loader set only on homepage for now
        setTimeout(()=>{
          if (this.$route.path!=='/') this.loaded=true
          else setTimeout(() => { this.loaded=true},  3000000)
          
          //set this to bigger timeline if login wont pass
        },500)
    }
    
  },

  async beforeMount() {
          //nek se za sada vuku na landingu, pa kasnije prebaciti u food_list?
          let my_proxy = await Products.getProductTypes()
          let destructuredProxy= {...my_proxy.type}
          if (this.store.productTypes.length === 0) this.store.productTypes.push(destructuredProxy)
      },

  mounted(){
        this.setLoader();

        //create empty cart if it doesn't exist
        let test = JSON.parse(localStorage.getItem('cart')); 

        if (!Array.isArray(test)){
          localStorage.setItem('cart', JSON.stringify([]));
        }

        
  }

}
</script>


<style lang="scss">
#app {
  font-family:  'Roboto','Open Sans', Helvetica, Arial, sans-serif, 'Galindo-Regular', 'IMFellFrenchCanonSC-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  width: 100%;
  height: 100%;
}

@font-face {
  font-family: "Galindo-Regular";
  src: local("Galindo-Regular"),
   url(@/assets/fonts/Galindo-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "IMFellFrenchCanonSC-Regular";
  src: local("IMFellFrenchCanonSC-Regular"),
   url(@/assets/fonts/IMFellFrenchCanonSC-Regular.ttf) format("truetype");
}

.funkyFont{
  font-family: 'IMFellFrenchCanonSC-Regular' !important;
}

.brandColor{
  color: #0078D4 !important;
}

// .page-container {
//   position: relative;
//   min-height: 100vh;
// }

// .content-wrap {
//   padding-bottom: 2.5rem;    /* Footer height */
// }

// .footer {
//   position: absolute;
//   // bottom:0;
//   // left:0;
//   width: 100%;
//   height: 2.5rem;            /* Footer height */
//   z-index: 999999;
// }

// #loadingDiv{
//   display: table;
//   width: 100%;
//   height: 100%;

  
// }

// #loadingDiv > img{
//  width: 100%;
//   display: table-cell; vertical-align: middle;
  
// }

.overflow-hidden {
  overflow: hidden;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.justify-content-between {
  justify-content: space-between;
}

</style>
