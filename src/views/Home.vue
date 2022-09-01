<template>
  <HomeSmartphone v-if="windowWidth < 500"/>
  
  <HomeDesktop v-else/>
</template>


<script>
import HomeSmartphone from '@/components/HomeSmartphone.vue';
import HomeDesktop from '../components/HomeDesktop.vue';


export default {
    name: "Home",
    components: { HomeSmartphone, HomeDesktop },

    data() {
        return {
          windowWidth: window.innerWidth
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
