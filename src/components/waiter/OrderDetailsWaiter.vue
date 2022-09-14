<template>
    <div id="checkout-background">
        <!--toast-->
        <div class="toast-container position-fixed top-0 end-0 p-3">
            <div id="basicToast" ref="basicToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header text-light">
                    <img id="successIcon" src="@/assets/successIcon.png"/>
                    <!-- <i class="fa-regular fa-circle-check fa-bounce"></i> -->
                    <h6 class="my-0">Change saved</h6>
                </div>
            </div>  
        </div>


        <!--INTERFACE: Changeable if order is not accepted-->
        <div v-if="orderStatus === 'ordered|ready to take over'" id="checkoutContent" >
            <!-- <div  class="row">
                <button @click="this.$router.go(-1)"  id="circle-bottom-checkout">
                    <img id="backIcon-checkout" src="@/assets/backIconBlue.png" />
                </button>
            </div> -->
            <div class="row" id="headerRow">
            <h5><b>Order details</b></h5>
            <small >Order status:  {{ orderStatus}}</small>
            <small >
                    Table: 
                    <input type="text" v-model="table"  id="tableInput"/>
            </small>
            </div>

            <button type="button" @click="onToggle" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="collapseButton">
                <div v-if="!seeMore">
                    <label >See more</label> 
                    <img src="@/assets/SeeMoreArrowSmall.svg" alt="">
                </div>
                <div v-else>
                    <label >See less</label> 
                    <img src="@/assets/SeeMoreArrowSmall.svg" style=" transform: rotate(180deg)" >
                </div>
            </button>
            <div class="collapse" id="collapseExample">
                <div class="row" id="cardsRow">  
                    <span v-if="cartItems===undefined || cartItems.length<1">No chosen items yet</span> 
                    <CartItem v-else :key="card.id" 
                        v-for="(card, index ) in cartItems" :info="card" 
                        v-bind:style= "[index===cartItems.length-1 ? {'border-bottom':'black solid 1px'} : {}]"
                        v-on:delete-item="deleteItem(index)"
                    /> 
                </div>
            </div> 
            <div class="row" id="calculationDiv">
                <div class="col">
                    <div v-if="seeMore" @click="deleteOrder" class="funkyFont" style="color:#FF0303;" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                        </svg>
                        Delete
                    </div>
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
                        <b> Notes</b>
                    </span>
                </button>
                <div  class="contentNotes"><textarea v-model="textualNote" placeholder="Feel free to leave additional request" /></div>
            </div>

            <div id="buttonsRow">
                <!-- <button   @click="toggleTooltip"  data-bs-toggle="tooltip" data-bs-placement="top" title="Make new order if you want to add new meal" id="addMealBtn" class="btn btn-primary">ADD MEAL</button> -->
                <button v-if="store.userType === 'customer'"  @click="$router.push({ path: '/placed_order'})" id="backBtnAccepted" class="btn btn-primary funkyFont">Back</button>
                <button v-if="store.userType === 'waiter'" @click="$router.push({ path: '/orders'})" id="backBtnAccepted" class="btn btn-primary funkyFont">Back</button>
                <button  @click="update" class="btn btn-primary funkyFont" >Update</button>
            </div>

            <div v-if="errorMessage" class="row pl-4 pr-4 d-flex" id="errorMessageDiv">
                <small>{{errorMessage}}</small><br>
            </div>
        </div>







        <!--INTERFACE: Not changeable if order is accepted-->
        <div v-else id="checkoutContent" >
            <div class="row" id="headerRow">
            <h5><b>Order details</b></h5>
                    <small >Order status: {{orderStatus}}</small>
                    <small >Table: {{ table }}</small>
            </div>

            <button type="button" @click="onToggle" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="collapseButton">
                <div v-if="!seeMore">
                    <label >See more</label> 
                    <img src="@/assets/SeeMoreArrowSmall.svg" alt="">
                </div>
                <div v-else>
                    <label >See less</label> 
                    <img src="@/assets/SeeMoreArrowSmall.svg" style=" transform: rotate(180deg)" >
                </div>
            </button> 
            <div class="collapse" id="collapseExample">
                <div class="row" id="cardsRow">  
                    <span v-if="cartItems===undefined || cartItems.length<1">No chosen items yet</span> 
                    <CartItem v-else :key="card.id" 
                        v-for="(card, index ) in cartItems" :info="card" 
                        v-bind:style= "[index===cartItems.length-1 ? {'border-bottom':'black solid 1px'} : {}]"
                        v-on:delete-item="deleteItem(index)"
                    /> 
                </div>
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
                <button @click="toggleCollapsibleNotes" class="collapsibleNotes" ref="collapsibleNotes">
                    <span>
                        <img src="@\assets\NotesIcon.svg" alt="">
                        <b> Notes</b>
                    </span>
                </button>
                <div  class="contentNotes"><textarea v-model="textualNote" disabled placeholder="No additional requests given" /></div>
            </div>

            <div id="buttonsRowAccepted">
                <button v-if="store.userType === 'customer'"  @click="$router.push({ path: '/placed_order'})" id="backBtnAccepted" class="btn btn-primary funkyFont">Back</button>
                <button v-if="store.userType === 'waiter'" @click="$router.push({ path: '/orders'})" id="backBtnAccepted" class="btn btn-primary funkyFont">Back</button>
            </div>
            
        </div>
        <Footer></Footer>
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
            orderData: undefined,
            cartItems: [],
            textualNote: '',
            orderInfo: null,
            table: undefined,
            orderStatus: undefined,
            errorMessage: false,
            totalSum: 0,
            seeMore: false,
            store,
        
        };
    },
    async mounted() {

        setTimeout(() => {
            if(store.type.toLowerCase()==='food'){
                this.toggleCollapsibleNotes()   
            } 
        }, 1000)

    },


    methods:{
        toggleCollapsibleNotes(){
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

        onToggle(){
            this.seeMore = !this.seeMore;
        },

        async update(){
            this.cartItems = this.cartItems || [];

            if (this.cartItems.length > 0){
                let info = {
                    date: this.orderData.orderInfo.date, 
                    dateUpdated: Date.now(),
                    table: this.table,
                    totalAmount: this.totalSum,
                    note: this.textualNote,
                    orderStatus: 'ordered|ready to take over',
                    orderId: this.orderData.orderInfo.orderId
                }

                let bill = {
                    items: this.cartItems, orderInfo: info 
                }
                bill.id = this.orderData._id
    

                let success = await Orders.updateOrder(bill)
                if (success){
                    this.toggleModal();

                    setTimeout(()=>{
                        this.$router.push({ path: `/placed_order` });
                    },2000)
                }
                else console.log('place order error - create message for this')
            
            }else{
                this.errorMessage = 'Your cart is empty';
            }
        },

        deleteItem (index) {
            //promijeniti u id
            this.cartItems.splice(index, 1);
        },

        toggleTooltip(){
            $(function () {
                    $('[data-bs-toggle="tooltip"]').tooltip()
                })
            },

        toggleModal(){
            let button = this.$refs['basicToast']
            new bootstrap.Toast(button).show();
        },
        
        async deleteOrder(){
            await Orders.deleteOrder( JSON.parse(localStorage.getItem('orderID')) )
            this.$router.push({path: '/orders'})
        },

        async fillData(){
            this.orderData = await Orders.getOrder(this.$route.params.id);

            this.cartItems = this.orderData.items
            let orderInfo = this.orderData.orderInfo
            this.cartItems  = this.cartItems.map(obj => ({ ...obj, status: orderInfo.orderStatus }))

            // cant call directly from html orderInfo.table etc. because of asynchroneus nature: https://stackoverflow.com/questions/46579976/vue-js-cannot-read-property-even-though-the-object-exists
            this.table = orderInfo.table
            this.totalSum = orderInfo.totalAmount
            this.textualNote = orderInfo.note
            this.orderStatus = orderInfo.orderStatus
            this.table = orderInfo.table
        }

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


    created(){
        this.fillData();
    },


    
    
};
</script>

<style scoped>

.row{
    max-width:100%;
    margin:auto;
    flex-shrink: 1;
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
  right: 20px;
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



.modal-footer {
    justify-content: space-evenly;
}

#headerRow{
     text-align:left; 
     padding-left:15px;
     margin-bottom: 10px;
}

#headerRow > h5 {
    margin:30px 0 5px 0;
}

