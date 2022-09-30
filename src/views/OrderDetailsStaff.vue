<template>
    <div id="checkout-background">
        <!--toast-->
        <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index:100">
            <div id="basicToast" ref="basicToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" >
                <div class="toast-header text-light">
                    <img id="successIcon" src="@/assets/successIcon.png"/>
                    <!-- <i class="fa-regular fa-circle-check fa-bounce"></i> -->
                    <h6 class="my-0">Change saved</h6>
                </div>
            </div>  
        </div>

        <!-- Change status modal -->
        <div class="modal fade" id="orderStatusModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Change order status</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

                            <div v-for="(value, key, index) in statusTypes" :key="index" >
                                <input 
                                    v-model="chosenStatus" 
                                    :value="key"
                                    type="radio" 
                                    class="btn-check" 
                                    name="btnradio" 
                                    :id="key"
                                    autocomplete="off" 
                                    :checked="orderStatus === key ? true : false"   
                                >   
                                <label 
                                    class="btn btn-outline-primary btnModified" 
                                    :class="{ btnModifiedWaiter: store.userType === 'waiter'}"
                                    :for="key"
                                    >{{value}}
                                </label>
                            </div>
            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="chosenStatus=orderStatus" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button @click="changeStatus" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- AcceptedBy modal -->
        <div class="modal fade" id="acceptedByModal" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="0" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header" id="modal-header">
                        <h5>Please fill in chef AND/OR barman data who accepted order</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="cName" v-model="foodAcceptedBy" placeholder="Chef username">
                                    <label for="cName" style="color:gray">Chef username</label>
                        </div>
                        <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="bName" v-model="drinkAcceptedBy" placeholder="Barman username">
                                    <label for="bName" style="color:gray">Barman username</label>
                        </div>
                    </div>
                    <div class="modal-footer" >
                        <button @click="update" type="button" class="btn btn-default" data-bs-dismiss="modal" >Submit</button>
                        <button type="button" class="btn btn-default" data-bs-dismiss="modal" >Cancel</button>
                    </div>
                </div>   
            </div>
        </div>


        <!--INTERFACE: Changeable if order is not accepted-->
        <div v-if="orderStatus === 'ordered|ready to take over'" id="checkoutContent" ref="checkoutContent">
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
            <div class="collapse" id="collapseExample" ref="collapseDiv">
                <div class="row" id="cardsRow">  
                    <span v-if="cartItems===undefined || cartItems.length<1">No chosen items yet</span> 
                    <CartItem v-else :key="card.id" 
                        v-for="(card, index ) in filteredCartItems" :info="card" 
                        v-bind:style= "[index===cartItems.length-1 ? {'border-bottom':'black solid 1px'} : {}]"
                        v-on:delete-item="deleteItem(index)"
                    /> 
                </div>
            </div> 
            <div class="row" id="calculationDiv">
                <div class="col" id="crud-col">
                    <div v-if="seeMore"  class="funkyFont" >
                        <div id="deleteContent" @click="deleteOrder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                            </svg>
                            Delete
                        </div>
                        <div id="updateContent" @click="update">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                            </svg>
                            Update
                        </div>
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
                <button v-else @click="$router.push({ path: '/orders'})" id="backBtnAccepted" class="btn btn-primary funkyFont">Back</button>
                <button  class="btn btn-primary funkyFont" data-bs-toggle="modal" data-bs-target="#orderStatusModal" >Change status</button>
            </div>

            <div v-if="errorMessage" class="row pl-4 pr-4 d-flex" id="errorMessageDiv">
                <small>{{errorMessage}}</small><br>
            </div>
            <div v-if="orderStatus==='ordered|ready to take over' && (store.userType === 'chef' || store.userType === 'barman')"  id="takeOrderBtnHolder">
                <TakeOrderBtn 
                    name="take over" 
                    @click="quickStatusChange('accepted|being prepared')"
                    />
            </div>
            <div v-if="orderStatus==='ready|waiting to be served' && store.userType === 'waiter'"  id="takeOrderBtnHolder">
                <TakeOrderBtn 
                    name="Mark as served" 
                    @click="quickStatusChange('served')"
                />
            </div>
            <div v-if="foodStatus==='served' && drinkStatus==='served' && store.userType === 'waiter'"  id="takeOrderBtnHolder">
                <TakeOrderBtn 
                    name="mark as paid" 
                    @click="quickStatusChange('paid')"
                    /> 
            </div>
            
        </div>







        <!--INTERFACE: Not changeable if order is accepted-->
        <div v-else id="checkoutContent" ref="checkoutContent">
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
            <div class="collapse" id="collapseExample" ref="collapseDiv">
                <div class="row" id="cardsRow" >  
                    <span v-if="cartItems===undefined || cartItems.length<1">No chosen items yet</span> 
                    <CartItem v-else :key="card.id" 
                        v-for="(card, index ) in filteredCartItems" :info="card" 
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

            <div id="buttonsRow">
                <button v-if="store.userType === 'customer'"  @click="$router.push({ path: '/placed_order'})" id="backBtnAccepted" class="btn btn-primary funkyFont">Back</button>
                <button v-else @click="$router.push({ path: '/orders'})" id="backBtnAccepted" class="btn btn-primary funkyFont">Back</button>
                <button  class="btn btn-primary funkyFont" data-bs-toggle="modal" data-bs-target="#orderStatusModal" >Change status</button>
            </div>

            <div v-if="orderStatus==='accepted|being prepared' && (store.userType === 'chef' || store.userType === 'barman')"  id="takeOrderBtnHolder">
                <TakeOrderBtn 
                    name="Mark as done" 
                    @click="quickStatusChange('ready|waiting to be served')"
                />
            </div>
            <div v-if="orderStatus==='ready|waiting to be served' && store.userType === 'waiter'"  id="takeOrderBtnHolder">
                <TakeOrderBtn 
                    name="Mark as served" 
                    @click="quickStatusChange('served')"
                />
            </div>
            <div v-if="foodStatus==='served' && drinkStatus==='served' && store.userType === 'waiter'"  id="takeOrderBtnHolder">
                <TakeOrderBtn 
                    name="Mark as paid"
                    @click="quickStatusChange('paid')"
                />
            </div>
            
        </div>
        <Footer></Footer>
        <!-- <FloatingMenu></FloatingMenu> -->
    </div>
