<template>
    <div>
        <Sidebar/>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <router-view ></router-view>
                </div>
            </div>
        </div>
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
        this.$router.push({name: 'products'})
    }
}
  
 
 </script>
 
 
 <style lang="scss">
 

 
 </style>