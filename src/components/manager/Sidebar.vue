<!--source: https://codepen.io/tio-jevero-the-styleful/pen/MdZQBo-->
<template>
    <div id="wrapper">
    <div class="overlay"></div>
        <!-- Sidebar -->
        <nav class="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
            <ul class="nav sidebar-nav">
                <div class="sidebar-header">
                    <div class="sidebar-brand">
                        <img id="logoSidebar" src="@/assets/logo-main.svg" alt="" >
                    </div>
                </div>
                <li><a  @click="this.$router.push({name: 'products'})" aria-current="#products">Products</a></li>
                <li><a  @click="this.$router.push({name: 'employees'})"  aria-current="#employees">Employees</a></li> 
                <!--nested menu-->
                <li class="dropdown">
                  <a  class="dropdown-toggle"  data-bs-toggle="dropdown">Statistics<span class="caret"></span></a>
                  <ul class="dropdown-menu animated fadeInLeft" role="menu">
                    <li><a  @click="this.$router.push({name: 'statistics', params: { chartName: 'firstChart' } })">First chart</a></li>
                    <li><a @click="this.$router.push({name: 'statistics', params: { chartName: 'secondChart' } })">2nd chart</a></li>
                    <li><a href="#books">Books</a></li>
                    <li><a href="#art">Art</a></li>
                    <li><a href="#awards">Awards</a></li>
                  </ul>
                </li>
                <li><a  @click="this.$router.push({name: 'feedback'})"  aria-current="#feedback">Feedback</a></li> 
                <li><a  @click="this.$router.push({name: 'newsletter'})"  aria-current="#newsletter">Newsletter</a></li> 
                <li><a  @click="this.$router.push({name: 'specialOffers'})"  aria-current="#specialOffers">Special offers</a></li> 
                <li><a @click="logout" aria-current="#logout" >Log out</a></li>
            </ul>
        </nav>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <img id="logoTopRight" src="@/assets/logo-main.svg" alt="" >
        <div id="page-content-wrapper">
            <button type="button" class="hamburger animated fadeInLeft is-closed" data-toggle="offcanvas">
                <span class="hamb-top"></span>
                <span class="hamb-middle"></span>
                <span class="hamb-bottom"></span>
            </button>
        </div>
        <!-- <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <router-view></router-view>
                </div>
            </div>
        </div> -->
        <!-- /#page-content-wrapper -->
        
    </div>
    <!-- /#wrapper -->
</template>

<script>
import {Auth} from "@/services/index.js";

export default {
  name: 'Sidebar',


  data() { 
        return {
          closed: true
        }
  },  

  methods:{
    logout() {
          Auth.logout();
          //refresh
          this.$router.go('/login');
      },

      toggleSidebar(){
        $(document).ready(function () {
            let trigger = $('.hamburger'),
                overlay = $('.overlay'),
                isClosed = false;
                

                trigger.click(function () {
                  this.closed= !this.closed;
                  hamburger_cross();      
                });

                function hamburger_cross() {
                    if (isClosed == true) {          
                        overlay.hide();
                        trigger.removeClass('is-open');
                        trigger.addClass('is-closed');
                        isClosed = false;
                       
                    } else {   
                        overlay.show();
                        trigger.removeClass('is-closed');
                        trigger.addClass('is-open');
                        isClosed = true;
                       
                       
                    }
                    $("#logoTopRight").toggle();
                }
            
            $('[data-toggle="offcanvas"]').click(function () {
                    $('#wrapper').toggleClass('toggled');
            });  
        });
      }
 
    },

    mounted(){
       this.toggleSidebar();
    },

    watch:{
        "$route.path": { 
              handler () {
                let overlay = $('.overlay');
                let trigger = $('.hamburger');
                      if (this.closed == true) {          
                          overlay.hide();
                          trigger.removeClass('is-open');
                          trigger.addClass('is-closed');
                        
                        
                      } else {   
                          overlay.show();
                          trigger.removeClass('is-closed');
                          trigger.addClass('is-open');
                          
          }
      }
    }
  }
    


}
 

