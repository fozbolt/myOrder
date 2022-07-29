<template>
    <div v-if="card">
    <div id="imageDiv">
        <span id="circle-left">
                <small><b>40%</b><br/>OFF</small>
        </span>
        <span id="circle-right">
            {{this.card.price}}$
        </span>
        <button @click="this.$router.go(-1)" id="circle-bottom">
            <img id="backIcon" src="@/assets/backIcon.png" />
        </button>
        <img id="mainFoodImg" src="@/assets/foodInfo.jpg" alt="foodInfoImage"/>
    </div>
    
    <div id="contentDiv">
         <div id="titleDiv">
            <h5>
                A LA MEAL IN A SOUSAGE PARLOR
                {{this.card.name}}
            </h5>
        </div>
        <div id="ingredients">tomatoes, cheese, ham, mushrooms, artichokes, capers, garlic, olives, oregano</div>
     
        <button  @click="addToCart" class="btn btn-primary">Add to cart</button>
        <button  @click="goToCheckout" class="btn btn-primary">Checkout</button>
    </div>

    
    </div>
</template>

<script>
import Card from '@/components/Card.vue';
import store from '@/store.js';
import { Products } from '@/services';

export default {
    props: ['id'],
    data() {
        return {
            card: null,
            cart: []
        };
    },
    async mounted() {
        this.card = await Products.getOne(this.id);

        this.cart = JSON.parse(localStorage.getItem('cart'));
    },
    name: 'FoodInfo',
    components: {
        Card
    },
    methods:{
        addToCart(){
            this.cart = this.cart || [];
            this.cart.push(this.card)
            
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        goToCheckout(){
            this.$router.push({ path: '/checkout' });
        }
    }
};
</script>

<style lang="scss" scoped>
#imageDiv{
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
     z-index: 9999 !important;
}

#circle-bottom:active{
    & #imageDiv:active{
    z-index: -1 !important;
}
}
#contentDiv{
    position:absolute;
    top:250px;
    z-index: 100;
    width: 100%;
    height: 1200px;
    background-color: white;
    padding-top: 55px;
    text-align: center;
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
  z-index:100;
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

@media (min-width:900px){
 #imageDiv{
  position: absolute; 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
   width: 600px;
 }
}

</style>
