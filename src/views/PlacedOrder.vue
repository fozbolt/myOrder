<template>
  <div>
    <div id="placed-order-content">
      <!-- Modal -->
          <div class="modal fade" id="finishModal" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="0" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog  modal-dialog-centered">
                  <!-- Modal content-->
                  <div class="modal-content">
                      <div class="modal-body">
                          <p>If you finish order you won't be able to see order status or access order again. Proceed?</p>
                      </div>
                      <div class="modal-footer" >
                          <button @click="finishOrder" type="button" class="btn btn-default" data-bs-dismiss="modal" >Yes</button>
                          <button type="button" class="btn btn-default" data-bs-dismiss="modal" >No</button>
                      </div>
                  </div>   
              </div>
          </div>


  <div id="funModeDiv">
      <div v-bind:class=" funMode ? 'slide-left corner-top' : 'corner-top funModeBtnStatic'">
        <label id="funModeLabel" v-bind:style=" funMode ? 'color:black' : 'color: white;' ">Fun mode</label>
        <label class="toggle-control">
            <!-- toggler source: https://codepen.io/garetmckinley/pen/YmxYZr -->
            <input type="checkbox"  @click="toggleFunMode">
            <span class="control"></span>
        </label>
      </div>
    </div>

    <div v-if="funMode" class="container">
        <div class="sketchfab-embed-wrapper"> 
          <!--model source: https://sketchfab.com/3d-models/classic-dinner-1ad30e0585f545229e5f8ffdb715f92f-->
          <iframe id="placedOrderFrame" title="Classic Dinner"  mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/1ad30e0585f545229e5f8ffdb715f92f/embed?autostart=1"> </iframe> 
        </div>
        <div id="placed-order-text">
          <p>
            Your order is finished. Hope you had a great time :)
          </p>
        </div>
        <div class="row" id="placed-order-buttons">
          <div class="col">
            <button type="button" class="slide-right left-top"  @click="$router.push({ path: '/order_status'})" >Order status</button>
            <button type="button" class="slide-right left-bottom" @click="$router.push({ path: '/order_details'})">Order details</button>
          </div>
          <div class="col">
            <button v-if="store.feedbackLeft === false" type="button" @click="$router.push({ path: '/order_feedback'})" class="slide-left right-top" >Leave feedback</button>
            <button v-else type="button"  disabled  @click="toggleTooltip"  data-bs-toggle="tooltip" data-bs-placement="top" title="Feedback already given" class="slide-left right-top">Leave feedback</button>
            <button type="button" class="slide-left right-bottom" @click="toggleModal">Finish order</button>
          </div>
        </div>
    </div>

    <div v-else class="container">
        <div  class="sketchfab-embed-wrapper"> 
        <img src="@/assets/funModeOff.jpg" alt="" style="width:100%; height:100vh;">
        </div>
        <div id="placed-order-text">
          <p>
            Your order is on the way. Hope you are having a great time :))
          </p>
        </div>
        <div class="row" id="placed-order-buttons">
          <div class="col">
            <button type="button"  id="left-top-static"  @click="$router.push({ path: '/order_status'})" >Order status</button>  
            <button type="button"  id="left-bottom-static" @click="$router.push({ path: '/order_details'})" >Order details</button>
          </div>
          <div class="col">
            <button v-if="store.feedbackLeft === false" type="button"  id="right-top-static" @click="$router.push({ path: '/order_feedback'})">Leave feedback</button>
            <button v-else type="button"  id="right-top-static" disabled @click="toggleTooltip"  data-bs-toggle="tooltip" data-bs-placement="top" title="This is a Tooltip">Leave feedback</button>
            <button type="button"  id="right-bottom-static"  @click="toggleModal">Finish order</button>
          </div>
        </div> 
    </div>
    
    </div>
    <Footer v-if="!funMode"/>
  </div>
</template>


<script>
import Footer from '@/components/Footer.vue';
import store from '@/store';