</script>


<style lang="scss" scoped>
body {
    position: relative;
    overflow-x: hidden;
    background-color: #CFD8DC;
}
body,
html { height: 100%;}
.nav .open > a, 
.nav .open > a:hover, 
.nav .open > a:focus {background-color: transparent;}

/*-------------------------------*/
/*           Wrappers            */
/*-------------------------------*/

#wrapper {
    padding-left: 0;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

#wrapper.toggled {
    padding-left: 220px;
}

#sidebar-wrapper {
    z-index: 1000;
    left: 220px;
    width: 0;
    height: 100%;
    margin-left: -220px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #1a1a1a;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

#sidebar-wrapper::-webkit-scrollbar {
  display: none;
}

#wrapper.toggled #sidebar-wrapper {
    width: 220px;
}

#page-content-wrapper {
    width: 100%;
    padding-top: 70px;
}

// bug with this class: moves content up on sidebar opening
// #wrapper.toggled #page-content-wrapper {
//     position: absolute;
//     margin-right: -220px;
// }

/*-------------------------------*/
/*     Sidebar nav styles        */
/*-------------------------------*/
.navbar {
  padding: 0;
}


.sidebar-nav {
    position: absolute;
    top: 0;
    width: 100% !important;
    margin: 0;
    padding: 0;
    list-style: none;
}

.sidebar-nav li {
    position: relative; 
    line-height: 20px;
    display: inline-block;
    width: 100%;
}