#headerRow > small{
    margin-left:15px;
}

#cardsRow > span{
     padding:20px 0px;
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
}


#buttonsRow{
   display: flex; 
   justify-content: space-around; 
   margin-top:10px;
}
#buttonsRowAccepted{
   display: flex; 
   justify-content: flex-start;
   margin-top:10px;
}

#backBtn{
    background-color:#6F6969; 
    border:none;
    font-size: 1.25rem;
}

#backBtnAccepted{
    background-color:#6F6969; 
    border:none;
    font-size: 1.25rem;
    margin-left: 20px;
}

#errorMessageDiv{
    padding:10px 0px;
}

#errorMessageDiv > small{
    color:red;
}


#checkoutContent{
    position: relative; 
    min-height:100vh; 
}




#checkoutContent > Footer{
    margin-top:40px;
}



#backIcon-checkout{
    position: relative;
    left:5px;
    width: 25px;
    height: 15px;
}


/* toast */
#modal-dialog{
    top:50vw
}

#modal-body, #modal-footer{
    padding: 0;
    width: 100%;
    background: #7392ab;
}

#modal-header{
  background: #7392ab;
}

#modal-header > h5{
  color: white;
}



#tableInput{
    width: 40px;
    height: 30px;
    padding: 0px 10px;
    text-align: center;
}


#collapseButton{
    all: unset;
    color: #0078D4;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    margin-left: 35px;
    width:70px;
}



/* content responsiveness */
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
}


@media (min-width:900px){
 #checkoutContent{
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 50vw;
 }
}

@media (min-width:1200px){
    #checkoutContent{
        width: 30vw;
    }
}

</style>