export default {
  name: 'App',
  components: {
    Footer
},
  data(){
        return{
            store,
            funMode: false
        }
  },

  methods:{
    toggleFunMode(){
      this.funMode = !this.funMode;
    },

    toggleModal(){
            //refactor and use refs
            $("#finishModal").modal("toggle");
    },

    finishOrder(){
      //delete localstorage and rest here
      this.store.feedbackLeft = false;

      this.$router.push({ path: `/finish_order` });
    },

    toggleTooltip(){
      $(function () {
            $('[data-bs-toggle="tooltip"]').tooltip()
          })
    }
  },

  mounted(){
      //initialize toggle - doesnt work in this view
      this.toggleTooltip();
  },

  created(){
    if(!Boolean( JSON.parse(localStorage.getItem('orderID') ))){
      this.$router.push({path: '/'})
    }
  }

}

</script>

<style lang="scss" scoped>

.sketchfab-embed-wrapper{
  position:absolute;
  top:0;
  left:0;
  width: 100%;
}

iframe {
    border: 0;
    width: 100%;
    height: 105vh;
}

.image-container__image{
  display:none;
}

#placed-order-text{
  position:absolute;
  top: 25vh;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 200px;
  backdrop-filter: blur(5px);
  box-shadow: 10px 20px 20px grey;
}


#placed-order-text > p{
  font-family: Inter;
  font-size: 32px;
  /* font-weight: 800; */
  font-weight: 400;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: center;
  color:white;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75); 
  /* -webkit-text-fill-color: white; Will override color (regardless of order) */
  /* -webkit-text-stroke-width: 1.5px; */
  /* -webkit-text-stroke-color: black;   */
  /* border: 3px solid #000000;*/

}


#placed-order-buttons{
  position:inherit;
  bottom: 0.5em;
  left:0;
  width:100%;
  height: 100px;
}


.col > button{
  line-height: normal;
  border:none;
  padding: 0;
  width: 112px;
  margin-bottom:10px;
  /* letter-spacing:0.25px; */
  /* font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px; */
}

#funModeDiv{
  position: absolute;
  top:50px;
  right:80px;
  z-index:1;
}

#funModeLabel{
  padding: 0 10px; 
  font-size:18px; 
  color:white;
}

//funMode off
#left-top-static{
  position:absolute;
  left: 1em;
  bottom:2em;
}

#left-bottom-static{
  position:absolute;
  left: 1em;
  bottom:0.1em;
}

#right-top-static{
  position:absolute;
  right: 1em;
  bottom:2em;
}

#right-bottom-static{
  position:absolute;
  right: 1em;
  bottom:0.1em;
}

.funModeBtnStatic{
  right: 1em !important;
}


// toggler source: https://codepen.io/garetmckinley/pen/YmxYZr

// Tweak these to change the style of the toggle
$toggle-background-color-on: dodgerblue;
$toggle-background-color-off: darkgray;
$toggle-control-color: white;
$toggle-width: 100px;
$toggle-height: 50px;
$toggle-gutter: 5px;
$toggle-radius: 50%;
$toggle-control-speed: .15s;
$toggle-control-ease: ease-in;

// These are our computed variables
// change at your own risk.
$toggle-radius: $toggle-height / 2;
$toggle-control-size: $toggle-height - ($toggle-gutter * 2);

.toggle-control {
  display: block;
  position: relative;
  padding-left: $toggle-width;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .control {
    background-color: $toggle-background-color-on;
    
    &:after {
      left: $toggle-width - $toggle-control-size - $toggle-gutter;
    }
  }

  .control {
    position: absolute;
    top: 0;
    left: 0;
    height: $toggle-height;
    width: $toggle-width;
    border-radius: $toggle-radius;
    background-color: $toggle-background-color-off;
    transition: background-color $toggle-control-speed $toggle-control-ease;

    &:after {
      content: "";
      position: absolute;
      left: $toggle-gutter;
      top: $toggle-gutter;
      width: $toggle-control-size;
      height: $toggle-control-size;
      border-radius: $toggle-radius;
      background: $toggle-control-color;
      transition: left $toggle-control-speed $toggle-control-ease;
    }
  }
}


