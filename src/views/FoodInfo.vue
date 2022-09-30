<template > 
    <div>
        <div v-if="card" id="contentHolder">
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="basicToast" ref="basicToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header text-light">
                        <img id="successIcon" src="@/assets/successIcon.png"/>
                        <!-- <i class="fa-regular fa-circle-check fa-bounce"></i> -->
                        <h6 class="my-0">{{this.card.name}} added to cart</h6>
                    </div>
                </div>  
            </div>
            <div id="imageZoomableDiv" oncontextmenu="return false;">
                <span v-if="card.discount" class="circle-left">
                    <b>{{card.discount}}</b> 
                    <small>OFF</small>
                </span>
                <span id="circle-right" class="funkyFont">
                    {{constPrice}}$
                </span>
                
                <img 
                    @mousedown="button_z_index = 'hidden'" 
                    @mouseup="button_z_index = 'visible'" 
                    id="mainFoodImg" 
                    :src="card.url || '@/assets/foodInfo.jpg'" 
                    alt="foodInfoImage"
                />
            </div>
            <button @click="$router.push({ path: '/food_list' })" :style="{ 'visibility': button_z_index }" id="circle-bottom">
                    <img id="backIcon" src="@/assets/backIcon.png" />
            </button>

            <div id="positionDiv">
                <div id="contentInfoDiv">
                <div id="titleDiv">
                    <h5>
                        <!-- A LA MEAL IN A SOUSAGE PARLOR -->
                        {{this.card.name}}
                    </h5>
                </div>
                <div id="ingredients"> {{ card.ingredients || defaultIngredients}}</div>
                <div id="clockDiv">
                    <img src="@/assets/clockIcon.svg" alt="" id="clockIcon">
                    <small ><b> {{card.cookingTime || defaultCookingTime}}</b></small>
                </div>

                <button  v-if="card.type.toLowerCase()==='food'" @click="toggleCollapsible" class="collapsible" ref="collapsible">Choose additions</button>
                <div v-if="card.type.toLowerCase()==='food'" class="content">
                    <div v-for="(value, key, index) in additions" class="form-check" v-bind:style= "[index===additions.length-1 ? {'border-bottom':'black solid 1px'} : {}]" :key="index" >
                        <input :value="index" v-model="checkedPrices" class="form-check-input" type="checkbox" id="flexCheckDefault" >
                        <label class="form-check-label" for="flexCheckDefault">
                            {{key}}
                        </label>
                        <small >
                            {{value}} $
                        </small>
                    </div>
                    <span >Total: {{ sum }}$</span>
                </div>

                <div id="details" >
                    <h4>Description</h4>
                    <p>
                        {{card.description || defaultDescription}}
                    </p>

                    <h4>Nutrition Facts</h4>
                    <div id="nutritionDiv">
                        <table>
                            <tr>
                                <th>Energy value</th>
                                <th>{{this.card.energy_value || '1200'}} kcal</th>
                            </tr>
                            <tr>
                                <td>Carbohydrates</td>
                                <td>{{this.card.carbohydrates || '110'}} g</td>
                            </tr>
                            <tr>
                                <td>Protein</td>
                                <td>{{this.card.protein || '20'}} g</td>
                            </tr>
                            <tr>
                                <td>Fat</td>
                                <td>{{this.card.fat || '55'}} g</td>
                            </tr>
                            <tr>
                                <td>Vitamin A</td>
                                <td>{{this.card.vitamin_a || '1230'}} mg</td>
                            </tr>
                            <tr>
                                <td>Vitamin C</td>
                                <td>{{this.card.vitamin_c || '220'}} mg</td>
                            </tr>
                            <tr>
                                <td>Calcium</td>
                                <td>{{this.card.calcium || '20'}} mg</td>
                            </tr>
                            <tr>
                                <td>Zinc</td>
                                <td>{{this.card.zinc|| '10'}} mg</td>
                            </tr>
                        </table>
                    </div>

                </div>

                <div id="buttonRow">
                    <button  @click="addToCart" id="addToCartBtn" ref="addToCartBtn" class="btn btn-primary funkyFont">Add to cart</button>
                    <button  @click="goToCheckout" class="btn btn-primary funkyFont">Checkout</button>
                </div>

                <div id="similarMealsDiv"> <!-- ne prikazuj ovo ako nema bar jedan meal u toj kategoriji - još doraditi -->
                    <h4 v-if="store.type.toLowerCase() === 'food'">Similar meals</h4>
                    <h4 v-else>Similar driks</h4>
                    <Slider :productInfo ="card"/> 
                </div>

             </div>
            </div>
        </div>
        
        <div v-else>
            Couldn't load item info.
        </div>
        <Footer></Footer>
        <FloatingMenu></FloatingMenu>
    </div>
