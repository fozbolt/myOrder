<template>
   <div id="contentDiv" class="container" >

         <!-- Modal -->
        <div class="modal fade" id="myModal" ref="alertModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Are you sure you want to remove this item from cart?</p>
                    </div>
                    <div class="modal-footer" >
                        <button @click="toggleModal('removeItem')" type="button" class="btn btn-default" data-dismiss="modal" >Yes</button>
                        <button @click="toggleModal('returnItem')" type="button" class="btn btn-default" data-dismiss="modal" >No</button>
                    </div>
                </div>   
            </div>
        </div>

        <div id="imageDiv">
            <img src="@/assets/foodInfo.jpg"/>
        </div>
        <div id="dataDiv">
            {{info.name}}
            <small>garlic, ketchup, salami, nectar, extra cheese</small>
            <span >{{info.price}}$</span>
        </div>
        <div id="quantityDiv">
            <button @click="increment" id="plusButton">
                <img src="@/assets/plusIcon.svg" alt=""/>
            </button>
    
            <span id="quantityDisplay" >{{ info.quantity }}</span>

            <button @click="decrement" id="minusButton">
                <img src="@/assets/minusIcon.svg" alt=""/>
            </button>
        </div>
        
   </div>
</template>

<script>


export default {
  name: 'CartItem',
  props: ['info'],  //definiramo da card može primiti info odnosno propse

  components:{},
  data() { 
        return {
    
        }
  },  

  methods:{

    increment() {
      this.info.quantity++;
    
    },
    decrement() {
      this.info.quantity--;
      if (this.info.quantity < 1)  this.toggleModal();
    },

     toggleModal(value = null){
            if (value === 'returnItem') this.increment();
            else if (value === 'removeItem') this.$emit('delete-item')

            //refactor and use refs
            $("#myModal").modal("toggle");
        }
 
    },

}
 

</script>


<style lang="scss">


#imageDiv, #dataDiv, #quantityDiv{
    float:left;
}

#contentDiv{
    display: inline-flex;
    justify-content: space-between;
    width: 80%;
    height: 80px;
    background-color: white;
    text-align: left;
    margin-bottom:4px;
}

#contentDiv > div{
    float:left;
}

#imageDiv > img {
    height: 75px;
    width: 75px;
    border-radius: 10px;
}

small{
    color:gray;
}

#dataDiv{
    width: 50%;
    height: 80px;
    margin: 0px 10px;
    text-align: center;
    font-family: cursive;
}

#dataDiv > small{
    font-size:10px;  line-height: 16px; display:block;
}

#dataDiv > span{
   color: #B8A929;
}


#quantityDiv{
    width: 40px;
    height: 80px;
    margin-left: 5px;
    text-align: center;
    display:grid;
}

#quantityDiv > button{
    border:none; 
    background-color: white; 
    height: fit-content; 
    display:block; 
}

#plusButton:before {
  color: #0078D4;
  font-weight: bold;
  background-color: white;
}

#minusButton:before {
  all:unset;
  color: #0078D4;
  font-weight: bold;
  background-color: white;
  border:none;
  
}

.modal-footer{
    color:white; 
    width:60px;
}

.modal-dialog{
    top:50vw
}

.modal-body > p{
    margin-bottom: 0;
}

#quantityDisplay{
    display: inline-block; 
    line-height: 19px; 
    font-size:20px; 
    padding-bottom: -5px;
}


@media (min-width:768px){
 #contentDiv{
    width: 90%;
 }
}


</style>