<template >
    <!--ovo je bilo stavljeno zbog bootsrap responsivensaa odnosno classa xl lg md itd, a sprievaalo je pogled, pogledati da li micanje ovog krisi responsiveness na drugim stranicaima odnosno gdje kod se koristi ova komponenta-->
    <!-- <div v-if="this.$route.path==='/products'" class="col-xl-3 col-lg-3 col-md-3 col-6" id="column"></div> -->
    <div v-if="this.$route.path==='/products' || this.$route.path==='/orders'" class="col-xl-3 col-lg-3 col-md-3 col-6" id="column">
        <div class="card" >
            <span class="circle-right-top">
                <img src="@/assets/notificationBell.svg" id="notificationIcon" alt="">
            </span>
            <span class="circle-right-bottom">
               {{convertTime()}}
            </span>
            <img src="@/assets/orders.png" class="card-img-top" alt="Meal image">

            <div class="card-body p-0">
                <!-- <h5 class="card-title"><button class="btn btn-primary">ADD TO CART</button></h5> -->
                <h6 class="card-title" id="cardHeader" style="font-family: 'sans-serif;">#{{info.orderInfo.orderId}}</h6>
                <h4 class="card-text">Table {{info.orderInfo.table}}</h4>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Card',
  props: ['info'],  //definiramo da card može primiti info odnosno propse

  data() { 
        return {
            
        }
  },  


  methods:{
    convertTime(){
        let date = new Date(this.info.orderInfo.date);
       
        return (
            date.getHours()+ ":"+ date.getMinutes()
        )
    }
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
    border-radius: 7px 7px 0 0;
}

.card-body{
    width:150px;
    border-radius: 5px;
    border-radius: 0 0 10px 10px;
    // background: #f9f9f9;
}

.card-title{
    font-weight: 200;
    margin-top:5px;
    width:100%;
}

#cardHeader{
    //because of interferance
    color:#5b5e60;
    margin-top:0;
    background: #E5E5E5;
    border-radius: 0 0 10px 10px;
    text-align: center;
    padding:0;
}

.card-text{
    // background: #f9f9f9;
    border-radius: 0 0 10px 10px;
}


.circle-right-top {
  position: absolute;
  top: -10px;
  left: 120px; //jer right:-12px ili -15px stvaraju bug s boostrap responsivenes
  width: 40px;
  height: 40px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  background: #FF0303;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  font-family: cursive !important;
  font-size:14px;
}


.circle-right-bottom {
    position: absolute;
    left: 95px;
    width: 55px;
    height: 25px;
    border-radius: 20px 0 0 0;
    background: #74CF55;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    font-family: cursive !important;
    font-size: 16px;
    bottom: 45px;
    padding-top: 1px;
    padding-left: 5px;
}


.btn{
    margin-top: 5px;
    border-radius: 25px;
    background-color: #0078D4;
    padding-top:1px;
    padding-bottom:1px;
}


#notificationIcon{
    width:30px;
}


</style>