<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="currCard" class="modal-title" id="editModalLabel">Edit employee</h5>
                        <h5 v-else class="modal-title" id="editModalLabel">Add employee</h5>
                        <button type="button" class="btn-close" @click="closeEmployee" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                            <div v-if="currCard" class="row" id="deleteButtonRow">
                                <button  @click="deleteEmployee" type="button" class="btn btn-outline-danger">
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
                            
                                <div v-if="currCard" class="form-floating mb-3">
                                    <input type="text" class="form-control" id="id" v-model="id" placeholder="id" disabled>
                                    <label for="id">ID</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="fullName" v-model="fullName" placeholder="Full name">
                                    <label for="fullName">Full name</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="email" v-model="email" placeholder="Name">
                                    <label for="email">Email</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="dateOfBirth" v-model="dateOfBirth" placeholder="Date of birth">
                                    <label for="dateOfBirth">Date of birth (DD/MM/YYY)</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" v-model="phone" placeholder="Phone number">
                                    <label for="floatingInput">Phone number</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="city" v-model="city" placeholder="City">
                                    <label for="city">City</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="postalCode" v-model="postalCode" placeholder="Postal code">
                                    <label for="postalCode">Postal code</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="address" v-model="address" placeholder="Adress">
                                    <label for="address">Adress</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="wage" v-model="wage" placeholder="Wage">
                                    <label for="wage">Wage (monthly, brutto)</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
                                    <label for="password">Password</label>
                                </div>
                               
                                <div class="form-floating mb-3">
                                    <select v-model="contract" class="form-select" id="contract" placeholder="contract">
                                        <option>Permanent</option>
                                        <option>Fixed-term</option>
                                        <option>Casual</option>
                                    </select>
                                    <label for="contract">Contract</label>
                                </div>
                                <div class="form-floating  mb-3">
                                    <select v-model="employeeType" class="form-select" id="employeeType">
                                        <option v-for="(value, index) in employeeTypes" :value="value" :key="index">{{value}}</option>
                                    </select>
                                    <label for="employeeType">Type</label>
                                </div>
                            </div>
                    </div>
    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeEmployee">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveEmployee">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class=container>
            <div class="row funkyFont" id="buttonRow">
                <button type="button" class="btn btn-primary" @click="toggleModal"> 
                    <h3>
                        <img src="@/assets/AddEmployeeButton.svg" alt="" id="addIcon">
                        <label>Add Employee</label>
                    </h3>
                </button>
            </div>
            <div class="row funkyFont" id="productsHeader">
                <h1>Employees</h1>
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
                        <option v-for="(value, index) in employeeTypes" :value="value" :key="index">{{value}}</option>
                    </select>
                </div>
            </div>
            
            <div class="row">
                    <div v-if="loaded===false" class="loader"></div>
                    <Card v-else  @click="openEmployee(card)" :key="card.id" v-for="card in cards" :info="card" />  
                    <span v-if="store.searchText!== '' && !cards.length">No results found!</span>
                    <span v-if="!cards.length">Currently no results in this category</span>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store.js'
import {Auth, Employees } from '@/services';
import Card from './EmployeeCard.vue';
import UploadComponent from './UploadComponent.vue';


