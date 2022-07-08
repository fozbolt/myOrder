<template>
  <!-- <div id="app"> -->
    <!--
      <nav v-if="isAuthenticated">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    -->
    <Navbar v-if="auth.authenticated"/>
  
    <router-view/>
  <!-- </div> -->
</template>


<script>
import store from '@/store.js'
import Navbar from '@/components/Navbar.vue'
import {Auth} from "@/services/index.js";
import { Posts } from '@/services';

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
async mounted() {
        let result = await Posts.test()
        console.log('this.auth.authenticated:', this.auth.authenticated)
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
