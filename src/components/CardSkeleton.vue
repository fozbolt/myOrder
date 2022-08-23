<!--source: https://www.youtube.com/watch?v=2-jQ1v6X7vA radi samo na prvom potomku i ako ima samo jedan potomak-->
<template>
    <div class="col-lg-2 col-6">
        <div class="card" >
            <span class="circle-left">
                <small><b>40%</b><br/>OFF</small>
            </span>
            <span class="circle">
                <b>{{info.price}}$</b>
            </span>
            <img :src="info.url" class="card-img-top" alt="Meal image">

            <div class="card-body p-0">
                <!-- <h5 class="card-title"><button class="btn btn-primary">ADD TO CART</button></h5> -->
                <h5 class="card-title">{{info.name}}</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['info'], 

  methods:{
    
  }
}
 

</script>


<style lang="scss">

.card{
    margin: 5px 0 40px 0;
    width:100%;
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
    margin-top:2px;
}


.circle {
  position: absolute;
  top: -15px;
  right: -12px;
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
}

.circle-left {
  position: absolute;
  top: -15px;
  left: -12px;
  width: 50px;
  height: 40px;
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

</style>