.sidebar-nav li:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 3px;
    background-color: #1c1c1c;
    -webkit-transition: width .2s ease-in;
      -moz-transition:  width .2s ease-in;
       -ms-transition:  width .2s ease-in;
            transition: width .2s ease-in;

}
.sidebar-nav li:hover{
  background: skyblue !important;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.sidebar-nav li:hover:before,
.sidebar-nav li.open:hover:before {
    width: 100%;
    -webkit-transition: width .2s ease-in;
      -moz-transition:  width .2s ease-in;
       -ms-transition:  width .2s ease-in;
            transition: width .2s ease-in;

}

.sidebar-nav li a {
    display: block;
    color: #ddd;
    text-decoration: none;
    padding: 15px 15px 15px 30px !important;    
    font-size:20px;
    text-align:left;
}

.sidebar-nav li a:hover,
.sidebar-nav li a:active,
.sidebar-nav li a:focus,
.sidebar-nav li.open a:hover,
.sidebar-nav li.open a:active,
.sidebar-nav li.open a:focus{
    color: #fff;
    text-decoration: none;
    background-color: transparent;
}
.sidebar-header {
    text-align: center;
    font-size: 20px;
    position: relative;
    width: 100%;
    display: inline-block;
}
.sidebar-brand {
    height: 65px;
    position: relative;
    // background:#212531;
    background: #9abebf;
   padding-top: 1em;
}
.sidebar-brand a {
    color: #ddd;
}
.sidebar-brand a:hover {
    color: #fff;
    text-decoration: none;
}
.dropdown-header {
    text-align: center;
    font-size: 1em;
    color: #ddd;
    background:#212531;
    background: linear-gradient(to right bottom, #2f3441 50%, #212531 50%);
}
.sidebar-nav .dropdown-menu {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 0;
    border: none;
    background-color: #222;
    box-shadow: none;
}
.dropdown-menu.show {
    top: 0;
}
/*Fontawesome icons*/
.nav.sidebar-nav li a::before {
    font-family: fontawesome;
    content: "\f12e";
    vertical-align: baseline;
    display: inline-block;
    padding-right: 5px;
}

a[aria-current="#products"]::before {
  content: "\f02d" !important;
}

a[aria-current="#employees"]::before {
  content: "\f508" !important;
  pointer-events: none;
  cursor: default;
  text-decoration: none;
}

a[aria-current="#logout"]::before {
  content: "\f2f5" !important;
  pointer-events: none;
  cursor: default;
  text-decoration: none;
}

a[aria-current="#newsletter"]::before {
  content: "\f0e0" !important;
  pointer-events: none;
  cursor: default;
  text-decoration: none;
}

a[aria-current="#feedback"]::before {
  content: "\f086" !important;
  pointer-events: none;
  cursor: default;
  text-decoration: none;
}

a[aria-current="#specialOffers"]::before {
  content: "\f2b5" !important;
  pointer-events: none;
  cursor: default;
  text-decoration: none;
}




/*-------------------------------*/
/*       Hamburger-Cross         */
/*-------------------------------*/

.hamburger {
  position: absolute;
  top: 20px;  
  z-index: 999;
  display: block;
  width: 32px;
  height: 32px;
  margin-left: 15px;
  background: transparent;
  border: none;
}
.hamburger:hover,
.hamburger:focus,
.hamburger:active {
  outline: none;
}
.hamburger.is-closed:before {
  content: '';
  display: block;
  width: 100px;
  font-size: 14px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  opacity: 0;
  -webkit-transform: translate3d(0,0,0);
  -webkit-transition: all .35s ease-in-out;
}
.hamburger.is-closed:hover:before {
  opacity: 1;
  display: block;
  -webkit-transform: translate3d(-100px,0,0);
  -webkit-transition: all .35s ease-in-out;
}

.hamburger.is-closed .hamb-top,
.hamburger.is-closed .hamb-middle,
.hamburger.is-closed .hamb-bottom,
.hamburger.is-open .hamb-top,
.hamburger.is-open .hamb-middle,
.hamburger.is-open .hamb-bottom {
  position: absolute;
  left: 0;
  height: 4px;
  width: 100%;
}
.hamburger.is-closed .hamb-top,
.hamburger.is-closed .hamb-middle,
.hamburger.is-closed .hamb-bottom {
  background-color: #1a1a1a;
}
.hamburger.is-closed .hamb-top { 
  top: 5px; 
  -webkit-transition: all .35s ease-in-out;
}
.hamburger.is-closed .hamb-middle {
  top: 50%;
  margin-top: -2px;
}
.hamburger.is-closed .hamb-bottom {
  bottom: 5px;  
  -webkit-transition: all .35s ease-in-out;
}

// .hamburger.is-closed:hover .hamb-top {
//   top: 0;
//   -webkit-transition: all .35s ease-in-out;
// }
// .hamburger.is-closed:hover .hamb-bottom {
//   bottom: 0;
//   -webkit-transition: all .35s ease-in-out;
// }
.hamburger.is-open .hamb-top,
.hamburger.is-open .hamb-middle,
.hamburger.is-open .hamb-bottom {
  background-color: #1a1a1a;
}
.hamburger.is-open .hamb-top,
.hamburger.is-open .hamb-bottom {
  top: 50%;
  margin-top: -2px;  
}
.hamburger.is-open .hamb-top { 
  -webkit-transform: rotate(45deg);
  -webkit-transition: -webkit-transform .2s cubic-bezier(.73,1,.28,.08);
}
.hamburger.is-open .hamb-middle { display: none; }
.hamburger.is-open .hamb-bottom {
  -webkit-transform: rotate(-45deg);
  -webkit-transition: -webkit-transform .2s cubic-bezier(.73,1,.28,.08);
}
.hamburger.is-open:before {
  content: '';
  display: block;
  width: 100px;
  font-size: 14px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  opacity: 0;
  -webkit-transform: translate3d(0,0,0);
  -webkit-transition: all .35s ease-in-out;
}
.hamburger.is-open:hover:before {
  opacity: 1;
  display: block;
  -webkit-transform: translate3d(-100px,0,0);
  -webkit-transition: all .35s ease-in-out;
}

/*-------------------------------*/
/*            Overlay            */
/*-------------------------------*/



#logoTopRight{
    position: absolute;
    right: 10px;
    height: 50px;
    width: 200px;
    top: 10px;
}


@media(min-width:900px){
    .sidebar-nav li a {
    display: block;
    color: #ddd;
    text-decoration: none;
    padding: 15px 15px 15px 30px !important;    
    font-size:25x;
}
}
</style>