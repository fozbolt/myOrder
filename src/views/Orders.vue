
<template>
    <div>
      <div id="food-list-content" ref="foodListContent">
            <div id="search-field">
              <input 
                    v-model="store.searchText" 
                    type="text"  
                    id="header-search" 
                    />
              <svg id="search-icon" class="search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </div>
            <div id="filter" class="funkyFont">
                <div id="type" >
                  <button id="food" @click="selectType($event)" v-bind:class="{ foodActive: store.isFood }" class="square">
                    <h5 class="type-item">Food</h5>
                  </button>
                  <button id="drink" @click="selectType($event)" v-bind:class="{ drinkActive: store.isDrink }" class="square" >
                    <h5 class="type-item">Drink</h5>
                  </button>
                </div>
                <CurrentTabOrders/>
            </div>
          
      </div>
      <Footer></Footer>
  </div>
</template>


<script>

import store from '@/store.js'
import Footer from '@/components/Footer.vue';
import CurrentTabOrders from '@/components/waiter/CurrentTabOrders.vue';


export default {
  name: 'Orders',
  components: {
    Footer,
    CurrentTabOrders
},
    data() { 
        return {
            store,
        }
    },



    mounted(){
      //hardcoded await for fetching cards so we can ge row height
      if (window.innerWidth < 1199){
          setTimeout(()=>{
            //this overrides #food-list-content
            this.$refs.foodListContent.style.minHeight = `${this.store.clientHeightRow + 250}px`
        },3000)
      }

      document.getElementById(this.store.type.toLowerCase()).style.color="#0078D4";
    },

 
    methods:{
      selectType (event) {
        let currentType = this.store.type;
        let elementText = event.target.textContent

        //toggle active color
        document.getElementById(this.store.type.toLowerCase()).style.color="black";
        this.store.type = elementText[0].toUpperCase() + elementText.slice(1).toLowerCase();
        document.getElementById(this.store.type.toLowerCase()).style.color="#0078D4";
  
        //toggle active type class
        if (currentType !== this.store.type){
          this.store.isFood = !this.store.isFood;
          this.store.isDrink = !this.store.isDrink
        }

        
      },
    },


    // watch: {
    //    'store.type': {
    //      handler: async function() {
          
    //        this.store.selected_order_status = 'ordered|ready to take over';
    //    }
    //   },
    // },



    beforeUnmount(){
      this.store.type='Food'
      this.store.category = 'MainCourse'
      this.store.selectedSubCategory = 'All'
      this.store.isFood = true
      this.store.isDrink= false
    },



}
</script>


<style lang="scss" scoped>

#food-list-content{
  min-height: 100vh;
}

.row*{
  margin-left:0px; 
  margin-right:0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;

}

//search
#search-field{
  width: 100%;
  background: rgba(196, 196, 196, 0.15); 

}

#header-search {
  display: inline-block; 
  width: 95%; 
  height: 32px;  color: black; 
  border: none; 
  outline: none;
  background:transparent;
  font-size: 12pt; 
  padding: 4px 28px 4px 20px; 
  vertical-align: middle;
}
#search-icon {
  position: relative; 
  right: 5px;
  fill: gray; 
  width: 5%; 
  height: 24px;
  vertical-align: middle; 
  cursor: pointer;
}

#filter{
   width: 100%; 
   height: 150px;
}


#type{
  width: 100%;
  height: 40px;
  text-align: center;
  margin-top: 10px;
}



.type-item{
  width: fit-content;
  margin: 5px 5px -2px 5px; //change this for changing bottom border on food and drink
  padding:5px 5px 0px 5px;
  display: inline-block; /*when inline you can use text-align on parent */
  font-weight: 400;
  font-size: 25px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
}



.category{
  width: 100%;
  height: 35px;
  text-align: center;
}


.category-item{
  width: fit-content;
  margin: 5px 2px;
  padding:5px 10px;
  display: inline-block; /*when inline you can use text-align on parent */
  font-weight: bold;
}



#sub-category{
  width: 100%;
  height: fit-content;
  text-align: center;
  border-style: solid;
  border-color: #B8A929;
  border-width: 1px 0 1px 0;
}


.sub-category-item{
  display: inline-block; /*when inline you can use text-align on parent */
  width: fit-content;
  padding: 2px 12px;
  margin: 0px;

}

//fora simulira malo klik
#food:active {
  border: none;
  color: #0078D4 !important;
  background: transparent;
}



#type > button, .category > button{
    background-color: white;
    border:none;
    //border-bottom: 1.11765px solid #0078D4; //ukljuciti samo ovu i prvu liniju za fora effect buttton bordera (piramida)
}

#mainCourse {
  color: #0078D4;
}


.foodActive{
  color: #0078D4;
  border-bottom: 1.11765px solid #0078D4 !important;
}

.drinkActive{
  color: #0078D4;
  border-bottom: 1.11765px solid #0078D4 !important;
}


@media(max-width:500px){
  #food-list-content{
  min-height: 180vh
  }
}


@media(min-width: 1200px){

  .type-item{
    font-size: 2vw;
  }

  .category-item{
    font-size: 1.25vw;
  }

  .category{
    height: 3.5vh;
  }

  #type{
    margin-top: 20px;
  }
}
</style>