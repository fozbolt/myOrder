<template>
  <div id="search-field">
  <input 
        v-model="searchText" 
        type="text"  
        id="header-search" 
        placeholder="Search..." />
  <svg id="search-icon" class="search-icon" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
</div>
    <div id="filter">
      <div id="type">
        <h5 class="type-item"><b>Food</b></h5>
        <h5 class="type-item"><b>Drink</b></h5>
      </div>
      <div id="category">
        <h6 class="category-item"><b>Appetizer</b></h6>
        <h6 class="category-item"><b>Main course</b></h6>
        <h6 class="category-item"><b>Desert</b></h6>
      </div>
  
     <div id="sub-category">
        <h6 class="sub-category-item"><b>Pizza</b></h6>
        <h6 class="sub-category-item"><b>Burgers</b></h6>
        <h6 class="sub-category-item"><b>Forky</b></h6>
        <h6 class="sub-category-item"><b>Sweet</b></h6>
        <h6 class="sub-category-item"><b>Salads</b></h6>
      </div>
    </div>
    <div class="container">
        <div class="row">   
                <Card :key="card.id" v-for="card in cards" :info="card"/> <!-- vrijednost varijable se prenosi u props info komponente card, dakle u info stavljamo da želimo proslijediti informaciju card, : uputa da vue ne uzima varijabblu kao običan string nego da pogleda unutra što se nalazi i to preda childu-->
                <span v-if="searchText!== '' && !cards.length">No results found!</span>
        </div>
    </div>
</template>


<script>
import Card from '@/components/Card.vue'
import store from '@/store.js'
import { Posts } from '@/services';
import _ from 'lodash';

export default {
  name: 'FoodList',
  components: {
    Card
},
    data() { 
        return {
            //ne treba u store.js slati jer ne treba biti vidljiv ostalim komponentama, ali inace dobra praksa za ostale stvari
            searchText:"",
            store,
            cards: []
        }
    },

    created() {
        this.fetchPosts();
    },

    methods: {
        async fetchPosts(term) {
            term = term || store.searchTerm;        
            let result = await Posts.getAll(term)

            //this.cards = Array.isArray(result) ? result.sort((a, b) => a.posted_at.localeCompare(b.posted_at)) : result;
            this.cards = _.sortBy( result, 'price' ).reverse();
      
        },
        gotoDetails(card) {
            this.$router.push({ path: `post/${card.id}` });
        }
    },

     watch: {
        //deprecated
        'searchText': _.debounce(function(val) {
            this.fetchPosts(val);
        }, 500)
    },


}
</script>


<style lang="scss">


//search
#search-field{
  width: 100%;
  background: rgba(196, 196, 196, 0.15); 

}

#header-search {
  display: inline-block; 
  width: 95%; 
  height: 32px;  color: black; 
  border: none; 
  outline: none;
  background:transparent;
  font-size: 12pt; 
  padding: 4px 28px 4px 20px; 
  vertical-align: middle;
}
#search-icon {
  position: relative; 
  right: 5px;
  fill: gray; 
  width: 5%; 
  height: 24px;
  vertical-align: middle; 
  cursor: pointer;
}

#filter{
   width: 100%; 
   height: 150px;
}


#type{
  width: 100%;
  height: 50px;
  text-align: center;
}


.type-item{
  width: fit-content;
  margin: 5px;
  padding:5px;
  display: inline-block; /*when inline you can use text-align on parent */
}

#category{
  width: 100%;
  height: 50px;
  text-align: center;
}


.category-item{
  width: fit-content;
  margin: 5px;
  padding:5px;
  display: inline-block; /*when inline you can use text-align on parent */
}


#sub-category{
  width: 100%;
  height: fit-content;
  text-align: center;
  border-style: solid;
  border-color: #B8A929;
  border-width: 1px 0 1px 0;
}


.sub-category-item{
  display: inline-block; /*when inline you can use text-align on parent */
  width: fit-content;
  padding: 2px 12px;
  margin: 0px;

}

</style>