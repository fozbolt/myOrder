<template>
    <div>
        <!--not a best solution but better than 1 graph=1 route-->
        <iframe v-if="chartName === 'allCharts'"  style="background: #F1F5F4;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/dashboards?id=631a4d8e-39af-4ebe-8376-42d95ac9ac93&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
        
        <iframe v-if="chartName === 'employees'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=77b544a2-b5c9-48b2-9c1b-35cfca7276eb&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        <iframe v-if="chartName === 'employees'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=633adda9-1699-4f0b-826e-52323c2fb9c4&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        <iframe v-if="chartName === 'employees'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=77bae6cd-d07a-4567-aec5-9f1d74c9a51f&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        
        <iframe v-if="chartName === 'orders'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=6338a622-075a-4720-85d5-14c2aff10f80&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        <iframe v-if="chartName === 'orders'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=631a560a-e69b-443a-8d7b-adfbf202f03f&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        <iframe v-if="chartName === 'orders'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=633885f7-1699-4135-8478-52323cb4b914&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        <iframe v-if="chartName === 'orders'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=b5f20bc8-9b48-4431-a297-edc10fa92747&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        <iframe v-if="chartName === 'orders'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=6338b154-9f7b-4645-8f03-45f56047f0cd&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>

        <iframe v-if="chartName === 'calls'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=334f95f6-26bd-470f-9659-6ced44581943&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        <iframe v-if="chartName === 'calls'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=1db65fb4-3de0-42c2-bd17-e1b637247386&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        <iframe v-if="chartName === 'calls'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=63388a2b-9f7b-42d8-809d-45f56017d178&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>


        <iframe v-if="chartName === 'products'" id="soloFrame" style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-myorder-paiij/embed/charts?id=6338aea7-7691-4657-8603-dee4c7c40bc1&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        
    </div>
</template>

<script>
 

export default {
    name: "Statistics",
    data() {
        return {
            //let first be the default one
            chartName: 'allCharts'
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
    height:200vh;
    width:100vw;
    padding: 10px 50px;
    margin:auto;
    overflow-x: hidden;
}

#soloFrame{
    height:80vh;
    width: auto;
    padding:5px;
}


</style>