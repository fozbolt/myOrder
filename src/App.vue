<template>
    <!--for UX purposes on customer interface only-->
    <LoadingScreen v-if="!loaded"></LoadingScreen> 

    <div v-else-if="(auth.authenticated || this.$route.path ==='/login') && loaded===true" class="page-container">
      <div class="content-wrap">
        <Navbar @focusout="handleFocusOut" tabindex="0"/>
        
        <router-view v-if="store.userType === 'customer'" v-slot="{ Component, route }"> 
            <transition :name="transitionName" class="transition" mode="out-in">                 
                <component :is="Component" :key="route.fullPath"></component>
            </transition>
        </router-view>
        
        <router-view v-else :key="$route.fullPath" />
        
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
          transitionName: 'animation-right',
        }
  },

  methods:{
  
    handleFocusOut() {
        $(document).click(function (event) {

        // If *navbar-collapse* is not among targets of event
        if (!$(event.target).is('.navbar-collapse *')) {
          $('.navbar-collapse').collapse('hide');
        }

      }); 
    },


    setLoader(){
        if(this.store.userType !== 'customer' || !this.$route.path.includes('/orders')) this.loaded = true;
        else 
            setTimeout(()=>{
                this.loaded=true
            },3000)
    },



    createCart(){
      //create empty cart if it doesn't exist
      let test = JSON.parse(localStorage.getItem('cart')); 

      if (!Array.isArray(test)){
        localStorage.setItem('cart', JSON.stringify([]));
      }
    },


    getUserType(){
      //needed because login handler sets it only on login and it becomes a problem when store restores during refresh (could be placed in beforeEach route too)
      setTimeout(()=>{
        //activats only on refresh
        if(this.$route.path !== '/login'){
            try{
                let user = JSON.parse(localStorage.getItem('user'));    
                this.store.userType = user.type
                this.store.username = user.username
                this.store.userId = user.id
                this.store.table = parseInt(JSON.parse(localStorage.getItem('table')));
            }catch(e){}
        
        }

    },1000)
        
    }


    
  },

  async beforeMount() {
          let my_proxy = await Products.getProductTypes()
          let destructuredProxy= {...my_proxy.type}
          if (this.store.productTypes.length === 0) this.store.productTypes.push(destructuredProxy)
      },

  mounted(){
        this.setLoader()
  
        this.getUserType();
        this.createCart();
  },
  

  watch: {
    ['$route'](to, from) {
      let toDepth = to.fullPath.split('/').length;
      let fromDepth = from.fullPath.split('/').length;
      if (from.fullPath === '/') fromDepth = 1 //custom rules for homepage
      else if (to.fullPath === '/') toDepth = 1 //custom rules for homepage

      //if lengths are same and we dont have parent/child relationship then resolve  this with meta tags?
      this.transitionName = toDepth < fromDepth ? 'animation-right' : 'animation-left';
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
/* can be refactored greately */
.animation-left-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.animation-leftenter-active {
  transition: all 0.3s ease-out; 
}
.animation-left-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.animation-left-leave-active {
  transition: all 0.3s ease-in; 
}


.animation-right-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}
.animation-right--enter-active {
  transition: all 0.3s ease-out; 
}
.animation-right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.animation-right-leave-active {
  transition: all 0.3s ease-in; 
}
</style>
