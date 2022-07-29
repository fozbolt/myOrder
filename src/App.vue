<template>
  <!-- <div id="app"> -->
    <!--
      <nav v-if="isAuthenticated">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    -->
    <Navbar v-if="auth.authenticated" @focusout="handleFocusOut" tabindex="0"/>
  
    <router-view/>
  <!-- </div> -->
</template>


<script>
import store from '@/store.js'
import Navbar from '@/components/Navbar.vue'
import {Auth} from "@/services/index.js";
import { Products } from '@/services';
import * as $ from 'jquery';

export default {
  name: 'App',
  components: {
      Navbar
  },
  data(){
        return{
          email: '',
          password: '',
          store,
          auth: Auth.state,
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
    }
    
  },

  async beforeMount() {
          //nek se za sada vuku na landingu, pa kasnije prebaciti u food_list?
          let my_proxy = await Products.getProductTypes()
          let destructuredProxy= {...my_proxy.type}
          if (this.store.productTypes.length === 0) this.store.productTypes.push(destructuredProxy)
      }

  }


</script>


<style lang="scss">
#app {
  font-family:  'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

</style>
