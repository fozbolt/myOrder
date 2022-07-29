<template>
    <div>
        <div class="row">   
            <CartItem :key="card.id" v-for="card in cartItems" :info="card"/> 
        </div>

    <!--https://stackoverflow.com/questions/40182536/vue-js-routing-with-back-button router.go gubi podatke pa treba napraviti localstorage-->
    <button  @click="this.$router.go(-1)" class="btn btn-primary">Back</button>
    

    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import store from '@/store.js';
import { Products } from '@/services';

export default {
    props: ['id'],
    data() {
        return {
            cartItems: [],
        
        };
    },
    async mounted() {
        //this.cartItems = this.cartItems || [];
        this.cartItems = JSON.parse(localStorage.getItem('cart'));
    },
    name: 'Checkout',
    components: {
    CartItem,
        },
    methods:{
     
    },

};
</script>

<style scoped>


</style>
