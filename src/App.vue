<template>
  <!-- <div id="app"> -->
    <!--
      <nav v-if="isAuthenticated">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    -->
    <Navbar/>
  
    <router-view/>
  <!-- </div> -->
</template>


<script>
import store from '@/store.js'
import Navbar from '@/components/Navbar.vue'

export default {
name: 'App',
components: {
    Navbar
},
data(){
      return{
        email: '',
        password: '',
        store
      }
},
computed: { 
  isAuthenticated() {
    return store.isAuthenticated //this.$store....
  },
 },
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
