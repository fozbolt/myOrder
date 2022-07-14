<template>
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
        <div id="filter">
            <div id="type" @click="selectType($event)">
              <button id="food" v-bind:class="{ foodActive: isFood }" class="square" @click="fn">
                <h5 class="type-item">FOOD</h5>
              </button>
              <button id="drink" v-bind:class="{ drinkActive: isDrink }">
                <h5 class="type-item">DRINK</h5>
              </button>
            </div>
            <div id="category"  @click="selectCategory($event)">
              <button id="appetizer" ref="appetizer">
                <h6 class="category-item"><b>Appetizer</b></h6>
              </button>
              <button id="mainCourse" ref="mainCourse">
                <h6 class="category-item"><b>Main course</b></h6>
              </button>
              <button id="dessert" ref="dessert">
                <h6 class="category-item"><b>Dessert</b></h6>
              </button>
            </div>

            <ScrollingTabs/>   
        </div>
</template>


<script>

import ScrollingTabs from '@/components/ScrollingTabs';
import store from '@/store.js'
import * as $ from 'jquery';

export default {
  name: 'FoodList',
  components: {
    ScrollingTabs
},
    data() { 
        return {
            store,
            isDrink: false,
            isFood: true
        }
    },

    methods:{
      selectType (event) {
        let currentType = this.store.type;
        this.store.type = event.target.innerHTML;

        //toggle active type
        if (currentType !== this.store.type){
          this.isFood = !this.isFood;
          this.isDrink = !this.isDrink
        }
        
      },
      selectCategory (event) {
        this.store.category = event.target.innerHTML;

        //privremeno rješenje za razmak
        if (event.target.innerHTML === 'Main course') this.store.category = 'MainCourse'

        //toggle active type - NEEDS REFACTORING
        if (this.store.category == 'Appetizer'){
          this.$refs.appetizer.style.color = '#0078D4';
          this.$refs.mainCourse.style.color = 'black';
          this.$refs.dessert.style.color = 'black';
        }
        else if(this.store.category == 'MainCourse'){
          this.$refs.appetizer.style.color = 'black';
          this.$refs.mainCourse.style.color = '#0078D4';
          this.$refs.dessert.style.color = 'black';
        }
        else if(this.store.category == 'Dessert'){
          this.$refs.appetizer.style.color = 'black';
          this.$refs.mainCourse.style.color = 'black';
          this.$refs.dessert.style.color = '#0078D4';
        }
      },

      fn(){
        var square = document.querySelector(".square");
        square.addEventListener("click", function(e) {
        e.preventDefault;

        square.classList.remove("animated");

        void square.offsetWidth;

        square.classList.add("animated");
        
            navigator.vibrate(100);
    }, false);
      }

    
    }

}
</script>


<style lang="scss">

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
   font-family: 'IM FELL French Canon SC';
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
  font-size: 22px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
}



#category{
  width: 100%;
  height: 35px;
  text-align: center;
}


.category-item{
  width: fit-content;
  margin: 5px;
  padding:5px;
  display: inline-block; /*when inline you can use text-align on parent */
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

//fora simulira klik - koristiti drugdje
// #food:active {
//   border: none;
//   color: #0078D4 !important;
//   background: transparent;
// }

//a ovo na webu
// #food:hover {
//   border: none;
//   color: #0078D4 !important;
//   background: transparent;
// }


// .i-am-active {
//   color: #0078D4;
// }


#type > button, #category > button{
    background-color: white;
    border:none;
    //border-bottom: 1.11765px solid #0078D4; //ukljuciti samo ovu i prvu liniju za fora effect buttton bordera (piramida)
}

#mainCourse {
  color: #0078D4;
  border-bottom: 1.11765px solid #0078D4;
}


.foodActive{
  color: #0078D4;
  border-bottom: 1.11765px solid #0078D4 !important;
}

.drinkActive{
  color: #0078D4;
  border-bottom: 1.11765px solid #0078D4 !important;
}


//animation: https://codepen.io/klebinhopk/details/OGMdOY
.square {
    cursor: pointer;
    
    &.animated {
        animation: pulse 0.7s;
    }
}

@keyframes pulse {
    0% {
        box-shadow: 0px 0px 0px 0px rgba(35, 130, 220,1);
    }
    100% {
        box-shadow: 0px 0px 0px 2px rgba(35, 130, 220,0);
    }
}


</style>