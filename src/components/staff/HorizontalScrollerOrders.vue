<template>
    <div class="container">
        <nav class="nav nav-tabs list mt-2" id="myTab" role="tablist">
            <ul  
              class="nav nav-tabs" 
              id="tabs" 
              @click="selectValue($event)" 
              >
                <li v-for="(status, index) in orderStatusTypes" :key="index">
                    <a  
                      v-bind="getDataAttr(index, status)" 
                      class="nav-item nav-link pointer"  
                      :class="{ active: status.toLowerCase() === store.selected_order_status.toLowerCase()}"
                      role="tab"   data-bs-toggle="tab" aria-controls="public" aria-expanded="true"
                      >
                      {{status}}
                      <span v-if="takeover && status===currStatus && chosenType === store.type" id="circle"></span>
                    </a>
                    
                </li>
            </ul> 
        </nav>
    </div>

</template>

<script>

import store from '@/store.js'
import { Orders } from '@/services';

export default {
    name: 'HorizontalScrollerOrders', 

    data() { 
        return {
            store,
            orderStatusTypes: [],
            takeover: undefined,
            chosenType: undefined,
            currStatus: undefined
        }
    },

     methods:{
        selectValue (event) {
            //otherwise it consumes nearby elements - resolve later
            this.store.selected_order_status = event.target.textContent
        },
       
       getDataAttr(index) {
          return {
            'data-bs-target': '#tab' + index,
          }
      },


      toggleActiveSubCategory(){
        setTimeout(() => {
            document.querySelectorAll('.pointer').forEach(function(categoryBtn) {
      
                      if (categoryBtn.textContent === store.selected_order_status || categoryBtn.textContent.slice(0, -1) === store.selected_order_status){
                          categoryBtn.style.color = '#0078D4'
                      }  
                      else{
                          categoryBtn.style.color = 'black'
                      }
                  });

        }, 100)
      },

      async setInterfaceData(currStatus){
        if (this.store.userType === 'waiter'){
            this.takeover = await Orders.fetchOrders(this.store.searchText, this.store.type, currStatus );

            if (this.takeover[0].orderInfo.foodStatus) this.chosenType = 'Food';
            else if (this.takeover[0].orderInfo.drinkStatus) this.chosenType = 'Drink';
        }
        else if(this.store.userType === 'barman'){
            this.takeover = await Orders.fetchOrders(this.store.searchText, 'Drink', currStatus);
            this.chosenType = 'Drink'

        }
        else if(this.store.userType === 'chef'){
            this.takeover = await Orders.fetchOrders(this.store.searchText, 'Food', currStatus);
            this.chosenType = 'Food'
        }
        
        this.currStatus = currStatus;
      }


       
    },


    async beforeMount(){
        this.orderStatusTypes =  await Orders.getOrderStatusTypes();
    },


    created(){ 
        if (this.store.userType === 'waiter')   this.setInterfaceData('ready|waiting to be served');
        else  this.setInterfaceData('ordered|ready to take over');
    },


    mounted(){
      document.getElementById('tabs').scrollLeft += 20;
    },


    watch:{
        'store.type': {
          handler: async function(newValue) {
            this.store.selected_order_status = 'ordered|ready to take over'
            this.toggleActiveSubCategory(); 

           
      }
     },

        'store.selected_order_status': {
          handler: async function(newValue) {
          
            this.toggleActiveSubCategory();
      }
     },
    }

   

}
 

</script>
 


<style lang="scss" scoped>

.container{
  padding-left: 0px;
  padding-right: 0px;
}


.nav-tabs {
  display: inline-flex;
  justify-content:left ;
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
  margin-bottom: 1px;
  margin-top: 1px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  --bs-nav-tabs-link-active-color: #0078D4;

  //--bs-nav-tabs-border-color: #dee2e6;
  // --bs-nav-tabs-border-radius: 0.375rem;
  // --bs-nav-tabs-link-hover-border-color: #e9ecef #e9ecef #dee2e6;
  //--bs-nav-tabs-link-active-bg: #fff;
  //--bs-nav-tabs-link-active-border-color: #dee2e6 #dee2e6 #fff;
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



#circle{
  height: 10px;
  width: 10px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  position:absolute;
  top:5px;
}


@media (max-width:600px){
  ul > li:first-of-type{
    margin-left:0vw;
  }
}


@media (min-width:767px){
 .nav-tabs{
  width:600px;
  align-items: center;
  justify-content: left;


 }
}


@media(min-width: 1200px){
  .nav-item{
    font-size:1vw;
  }

  ul{
    width:90% !important;
  }
  #tabs{
    width:100% !important;
  }

  .list{
    width:70%;
  }
}
</style>