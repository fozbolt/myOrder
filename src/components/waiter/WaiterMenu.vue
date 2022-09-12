<template>
    <div class="col-xl-4 col-lg-4 col-md-12 col-6" id="column">
        <div id="contentWrapper" @click="this.$router.push({path: info.path})">
            <span class="circle-notification">
                4
            </span>
            <div id="headline">
                {{info.name}}
            </div>
            <img :src="info.src" >
        </div>
    </div>
</template>


<script>

 
export default {
    name: "WaiterMenu",
    props: ['info'],
    
    data() {
        return {};
    },
    methods: {},
    mounted(){
        console.log(this.info)
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
  left: 295px; 
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