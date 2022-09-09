<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="currCard" class="modal-title" id="editModalLabel">Edit product</h5>
                        <h5 v-else class="modal-title" id="editModalLabel">Add product</h5>
                        <button type="button" class="btn-close" @click="closeProduct" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                            <div v-if="currCard" class="row" id="deleteButtonRow">
                                <button  @click="deleteProduct" type="button" class="btn btn-outline-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                    </svg>
                                    Delete
                                </button>
                            </div>
                            <UploadComponent @blob="getBlob" :info="currCard" :isModalOpened="isModalOpened"></UploadComponent>
                            <div id="textualDataDiv">
                                <p v-if="errorMessage" style="color:red;">
                                    {{ errorMessage }}
                                </p>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" v-model="name" placeholder="Name">
                                    <label for="floatingInput">Name</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" v-model="price" placeholder="Price">
                                    <label for="floatingInput">Price (w/o $)</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <select v-model="currType" class="form-select" id="floatingSelect" placeholder="Name">
                                        <option>Food</option>
                                        <option>Drink</option>
                                    </select>
                                    <label for="floatingSelect">Type</label>
                                </div>
                                <div class="form-floating  mb-3">
                                    <select v-model="category" class="form-select" id="floatingSelect">
                                        <option v-for="(value, category, index) in categories" :value="category" :key="index">{{category}}</option>
                                    </select>
                                    <label for="floatingSelect">Category</label>
                                </div>
                                <div class="form-floating  mb-3">
                                    <select v-model="subCategory" class="form-select" id="floatingSelect">
                                        <option v-for="(value, subCat, index) in subCategories" :value="value" :key="index">{{value}}</option>
                                    </select>
                                    <label for="floatingSelect">Subcategory</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" v-model="cookingTime" placeholder="Cooking time">
                                    <label for="floatingInput">Cooking time (ex. 25-35 min)</label>
                                </div>
                                <div class="form-floating  mb-3">
                                    <textarea v-model="ingredients" class="form-control floatingTextarea" placeholder="Ingredients" ></textarea>
                                    <label for="floatingTextarea">Ingredients</label>
                                </div>
                                <div class="form-floating  mb-3">
                                    <textarea v-model="description" class="form-control floatingTextarea" placeholder="Description"></textarea>
                                    <label for="floatingTextarea">Description</label>
                                </div>
                                <div class="nutritionDiv">
                                    <h3>Nutrition facts</h3>
                                    <table>
                                        <tr>
                                            <td>Energy value</td>
                                            <td><input  v-model="energy_value"> kcal</td>
                                        </tr>
                                        <tr>
                                            <td>Carbohydrates</td>
                                            <td><input  v-model="carbohydrates"> g</td>
                                        </tr>
                                        <tr>
                                            <td>Protein</td>
                                            <td><input  v-model="protein"> g</td>
                                        </tr>
                                        <tr>
                                            <td>Fat</td>
                                            <td><input  v-model="fat"> g</td>
                                        </tr>
                                        <tr>
                                            <td>Vitamin A</td>
                                            <td><input  v-model="vitamin_a"> mg</td>
                                        </tr>
                                        <tr>
                                            <td>Vitamin C</td>
                                            <td><input  v-model="vitamin_c"> mg</td>
                                        </tr>
                                        <tr>
                                            <td>Calcium</td>
                                            <td><input  v-model="calcium"> mg</td>
                                        </tr>
                                        <tr>
                                            <td>Zinc</td>
                                            <td><input  v-model="zinc"> mg</td>
                                        </tr>
                                    </table>

                                    <p v-if="errorMessage" style="color:red;">
                                    {{ errorMessage }}
                                    </p>
                                </div>

                            </div>
                    </div>
    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeProduct">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveProduct">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class=container>
            <div class="row funkyFont" id="buttonRow">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"> 
                    <h3>
                        <img src="@/assets/AddEmployeeButton.svg" alt="" id="addIcon">
                        <label>Add product</label>
                    </h3>
                </button>
            </div>
            <div class="row funkyFont" id="productsHeader">
                <h1>Products</h1>
            </div>
            <div class="row">
                <div id="search-field">
                    <input 
                        v-model="store.searchText" 
                        type="text"  
                        id="header-search" 
                    />
                    <svg id="search-icon" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </div>
            </div>
            <!--filters-->
            <div class="row" id="filtersRow">
                <div class="filter">
                    <select v-model="currSearchType">
                        <option>Food</option>
                        <option>Drink</option>
                    </select>
                </div>
                <div  class="filter">
                    <select v-model="currSearchCategory">
                        <option v-for="(value, category, index) in searchCategories" :value="category" :key="index">{{category}}</option>
                    </select>
                </div>
                <div  class="filter">
                    <select v-model="currSearchSubCategory">
                        <option v-for="(value, subCat, index) in searchSubCategories" :value="value" :key="index">{{value}}</option>
                    </select>
                </div>
            </div>
            
            <div class="row">
                    <div v-if="loaded===false" class="loader"></div>
                    <Card v-else  @click="openProduct(card)" :key="card.id" v-for="card in cards" :info="card" />  
                    <span v-if="store.searchText!== '' && !cards.length">No results found!</span>
                    <span v-if="!cards.length">Currently no results in this subcategory</span>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store.js'
