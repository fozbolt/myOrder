<template>
 <div class="container" id=pageContent>
   <!--toast-->
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="basicToast" ref="basicToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header text-light">
                <img id="successIcon" src="@/assets/successIcon.png"/>
                <!-- <i class="fa-regular fa-circle-check fa-bounce"></i> -->
                <h6 class="my-0">Your feedback is submited</h6>
            </div>
            <!-- <div class="toast-body">
            I'll leave this body if needed later
            </div> -->
        </div>  
    </div>

    <div id="whiteCircleTop"></div>
    <div id="whiteCircleBottom"></div>
       <div id=reviewContainer>
        <h1 id="header">Please leave your feedback and help us improve</h1>

        <div id="reviewBox">
          <div class="row" v-for="(value, key) in starRating" :key="key">
              <span class="questionText">
                <div class="col">
                  {{key}}?
                </div>
                <div class="col">
                    <!--source: https://www.npmjs.com/package/vue-star-rating-->
                    <star-rating 
                        v-model="starRating[key]" 
                        :show-rating="false" 
                        :star-size="30" 
                        :glow="10" 
                        glow-color="#ffd055" 
                        :rounded-corners="true" 
                        :border-width="1"
                        @update:rating=" starRating[key] = $event"/>
                    <!-- <div style="margin-top:10px;font-weight:bold;">{{currentRatingText}}</div> -->
                </div>
              </span>
            </div> 
            <div  class="contentNotes"><textarea v-model="textualNote" placeholder="Additional comment"  /></div>
          </div>

        <div id="buttonsRow">
           <button @click="this.$router.go(-1)" id="cancelBtn" class="btn btn-primary feedbackButtons funkyFont">Cancel</button>
           <button @click="submitFeedback" id="submitBtn" class="btn btn-primary feedbackButtons funkyFont">Submit</button>
        </div>      
       </div>
       <FloatingMenu></FloatingMenu>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import StarRating from 'vue-star-rating'
import store from '@/store';
import { Products } from '@/services';
import FloatingMenu from '@/components/customer/FloatingMenu.vue';

export default {
    name: "Navbar",
    components: { Footer, StarRating, FloatingMenu },

    data() {
        return {
          store,
          starRating: {
            'How accurate was the product description': null,
            'How satisfied were you with the service': null,
            'How quickly did order arrive': null,
            'Overall': null
          },
          textualNote: ''
        };
    },
    methods: {
        async submitFeedback() {
            let orderData = await this.getStatus();
          
            let feedbackData={
              rating: this.starRating,
              comment: this.textualNote,
              time: Date.now(),
              orderNumber: orderData.orderInfo.orderNumber,
              orderId: orderData._id
            }

      
            let success = await Products.saveFeedback(feedbackData)

            let button = this.$refs['basicToast']
            new bootstrap.Toast(button).show();

            if (success){
              this.store.feedbackLeft = true;

              setTimeout(() =>{
                this.$router.go(-1)
              },3000)
            }
        },

        async getStatus(){
          let id = JSON.parse(localStorage.getItem('orderID')); 
          return await Products.getOrder(id);
      }
    },


    mounted(){
      this.getStatus();
    },


    created(){
        if(!Boolean( JSON.parse(localStorage.getItem('orderID') ))){
          this.$router.push({path: '/'})
        }
    }
  

    // computed: {
    //   currentRating() {
    //     return this.starRating
    //     },    
    // },

}

</script>


<style lang="scss" scoped>

#pageContent{
  width: 100vw;
  height: 100vh;
  background-color: #0078D4 ;
}

#whiteCircleTop{
    position: absolute;
    height: 631px;
    width: 534px;
    left: -9px;
    top: -187px;
    border-radius: 0px;
    background: white;
    border-radius: 100%;

}

#whiteCircleBottom{
    position: absolute;
    height: 631px;
    width: 534px;
    left: -153px;
    top: 432px;
    border-radius: 0px;
    background: white;
    border-radius: 100%;

}

#statusContent{
  position:relative;
  top:0;
  left:0;
  z-index:1;
}

#reviewContainer{
  width:100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}


#buttonsRow{
    display: flex; 
    justify-content: space-evenly;
}

#cancelBtn{
  background-color: #FF4242;
}

#submitBtn{
  background-color: #0078D4;
}


.feedbackButtons{
    z-index: 2;
    border: none;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    height: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
  
}


#reviewBox{
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: 65%;
  background-color: rgba(185, 185, 185, 0.8);
  z-index:2;
  border-radius:5px;
  height: fit-content;
}

#reviewBox > .row{
  padding: 15px 0px;
}

.contentNotes {
  padding: 0 5px;
  min-height: fit-content;
  min-width: fit-content;
  margin-bottom: 5px;
}

.contentNotes > textarea{
    width: 95%; 
    min-height: 100px; 
    // border:1px solid #6F6969; 
    border:none;
    resize:none;
    border-radius: 10px;
    padding:5px;
    margin-top: 4vh;
}

.questionText{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

}

#header{
  z-index:1;
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 300;
  font-size: 22px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 3vh;
  margin-left: 10px;
  margin-right: 10px;
  margin-top:5vh;
  margin: 5vh 10px 2vh;
  
}

#questionText > .col{
  text-align: center;
  padding: 0px 5px;
}


.vue-star-rating {
    justify-content: center;
}


.toast-container {
    overflow: hidden;
    position: relative;
    z-index:10;
}



@media (min-width:800px){
  #whiteCircle{
    width: 130vw;
    height: 120vh;
    left: -25vw;
    top: -25vw;
    background: white;
    border-radius: 100%;
  }

  #reviewBox{
    width:50%;
  }

  .questionText{
    font-size:1.5rem;
    line-height: 22px;
  }

  #header{
    font-size:2rem;
  }

  .questionText > col{
    line-height: normal;
  }

  #whiteCircleTop{
    height: 156vh;
    width: 117vw;
    left: 24vw;
    top: -90vh;
  }

  #whiteCircleBottom{
    height: 156vh;
    width: 117vw;
    left: -28vw;
    top: 55vw;
  }
}


@media (min-width: 1100px){
  #whiteCircleTop{
    // height: 1200px;
    // width: 1200px;
    // left: 628px;
    // top: -650px;
    height: 133vh;
    width: 75vw;
    left: 35vw;
    top: -72vh;
  }

  #whiteCircleBottom{
    // height: 1200px;
    // width: 1200px;
    // left: 61px;
    // top: 432px;
    height: 133vh;
    width: 75vw;
    left: 2vw;
    top: 454px;
  }
}

</style>