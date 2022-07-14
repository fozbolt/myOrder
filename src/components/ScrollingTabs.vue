<template>
    <!--u bookmarksima se nalaze bolji dizajni pa implementirati to kasnije--> 
    <div class="container">
        <nav class="nav nav-tabs list mt-2" id="myTab" role="tablist">
            <ul class="nav nav-tabs" @click="selectValue($event)">
                <li >
                    <a class="nav-item nav-link pointer active" data-bs-target="#tab1"  role="tab"   data-bs-toggle="tab" aria-controls="public" aria-expanded="true">All</a>
                </li>
                <li >
                    <a class="nav-item nav-link pointer" data-bs-target="#tab2" role="tab"  data-bs-toggle="tab"  >Burgers</a>
                </li>
                <li >
                     <a class="nav-item nav-link pointer" data-bs-target="#tab3" role="tab" data-bs-toggle="tab">Pizza</a>
                </li>
                <li>
                     <a class="nav-item nav-link pointer" data-bs-target="#tab4" role="tab" data-bs-toggle="tab">Forky</a>
                </li>
                <li>
                     <a class="nav-item nav-link pointer" data-bs-target="#tab5" role="tab" data-bs-toggle="tab">Sweet</a>
                </li>
                <li>
                     <a class="nav-item nav-link pointer" data-bs-target="#tab6" role="tab" data-bs-toggle="tab">Salads</a>
                </li>
                <li>
                     <a class="nav-item nav-link pointer" data-bs-target="#tab7" role="tab" data-bs-toggle="tab">Other</a>
                </li>
            </ul> 
        </nav>
    </div>
    <div class="tab-content p-3" id="myTabContent">
          <div class="row">   
                <Card :key="card.id" v-for="card in cards" :info="card"/> <!-- vrijednost varijable se prenosi u props info komponente card, dakle u info stavljamo da želimo proslijediti informaciju card, : uputa da vue ne uzima varijabblu kao običan string nego da pogleda unutra što se nalazi i to preda childu-->
                <span v-if="store.searchText!== '' && !cards.length">No results found!</span>
          </div>
   
   </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { Posts } from '@/services';
import _ from 'lodash';
import store from '@/store.js'

export default {
  name: 'ScrollingTabs',
  props: ['info'],  

  components:{Card},

  data() { 
        return {
            store,
            cards: [],
            selectedSubCategory: 'All'
        }
    },

    created() {
        this.fetchPosts();
    },

    methods: {
        async fetchPosts(term) {
            term = term || store.searchTerm;        
            let result = await Posts.getAll(term, this.store.type, this.store.category, this.selectedSubCategory)

            //this.cards = Array.isArray(result) ? result.sort((a, b) => a.posted_at.localeCompare(b.posted_at)) : result;
            this.cards = _.sortBy( result, 'price' ).reverse();
      
        },
        gotoDetails(card) {
            this.$router.push({ path: `menu/${card.id}` });
        },
        selectValue (event) {
        this.selectedSubCategory = event.target.innerHTML;
      }
  },

     watch: {
        //deprecated or not?
        'store.searchText': _.debounce(function(val) {
            this.fetchPosts(val);
        }, 500),

        selectedSubCategory: {
          handler: function(newValue) {
            this.fetchPosts();
      }
    }
    },


}
 

</script>
 


<style lang="scss">

.container{
  padding-left: 0px;
  padding-right: 0px;
}

//izvor horizontal navbara: https://bootsnipp.com/snippets/bpP0r
.nav-tabs {
  display: inline-flex;
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none; /*// IE 10+*/
  overflow: -moz-scrollbars-none;/*// Firefox*/
  border-style: solid;
  border-color: #B8A929; 
  border-width: 0.5px 0 0.5px 0;
  margin: -3px 0 -3px 0;
  background-color: none; // bila je ova i ona omogucava white overflow koji ce mi trebati background-color: var(--bs-nav-tabs-link-active-bg);
  --bs-nav-tabs-border-width: 0px;
  //--bs-nav-tabs-border-color: #dee2e6;
  // --bs-nav-tabs-border-radius: 0.375rem;
  // --bs-nav-tabs-link-hover-border-color: #e9ecef #e9ecef #dee2e6;
  --bs-nav-tabs-link-active-color: #0078D4;
  //--bs-nav-tabs-link-active-bg: #fff;
  //--bs-nav-tabs-link-active-border-color: #dee2e6 #dee2e6 #fff;
  //border-bottom: var(--bs-nav-tabs-border-width) solid var(--bs-nav-tabs-border-color);
}
.nav-tabs>li.active>a,
.nav-tabs>li.active>a:focus,
.nav-tabs>li.active>a:hover {
  border-width: 0;
}



.nav-tabs>li>a {
  border: none;
  color: black;
  font-weight: bold;
}


.nav-tabs>li.active>a,
.nav-tabs>li>a:hover {
  border: none;
  color: #0078D4 !important;
  background: transparent;
}
.nav-tabs>li>a::after {
  content: "";
  background: white; //digne malo active tab pa izgleda kao animacija - ako zelimo da dole nema obruba ovo bi trebalo spustiti
  height: 2px;
  position: absolute;
  width: 100%;
  left: 0px;
  bottom: 1px;
  transition: all 250ms ease 0s;
  transform: scale(0);
}
.nav-tabs>li.active>a::after,
.nav-tabs>li:hover>a::after {
  transform: scale(1);
}
.tab-nav>li>a::after {
  background: #21527d none repeat scroll 0% 0%;
  color: #fff;
}
.tab-pane {
  padding: 15px 0;
}
.tab-content {
  padding: 0px 20px;
}

.nav-tabs::-webkit-scrollbar {
  display: none; /*Safari and Chrome*/
}
.tabCards {
  background: #FFF none repeat scroll 0% 0%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
  display: block;
}

.nav>li>a {
    position: relative;
    display: block;
    padding: 0px 17.5px;
    
}
.nav{
    flex-wrap: inherit; 
}




@media (min-width:767px){
 .nav-tabs{
  width:600px;
 }
}
</style>