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
  <div class="item error" v-if="input&&!filteredCards().length">
     <p>No results found!</p>
  </div>
</div>
    <div style="width: 100%; height: 150px; background-color: aqua;"></div>
    <div class="container">
        <div class="row">   
                <Card v-for="card in filteredCards" :key="card.url" :info="card"/> <!-- vrijednost varijable se prenosi u props info komponente card, dakle u info stavljamo da želimo proslijediti informaciju card, : uputa da vue ne uzima varijabblu kao običan string nego da pogleda unutra što se nalazi i to preda childu-->
        </div>
    </div>
</template>


<script>
import Card from '@/components/Card.vue'
import store from '@/store.js'

export default {
  name: 'FoodList',
  components: {
    Card
},
    data() { 
        return {
            //ne treba u store.js slati jer ne treba biti vidljiv ostalim komponentama, ali inace dobra praksa za ostale stvari
            searchText:"",
            store
        }
    },

    computed: {
        filteredCards() {
            console.log(this.searchText)
            return this.store.cards.filter(card => card.name.toLowerCase().includes(this.searchText.toLowerCase()))
        }
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

</style>