import { Products, Auth } from '@/services';
import Card from '../ProductCard.vue';
import UploadComponent from './UploadComponent.vue';


export default {
    name: "Products",
    components: { Card, UploadComponent },

    data() {
        return {
            store,
            cards: [],
            currCard: undefined,
            loaded : false,
            imageBlob: null,
            productUrl: undefined,
            productTypes: undefined,
            errorMessage: false,
            categories: undefined,
            subCategories: undefined,
            isModalOpened: false,

            //product info
            name: undefined,
            price: '',
            currType: '',
            category: '',
            subCategory: '',
            cookingTime: '',
            description: '',
            ingredients: '',

            //nutrition data
            energy_value: '',
            carbohydrates: '',
            protein: '',
            fat: '',
            vitamin_a: '',
            vitamin_c: '',
            calcium: '',
            zinc: '',

            //search parameters
            currSearchType: '',
            currSearchCategory: '',
            currSearchSubCategory: 'All',
            searchCategories: undefined,
            searchSubCategories: undefined,
        };
    },
    methods: {

        toggleModal(){
            //refactor and use refs
              $("#editModal").modal("toggle");
              this.isModalOpened = !this.isModalOpened;
        },

        validate(){
            let obj = {
                name: this.name,
                price: this.price,
                type: this.currType,
                category: this.category,
                subCategory: this.subCategory,
                cookingTime: this.cookingTime,
                description: this.description,
                ingredients: this.ingredients,

                //nutrition data
                energy_value: this.energy_value,
                carbohydrates: this.carbohydrates,
                protein: this.protein,
                fat: this.fat,
                vitamin_a: this.vitamin_a,
                vitamin_c: this.vitamin_c,
                calcium: this.calcium,
                zinc: this.zinc,
            }
  
            const isEmpty = Object.values(obj).some(x => x === null || x === '' || x === undefined);
      
            return !isEmpty
        },

        openProduct(card) {
            //for UploadComponent
            this.currCard = card

            this.name = card.name
            this.price = card.price,
            this.currType = card.type,
            this.category= card.category,
            this.subCategory= card.subCategory,
            this.cookingTime= card.cookingTime,
            this.description= card.description,
            this.ingredients = card.ingredients

            //nutrition data
            this.energy_value= card.energy_value,
            this.carbohydrates= card.carbohydrates,
            this.protein= card.protein,
            this.fat= card.fat,
            this.vitamin_a= card.vitamin_a,
            this.vitamin_c= card.vitamin_c,
            this.calcium= card.calcium,
            this.zinc= card.zinc

            this.toggleModal();
            
        },

        closeProduct(){
            this.currCard = undefined
            this.errorMessage = ''
            this.imageBlob = ''
            this.productUrl =''

            this.name = '',
            this.price = '',
            this.currType ='',
            this.category= '',
            this.subCategory= '',
            this.cookingTime= '',
            this.description= '',
            this.ingredients= ''
            
            //nutrition data
            this.energy_value=  '',
            this.carbohydrates=  '',
            this.protein= '',
            this.fat= '',
            this.vitamin_a=  '',
            this.vitamin_c=  '',
            this.calcium=  '',
            this.zinc=  '',

            this.toggleModal();
        },

        getBlob(value) {
            //get value from child component through $emit
            this.imageBlob = value
        },

        saveProduct(){
            if ( this.validate() ){
                this.changeProduct();   
            }
            else{
                this.errorMessage = 'Please provide all data'
            }
           
        },

        async changeProduct() {
            //firebase storage
            if(this.imageBlob){
                let imageName =  'meal/' + Date.now() + '.png';
                let result = await storage.ref(imageName).put(this.imageBlob);
                this.productUrl = await result.ref.getDownloadURL();
            }
            else if (this.currCard) this.productUrl = this.currCard.url
            else this.productUrl = "https://source.unsplash.com/random/400x400/?food"

            //mongo storage when we get firabase storage url
            let product = {
                id: this.currCard?._id, 
                name: this.name,
                price: this.price,
                type: this.currType,
                category: this.category,
                subCategory: this.subCategory,
                cookingTime: this.cookingTime,
                description: this.description,
                ingredients: this.ingredients,
                createdBy: this.currCard?.createdBy || Auth.getUser().username,
                createdAt: this.currCard?.createdAt || Date.now(),
                updatedAt: this.currCard?.updatedAt || Date.now(),
                url: this.productUrl,

                //nutrition data
                energy_value: this.energy_value,
                carbohydrates: this.carbohydrates,
                protein: this.protein,
                fat: this.fat,
                vitamin_a: this.vitamin_a,
                vitamin_c: this.vitamin_c,
                calcium: this.calcium,
                zinc: this.zinc,

            };

            
            //needs success check and success/error notification in further development
            if (this.currCard) await Products.updateProduct(product);
            else await Products.addProduct(product);

            this.closeProduct();
            this.$router.go();
        },


        async deleteProduct(){
            let result = await Products.deleteProduct(this.currCard._id);
             // if(result) console.log('Product deleted successfully')

            this.closeProduct();
            this.$router.go();
           
        }
    },

    async mounted(){
        this.productTypes = this.store.productTypes

        //to trigger watch events
        this.currSearchType = 'Food';
        this.currSearchCategory= 'MainCourse';
        this.currSearchSubCategory = 'All'

        //if (this.cards.length !== 0)  setTimeout(() => { this.loaded=true}, 3000) below temporarely solves the bug of infinite loading when we have empty data in db (empty cards)
        if (true)  setTimeout(() => { this.loaded=true}, 3000)
    },

    watch: {
      'store.searchText': _.debounce(async function(val) {
          this.cards = await Products.fetchProducts(val, this.currSearchType, this.currSearchCategory, this.currSearchSubCategory);
      }, 500),

      'currType': {
        handler: async function(newValue) {
          this.categories = this.productTypes[0][this.currType]
          this.subCategories = []
      }
     },
     'category': {
        handler: async function(newValue) {
        //so modalClose doesn't affect it
        try{
            let subCats = this.productTypes[0][this.currType][this.category] || ''
            this.subCategories = subCats.filter(value => value != 'All')
        }catch{}
         
      }
     },

     //filter
     'currSearchType': {
        handler: async function(newValue) {
          this.searchCategories = this.productTypes[0][this.currSearchType]
          this.searchSubCategories = []

          // hardcoded to select second category if category is not defined yet(example case: type is selected firstly)
          this.currSearchCategory = Object.keys(this.searchCategories)[1]
          this.currSearchSubCategory = 'All'

          //fetch filtered result
          this.cards = await Products.fetchProducts(this.store.searchText, this.currSearchType,  this.currSearchCategory,  this.currSearchSubCategory);
   
      }
     },
     'currSearchCategory': {
        handler: async function(newValue) {
        try{
            this.searchSubCategories = this.productTypes[0][this.currSearchType][this.currSearchCategory] || ''
            this.currSearchSubCategory = 'All'

            //fetch filtered result
            this.cards = await Products.fetchProducts(this.store.searchText, this.currSearchType,  this.currSearchCategory,  this.currSearchSubCategory);
        }catch{}
         
      }
     },
     'currSearchSubCategory': {
        handler: async function(newValue) {
        try{

            //fetch filtered result
            this.cards = await Products.fetchProducts(this.store.searchText, this.currSearchType,  this.currSearchCategory,  this.currSearchSubCategory);
        }catch{}
         
      }
     },
    }
}

  
 