</template>

<script>
import Card from '@/components/ProductCard.vue';
import store from '@/store.js';
import { Products } from '@/services';
import Slider from '@/components/Slider.vue'
import Footer from '@/components/Footer.vue';
import _ from 'lodash';
import FloatingMenu from '@/components/FloatingMenu.vue';


export default {
    props: ['id'],
    name: 'FoodInfo',
    components: {
    Card,
    Slider,
    Footer,
    FloatingMenu
    },

    data() {
        return {
            store,
            card: null,
            cart: [],
            constPrice: undefined,
            checkedPrices: [0],
            button_z_index: 'visible',
            additions: {
                'No additions': 0, 
                'Ketchup': 2, 
                'Ajvar': 3, 
                'Mayonnaise': 3, 
                'Extra cheese': 2, 
                'Oregano': 0.5, 
                'Special souce': 1
            },
            additionsSum: 0,
            defaultIngredients: 'tomatoes, cheese, ham, mushrooms, artichokes, capers, garlic, olives, oregano',
            defaultCookingTime: '25-35',
            defaultDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate'

        };
    },
    async mounted() {
        this.card = await Products.getOne(this.id);
        this.cart = JSON.parse(localStorage.getItem('cart')); 
        this.constPrice = this.card.price
        

        if (!Array.isArray(this.cart)) this.cart = []
            

         setTimeout(() => {
            if(store.type.toLowerCase()==='food'){
                this.toggleCollapsible()    
            } 
           
            this.adjustResponsiveness()
            
        }, 1000)

               
        
    },
   
    methods:{
        addToCart(){
            this.cart = JSON.parse(localStorage.getItem('cart')); 
            this.card.additions = this.checkedPrices.map(value => Object.keys(this.additions)[value]);
            this.card.price = Number(this.card.price) + Number(this.additionsSum);
  
            this.adjustID()
         
            //check if item already in cart (must have same additions)
            let foundIndex = null
            
            this.cart.forEach((item,index) => { 
                if(item._id === this.card._id && _.isEqual(item.additions.sort(), this.card.additions.sort()) && item.additions.length === this.card.additions.length){
                    foundIndex = index
                } 
            });


            if(foundIndex !== null){
                this.cart[foundIndex].quantity++;  
            }
            else{
                this.card.quantity = 1
                this.cart.push(this.card)
            }

            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.checkedPrices = [0];
            this.card.price = this.constPrice;

            //show success notification
            let button = this.$refs['basicToast']
            new bootstrap.Toast(button).show();

        },

        adjustID(){
            if(this.card.id){
                this.card._id = this.card.id;
                delete this.card.id
            }
        },


        goToCheckout(){
            this.$router.push({ path: '/checkout' });
        },

        toggleCollapsible(){
            let button = this.$refs['collapsible']
            try{
                button.classList.toggle('dropdownActive')
            
                let content = button.nextElementSibling;
                    if (content.style.maxHeight){
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }     
            }catch(err){}
            
        },


        adjustResponsiveness(){
            //bad idea - needs refactoring
            let box = document.querySelector('#titleDiv');
            let height = box.offsetHeight;
            if (height > 80) document.querySelector('#ingredients').style.paddingTop  = '20px'
        },



    },

     computed: {
        sum() {
            if (this.checkedPrices[this.checkedPrices.length - 1] === 0 ) {
                this.checkedPrices = [0]           //if last chosen element is "no additions" -> reset array
            }
            else if (this.checkedPrices.includes(0) ) {
                 this.checkedPrices = this.checkedPrices.filter(price => price != 0) //else fill array with more choices
            }
            else if ( this.checkedPrices.length === 0) this.checkedPrices = [0] //dont allow all checkboxes to be unchecked
           
           
            let filteredPrices = this.checkedPrices.map(value => Object.values(this.additions)[value]);
            this.additionsSum = filteredPrices.reduce((a, b) => a + b, 0)
            return this.additionsSum
           
        }
    },

  

};
</script>

<style lang="scss" scoped>

#imageZoomableDiv{
    position:relative;
}

button {
    margin-bottom: 20px;
}

#mainFoodImg{
    width: 100%;
    height: 400px;
}



#imageZoomableDiv:active{
     z-index: 10 !important;

     #circle-bottom{
        display:none;
     }
}