export default {
    name: "Employees",
    components: { Card, UploadComponent },

    data() {
        return {
            store,
            cards: [],
            currCard: undefined,
            loaded : false,
            imageBlob: null,
            employeeImgUrl: undefined,
            errorMessage: false,
            employeeTypes: undefined,
            isModalOpened: false,

            //employeeInfo
            id: '',
            email: '',
            password: '',
            fullName: '',
            dateOfBirth: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            position: '',
            contract: '',
            wage: '',
            employeeType: '',
            password: '',

            //search parameters
            currSearchType: '',
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
                email: this.email,
                password: this.password,
                fullName: this.fullName,
                dateOfBirth: this.dateOfBirth,
                phone: this.phone,
                address: this.address,
                city: this.city,
                postalCode: this.postalCode,
                contract: this.contract,
                wage: this.wage,
                employeeType: this.employeeType,
                password: this.password,
            }
  
            const isEmpty = Object.values(obj).some(x => x === null || x === '' || x === undefined);
      
            return !isEmpty
        },

        openEmployee(card) {
            //for UploadComponent
            this.currCard = card

            //employee info
            this.id = card._id
            this.email = card.username, //bcs its switched in db
            this.password = card.password,
            this.fullName = card.fullName,
            this.dateOfBirth = card.dateOfBirth,
            this.phone = card.phone,
            this.address = card.address,
            this.city = card.city,
            this.postalCode = card.postalCode,
            this.contract = card.contract,
            this.wage = card.wage,
            this.employeeType = card.type,
            this.password = card.password,

            this.toggleModal();
            
        },

        closeEmployee(){
            this.currCard = undefined
            this.errorMessage = ''
            this.imageBlob = ''
            this.employeeImgUrl =''

            //employee info
            this.email= '',
            this.password= '',
            this.fullName= '',
            this.dateOfBirth= '',
            this.phone= '',
            this.address= '',
            this.city= '',
            this.postalCode= '',
            this.position= '',
            this.contract= '',
            this.wage= '',
            this.employeeType= '',
            this.password= '',

            this.toggleModal();
        },

        getBlob(value) {
            //get value from child component through $emit
            this.imageBlob = value
        },

        saveEmployee(){
            if ( this.validate() ){
                this.changeEmployee();   
            }
            else{
                this.errorMessage = 'Please provide all data'
            }
           
        },

        async changeEmployee() {
            //firebase storage
            if(this.imageBlob){
                let imageName =  'meal/' + Date.now() + '.png';
                let result = await storage.ref(imageName).put(this.imageBlob);
                this.employeeImgUrl = await result.ref.getDownloadURL();
            }
            else if (this.currCard) this.employeeImgUrl = this.currCard.url
            else this.employeeImgUrl = "https://source.unsplash.com/random/400x400/?food"

            //mongo storage when we get firabase storage url
            let employee = {
                id: this.currCard?._id,
                email: this.email,
                password: this.password,
                fullName: this.fullName,
                dateOfBirth: this.dateOfBirth,
                phone: this.phone,
                address: this.address,
                city: this.city,
                postalCode: this.postalCode,
                contract: this.contract,
                wage: this.wage,
                employeeType: this.employeeType,
                password: this.password,
                url: this.employeeImgUrl,

                //metadata
                createdBy: this.currCard?.createdBy || Auth.getUser().username,
                createdAt: this.currCard?.createdAt || Date.now(),
                updatedAt: this.currCard?.updatedAt || Date.now(),
                

            };

            
            //needs success check and success/error notification in further development
            if (this.currCard) await Employees.updateEmployee(employee);
            else await Employees.addEmployee(employee);

            this.closeEmployee();
            this.$router.go();
        },


        async deleteEmployee(){
            let result = await Employees.deleteEmployee(this.currCard._id);
             // if(result) console.log('Employee deleted successfully')

            this.closeEmployee();
            this.$router.go();
           
        }
    },

    async mounted(){
        this.employeeTypes =  await Employees.getEmployeeTypes();

        //to trigger watch events
        this.currSearchType = 'waiter';


        //test this line below - it isnt needed since this.curr... variables trigger watch events and fetchEmployees()
        this.cards = await Employees.fetchEmployees('', this.currSearchType || 'waiter');
    
        //if (this.cards.length !== 0)  setTimeout(() => { this.loaded=true}, 3000) below temporarely solves the bug of infinite loading when we have empty data in db (empty cards)
        if (true)  setTimeout(() => { this.loaded=true}, 3000)
    },

    watch: {
      'store.searchText': _.debounce(async function(val) {
          this.cards = await Employees.fetchEmployees(val, this.currSearchType);
      }, 500),


     //filter
     'currSearchType': {
        handler: async function(newValue) {

          //fetch filtered result
          this.cards = await Employees.fetchEmployees(this.store.searchText, this.currSearchType);
   
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