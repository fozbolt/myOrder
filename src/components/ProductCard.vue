<template >
        <div  class="col-xl-3 col-lg-3 col-md-3 col-6" id="column">
            <!--toast-->
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="basicToast" ref="basicToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header text-light">
                        <img id="successIcon" src="@/assets/successIcon.png"/>
                        <!-- <i class="fa-regular fa-circle-check fa-bounce"></i> -->
                        <h6 class="my-0">{{this.card.name}} added to cart</h6>
                    </div>
                </div>  
            </div>

            <!--card-->
            <div class="card"  :class="{ waiterCard: store.userType === 'waiter'}">
                <span v-if="info.discount" class="circle-left">
                    <b>{{info.discount}}</b> 
                    <small>OFF</small>
                </span>
                <span class="circle-right">
                    {{info.price}}$
                </span>
                <img :src="info.url"  @click="gotoDetails" class="card-img-top" alt="Meal image">

                <!--waiter has added "add to cart button for faster ordering"-->
                <div v-if="store.userType==='waiter'" class="card-body p-0 card-body-waiter"  >
                    <h5 
                        class="card-title title-waiter" 
                        id="cardHeader" 
                        :style="{fontWeight: $route.path === '/products' ? 400 : 200}"
                        @click="gotoDetails"
                        >
                        {{info.name}}
                    </h5>
                    <h5 class="card-title funkyFont">
                        <button @click="addToCart" class="btn btn-primary">ADD TO CART</button>
                    </h5>
                </div>
                <div v-else class="card-body p-0">
                    <h5 class="card-title" id="cardHeader" :style="{fontWeight: $route.path === '/products' ? 400 : 200}">{{info.name}}</h5>
                </div>
            </div>
        </div>
</template>

<script>
import store from '@/store.js';

export default {
  name: 'Card',
  props: ['info'],  

  data() { 
        return {
            store,
            cart: undefined,
            card: this.info,
        }
  },  

  methods:{
    addToCart(){
            this.cart = JSON.parse(localStorage.getItem('cart')); 
            this.card.additions = ["No additions"] //hardcoded in food_list because we can choose additions only in foodInfo


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

            //show success notification
            let button = this.$refs['basicToast']
            new bootstrap.Toast(button).show();

        },
			
        gotoDetails() {
            if(this.store.userType === 'waiter'){
              this.store.searchText = ''
              this.$router.push({ path: `/food_list/${this.card._id}` });
            }
        },
            

  }

}
 

</script>


<style lang="scss" scoped>
#column{
    justify-content: center;
    display: flex;
}

.card{
    margin: 5px 0 40px 0;
    width:150px;
    border:none;
}

.card-img-top{
    width: 150px;
    height: 150px;
    border-radius: 7px;
}

.card-body{
    width:150px;
    border-radius: 5px;
}

.card-title{
    font-weight: 200;
    margin-top:5px;
    width:100%;
}

#cardHeader{
    //because of intererance
    color:black;
}


.circle-right {
  position: absolute;
  top: -15px;
  right: 0px; //jer right:-12px ili -15px stvaraju bug s boostrap responsivenes
  width: 50px;
  height: 50px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  background: #74CF55;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  font-family: cursive !important;
  font-size:14px;
}

.circle-left {
  position: absolute;
  top: -15px;
  left: -10px;
  width: 50px;
  height: 35px;
  -webkit-border-radius: 0px 20px 2px 0px;
  -moz-border-radius: 0px 20px 2px;
  border-radius: 0px 20px 2px;
  background: #CF4F4F;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  line-height: 120%;
}

.btn{
    margin-top: 5px;
    border-radius: 25px;
    background-color: #0078D4;
    padding-top:1px;
    padding-bottom:1px;
}


.circle-left >small{
    font-size:10px;
    margin-top: -4px;
    color:black;
}

.circle-left > b {
    margin-top: 2px;
    font-size: 18px;
}

.title-waiter{
    background: rgba(184, 169, 41, 0.8);
    font-weight: 200;
    border-radius: 0 0 10px 10px;
}

.card-body-waiter{
    position: absolute;
    bottom: -39px;
}

.waiterCard{
    margin-bottom: 80px;
}



/*toast*/
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

</style>