#contentInfoDiv{
    position:relative;
    //top:250px; treba biti da pokrije div sliku
    z-index: 2;
    width: 100%;
    min-height: fit-content;
    background-color: white;
    padding-top: 55px;
    text-align: center;
}

#positionDiv{
    position:absolute;
    top:250px;
    width:100%;
}

#circle-left > b{
    font-size:20px;
}

#circle-left > small {
    font-size:12px;
}


#circle-right {
  position: absolute;
  right: 0px;
  width: 70px;
  height: 40px;
  font-size:22px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 0 0 0 20px;
  background: #74CF55;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

#circle-left {
  position: absolute;
  left: 0px;
  width: 60px;
  height: 35px;
  -webkit-border-radius: 0px 20px 2px 0px;
  -moz-border-radius: 0px 20px 2px;
  border-radius: 0px 0px 20px 0px;
  background: #CF4F4F;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  line-height: 120%;
}


#circle-bottom {
  position: absolute;
  top: 220px;
  left: 0px;
  width: 45px;
  height: 35px;
  -webkit-border-radius: 0px 20px 2px 0px;
  -moz-border-radius: 0px 20px 2px;
  border-radius: 0px 17.5px 0px 0px;
  border:none;
  background: white;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  line-height: 120%;
  z-index:1;
  text-align: center;
}


#backIcon{
    position: relative;
    left:5px;
    width: 25px;
    height: 15px;
}


#titleDiv {
  position: absolute;
  top: -45px;
  width: 148px;
  min-height: 80px;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  -webkit-border-radius: 0px 20px 2px 0px;
  -moz-border-radius: 0px 20px 2px;
  border-radius: 5px;
  border:none;
  background: #B8A929   ;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  line-height: 120%;
  z-index:200;
  text-align: center;
  color:white;
}

#titleDiv > h5{
    font-weight: 100;
    margin-top:4px;
    font-family:'IMFellFrenchCanonSC-Regular';
    font-size:1.5rem
}

#ingredients{
    color: gray;
    // font-weight: lighter;
    font-size: 14px;
    width: 80%;
    margin: auto;
}


//source: https://www.w3schools.com/howto/howto_js_collapsible.asp
.collapsible {
  background-color: white;
  color: black;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 18px;
  margin-bottom:0px;
  font-weight: bold;
  margin-top: 50px;

}



.dropdownActive, .collapsible:hover {
  background-color: white;
}

.collapsible:after {
  content: '\25BC'; // \002B' plus
  color: #B8A929;
  font-weight: bold;
  float: left;
  margin-right: 2px;
}

.dropdownActive:after {
  content: "\25B2"; // \2212 minus
}

.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
  background-color: white;
  text-align:left;
}

.form-check{
    text-align: left;
    border-bottom:0.5px dotted #e5dfdf;
}

.form-check > label{
   width: 85%;
}


table{
    border-collapse: collapse;
    width: 90%;
}

td, th {
    border: 1px solid #cacaca;
    text-align: left;
    padding: 8px;
    font-size: 15px;
}

th{
    background-color:#E8E8E8;
}


#clockDiv{
    display:block; 
    margin:10px;
}

small{
    color:black;
}

.form-check > small {
    color: gray;
    text-align: flex-end;
    padding: 0px 2.5px;
    width: 40px;
    display: inline-block;
}

#details{
    text-align:left; 
    padding-left: 10px; 
    margin-top: 80px; 
    padding-right: 10px;
}

#details > h4{
    color:#0078D4; 
    font-family:Galindo-Regular;
}

#details > p{
    font-size:14px; 
    text-align:left; 
    margin:10px 10px;  
    padding-bottom: 80px;
}

#nutritionDiv{
    display:flex; 
    justify-content: center; 
    margin:10px 0px 20px 0px
}

#similarMealsDiv{
    text-align:center; 
    margin-top:100px;
    margin-bottom:100px;
}


.toast-header{
    background-color: green;
    border-radius: 20px;
}

.toast-container {
    overflow: hidden;
    position: relative;
    z-index:16
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

#buttonRow{
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
    margin-top: 50px;
}

.btn{
    font-size:1.25rem;
}


#clockIcon{
    margin-right: 2px;
}

@keyframes example1 {
    0%   { 
    transform: translateX(200%); 		
    }
    100% { 
    transform: translateX(0%); 
    }
}


#contentHolder{
    position:relative;
}

@media (max-width:899px){
    #contentHolder{
        // useless with current page height because its same as Deskop view
        min-height:2000px;
    }
}


@media (min-width:900px){
 #contentHolder{ 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 600px;
  min-height:2000px;
 }

//  #circle-bottom{
//     top:220px;
//  }

}

</style>
