

<template>
  <div id="app">
    <nav v-if="!isAuthenticated">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
  

    <router-view/>
  </div>
</template>

<script>
import store from '@/store.js'

export default {
name: 'App',
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
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