@media (max-width:1199px){
  #funModeDiv {
      position: absolute;
      top: 55px;
      left:0;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      z-index: 1;
  }
  .toggle-control {
      display: inline;
      position: relative;
      padding-left: 45px;
      margin-bottom: 12px;
      cursor: pointer;
      /* height: 100px; */
      /* width: 100px; */
      font-size: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;

  }
  .toggle-control input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
  }

  .toggle-control .control {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 50px;
      border-radius: 25px;
      background-color: darkgray;
      transition: background-color 0.15s ease-in;
  }
  .toggle-control .control:after {
      content: "";
      position: absolute;
      left: 3px;
      top: 2.5px;
      width: 20px;
      height: 20px;
      border-radius: 25px;
      background: white;
      transition: left 0.15s ease-in;

  }

  .toggle-control input:checked ~ .control:after {
    left: 27px;
  }

}

//only for the buttons because they are the most critical and the worst responsive on the mid versions
@media (min-width:469px){
  .col {
  display: inline-grid;
  justify-content: center;
}

#placed-order-buttons {
    display: flex;
    width: 100%;
    justify-content: center;
}

.col > button{
    width: fit-content;
    font-size: 2em;
    /* letter-spacing: 0.25px; */
}
}

@media (min-width:1200px){

  #funModeLabel{
  padding: 0 10px; 
  font-size:2em;
  color:white;
}

  #placed-order-text {
    width: 20em;
}
  #placed-order-text > p{
      font-size: 4rem;
      line-height: 65px;
      letter-spacing: 0em;
      text-align: center;
  }


//fun mode toggler
 #funModeDiv {
      position: absolute;
      top: 60px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      z-index: 1;
  }
  .toggle-control {
      display: inline;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      /* height: 100px; */
      /* width: 100px; */
      font-size: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;

  }
  .toggle-control input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
  }

  .toggle-control .control {
      position: absolute;
      top: 0;
      left: 0;
      height: 50px;
      width: 100px;
      border-radius: 25px;
      background-color: darkgray;
      transition: background-color 0.15s ease-in;
  }
  .toggle-control .control:after {
      content: "";
      position: absolute;
      left: 5px;
      top: 5px;
      width: 40px;
      height: 40px;
      border-radius: 25px;
      background: white;
      transition: left 0.15s ease-in;

  }

  .toggle-control input:checked ~ .control:after {
    left: 55px;
  }

}





//button transitions source: http://jsfiddle.net/c2ub4m8L/1/
.corner-top{
  position:absolute;
  right: -300px;
  display:flex;
}

.left-top{
  position:absolute;
  left: -300px;
  bottom:2em;
}

.left-bottom{
  position:absolute;
  left: -300px;
  bottom:0.1em;
}

.right-top{
  position:absolute;
  right: -300px;
  bottom:2em;
}

.right-bottom{
  position:absolute;
  right: -300px;
  bottom:0.1em;
}

.slide-right {
    -webkit-animation: slide-right 3s forwards;
    -webkit-animation-delay: 10s;
    animation: slide-right 3s forwards;
    animation-delay: 6s;
    position: absolute;
}

@-webkit-keyframes slide-right {
    100% { left:1em; }
}


@keyframes slide-right {
    100% { left:1em; }
}


.slide-left {
   -webkit-animation: slide-left 3s forwards;
    -webkit-animation-delay: 10s;
    animation: slide-left 3s forwards;
    animation-delay: 6s;
    position: absolute;
}

@-webkit-keyframes slide-left {
    100% { right: 1em; }
}

@keyframes slide-left {
    100% { right: 1em}
}



//modal
.modal-footer{
    color:white; 
    width:100%;
}

.modal-footer > .btn{
    color:white; 
}

.modal-body > p{
    margin-bottom: 0;
}


#placed-order-content{
    min-width: 100vw;
    background: #1c1414;
    min-height: 100vh;
}




</style>
