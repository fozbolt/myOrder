<template>

    <LoadingScreen v-if="!loaded && this.$route.path==='/'"></LoadingScreen>

    <div v-else-if="(auth.authenticated || this.$route.path ==='/login') && loaded===true" class="page-container">
      <div class="content-wrap">
        <Navbar @focusout="handleFocusOut" tabindex="0"/>

        <router-view v-slot="{ Component, route }"> 
            <transition name="animation" mode="out-in">
              <!--da refresha i podrute -->
              <div :key="route.fullPath">                  
                <component :is="Component"></component>
              </div>
            </transition>
        </router-view>
        
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
          loaded: true,
          
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
        setTimeout(()=>{
          this.loaded=true
        },3000)
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


/* route transitions source: https://github.com/iamshaunjp/vue-animations/blob/lesson-12/src/App.vue */
.animation-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.animation-enter-active {
  transition: all 0.3s ease-out; 
}
.animation-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.animation-leave-active {
  transition: all 0.3s ease-in; 
}
</style>
