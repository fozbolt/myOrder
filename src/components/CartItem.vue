<template>
   <div id="contentDiv" class="container">
        <div id="imageDiv">
            <img src="@/assets/foodInfo.jpg"/>
        </div>
        <div id="dataDiv">
            {{info.name}}
            <small style="font-size:12px;">Chosen additions: garlic, ketchup, salami, nectar</small>
            {{info.price}}
        </div>
        <div id="quantityDiv">
            2
        </div>
        
   </div>
</template>

<script>


export default {
  name: 'CartItem',
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


<style lang="scss">


#imageDiv, #dataDiv, #quantityDiv{
    float:left;
}

#contentDiv{
    width: 80%;
    height: 80px;
    background-color: pink;
    text-align: left;
    
}

#contentDiv > div{
    float:left;
}

#imageDiv > img {
    height: 75px;
    width: 75px;
    border-radius: 10px;
}

small{
    color:gray;
}

#dataDiv{
    width: 140px;
    height: 80px;
    margin-left: 25px;
    text-align: center;
}

#quantityDiv{
    width: 50px;
    height: 80px;
    margin-left: 5px;
    text-align: center;
}
</style>