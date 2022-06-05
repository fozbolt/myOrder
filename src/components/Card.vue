<template>
 <div class="col-lg-2 col-6">
    <div class="card" >
        <img :src="info.url" class="card-img-top" alt="Meal image">
        <div class="card-body p-0">
            <h5 class="card-title">{{info.name}}</h5>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['info'],  //definiramo da card može primiti info odnosno propse
}
 

</script>


<style lang="scss">

.card{
    margin: 5px 0 40px 0;
    width:150px;
}

.card-img-top{
    width: 150px;
    height: 150px;
}

.card-body{
    width:150px;
}

</style>