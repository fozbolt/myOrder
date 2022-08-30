<template>
    <div v-if="this.$route.path==='/food_list'" class="col-xl-1 col-lg-2 col-md-3 col-6" id="column">
        <div class="card" >
            <span v-if="info.discount" class="circle-left">
                <b>{{info.discount}}</b> 
                <small>OFF</small>
            </span>
            <span class="circle-right">
                {{info.price}}$
            </span>
            <img :src="info.url" class="card-img-top" alt="Meal image">

            <div class="card-body p-0">
                <!-- <h5 class="card-title"><button class="btn btn-primary">ADD TO CART</button></h5> -->
                <h5 class="card-title" id="cardHeader">{{info.name}}</h5>
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
            cards: [],
        }
  },  

  methods:{

  },

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
  left: 110px; //jer right:-12px ili -15px stvaraju bug s boostrap responsivenes
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
</style>