<template>
    <div>
        <Sidebar/>
        <router-view/>
    </div>
</template>

 <script>
import Sidebar from './Sidebar.vue';
 

export default {
    name: "Manager",
    data() {
        return {};
    },
    methods: {},
    components: { Sidebar },

    created(){
        //redirect to child route as soon as we arrive to '/'
        if(this.$route.path === '/') this.$router.push({name: 'products'})
    }
}
  
 
 </script>
 
 
 <style lang="scss">
 

 
 </style>