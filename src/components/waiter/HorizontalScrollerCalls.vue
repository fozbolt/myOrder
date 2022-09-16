<template>
    <div class="container">
        <nav class="nav nav-tabs list mt-2" id="myTab" role="tablist">
            <ul  
              class="nav nav-tabs" 
              @click="selectValue($event)" 
              >
                <li v-for="(status, index) in callStatusTypes" :key="index">
                    <a  
                      v-bind="getDataAttr(index, status)" 
                      class="nav-item nav-link pointer"  
                      :class="{ active: status.toLowerCase() === store.selected_call_status.toLowerCase()}"
                      role="tab"   data-bs-toggle="tab" aria-controls="public" aria-expanded="true"
                      >
                      {{status}}
                    </a>
                </li>
            </ul> 
        </nav>
    </div>

</template>

<script>

import _ from 'lodash';
import store from '@/store.js'

export default {
    name: 'HorizontalScrollerOrders',
    props: ['info'],  

    data() { 
        return {
            store,
            callStatusTypes: ['new', 'finished']
        }
    },

     methods:{
        selectValue (event) {
            this.store.selected_call_status = event.target.innerHTML;
        },
       
       getDataAttr(index) {
          return {
            'data-bs-target': '#tab' + index,
          }
      },

    },


   

}
 

</script>
 


<style lang="scss">

.container{
  padding-left: 0px;
  padding-right: 0px;
}

//izvor horizontal navbara: https://bootsnipp.com/snippets/bpP0r
.nav-tabs {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  z-index: 0;
  overflow-x: auto;
  -ms-overflow-style: none; /*// IE 10+*/
  overflow: -moz-scrollbars-none;/*// Firefox*/
  border-style: solid;
  border-color: #B8A929; 
  border-width: 0.5px 0 0.5px 0;
  margin: -3px 0 -3px 0;
  font-size:20px;
  background-color: none; // bila je ova i ona omogucava white overflow koji ce mi trebati background-color: var(--bs-nav-tabs-link-active-bg);
  --bs-nav-tabs-border-width: 0px;
  //--bs-nav-tabs-border-color: #dee2e6;
  // --bs-nav-tabs-border-radius: 0.375rem;
  // --bs-nav-tabs-link-hover-border-color: #e9ecef #e9ecef #dee2e6;
  --bs-nav-tabs-link-active-color: #0078D4;
  --bs-nav-tabs-link-active-border-color: #dee2e6 #dee2e6 #fff;
  --bs-nav-tabs-link-active-bg: none !important;
  //border-bottom: var(--bs-nav-tabs-border-width) solid var(--bs-nav-tabs-border-color);
}
.nav-tabs>li.active>a,
.nav-tabs>li.active>a:focus,
.nav-tabs>li.active>a:hover {
  border-width: 0;
}



.nav-tabs>li>a {
  width: max-content;
  border: none;
  color: black;
  font-weight: bold;
}


.nav-tabs>li.active>a,
.nav-tabs>li>a:hover {
  border: none;
  // color: #0078D4 !important; // ovo samo smeta posto imamo programski rjeseno
  background: transparent;
}
.nav-tabs>li>a::after {
  content: "";
  background: white; //digne malo active tab pa izgleda kao animacija - ako zelimo da dole nema obruba ovo bi trebalo spustiti
  height: 2px;
  position: absolute;
  width: 100%;
  left: 0px;
  bottom: 1px;
  transition: all 250ms ease 0s;
  transform: scale(0);
}
.nav-tabs>li.active>a::after,
.nav-tabs>li:hover>a::after {
  transform: scale(1);
}
.tab-nav>li>a::after {
  background: #21527d none repeat scroll 0% 0%;
  color: #fff;
}
.tab-pane {
  padding: 15px 0;
}
.tab-content {
    //promjena
  padding: 20px 1rem !important;
}

.nav-tabs::-webkit-scrollbar {
  display: none; /*Safari and Chrome*/
}
.tabCards {
  background: #FFF none repeat scroll 0% 0%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
  display: block;
}

.nav>li>a {
    position: relative;
    display: block;
    padding: 0px 17.5px;
    
}
.nav{
    flex-wrap: inherit; 
}

.navTabsAlign{
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-link{
  font-size: 20px;
}


.dummyDivNeededForSuspenseToWork {
  margin-top: 20px;
}



@media (min-width:767px){
 .nav-tabs{
  width:600px;
  align-items: center;
  justify-content: center;


 }
}


@media(min-width: 1200px){
  .nav-item{
    font-size:1vw;
  }

  ul{
    width:90% !important;
  }

  .list{
    width:70%;
  }
}
</style>