<template>
    <div class="card" >
        <img :src="info.url" class="card-img-top" alt="Meal image">

        <div class="card-body p-0" id="cardBody">
            <!-- <h5 class="card-title"><button class="btn btn-primary">ADD TO CART</button></h5> -->
            <h5 class="card-title" id="cardTitle">{{info.title}}</h5>
            <!-- <h6 class="card-title">{{info.description}}</h6> -->
        </div>
    </div>
</template>

<script>


export default {
  name: 'SimilarMealsCard',
  props: ['info'],  //definiramo da card može primiti info odnosno propse

  data() { 
        return {
            cards: [],
        }
  },  


}
 

</script>


<style lang="scss">
#column{
    justify-content: center;
    display: flex;
}

.card{
    margin: 5px 0 0 0;
    width:fit-content;
    border:none;
    background: none;
}

.card-img-top{
    width: 60vw;
    height: 60vw;
    border-radius: 0px;
}

.card-body{
    width: 130px;
    border-radius: 0px;
    min-height: 45px;
}

.card-title{
    font-weight: 200;
    margin-top:2px;
    margin-bottom:0px;
    color:white;
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
}

.circle-left > b {
    margin-top: 2px;
    font-size: 18px;
}


.card-body > h6 {
width: 200px;
text-align: left;
padding-left: 10px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}

#cardBody{
    width: 100%;
}


@media(min-width:700px){
    .card-img-top{
        width: 100%;
        height: 100%;
    }


    #cardTitle{
        font-size:2vw;
    }
}



</style>