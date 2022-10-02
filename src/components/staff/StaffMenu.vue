<template>
    <div class="col-xl-4 col-lg-4 col-md-12 col-6" id="menuColumn">
        <div id="contentWrapper" @click="goTo">
            <span v-if="number_of_notifications" class="circle-notification">
                <label v-if="info.name === 'Calls'">{{number_of_notifications -1}}</label> <!--quickfix-->
                <label v-else>{{number_of_notifications}}</label>
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
    name: "StaffMenu",
    props: ['info'],
    
    data() {
        return {
          store,
          number_of_notifications: undefined
        };
    },
    methods: {
      async getCount(status, type=undefined){

          if (this.info.name === 'Calls'){
                let dataArr =  await Orders.fetchCalls(this.store.searchText, 'new');
                return  dataArr.length
              }
          else{                                 
                let dataArr =  await Orders.fetchOrders(this.store.searchText, type, status);
                return  dataArr.length
          } 
      },

      async initializeUserData(){
          if (this.store.userType === 'waiter'){
            this.number_of_notifications = await this.getCount('ready|waiting to be served', 'Food') + await this.getCount('ready|waiting to be served', 'Drink')
          }
          else if (this.store.userType === 'chef'){
            this.number_of_notifications = await this.getCount('ordered|ready to take over', 'Food')
          }
          else if (this.store.userType === 'barman'){
            this.number_of_notifications = await this.getCount('ordered|ready to take over', 'Drink')
          }
        },

      goTo(){
        this.store.selected_order_status = this.info.selected_state;
        this.$router.push({path: this.info.path})
      }


    },

    created(){
        //for notifications
        if(this.info.notificationEnabled) this.initializeUserData();
 
    }
}
  
 
</script>
 
 
<style lang="scss">


#menuColumn{
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