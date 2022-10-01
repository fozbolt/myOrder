<template>
  <div id="dummyContainer">
    <div  id=pageContent>
        <div id="whiteCircle"></div>
        <div id="statusContent">
          <img src="@/assets/pizza_status.gif" alt=""/>
          <div id=loaderStatus>
            <progress-bar
              :value="statusDict[currStatus]" bar-class="bg-info"
            />
            <!-- currently showing only food status if we have food AND drink in order since drinks are almost immediately ready-->
            <label v-if="currFoodStatus">{{ currFoodStatus || 'Fetching status...' }}</label>
            <label v-else>{{ currDrinkStatus || 'Fetching status...' }}</label>
          </div>
          <button @click="this.$router.go(-1)" id="backBtn" class="btn btn-primary funkyFont">Back</button>
        </div>
    </div> 
    <Footer></Footer>
    <FloatingMenu></FloatingMenu>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import ProgressBar from '@/components/customer/ProgressBar.vue';
import { Orders } from '@/services';
import FloatingMenu from '@/components/FloatingMenu.vue';
//import store from '@/store';

export default {
    name: "Navbar",
    data() {
        return {
            //store,
           statusDict : {
              'ordered|ready to take over': 25, 
              'accepted|being prepared':50, 
              'ready|waiting to be served':90, 
              'served':1, 
              'paid':1,
            },
            currFoodStatus: undefined,
            currDrinkStatus: undefined
        };
    },
    components: {
    Footer,
    "progress-bar": ProgressBar,
    FloatingMenu
},
    
    methods: {
      async getStatus(){
        let id = JSON.parse(localStorage.getItem('orderID')); 
        let order = await Orders.getOrder(id);
  
        this.currFoodStatus = order.orderInfo.foodStatus
        this.currDrinkStatus = order.orderInfo.drinkStatus
      }
    },

    created(){
      if(!Boolean( JSON.parse(localStorage.getItem('orderID') ))){
          this.$router.push({path: '/'})
      }

      this.getStatus();
      setInterval(() =>{
        this.getStatus()},30000)
    },

}

</script>


<style lang="scss" scoped>

#pageContent{
  width: 100vw;
  height: 100vh;
  background-color: #0078D4 ;
}

#whiteCircle{
    position: absolute;
    // width: 534px;
    // height: 631px;
    // left: -114px;
    // top: -110px;
    width: 150vw;
    height: 100vh;
    left: -35vw;
    top: -33vw;
    background: white;
    border-radius: 100%;

}

#statusContent{
  position:relative;
  top:0;
  left:0;
  z-index:1;
}

#loaderStatus {
  width:312px;
  margin-left: auto;
  margin-right: auto;
}

#loaderStatus > label{
  padding: 5px 0px;
  font-size: 18px;
  display:block;
}

#backBtn{
    display:block;
    position:relative;
    left:1em;
    top:2em;
    background-color:#6F6969; 
    border:none;
    width:fit-content;
    height: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 23px;
    display: flex;
    align-items: center;
    text-align: center;
}



@media (min-width:800px){
  #whiteCircle{
    width: 130vw;
    height: 120vh;
    left: -25vw;
    top: -25vw;
    background: white;
    border-radius: 100%;

  }

  #statusContent{
    top: 10vh;
  }

  #backBtn{
    left:30%;
  }
}


#orderStatusFooter{
  margin-top:0px;
}



</style>