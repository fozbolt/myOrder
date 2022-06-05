<template>
 <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <button style="outline:none;box-shadow: none;border:none" class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
              <a class="nav-link nav-link-ltr" @click="this.$router.push('/')">Order now</a>
            </li>
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
              <a class="nav-link  nav-link-ltr" href="#">About us</a>
            </li>
             <li class="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
              <a class="nav-link nav-link-ltr" href="#">Top offers</a>
            </li>
             <li class="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
              <a class="nav-link nav-link-ltr" href="#">New offers</a>
            </li>
             <li class="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
              <a class="nav-link nav-link-ltr" href="#">Subscribe</a>
            </li>
          </ul>
        </div>
        <a class="navbar-brand ms-auto" href="#">
          <img id="logoNav" alt="navbar logoNav" src="@/assets/logo-main.svg" />
        </a>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar'
}


//toggle hamburger menu when clicked on some choice

</script>


<style lang="scss">

nav {
  position: relative;
  top:0;
  left:0;
  background: rgba(255, 255, 255, 0.6);
  

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
    width: 75%;
    

}

.navbar-nav a {
  color:black;
}


@media (max-width:767px){
 .navbar-collapse {
    position:absolute;
    top:0;
    left:0;
    width: 45%;
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


@media (min-width:768px){
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

</style>