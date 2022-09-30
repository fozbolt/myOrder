<template>
    <!--condition is probably unecessary - check later-->
    <div v-if="this.$route.path==='/employees' " class="col-xl-3 col-lg-3 col-md-3 col-6" id="column">
        <div class="card" >
            <img :src="info.url" class="card-img-top" alt="Meal image">
            <div class="card-body p-0">
                <!-- <h5 class="card-title"><button class="btn btn-primary">ADD TO CART</button></h5> -->
                <h5 class="card-title" id="cardHeader">{{info.fullName}}</h5>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'EmployeeCard',
  props: ['info'], 

  data() { 
        return {
            
        }
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
    font-weight: 400;
}


.circle-right {
  position: absolute;
  top: -15px;
  left: 110px;
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