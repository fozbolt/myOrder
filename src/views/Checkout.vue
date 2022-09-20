<template>
    <div>
        <div id="checkoutContent" >
            <div class="row">
                <img id="checkoutGif" src="@\assets\checkoutGIF.gif" alt="">
                <button @click="this.$router.go(-1)"  id="circle-bottom-checkout">
                    <img id="backIcon-checkout" src="@/assets/backIconBlue.png" />
                </button>
            </div>
            <div class="row" id="headerRow">
            <h5><b>Checkout</b></h5>
            <small >{{'Table: 3'}}</small>
            </div>
            <div class="row" id="cardsRow">  
                <span v-if="orderExists && cartItems.length === 0">Cart is empty. Choose some items first or check <a href="#" @click="$router.push({path: '/placed_order'})">existing order</a></span> 
                <span v-else-if="cartItems===undefined || cartItems.length<1">No chosen items yet</span> 
            

                <CartItem v-else :key="index" 
                    v-for="(card, index ) in cartItems" :info="addIndexAndSend(card, index)" 
                    v-bind:style= "[index===cartItems.length-1 ? {'border-bottom':'black solid 1px'} : {}]"
                    @delete-item="deleteItem"
                /> 
           
            </div>
            <div class="row" id="calculationDiv">
                <div class="col">
                    <!-- Empty half -->
                </div>
                <div class="col-8">
                    <span id="withoutTax" >W/O tax: {{Math.round((totalSum - (totalSum*0.25)) * 100) / 100 || 0}} $</span>
                    <small id="tax">+ tax:  {{Math.round(totalSum*0.25 * 100) / 100 || 0}} $</small>
                    <span id="withTax">
                        <span>
                            Total: 
                            <span id="totalSum"> 
                            {{totalSum.toFixed(2)}} $
                            </span> 
                        </span>
                    </span>
                </div>
            </div>
            <div class="row">
                <button @click="toggleCollapsible" class="collapsibleNotes" ref="collapsibleNotes">
                    <span>
                        <img src="@\assets\NotesIcon.svg" alt="">
                        <b> Add notes</b>
                    </span>
                </button>
                <div  class="contentNotes"><textarea v-model="textualNote" placeholder="Feel free to leave additional request" /></div>
            </div>

            <div id="buttonsRow">
                <button  @click="$router.push({ path: '/food_list'})" id="addMealBtn" class="btn btn-primary">ADD MEAL</button>
                <button  @click="placeOrder" class="btn btn-primary" >PLACE ORDER <span :class="{'spinner-border spinner-border-sm': spinnerOn}"></span></button>
            </div>

            <div v-if="errorMessage" class="row pl-4 pr-4 d-flex" id="errorMessageDiv">
                <small>{{errorMessage}}</small><br>
            </div>
        </div>
        <Footer style="margin-top:100px;"></Footer>
        <FloatingMenu></FloatingMenu>
    </div>
</template>


<script>
import CartItem from '@/components/CartItem.vue';
import store from '@/store.js';
import { Orders } from '@/services';
import Footer from '@/components/Footer.vue';
import FloatingMenu from '@/components/customer/FloatingMenu.vue';

