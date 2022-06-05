<template>
    <div style="width: 100%; height: 150px; background-color: aqua;"></div>
    <div class="container">
        <div class="row">   
                <Card v-for="card in cards" :key="card" :info="card"/> <!-- vrijednost varijable se prenosi u props info komponente card, dakle u info stavljamo da želimo proslijediti informaciju card, : uputa da vue ne uzima varijabblu kao običan string nego da pogleda unutra što se nalazi i to preda childu-->
        </div>
    </div>
</template>


<script>
import Card from '@/components/Card.vue'

export default {
  name: 'FoodList',
  components: {
    Card
},
    data() { 
        return {
            cards: [
                {name:"Meal name xyz", price:101, url: "https://picsum.photos/400/400"},
                {name:"Meal name x", price:1, url: "https://picsum.photos/400/400"},
                {name:"Meal name xz", price:22, url: "https://picsum.photos/400/400"},
                {name:"Meal name z", price:23, url: "https://picsum.photos/400/400"},
                {name:"Meal name yz", price:45, url: "https://picsum.photos/400/400"},
                {name:"Meal name xy", price:2, url: "https://picsum.photos/400/400"},
                {name:"Meal name xyyz", price:15, url: "https://picsum.photos/400/400"},
            ]
        }
    },
}
</script>


<style lang="scss">



</style>