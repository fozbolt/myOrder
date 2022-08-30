<!-- source: https://www.cssscript.com/material-design-style-radial-fab-menu-pure-css/ -->
<template>
  <div class="wrapper" ref="target" @click="showFloatingMenu">

    <!--toast-->
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="basicToast" ref="basicToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header text-light">
                <img id="successIcon" src="@/assets/successIcon.png"/>
                <!-- <i class="fa-regular fa-circle-check fa-bounce"></i> -->
                <h6 class="my-0">Waiter will be here in a moment</h6>
            </div>
            <!-- <div class="toast-body">
            I'll leave this body if needed later
            </div> -->
        </div>  
    </div>
  <!-- Modal -->
  <div class="modal fade" id="myModal" ref="alertModal" data-bs-backdrop="false" role="dialog">
    <div class="modal-dialog" id="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" id="modal-header">
          <h5 class="modal-title">Select reason for calling the waiter</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="modal-body">
          <!--https://stackoverflow.com/questions/3486110/make-a-list-item-clickable-html-css-->
          <div id="leftsideMenu">
            <ul style="list-style-type:none">
              <li v-for="reason in callReasons" :key="reason" @click="callWaiter(reason)" data-bs-dismiss="modal"><a>{{reason}}</a></li>
            </ul>
          </div>
        </div>
        <div class="modal-footer" id="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    
  <input id="triggerButton" class="triggerButton" type="checkbox"/>
  <label for="triggerButton"  ref="label" id="menuLabel"></label>

  <div class="one fa-solid fa-clipboard-question"  
      @click="$router.push({ path: `/order_status` })" 
      :style="$route.path === '/food_list' ? 'background-color:#5A5EB9' : 'background-color:#74CF55'">
  </div>
  <div class="two fa fa-solid fa-cart-plus" 
      @click="$router.push({ path: `/checkout` })" 
      :style="$route.path === '/food_list' ? 'background-color:#5A5EB9' : 'background-color:#74CF55'">
  </div>
  <div class="three fa fa-phone" 
      type="button" 
      data-bs-toggle="modal" 
      data-bs-target="#myModal" 
      :style="$route.path === '/food_list' ? 'background-color:#5A5EB9' : 'background-color:#74CF55'">
  </div>
</div>

</template>
<script>

import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

export default {
  name: 'FloatingMenu',
  data(){
    return{
      callReasons: ['Help while ordering', 'Order manually', 'Pay Bill', 'Complaint', 'Other']
    }
  },

  methods:{

    toggleModal(){
            //refactor and use refs
            $("#myWaiterModal").modal("toggle");
    },

    callWaiter(reason){
      //show success notification
      let button = this.$refs['basicToast']
      new bootstrap.Toast(button).show();
    },

    showFloatingMenu(){
       //to create effect that is behind landingImageDiv
      document.getElementsByClassName("wrapper")[0].style.zIndex = "20"
    }
 
  },

  mounted(){
    //change color when on this route to stand out more - can be done with inline style binding too
    if (this.$route.path === '/food_list') this.$refs.label.style.backgroundColor= '#5A5EB9';
  },

  setup() {
      const target = ref(null)
      onClickOutside(target, (event) => {
         //this is loaded before methods so I cant put this in hideFloatingMenu method
         document.getElementById("triggerButton").checked = false
         document.getElementsByClassName("wrapper")[0].style.zIndex = "10"
      })
      return { target }
  },

}

</script>


<style>
body {
 --l: 3.5em;
 /* overflow-x:hidden; */
}

.wrapper{
    width: 60px;
    height: 60px;
    position: fixed;
    right: 1em;
    bottom: 1em;
    z-index:10;
}


.triggerButton { 
    display: none;
}

#menuLabel{
  background-color:  #74CF55;
}

.triggerButton + label {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  /* background-color:  #74CF55; */
  height: var(--l);
  width: var(--l);
  border-radius: 50%;
  z-index: 2;
}

.triggerButton + label:before, .triggerButton + label:after {
  position: absolute;
  height: calc(var(--l) / 2 );
  display: flex;
  align-items: center;
  width: .25em;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transition: all .25s;
}

.triggerButton + label:before {
  height: calc(var(--l) / 2 );
  width: .25em;
}

.triggerButton + label:after {
  width: calc(var(--l) / 2 );
  height: .25em;
  left:2px;
  top: 7px !important;
  right: 2px;
  content: url('@/assets/FloatingMenuIcon.svg');
}

.triggerButton:checked + label:before { transform: rotatez(-45deg); }

.triggerButton:checked + label:after { transform: rotatez(-45deg); left:7.5px; bottom:2px; }

.one, .two, .three {
    cursor: pointer;
    position: relative;
    bottom: 10%;
    /* padding: 1.2em; */
    padding: 20px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    opacity: 0;
    z-index: 1;
    transform: rotateZ(90deg);
    font-size: 20px;
    color: black;
    transition-property: all;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #74CF55;
}

.one{
    right: -40px;
    bottom: -30px;
}

.two{
    right: -20px;
    top: 5px;
}

.three{
    right:-5px;
    bottom: 30px;
}

.triggerButton:checked ~ .one, .triggerButton:checked ~ .two, .triggerButton:checked ~ .three { opacity: 1; }

.triggerButton:checked ~ .one {
  transform: translateX(-5em);
  transition-delay: .2s;
}

.triggerButton:checked ~ .two {
  transform: translateX(-3.5em) translateY(-3.5em);
  transition-delay: .1s;
}

.triggerButton:checked ~ .three {
  transform: translateY(-5em);
}

.triggerButton:checked ~.one:hover, .triggerButton:checked ~ .two:hover, .triggerButton:checked ~ .three:hover { opacity: .9; }




/* callWaiter modal */
/* .modal-backdrop {
   z-index: -1;
}  */

#modal-dialog{
    top:50vw
}

#modal-body, #modal-footer{
    padding: 0;
    width: 100%;
    background: #7392ab;
}

#modal-header{
  background: #7392ab;
}

#modal-header > h5{
  color: white;
}

#leftsideMenu ul li {
  border-bottom: 1px solid lightgray;
  background-color: #94aabb
}

#leftsideMenu ul li a {
  padding: 8px 20px 8px 20px;
  color: white;
  display: block;
}

#leftsideMenu ul li a:hover {
  background-color: rgb(228, 228, 228);
  transition: 0.5s;
  padding-left: 30px;
  padding-right: 10px;
}

#leftsideMenu> ul{
  margin-bottom:0px;
  padding-left:0px;
}



/* toast */
.toast-header{
    background-color: green;
    border-radius: 20px;
}

.toast-container {
    overflow: hidden;
    position: relative;
    z-index:4
}
.toast-container > .toast {
    width: fit-content;
    height:fit-content;
    text-align: right;
    animation: example1 1s linear;
    background: none;
    border-radius:20px;
    border:none; 
}

#successIcon{
     width: 30px; 
     margin-right: 10px;
}



</style>