export default {
    name: 'Checkout',
    props: ['id'],

    components: {
    CartItem,
    Footer,
    FloatingMenu
},
 
    data() {
        return {
            cartItems: [],
            textualNote: '',
            errorMessage: false,
            orderExists: false,
            spinnerOn: false,
            orderCount: 0,
            store,
        
        };
    },
    async mounted() {

        this.cartItems = this.cartItems || [];
        this.cartItems = JSON.parse(localStorage.getItem('cart'));
        
        if(Boolean( JSON.parse(localStorage.getItem('orderID') ))){
            this.orderExists = true;
        }
           
        
        setTimeout(() => {
                this.toggleCollapsible();
        }, 1000)

        //this.orderCount = await Orders.fetchOrders();
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
            
            try{
                let content = button.nextElementSibling;
       
                if (content.style.maxHeight){
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                } 
            }catch(err){}
           
        },

        toggleSpinner(){
            this.spinnerOn = true;
            setTimeout(()=>{
                this.spinnerOn = false;
            },5000)
        },

        orderHasType(type){
            let arr = this.cartItems.filter(item => item.type.toLowerCase() === type.toLowerCase())
            
            if (arr.length === 0) return false
            else return true
        },


        async placeOrder(){
            this.toggleSpinner();

            this.cartItems = this.cartItems || [];

            if (this.cartItems.length > 0){
                let info = {
                    date: Date.now(),
                    table: '2', //hardcoded for now
                    totalAmount: this.totalSum,
                    note: this.textualNote,
                    orderStatus: 'ordered|ready to take over',
                    //orderNumber: this.orderCount.length  //dummy orderNumber - now we get it through trigger in db
                }


                //inspect for food and drink
                if(this.orderHasType('Food'))   info.foodStatus = 'ordered|ready to take over'
                if (this.orderHasType('Drink')) info.drinkStatus = 'ordered|ready to take over'


                let bill = {
                    items: this.cartItems, orderInfo: info 
                }


                let id = await Orders.newOrder(bill)
                
                if (id) this.getInfo(id);
                else console.log('place order error - create message for this')
            
            }else{
                this.errorMessage = 'Your cart is empty';
            }
        },

        deleteItem (index) {
            //cannot set it by id because of case when we have multiple cart items with same id
            this.cartItems.splice(index, 1);
        
            //quickfix for case when we delete one of multiple items with same id and quantity of current goes to 0 but item isn't removed
            //this.cart.items = this.cart.items.filter(item => item.quantity !== 0)
        },


        addIndexAndSend(card, index){
            //ne zaboraviti obrisati ga onda
            card.index = index;
            return card
        },

        async getInfo(id){
            //timeout needed because operations and triggers in backend don't return orderId immediately 
            //delete this function in case i dont need orderId and leave only await Orders.getOrder(id) in callback  function
            try{
               
                setTimeout(()=>{
                    (async() => {
                         let order = await Orders.getOrder(id)  
                         localStorage.setItem('orderID', JSON.stringify(order._id));
                    })();   
                  
                    localStorage.setItem('cart', JSON.stringify([])); 
                    this.$router.push({ path: '/placed_order'})
                },2000)
            }catch(e){
                console.log(e)
            }
            
      
        }

     },



    unmounted(){
        //save changes when leaving page
        if (this.$route.path !== '/placed_order'){
            localStorage.setItem('cart', JSON.stringify(this.cartItems || []));
        }

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
    font-size: 18px;
}

.collapsibleNotes > span{
    margin-left:30px; 
    display:flex; 
    margin-bottom: 5px;
}

.collapsibleNotes > span > b{
    padding-left: 5px;
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

.contentNotes > textarea{
    width: 85%; 
    min-height: 100px; 
    border:1px solid #6F6969; 
    border-radius: 10px;
    padding:5px;
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

#headerRow{
     text-align:left; 
     padding-left:15px;
}

#headerRow > h5 {
    margin:0px;
}

#headerRow > small{
    margin-left:15px;
}

#cardsRow > span{
     padding:20px 30px;
}

#calculationDiv{
    margin: 0px 20px 10px 20px;
}


#calculationDiv > .col-8{
    text-align:left; 
    line-height: 1.2; 
    text-align: right; 
    padding-right: 20px;
}

#withoutTax, #tax{
     display:inline-block; 
     width:100%
}

#withTax{
    display:inline-block; 
    border-top:1px solid black;
}

#withTax > span{
     font-size:20px;
     
}

#totalSum{
    color:#B8A929;
    font-size: 25px;
}


#buttonsRow{
   display: flex; 
   justify-content: space-around; 
   margin-top:10px;
}

#addMealBtn{
    background-color:#6F6969; 
    border:none;
}

#errorMessageDiv{
    padding:10px 0px;
}

#errorMessageDiv > small{
    color:red;
}


#checkoutContent > Footer{
    margin-top:40px;
}


@media (min-width:700px){
 #checkoutContent{
    /* position: absolute;  */
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 60vw;
    min-height: 80vh;
 }

 #circle-bottom-checkout{
    top:80px;
    left:25%;
 }
}


@media (min-width:900px){
 #checkoutContent{
    width: 50vw;
 }
}

@media (min-width:1200px){
 #checkoutContent{
    width: 30vw;
 }

 #circle-bottom-checkout{
    top:80px;
    left:35%;
 }
}

</style>
