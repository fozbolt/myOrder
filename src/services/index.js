import axios from 'axios';
import $router from '@/router'
import store from '@/store.js';


// axios instance for myOrder backend
let Api = axios.create({
    // baseURL: 'http://localhost:5000/',
    baseURL: 'https://my-order.herokuapp.com/',
    timeout: 20000, 
});


Api.interceptors.request.use((request) => {
    try {
        request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
    } catch (e) {
        console.error(e);
    }
    //adds token to header and returns/send it with requests on backend
    return request;
});


//this interceptor is added because it can happen that we add token and token goes to backend, backend figures out that token expired and returns 401 error, so this interceptor reroutes us to /login
Api.interceptors.response.use( 
    (response) => {return response},
    (error) => {
        if (error.response.status == 401) {
            if($router.app.$route.name != "Login") $router.push({ path: '/login'})
            Auth.logout();
        }
    }
);


let Auth = {
    async register(new_user){
        //password goes through SSL so it isn't necessary to hash it in post request?
        const response = await Api.post('/register', {new_user});
        
        if(!response)
            return false
        
        if(response.data) 
            return this.login({'username': new_user.username, 'password': new_user.password});
    },


    async login(login_info){
        const response = await Api.post('/auth', login_info)
        
        if(!response) return false

        if(response.data){
            let user = response.data
            localStorage.setItem('user', JSON.stringify(user));
            store.userType = user.type
            
            return true
        }
    },

    async changePassword(userData){
        return await Api.patch('/change_password', userData);
    },
    logout() {
        localStorage.removeItem('orderID');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        localStorage.removeItem('table');
        $router.go(); //this should be enough
        
        //this.$router.push({ path: `/login` });
    },
    isAuthenticated(){
        if(Auth.getToken()) return true;
        else return false;
    },
    getToken() {
        const user = Auth.getUser();

        if (user && user.token) return user.token;
        else return null
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },

    state: {
        //javascript setters(get before function name or variable) - taj atribut pretvaraju u funkciju, funkcija koja se predstavlja da je varijabla i može se čitati kao atribut, ne treba pozivati funkciju iz drugog modula nego varijablu kao i prije

        get authenticated() {
            return Auth.isAuthenticated();
        },
        get account_type(){
            const user_data = Auth.getUser();
            if(user_data) return user_data.account_type;
            return false;
        },
        get user_data(){
            const user_data = Auth.getUser();
            if(user_data) return user_data;
            return false;
        },
        //deprecated
        get loaderState() {
            return store.showLoader
        },
    },
}

let Orders = {
    async newOrder(order_info){
        const response = await Api.post('/new_order', order_info)
        
        if(!response) return false

        else if(response.data) return response.data.id
        
    },

    async saveFeedback(feedback){
        const response = await Api.post('/leave_feedback', feedback)
        
        if(!response) return false
        else if(response.data) return true
        
    },

    async getOrder(id) {
        let response = await Api.get(`/order_info/${id}`);

        let doc = response.data;
        return doc
        
    },

    async updateOrder(order) {
        let response = await Api.patch(`/orders/${order.id}`, order);

        if(!response) return false
        else if(response.data) return true

    },

    async deleteOrder(id) {
        return await Api.delete(`/orders/${id}`);
    },


    async getOrderStatusTypes() {
        let response = await Api.get(`/order_types`);
        
        let doc = response.data;
        return doc
        
    },

    async getAll(searchTerm, productType, status) {
        let options = {};
        if (searchTerm) {
            options.params = {
                _any: searchTerm,
            };
        }
        
        let response = await Api.get(`/orders/${productType}/${status}`, options)

        if(response){
            response.data.id = response.data._id
            delete response.data._id
            return response.data
        }
        else return false;
    },


    //status_type- optional parameter used for fetching similar meals and drinks + manager filter + orders filter
    async fetchOrders(term, productType, status_type = '') { 
        term = term || store.searchText; 
        let result = await Orders.getAll(term, productType, status_type )

        //this.cards = Array.isArray(result) ? result.sort((a, b) => a.posted_at.localeCompare(b.posted_at)) : result;
        return  _.sortBy( result, 'orderInfo.date' ).reverse();
  
    },


    async sendCall(data){
        const response = await Api.post('/calls', data)
        
        if(!response) return false
        else if(response.data) return true
        
    },


    async updateCall(data) {
        let response = await Api.patch(`/calls/${data._id}`, data);

        if(!response) return false
        else if(response.data) return true

    },


    //cloned code from food_list search
    async getCalls(searchTerm, status) {
        let options = {};
        if (searchTerm) {
            options.params = {
                _any: searchTerm,
            };
        }

        
        let response = await Api.get(`/calls/${status}`, options)
  
        if(response){
            response.data.id = response.data._id
            delete response.data._id
            return response.data
        }
        else return false;
    },


    async fetchCalls(term, reason = '') { 
        term = term || store.searchText; 
        let result = await Orders.getCalls(term, reason )

        return  _.sortBy( result, 'time' ).reverse();
  
    },

}




