<template>
  <div id="dummyContainer">
    <div class="container" id=pageContent>
        <div id="whiteCircle"></div>
        <div id="statusContent">
          <img src="@/assets/pizza_status.gif" alt=""/>
          <div id=loaderStatus>
            <progress-bar
              :value="65" bar-class="bg-info"
            />
            <label>{{status}}</label>
          </div>
          <button @click="this.$router.go(-1)" id="addMealBtn" class="btn btn-primary">Back</button>
        </div>
    </div> 
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { Products } from '@/services';
//import store from '@/store';

export default {
    name: "Navbar",
    data() {
        return {
            //store,
            status: 'Fetching status...'
        };
    },
    components: { 
      Footer, 
      "progress-bar": ProgressBar 
    },
    
    methods: {
      async getStatus(){
        let id = JSON.parse(localStorage.getItem('orderID')); 
        let order = await Products.getOrder(id);
        this.status = order.orderInfo.orderStatus
      }
    },

    created(){
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

#addMealBtn{
    display:block;
    position:relative;
    left:1em;
    top:2em;
    background-color:#6F6969; 
    border:none;
    width:fit-content;
    height: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
    font-family: 'IM FELL French Canon SC';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
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
}


#orderStatusFooter{
  margin-top:0px;
}



</style>