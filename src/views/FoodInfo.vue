<template>
    <div v-if="card" id="contentHolder">

        <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="basicToast" ref="basicToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header text-light">
                <img id="successIcon" src="@/assets/successIcon.png"/>
                <!-- <i class="fa-regular fa-circle-check fa-bounce"></i> -->
                <h6 class="my-0">{{this.card.name}} added to cart</h6>
            </div>
            <!-- <div class="toast-body">
            I'll leave this body if needed later
            </div> -->
        </div>  
        </div>

        <div id="imageZoomableDiv">
            <span id="circle-left">
                    <small><b>40%</b><br/>OFF</small>
            </span>
            <span id="circle-right">
                {{this.card.price}}$
            </span>
            <button @click="this.$router.go(-1)" :style="{ 'visibility': button_z_index }" id="circle-bottom">
                <img id="backIcon" src="@/assets/backIcon.png" />
            </button>
            <img @mousedown="button_z_index = 'hidden'" @mouseup="button_z_index = 'visible'" id="mainFoodImg" src="@/assets/foodInfo.jpg" alt="foodInfoImage"/>
        </div>
        <div id="positionDiv">
            <div id="contentInfoDiv">
            <div id="titleDiv">
                <h5>
                    <!-- A LA MEAL IN A SOUSAGE PARLOR -->
                    {{this.card.name}}
                </h5>
            </div>
            <div id="ingredients">tomatoes, cheese, ham, mushrooms, artichokes, capers, garlic, olives, oregano</div>
            <div id="clockDiv">
                <img src="@/assets/clockIcon.svg" alt="">
                <small ><b> 25-35 min</b></small>
            </div>

        <button  v-if="store.type.toLowerCase()==='food'" @click="toggleCollapsible" class="collapsible" ref="collapsible">Choose additions</button>
            <div v-if="store.type.toLowerCase()==='food'" class="content">
                <div v-for="(addition,index) in additions" class="form-check" v-bind:style= "[index===additions.length-1 ? {'border-bottom':'black solid 1px'} : {}]" :key="index" >
                    <input :value="index" v-model="checkedPrices" class="form-check-input" type="checkbox" id="flexCheckDefault" >
                    <label class="form-check-label" for="flexCheckDefault">
                        {{addition}}
                    </label>
                    <small >
                        {{index}} $
                    </small>
                </div>
                <span >Total: {{ sum }}$</span>
            </div>

            <div id="details" >
                <h4>Description</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                </p>

                <h4>Nutrition Facts</h4>
                <div id="nutritionDiv">
                    <table>
                        <tr>
                            <th>Energy value</th>
                            <th>1000 kcal</th>
                        </tr>
                        <tr>
                            <td>Carbohydrates</td>
                            <td>100 g</td>
                        </tr>
                        <tr>
                            <td>Protein</td>
                            <td>20 g</td>
                        </tr>
                        <tr>
                            <td>Fat</td>
                            <td>30 g</td>
                        </tr>
                        <tr>
                            <td>Vitamin A</td>
                            <td>1230 mg</td>
                        </tr>
                        <tr>
                            <td>Vitamin C</td>
                            <td>220 mg</td>
                        </tr>
                        <tr>
                            <td>Calcium</td>
                            <td>20 mg</td>
                        </tr>
                        <tr>
                            <td>Zinc</td>
                            <td>30 mg</td>
                        </tr>
                    </table>
                </div>
                
            <div id="similarMealsDiv">
                <h4 v-if="store.type.toLowerCase() === 'food'">Similar meals</h4>
                <h4 v-else>Similar driks</h4>
                <!-- <Slider></Slider>     -->
            </div>

            </div>

        
            <button  @click="addToCart" id="addToCartBtn" ref="addToCartBtn" class="btn btn-primary">Add to cart</button>
            <button  @click="goToCheckout" class="btn btn-primary">Checkout</button>
            
            <div style="background-color:blueviolet; width:100%; height:400px;">Test div is it in the bottom</div>
            
        </div>

        
        </div>
   
    </div>
</template>

<script>
import Card from '@/components/Card.vue';
import store from '@/store.js';
import { Products } from '@/services';
import Slider from '@/components/Slider.vue'
import * as $ from 'jquery';

export default {
    props: ['id'],
    name: 'FoodInfo',
    components: {
    Card,
    Slider,
},
    data() {
        return {
            store,
            card: null,
            cart: [],
            additions: ['No additions', 'Ketchup', 'Ajvar', 'Majoneza', 'Extra sir', 'Origano', 'Specijalan umak'],
            checkedPrices: [0],
            button_z_index: 'visible'

        };
    },
    async mounted() {
        this.card = await Products.getOne(this.id);
        this.cart = JSON.parse(localStorage.getItem('cart')); 

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
            this.cart = this.cart || [];
            
            //check if item already in cart
            let foundIndex = null
            this.cart.forEach((item,index) => {    
                if(item.id === this.card.id) foundIndex = index
            });


            if(foundIndex !== null){
                this.cart[foundIndex].quantity++;  
            }
            else{
                this.card.quantity = 1
                this.cart.push(this.card)
            }

            localStorage.setItem('cart', JSON.stringify(this.cart));

            //show success notification
            let button = this.$refs['basicToast']
            new bootstrap.Toast(button).show();

        },

        goToCheckout(){
            this.$router.push({ path: '/checkout' });
        },

        toggleCollapsible(){
            let button = this.$refs['collapsible']
            button.classList.toggle('dropdownActive')
            
            let content = button.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }     
        },

        // toFront(){
        //     document.getElementById('circle-bottom').zIndex=-1;
        // },

        adjustResponsiveness(){
            //loša ideja- refaktorirati
            let box = document.querySelector('#titleDiv');
            let height = box.offsetHeight;
            if (height > 80) document.querySelector('#ingredients').style.paddingTop  = '20px'
        },



    },

     computed: {
        sum() {
            if (this.checkedPrices[this.checkedPrices.length - 1] === 0 && this.checkedPrices.length > 1 ) this.checkedPrices = [0] //if last chosen element is "no additions" -> reset array
            else if (this.checkedPrices.includes(0) ) this.checkedPrices = this.checkedPrices.filter(price => price != 0) //else fill array with more choices
           
                       
            //https://laracasts.com/discuss/channels/vue/vuejs-sum-checked-checkbox-value
            return this.checkedPrices.reduce(function (a, b) {
            return parseInt(a) + parseInt(b);
        }, 0);
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



#imageDiv:active{
     z-index: 3 !important;

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
}


#circle-right {
  position: absolute;
  right: 0px;
  width: 70px;
  height: 40px;
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
  top: 175px;
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
}

#ingredients{
    color: gray;
    font-weight: lighter;
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
}

.form-check > label{
   width: 90%;
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

.form-check-label > small {
    color:gray;
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
}


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

@keyframes example1 {
    0%   { 
    transform: translateX(200%); 		
    }
    100% { 
    transform: translateX(0%); 
    }
}


@media (min-width:900px){
 #contentHolder{
  position: absolute; 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 600px;
 }
}

</style>
