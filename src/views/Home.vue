<template>

    <HomeSmartphone v-if="store.userType==='customer' && windowWidth < 500"/>
    <HomeDesktop v-else-if="store.userType==='customer'"/>

    <Manager v-else-if="store.userType==='manager'" />
    <Staff v-else-if="store.userType==='chef' || store.userType==='barman' || store.userType==='waiter'" />

</template>

<script>
import HomeSmartphone from '@/components/HomeSmartphone.vue';
import HomeDesktop from '@/components/HomeDesktop.vue';
import Manager from '@/components/manager/Manager.vue';
import Staff from '@/components/staff/Staff.vue';
import store from '@/store.js';


export default {
    name: "Home",
    components: { HomeSmartphone, HomeDesktop, Manager, Staff },

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
