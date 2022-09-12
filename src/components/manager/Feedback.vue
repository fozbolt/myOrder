<!-- source: design: https://codepen.io/themefisher/pen/EZzREe, functionality: https://codepen.io/VladKvaskov/pen/GPxbXQ?editors=1010  -->
<template>
    <div>
        <FeedbackCard v-for="feedback in feedbacks" :key="feedback._id"  :info="feedback"/>
    </div>
</template>
 
<script>
import { Products } from '@/services';
import FeedbackCard from './FeedbackCard.vue';
 
 export default {
    name: "Newsletter",
    components: { FeedbackCard },

    data() {
        return {
            feedbacks: [],
        };
    },
    methods: {},
    async mounted() {
        this.feedbacks = await Products.fetchFeedbacks();
    },
    
}
  
 
 </script>
 
 
 <style lang="scss" scoped>
 

 </style>