</template>


<script>
import CartItem from '@/components/CartItem.vue';
import store from '@/store.js';
import { Orders } from '@/services';
import Footer from '@/components/Footer.vue';
import TakeOrderBtn from '@/components/staff/takeOrderBtn.vue';

export default {
    name: 'OrderDetailsStaff',
    props: ['id'],

    components: {
    CartItem,
    Footer,
    TakeOrderBtn
},
 
    data() {
        return {
            orderData: undefined,
            cartItems: [],
            textualNote: '',
            orderInfo: null,
            table: undefined,
            orderStatus: undefined,
            drinkStatus: undefined,
            foodStatus: undefined,
            errorMessage: false,
            seeMore: false,
            chosenStatus: undefined,
            statusTypes: {},
            foodAcceptedBy: undefined,
            foodAcceptedByID: undefined,
            drinkAcceptedBy: undefined,
            drinkAcceptedByID: undefined,
            prevFoodStatus: undefined,
            prevDrinkStatus: undefined,
            current_type: sessionStorage.getItem("current_type"),
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
        changeStatus(){
            // logic for status "served" for both food and drink to "paid" and opposite
            if ((this.foodStatus === 'served' && this.drinkStatus === 'served' || (this.foodStatus === 'paid' && this.drinkStatus === 'paid'))){
                //if status change goes backwards then we only update food or drink, if it goes forwards to paid we update both /except for served to new, then we update only one type
                if((this.chosenStatus==='paid' || this.chosenStatus==='served') || this.foodStatus === 'paid' && this.drinkStatus === 'paid' ){
                    this.foodStatus = this.chosenStatus;
                    this.drinkStatus =  this.chosenStatus;
                }
                else{
                    if (this.current_type === 'Food') this.foodStatus =  this.chosenStatus;
                    else if (this.current_type === 'Drink') this.drinkStatus =  this.chosenStatus;
                }
            }


            if (this.store.userType === 'chef' || this.current_type === 'Food') this.foodStatus =  this.chosenStatus;
            else if (this.store.userType === 'barman' || this.current_type === 'Drink') this.drinkStatus =  this.chosenStatus;


            this.setAcceptedStatus();


            //waiter has different logic
            if(this.store.userType !== 'waiter' || this.chosenStatus==='ordered|ready to take over') {
                this.update(); 
            }

        },

        

        quickStatusChange(newStatus){
            if (this.foodStatus === 'served' && this.drinkStatus === 'served'){
                this.foodStatus = newStatus;
                this.drinkStatus = newStatus;
            }

            if (this.store.userType === 'chef' || this.current_type === 'Food') this.foodStatus = newStatus;
            else if (this.store.userType === 'barman' || this.current_type === 'Drink') this.drinkStatus = newStatus;

       
            this.update();
        },


        setAcceptedStatus(){
            if(this.chosenStatus==='ordered|ready to take over'){
                if(this.current_type === 'Food'){
                    this.foodAcceptedBy = 'deleted';  //cant use undefined or null because of fillData() and update() logic
                    this.foodAcceptedByID = 'deleted';
                }
                else if(this.current_type === 'Drink'){
                    this.drinkAcceptedBy = 'deleted';
                    this.drinkAcceptedByID = 'deleted';
                }

                //for paid to new which changes both statuses oppose to served which changes one status
                if(this.prevFoodStatus === 'paid' && this.prevDrinkStatus ==='paid'){
                    this.foodAcceptedBy = 'deleted';  
                    this.foodAcceptedByID = 'deleted';
                    this.drinkAcceptedBy = 'deleted';
                    this.drinkAcceptedByID = 'deleted';
                }
                
            }
            else {
                if(this.store.userType === 'waiter') this.toggleStatusModal();
                else {
                    if(this.current_type === 'Food'){
                        this.foodAcceptedBy = this.store.username;
                        this.foodAcceptedByID = 'example_id_631afb2f42bd5e3d7c4c859c'; //hardcoded for now untill I make modal (I need to fetch that chef/waiter id first)
                    }
                    else if(this.current_type === 'Drink'){
                        this.drinkAcceptedBy = this.store.username;
                        this.drinkAcceptedByID = 'example_id_631afb2f42bd5e3d7c4c859c'; //hardcoded for now untill I make modal (I need to fetch that chef/waiter id first)
                    }
                }
                
                
            }
            
        },



        toggleStatusModal(){    
            //don't show modal if we already have acceptedBy (and we are on paid)
            let isServedFood = this.chosenStatus === 'served'  && this.foodStatus==='served' 
            let isServedDrink = this.chosenStatus === 'served' && this.drinkStatus==='served' 
            let isPaidFood = this.chosenStatus === 'paid' && this.foodStatus==='paid' 
            let isPaidDrink = this.chosenStatus === 'paid' &&  this.drinkStatus==='paid' 

            if ( !(isPaidFood && isPaidDrink) && !(isServedFood && isServedDrink)){
                $("#acceptedByModal").modal("toggle");
            }
            else this.update();

            if(this.current_type === 'Food') this.foodAcceptedByID = 'example_id_631afb2f42bd5e3d7c4c859c'; //hardcoded for now untill I make modal (I need to fetch that chef/waiter id first)
            else this.drinkAcceptedByID = 'example_id_a31afb2f42bd5e3d7c4c859c'; //hardcoded for now untill I make modal (I need to fetch that chef/waiter id first)
        },



        toggleCollapsibleNotes(){
            let button = this.$refs['collapsibleNotes']
            //button.classList.toggle('active')
            
            let content = button.nextElementSibling;
            
            if (content.style.maxHeight){
                content.style.maxHeight = null;
                } else {
                content.style.maxHeight = content.scrollHeight + "px";
                } 
        },

        onToggle(){
            this.seeMore = !this.seeMore; 

            if( this.seeMore)   this.$refs.checkoutContent.style.minHeight = `${parseInt(this.$refs.collapseDiv.style.height) + 600}px`
            else   this.$refs.checkoutContent.style.minHeight = "110vh"
        },

        orderHasType(type){
            let arr = this.cartItems.filter(item => item.type.toLowerCase() === type.toLowerCase())

            return arr //if empty then false
        },



        async update(){
            this.cartItems = this.cartItems || [];

            if (this.cartItems.length > 0 && this.validateTable()){
                let info = {
                    date: this.orderData.orderInfo.date, 
                    createdBy: this.orderData.orderInfo.createdBy,
                    createdByType:  this.orderData.orderInfo.createdByType,
                    dateUpdated: Date.now(),
                    updatedBy: this.store.username,
                    updatedByUserType: this.store.userType,
                    table: this.table,
                    totalAmount: this.totalSum,
                    note: this.textualNote,
                    orderId: this.orderData.orderInfo.orderId,
                    foodAcceptedBy: this.foodAcceptedBy || this.orderData.orderInfo.foodAcceptedBy,
                    foodAcceptedByID: this.foodAcceptedByID || this.orderData.orderInfo.foodAcceptedByID,
                    drinkAcceptedBy: this.drinkAcceptedBy || this.orderData.orderInfo.drinkAcceptedBy,
                    drinkAcceptedByID: this.drinkAcceptedByID || this.orderData.orderInfo.drinkAcceptedByID
           
                }
               
                

                //inspect for food and drink - default is set on load and if changed later it reasigns
                if(this.orderHasType('Food'))   info.foodStatus = this.foodStatus || this.orderData.orderInfo.foodStatus;
                if (this.orderHasType('Drink')) info.drinkStatus = this.drinkStatus || this.orderData.orderInfo.drinkStatus;


                //remove status from cart items
                this.cartItems.forEach(function(v){ delete v.status, delete v.index  });


                let bill = {
                    items: this.cartItems, orderInfo: info 
                }
                bill.id = this.orderData._id
    

                let success = await Orders.updateOrder(bill)
                if (success){
                    this.toggleModal();

                    setTimeout(()=>{
                        this.$router.go();
                    },1000)
                }
                else console.log('place order error')
            
            }else{
                this.errorMessage = 'Make sure your cart and table number are not empty';
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



        mapStatusUnilateral(orderInfo){
            let currStatus = orderInfo.foodStatus;
            this.orderStatus = orderInfo.foodStatus

            if(this.store.userType === 'barman' || this.current_type === 'Drink'){  //dummy second condition for waiter
                currStatus = orderInfo.drinkStatus; //for toggling quantity arrows
                this.orderStatus = orderInfo.drinkStatus //for orderStatus
            }

            this.cartItems  = this.cartItems.map(obj => ({ ...obj, status: currStatus })) 
        },


        mapStatusBilateral(orderInfo){
            // let currFoodStatus = orderInfo.foodStatus;
            // let currDrinkStatus = orderInfo.drinkStatus;
            this.orderStatus = orderInfo.foodStatus // here must exist logic for separating and showing both food and drink statuses - now its hardcoded to food

            this.foodStatus = orderInfo.foodStatus;
            this.drinkStatus = orderInfo.drinkStatus;

        },



        async fillData(){
            this.orderData = await Orders.getOrder(this.$route.params.id);
            let orderInfo = this.orderData.orderInfo

            this.cartItems = this.orderData.items

            let isBothServed = orderInfo.foodStatus === 'served' && orderInfo.drinkStatus === 'served'
            let isBothPaid = orderInfo.foodStatus === 'paid' && orderInfo.drinkStatus === 'paid'
            
            if (isBothServed || isBothPaid ) this.mapStatusBilateral(orderInfo);
            else  this.mapStatusUnilateral(orderInfo);

            // cant call directly from html orderInfo.table etc. because of asynchroneus nature: https://stackoverflow.com/questions/46579976/vue-js-cannot-read-property-even-though-the-object-exists
            this.table = orderInfo.table
            this.textualNote = orderInfo.note

            //for backwards status change logic
            this.prevFoodStatus = orderInfo.foodStatus 
            this.prevDrinkStatus = orderInfo.drinkStatus
            
            //quickfix so we can change only cards that have order status "ordered"
            this.cartItems.forEach(item => {
                if(item.type === 'Food') item.status = this.foodStatus
                else item.status = this.drinkStatus
            });

        },

        setStatusTypes(){
            let foodStat = this.orderData.orderInfo.foodStatus;
            let drinkStat =  this.orderData.orderInfo.drinkStatus;

            if (this.store.userType === 'waiter' && ((foodStat === 'served' && drinkStat === 'served') || (foodStat === 'paid' && drinkStat === 'paid')))
                this.statusTypes = {
                    'ordered|ready to take over': 'New', 
                    'served': 'Served', 
                    'paid': 'Paid'
                }
            else if (this.store.userType === 'waiter')
                this.statusTypes = {
                    'ordered|ready to take over': 'New', 
                    'served': 'Served', 
                }
            else  this.statusTypes = {
                    'ordered|ready to take over':'New/Ready to take over', 
                    'accepted|being prepared':'Accepted/ being prepared', 
                    'ready|waiting to be served':'Ready/ Waiting to be served' 
            }
           
        },


        validateTable(){
            //source: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
            return !isNaN(parseFloat(this.table)) && isFinite(this.table);
        },

        
        isServed(){
                let foodStat = this.orderData.orderInfo.foodStatus
                let drinkStat = this.orderData.orderInfo.drinkStatus

                //check if served or doesnt exist(customer ordered drink only or food only)
                if ((foodStat === 'served' || foodStat === undefined) && (drinkStat === 'served' || drinkStat === undefined)){
                    return true
                }
            },


        isPaid(){
            let foodStat = this.orderData.orderInfo.foodStatus
            let drinkStat = this.orderData.orderInfo.drinkStatus

            //check if served or doesnt exist(customer ordered drink only or food only)
            if ((foodStat === 'paid' || foodStat === undefined) && (drinkStat === 'paid' || drinkStat === undefined)){
                return true
            }
        },

    },

    computed: {
            totalSum() {
                if(this.cartItems!== undefined){
                    return this.cartItems.reduce((accumulator, object) => {
                    return accumulator + object.price* object.quantity;
                    }, 0);
                }
            },



            filteredCartItems() {
                //because status "served" and "paid" have whole different logic - we need to show both meals and drinks and are able to mark as paid only if both are served
                if (this.isServed()) {
                    this.foodStatus = 'served'
                    this.drinkStatus = 'served'
                    return this.cartItems
                }
                else if(this.isPaid()){
                    this.foodStatus = 'paid'
                    this.drinkStatus = 'paid'
                    return this.cartItems
                }
                
                else{
                    //second condition(current_type) is for waiter interface
                    if(this.store.userType === 'chef' || this.current_type ==='Food' )  return this.cartItems.filter(item => item.type === 'Food');
                    else if(this.store.userType === 'barman' || this.current_type ==='Drink' )  return this.cartItems.filter(item => item.type === 'Drink');
                }
            }


        },


    created(){
        this.fillData();

        setTimeout(() => {
            this.setStatusTypes()
        }, 1000) 
    },


    beforeUnmount(){
        this.store.selected_order_status = 'ordered|ready to take over';
    }

}
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
    min-height:125vh; 
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

#headerRow > *:last-child{
    margin-top:2px;
}


/* .bi-trash{
    color:#FF0303;
}

.bi-arrow-repeat{
    color:#0078D4;
} */

#deleteContent{
    color:#FF0303;
}

#updateContent{
    color:#0078D4;
    margin-top:5px;
}

#crud-col{
    text-align:left;
}


.btnModified{
    background: none;
    display:flex;
    align-items: center;
    /* border-radius: 25px; */
}


.btnModifiedWaiter{
    background: none;
    display:flex;
    align-items: center;
    justify-content: center;
    width:100px;
    height: 80px;
    /* border-radius: 25px; */
}



#takeOrderBtnHolder{
    display: grid;
	place-items: center;
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
