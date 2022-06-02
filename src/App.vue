

<template>
  <div id="app">
    <!--
      <nav v-if="isAuthenticated">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    -->
   <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div>
        <a class="navbar-brand ms-auto" href="#">
          <img class="logo center" alt="logo center" src="./assets/logo-main.svg" />
        </a>
      </div>
      
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

.navbar-collapse {
    position: absolute;
    width: 95%;
    top: 100%;
    background-color: gray;
}



</style>
