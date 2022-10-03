<template>
  <div>
     <!-- Modal -->
     <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 v-if="currCard.status==='new'" class="modal-title" id="exampleModalLabel">Mark as finished?</h5>
                <h5 v-else class="modal-title" id="exampleModalLabel">Mark as unfinished / new?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
      
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" class="btn btn-primary" @click="updateCard" data-bs-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>

        <div class="dummyDivNeededForSuspenseToWork"> <!--https://qdmana.com/2022/03/202203271244076861.html-->
           <HorizontalScrollerCalls/>
          <div class="tab-content p-3" id="myTabContent">
            <div class="row"  ref="row">   
                <div v-if="loaded===false" class="loader"></div>
                <Card v-else @click="currCard = card" :key="card._id" v-for="card in cards" :info="card" data-bs-toggle="modal" data-bs-target="#Modal" />  
                <span v-if="store.searchText!== '' && !cards.length">No results found!</span>
                <span v-if="!cards.length">Currently no results in this subcategory</span>
            </div>
          </div>
        </div>
  </div>
       
</template>
  
  <script>
  import Card from '@/components/staff/CallCard.vue'
  import HorizontalScrollerCalls from '@/components/staff/HorizontalScrollerCalls.vue'
  import store from '@/store.js'
  import { Orders } from '@/services';
  import _ from 'lodash';
  
  export default {
    name: 'CurrentTabCalls',
    props: ['info'],  
  
    components:{ Card, HorizontalScrollerCalls },
  
    data() { 
          return {
              store,
              cards: [],
              loaded : false,
              currCard: { 
                status: 'new'
              }
              
          }
      },
  
     async created() {

          this.$watch(
          (vm) => [vm.store.selected_call_status],
          async (val)  => {
            this.cards = await Orders.fetchCalls(this.store.searchText, this.store.selected_call_status);

            //loader turns off after cards are fetched or after 2 seconds of unsuccessful fetching
            if (this.cards.length !== 0)  setTimeout(() => { this.loaded=true}, 2000)
            else this.loaded=true
            
            this.store.searchText = ''
        
          },
          {
            immediate: true, //immediate set to true means we watch the initial value of the reactive properties.
            deep: true, //deep set to true means we watch for changes of properties in all levels of an object.
          }
        );


        setInterval(async() =>{
            this.cards = await Orders.fetchCalls(this.store.searchText, this.store.selected_call_status);
            
          },30000)
     },
  
      methods: {
          async updateCard() {
              if(this.currCard.status === 'new') this.currCard.status = 'finished';
              else this.currCard.status = 'new'; 

              this.currCard.updatedAt = Date.now();

              await Orders.updateCall(this.currCard);
              this.$router.go();
          },


          getScreenHeight(){
            setTimeout(()=>{
                try{
                    this.store.clientHeightRow = this.$refs.row.clientHeight || 0
                }catch(e){}
            }, 250)
        }
  
  
    },
  
      watch: {
        //deprecated or not?
        'store.searchText': _.debounce(async function(val) {
            this.cards = await Orders.fetchCalls(val, this.store.selected_call_status);
        }, 500),


        'store.selected_call_status': {
            handler: function() {

                this.getScreenHeight();
                }
            },
  
    },


    mounted(){
      setTimeout(()=>{
        try{
            this.store.clientHeightRow = this.$refs.row.clientHeight || 0
          }catch(e){}
        },3000)
    },


    beforeUnmount(){
      this.store.searchText = ''
    }
  
    
  
  
  }
   
  
</script>
   
  
  
<style lang="scss">
  
.row{
    justify-content: space-evenly;
    display:flex;
}

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 0.5s linear infinite;
}


.dummyDivNeededForSuspenseToWork{
    margin-top:20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); 
    }
}


@media(min-width:1200px){
    .tab-content{
        padding-top: 50px;
    }
    }

</style>