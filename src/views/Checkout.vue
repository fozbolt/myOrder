<template>
    <div id="checkoutContent" >
    
        <div class="row">
            <img id="checkoutGif" src="@\assets\checkoutGIF.gif" alt="">
            <button @click="this.$router.go(-1)"  id="circle-bottom-checkout">
            <img id="backIcon-checkout" src="@/assets/backIconBlue.png" />
        </button>
        </div>
        <div class="row" style="text-align:left; padding-left:15px;">
           <h5 style="margin:0px"><b>Checkout</b></h5>
           <small style="margin-left:10px;">{{'Table: 3'}}</small>
        </div>
        <div class="row">  
            <span v-if="cartItems===undefined || cartItems.length<1" style="padding:20px 0px;">No chosen items yet</span> 
            <CartItem v-else :key="card.id" 
                v-for="(card, index ) in cartItems" :info="card" 
                v-bind:style= "[index===cartItems.length-1 ? {'border-bottom':'black solid 1px'} : {}]"
                v-on:delete-item="deleteItem(index)"
            /> 
              <!-- <FooterTest />  -->
        </div>
        <div class="row" id="calculationDiv" style="margin: 0px 20px 10px 20px;">
            <div class="col">
                <!-- Empty half -->
            </div>
            <div class="col-8" style="text-align:left; line-height: 1.2; text-align: right;">
            
                <span  style="display:inline-block; width:100%">W/O tax: {{Math.round((totalSum - (totalSum*0.25)) * 100) / 100 || 0}} $</span>
                <small  style="display:inline-block; width:100%">+ tax:  {{Math.round(totalSum*0.25 * 100) / 100 || 0}} $</small>
                <span  style="display:inline-block; border-top:1px solid black; " >
                    <span style="font-size:20px;">
                        Total: 
                        <span style="color:#B8A929;"> 
                        {{totalSum.toFixed(2)}} $
                        </span> 
                    </span>
                </span>
            </div>
        </div>
        <div class="row" >
            <button @click="toggleCollapsible" class="collapsibleNotes" ref="collapsibleNotes">
                <span style="margin-left:40px; display:flex; margin-bottom: 5px;">
                    <img src="@\assets\NotesIcon.svg" alt="">
                    <b style="font-size:18px; padding-left: 5px;"> Add notes</b>
                </span>
            </button>
            <div  class="contentNotes"><textarea v-model="textualNote" placeholder="Feel free to leave additional request"  style="width: 85%; min-height: 100px; border:1px solid #6F6969; border-radius: 10px;"/></div>
        </div>

        <!--https://stackoverflow.com/questions/40182536/vue-js-routing-with-back-button router.go gubi podatke pa treba napraviti localstorage-->
        <div style="display: flex; justify-content: space-around; margin-top:10px;" >
            <button  @click="$router.push({ path: '/food_list'})" style="background-color:#6F6969; border:none;" class="btn btn-primary">ADD MEAL</button>
            <button  @click="placeOrder" class="btn btn-primary" >PLACE ORDER</button>
        </div>

        <div class="row pl-4 pr-4 d-flex" v-if="errorMessage" style="padding:10px 0px">
            <small style="color: red">{{errorMessage}}</small><br>
        </div>
        
    </div>
</template>


<script>
import CartItem from '@/components/CartItem.vue';
import store from '@/store.js';
import { Products } from '@/services';
import FooterTest from '@/components/FooterTest.vue';

export default {
    name: 'Checkout',
    props: ['id'],

    components: {   
        CartItem,
        FooterTest
    },
 
    data() {
        return {
            cartItems: [],
            textualNote: '',
            errorMessage: false
        
        };
    },
    async mounted() {
        this.cartItems = this.cartItems || [];
        this.cartItems = JSON.parse(localStorage.getItem('cart'));

         setTimeout(() => {
            if(store.type.toLowerCase()==='food'){
                this.toggleCollapsible()   
            } 
        }, 1000)

    },

    computed: {
            totalSum() {
                if(this.cartItems!== undefined){
                    return this.cartItems.reduce((accumulator, object) => {
                    return accumulator + object.price* object.quantity;
                    }, 0);
                }
            }
        },

    methods:{
        toggleCollapsible(){
            let button = this.$refs['collapsibleNotes']
            //button.classList.toggle('active')
            
            let content = button.nextElementSibling;
            //console.log(content)
            if (content.style.maxHeight){
                content.style.maxHeight = null;
                } else {
                content.style.maxHeight = content.scrollHeight + "px";
                } 
        },

        async placeOrder(){
            this.cartItems = this.cartItems || [];

            if (this.cartItems.length > 0){
                let info = {
                    date: Date.now(),
                    totalAmount: this.totalSum,
                    note: this.textualNote
                }

                let bill = {
                    items: this.cartItems, orderInfo: info 
                }

                let success = await Products.newOrder(bill)

                if (success) this.$router.push({ path: '/placed_order'})
                else console.log('place order error - creater message for this')
            
            }else{
                this.errorMessage = 'Your cart is empty';
            }
        },

        deleteItem (index) {
            //promijeniti u id
            this.cartItems.splice(index, 1);
        },

     },



    unmounted(){
        //save changes when leaving page
        localStorage.setItem('cart', JSON.stringify(this.cartItems || []));
    },

    
    
};
</script>

<style scoped>

.row{
    max-width:100%;
    margin:auto;
    flex-shrink: 1;
}

#checkoutGif{
    width: 312px;
    height: 280px;
}

.collapsibleNotes {
    background-color: white;
    color: black;
    cursor: pointer;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
}

.collapsibleNotes:active {
  color: #0078D4;
}


.contentNotes {
  padding: 0 5px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
}

#circle-bottom-checkout {
  position: absolute;
  top: 60px;
  left: 0px;
  width: 35px;
  height: 25px;
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


#backIcon-checkout{
    position: relative;
    left:5px;
    width: 25px;
    height: 15px;
}

.modal-footer {
    justify-content: space-evenly;
}

    
@media (min-width:900px){
 #checkoutContent{
    position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 600px;   
 }
}

</style>
