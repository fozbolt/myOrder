<template>
    <div class="container" >
        <div class="line">
            <h2 class='lineUp funkyFont'>Thank 
                <label class="brandColor"> you </label>
            </h2>
        </div>
        <button @click="clearOrder" id="newOrderBtn" class="btn btn-primary feedbackButtons funkyFont">New order</button>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import store from '@/store';

$(function () {
  $('[data-bs-toggle="tooltip"]').tooltip()
})


export default {
    name: "FinishedOrder",
    components: { Footer },

    data() {
        return {
          store,
        };
    },
    methods:{
        clearOrder(){
            localStorage.removeItem('orderID');

            this.$router.push({ path: '/' });
        }
    },

    created(){
        if(!Boolean( JSON.parse(localStorage.getItem('orderID') ))){
            this.$router.push({path: '/'})
        }
    }
}
</script>


<style lang="scss" scoped>

//source: https://codepen.io/alvarotrigo/pen/NWvQObB
.line {
    width: 100%;
    height: 85vh;
    display: flex;
    align-items: center;
    vertical-align: top;
    justify-content: center;
//   overflow: hidden;
}

.lineUp {
  animation: 5s anim-lineUp ease-out;
  font-size:4rem;
}
@keyframes anim-lineUp {
  0% {
    opacity: 0;
    transform: translateY(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}

#newOrderBtn{
    background-color: #0078D4;
    background-color: #818283;
    border:none;
    font-size:2.5vh;
}


</style>