</script>
 
 
<style lang="scss" scoped>
.row{
    width: 100%;
    margin: 0;
}

#buttonRow{
    text-align: right;
    align-items: flex-end;
    display: flex;
    justify-content: flex-end;
}

#buttonRow > button{
    width: fit-content;
    all: unset;
}

#search-field{
    border-bottom: 1px solid #0078D4;
    width:180px;

}

#search-field > input{
    border: none;
    width: 80%;
}

#search-field > input:focus{
    outline: none;
}

#search-icon {
  position: relative; 
  fill: #0078D4;  
  left:15px;
  width: 30px; 
  height: 30px;
  vertical-align: middle; 
  cursor: pointer;
}

#productsHeader{
    margin-bottom:40px;
}

.container{
    margin-top:15px;
    width:100%;
}

#filtersRow{
    padding: 15px 0 30px 0;
    display: flex;
    justify-content: center;
}

#addIcon{
    margin-right:10px;
}


.floatingTextarea{
    height: 100px;
}

option{
    overflow:hidden;
}



.filter{
    display:inline-block;
    display:flex;
    justify-content: center;
    flex-direction:row;
    width:120px;
}

.filter > select {
    min-width:110px;
    // color: #0078D4;
    border-color: #0078D4;
    border-radius: 7px;
}

.form-floating:nth-last-child(2){
    margin-top:10px;
}


//nutrition table
.nutritionDiv> h3{
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        text-align: left;
        margin-top: 20px;
    }
    /*--------------------*/
    table {
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(even) {
        background-color: #f5f5f5;
    }
    /*--------------------*/
    *:focus{
        outline: none;
    }
    td > input{
        height: 40px;
        width: 80%;
        padding-left: 5px;
        font-size: 20px;
        color: black;
        border-radius: 5px;
        border: 1px #0078d459 solid;
        background: #f3f0f0;
    }


.btn-outline-danger{
    background-color:white;
    width: fit-content;
}

#deleteButtonRow{
    display: flex;
    justify-content: flex-end;
}


.form-floating > label{
    color:gray;
}

@media(max-width:500px){
    #search-field > input{
        width: 80%;
    }

    .container{
        margin-top:10px;
    }

    #productsHeader{
        margin-bottom:20px;
    }

    #addIcon{
        width:35px;
        margin-right:10px;
    }

    h3 > label{
        display:none;
    }

}
 
 </style>