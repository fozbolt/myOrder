<template>
    <div class="col-xl-4 col-lg-4 col-md-12 col-6" id="column">
        <div id="contentWrapper" @click="this.$router.push({path: info.path})">
            <span v-if="number_of_notifications" class="circle-notification">
                {{number_of_notifications}}
            </span>
            <div id="headline">
                {{info.name}}
            </div>
            <img :src="info.src" >
        </div>
    </div>
</template>


<script>
import { Orders } from '@/services';
import store from '@/store.js'
 
export default {
    name: "WaiterMenu",
    props: ['info'],
    
    data() {
        return {
          store,
          number_of_notifications: undefined
        };
    },
    methods: {},

    async mounted(){
        //for notifications
        if (this.info.name === 'Calls'){
          let dataArr =  await Orders.fetchCalls(this.store.searchText, 'new');
          this.number_of_notifications = dataArr.length
        }
        else if (this.info.name === 'Orders'){                                 
          let dataArr1 =  await Orders.fetchOrders(this.store.searchText, 'Food', 'ready|waiting to be served');
          let dataArr2 = await Orders.fetchOrders(this.store.searchText, 'Drink', 'ready|waiting to be served');
          this.number_of_notifications = dataArr1.length + dataArr2.length
        }
        
        
    }
}
  
 
</script>
 
 
<style lang="scss">


#column{
  width: fit-content;
  // height:50%;
  margin:30px 10px 0px; 
  border-radius:10px; 
  padding:0;
}

#contentWrapper{
    position:relative;
    
}

#headline{
    width:150px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    font-size: 25px;
    transform: translate(-50%, 0);
    background-color: #e9ecefab;
    // background-color: white;
    border-radius: 10px 10px 0 0;
}

 
 #contentWrapper > img{
  width:300px; 
  height:250px;  
  border-radius:10px;
  margin: 0 20px;
}


.circle-notification {
  position: absolute;
  top: -15px;
  right: 0px; 
  width: 40px;
  height: 40px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  background: #FF0303;
  display: flex;
  color:white;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  font-family: cursive !important;
  font-size:22px;
}


@media(min-width:600px){
  #contentWrapper > img{
  width: 90vw; 
  height:50vh;  
  border-radius:10px;
  margin: 0 20px;
  }
}


@media(min-width:1024px){
  #contentWrapper > img{
  width: 25vw; 
  height:25vh;  
  border-radius:10px;
}
}


@media(min-width:1200px){
  #contentWrapper > img{
  width: 20vw; 
  height:40vh;  
  border-radius:10px;
}
}
 
 </style>