<!-- source: https://www.cssscript.com/material-design-style-radial-fab-menu-pure-css/ -->
<template>
<div class="wrapper">
  <input id="triggerButton" class="triggerButton" type="checkbox"  />
  <label for="triggerButton"></label>
  <div class="one fa fa-facebook"></div>
  <div class="two fa fa-solid fa-cart-plus"></div>
  <div class="three fa fa-phone"></div>
</div>

</template>
<script>
export default {
  name: 'FloatingMenu',

}

</script>


<style>
body {
 --l: 3.5em;
 /* overflow-x:hidden; */
}

.wrapper{
    width: fit-content;
    height: fit-content;
    position: fixed;
    right: 1em;
    bottom: 1em;
}


.triggerButton { 
    display: none;
}

.triggerButton + label {
  cursor: pointer;
  position: absolute;
  right: 0.5em;
  bottom: 0.5em;
  background-color:  #74CF55;
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
    /* font-size: 1em; */
    font-size: 25px;
    color: black;
    transition-property: all;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.one{
    left: 95%;
}

.two{
    left:50%;
    top: 1em;
}

.three{
    top: 1.5em;
}

.triggerButton:checked ~ .one, .triggerButton:checked ~ .two, .triggerButton:checked ~ .three { opacity: 1; }

.triggerButton:checked ~ .one {
  background-color: #74CF55;
  transform: translateX(-5em);
  transition-delay: .2s;
}

.triggerButton:checked ~ .two {
  background-color: #74CF55;
  transform: translateX(-3.5em) translateY(-3.5em);
  transition-delay: .1s;
}

.triggerButton:checked ~ .three {
  background-color:  #74CF55;
  transform: translateY(-5em);
}

.triggerButton:checked ~.one:hover, .triggerButton:checked ~ .two:hover, .triggerButton:checked ~ .three:hover { opacity: .9; }

.wrapper > label{
    position:fixed;
}

</style>