let Products = {

    async addProduct(data){
        const response = await Api.post('/add_product', data)
        
        if(!response) return false
        else if(response.data) return true
        
    },

    async updateProduct(data){
        const response = await Api.patch('/update_product', data)
        
        if(!response) return false
        else if(response.data) return true
        
    },

    async addSubscriber(mail){
        const response = await Api.post('/subscribe', {email: mail})
        
        if(!response) return false

        else if(response.data) return true
        
    },
    async getOne(id) {
        
        let response = await Api.get(`/food_list/${id}`);
        let doc = response.data;
    
        return {
            id: doc._id,
            name: doc.name,
            price: doc.price,
            subCategory: doc.subCategory,
            category: doc.category,
            type: doc.type,
            cookingTime: doc.cookingTime,
            description: doc.description,
            ingredients: doc.ingredients,
            url: doc.url,
            energy_value: doc.energy_value,
            carbohydrates: doc.carbohydrates,
            protein: doc.protein,
            fat: doc.fat,
            vitamin_a: doc.vitamin_a,
            vitamin_c: doc.vitamin_c,
            calcium: doc.calcium,
            zinc: doc.zinc
            //posted_at: Number(doc.postedAt),
            
        };
    },
    async getProductTypes() {
        let response = await Api.get(`/product_types`);

        let doc = response.data;
        return doc
        
    },
   
    
    async deleteProduct(id) {
        return await Api.delete(`/products/${id}`);
    },

    async getAll(searchTerm, type, category, subcategory) {
        let options = {};
        if (searchTerm) {
            options.params = {
                _any: searchTerm,
            };
        }


        let response = await Api.get(`/menu/${type}/${category}/${subcategory}`, options)
        response.data.id = response.data._id
        delete response.data._id

        return response.data
    },

    //product_category - optional parameter used for fetching similar meals and drinks + manager filter
    async fetchProducts(term, product_type = undefined, product_category = undefined, product_subcategory = undefined) {  
        term = term || store.searchTerm; 
        let result = await Products.getAll(term, product_type || store.type, product_category || store.category, product_subcategory || store.selectedSubCategory )

        //this.cards = Array.isArray(result) ? result.sort((a, b) => a.posted_at.localeCompare(b.posted_at)) : result;
        return  _.sortBy( result, 'price' ).reverse();
  
    },


    async fetchInfoCards() {  
        let result = await Api.get('/about_info')
      
        return  _.sortBy( result.data, 'publish_date' );
    },

    async fetchSubscribers() {  
        let result = await Api.get('/get_subscribers')
      
        return  result.data
    },

    async fetchFeedbacks() {  
        let result = await Api.get('/get_feedbacks')
      
        return  result.data
    },

};


let Employees = {

    async getEmployeeTypes() {
        let response = await Api.get(`/employee_types`);

        let doc = response.data;
        return doc
        
    },

    async getAll(searchTerm, type) {
        let options = {};
        if (searchTerm) {
            options.params = {
                _any: searchTerm,
            };
        }

        let response = await Api.get(`/employees/${type}`, options)

        if(response){
            response.data.id = response.data._id
            delete response.data._id
            return response.data
        }
        else return false;
    },


    //employee_type- optional parameter used for fetching similar meals and drinks + manager filter
    async fetchEmployees(term, employee_type = '') {  
        term = term || store.searchTerm; 
        let result = await Employees.getAll(term, employee_type )

        //this.cards = Array.isArray(result) ? result.sort((a, b) => a.posted_at.localeCompare(b.posted_at)) : result;
        return  _.sortBy( result, 'fullName' ).reverse();
  
    },


    async deleteEmployee(id) {
        return await Api.delete(`/employees/${id}`);
    },


    async addEmployee(data){
        const response = await Api.post('/add_employee', data)
        
        if(!response) return false
        else if(response.data) return true
        
    },

    async updateEmployee(data){
        const response = await Api.patch('/update_employee', data)

        if(!response) return false
        else if(response.data) return true
        
    },
}

export { Api, Products, Auth, Employees, Orders };
