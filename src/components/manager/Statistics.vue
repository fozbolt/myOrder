<template>
    <div>
        <!--not a best solution but better than 1 graph=1 route-->
        <iframe v-if="chartName === 'firstChart'"  style="background: #F1F5F4;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/dashboards?id=631a4d8e-39af-4ebe-8376-42d95ac9ac93&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
        <iframe v-else-if="chartName === 'secondChart'" style="background: #F1F5F4 ;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/dashboards?id=631a4d8e-39af-4ebe-8376-42d95ac9ac93&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"></iframe>
    </div>
</template>

<script>
 

export default {
    name: "Statistics",
    data() {
        return {
            //let first be the default one
            chartName: 'firstChart'
        };
    },
    methods: {},
    mounted(){
        this.chartName = this.$route.params.chartName
    },

    watch:{
        "$route.params.chartName": { 
            handler (val, oldVal) {
                this.chartName = this.$route.params.chartName
            }
        }
    }
}
  

</script>

<style lang="scss">
iframe{
    height:75vh;
    width:75vw;
}


</style>