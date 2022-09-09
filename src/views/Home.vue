<template>

    <HomeSmartphone v-if="store.userType==='customer' && windowWidth < 500"/>
    <HomeDesktop v-else-if="store.userType==='customer'"/>

    <Manager v-else-if="store.userType==='manager'" />
    <Waiter v-else-if="store.userType==='waiter'" /> <!--ili opcenito staff?-->

</template>

<script>
import HomeSmartphone from '@/components/HomeSmartphone.vue';
import HomeDesktop from '@/components/HomeDesktop.vue';
import Manager from '@/components/manager/Manager.vue';
import Waiter from '@/components/Waiter.vue';
import store from '@/store.js';


export default {
    name: "Home",
    components: { HomeSmartphone, HomeDesktop, Manager, Waiter },

    data() {
        return {
          windowWidth: window.innerWidth,
          store
        };
    },

    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      })
    },

    beforeDestroy() { 
      window.removeEventListener('resize', this.onResize); 
    },

    methods: {  
      onResize() {
        this.windowWidth = window.innerWidth
      }
    }

}
</script>

<style scoped>


</style>
