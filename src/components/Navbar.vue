<template>
 <nav v-if="auth.authenticated" class="navbar navbar-expand-lg navbar-light" :style="{backgroundColor:getColor()}">
      <div class="container-fluid">
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown" @focusin="toggleMenu" :style="{backgroundColor:getColor()}">
          <ul class="navbar-nav">
            <li class="nav-item active" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
              <a @click="this.$router.push('/')"  href="" class="nav-link nav-link-ltr">Order now</a>
            </li>
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
              <a @click="this.$router.push('/')" href=""  class="nav-link nav-link-ltr">My orders</a>
            </li>
             <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
              <a class="nav-link nav-link-ltr" href="#">Top offers</a>
            </li>
             <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
              <a class="nav-link nav-link-ltr" href="#">New offers</a>
            </li>
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
              <a class="nav-link  nav-link-ltr" href="#">About us</a>
            </li>
             <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
              <a class="nav-link nav-link-ltr" href="#">Subscribe</a>
            </li>
            <span v-if="auth.authenticated">
              <a @click="logout" class="btn btn-info my-2 my-sm-0 mr-2 p-1" id="logoutBtn">Logout</a>
            </span>
          </ul>
        </div>
        <a class="navbar-brand ms-auto" @click="$router.push({ path: `/` });">
          <img id="logoNav" alt="navbar logoNav" src="@/assets/logo-main.svg" />
        </a>
      </div>
  </nav>
</template>

<script>
import {Auth} from "@/services/index.js";


export default {
  name: 'Navbar',

  data(){
      return{
        auth: Auth.state,
      }
  },

  methods: {
      logout() {
          Auth.logout();
          //refresh
          this.$router.go();
      },

      getColor(){
        if (this.$route.path === '/') return ''
        else return 'white'
      },

  },

      
}

</script>


<style lang="scss">

nav {
  position: relative;
  top:0;
  left:0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 9;
  

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.navbar-nav{
  padding-left: 50px;
  align-items: center;
  max-width: 200px;
}

.navbar{
  padding-left: 0px 0px 0px 30px;
  --bs-navbar-padding-x: none;
}

.container-fluid{
  --bs-gutter-x: 0rem;
}

.logoNav{
  position: absolute;
  top: 0;
  right: 0;
}

.navbar-collapse {
    position:absolute;
    //hardcoded to begin after navbar height - not best solution
    left:0;
    width: 80%;
}

.navbar-nav a {
  color:black;
}

.navbar-toggler{
   outline:none; 
   box-shadow: none !important;
   border:none !important;
}

#logoutBtn{
  margin-left: 5px;
  border-radius: 10px;
  background: azure;
  padding: 0px !important;
}


@media (max-width:991px){
 .navbar-collapse {
    position:absolute;
    top:0;
    left:0;
    max-width: 200px;
    background: transparent;
    top:40px;
    z-index: 100;
    border-radius: 0 0 10px 0;
}

.navbar-nav{
  padding-left: 0px;
  background: rgba(255, 255, 255, 0.6);
}


#logoNav{
  margin-right: -5px;
}

}


@media (min-width:992px){
//Desktop navbar on hover animation 

  .nav-link {
    text-decoration: none;
    color: #B8A929;
    margin: 0px 1px;
    display: inline-block;
    position: relative;
  }

  .nav-link:hover {
    opacity: 1;
  }

  .nav-link::before {
    transition: 300ms;
    height: 2.5px;
    content: "";
    position: absolute;
    background-color: #B8A929;
  }

  .nav-link-ltr::before {
    width: 0%;
    bottom: 10px;
  }

  .nav-link-ltr:hover::before {
    width: 85%;
  }

}

//animated navbar toggle / hamburger menu
.navbar-toggler span {
  display: block;
  background-color: black;
  height: 2px;
  width: 25px;
  margin-top: 6px;
  margin-bottom: 5px;
  position: relative;
  left: 0;
  opacity: 1;
  transition: all 0.35s ease-out;
  transform-origin: center left;
}


.navbar-toggler span:nth-child(1) {
  transform: translate(0%, 0%) rotate(0deg);
}

.navbar-toggler span:nth-child(2) {
  opacity: 1;
}

.navbar-toggler span:nth-child(3) {
  transform: translate(0%, 0%) rotate(0deg);
}

.navbar-toggler span:nth-child(1) {
  margin-top: 0.3em;
}

.navbar-toggler:not(.collapsed) span:nth-child(1) {
  transform: translate(15%, -33%) rotate(45deg);
}

.navbar-toggler:not(.collapsed) span:nth-child(2) {
  opacity: 0;
}

.navbar-toggler:not(.collapsed) span:nth-child(3) {
  transform: translate(15%, 33%) rotate(-45deg);
}



//remove border from hamburger menu
.btn:focus {
  outline: none;
  box-shadow: none;
  }



@media (min-width:992px){
  .navbar-nav a {
    font-size: 1.25em;
  }
.navbar>.container-fluid{
  height: 50px;
  }
  
  #logoNav{
    height:32px;
    width:180px;
  }

  .navbar-expand-lg .navbar-nav .nav-link {
    width: max-content;
    font-size: 24px;
}
}


@media (min-width:1600px){
  .navbar-nav a {
    font-size: 1.5em;
  }
.navbar>.container-fluid{
  height: 50px;
  }
  
  #logoNav{
    height:50px;
    width:200px;
  }

  .navbar-expand-lg .navbar-nav .nav-link {
    padding-right: 20px;
    padding-left: 20px;
}
}


</style>