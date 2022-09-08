import axios from 'axios';
import $router from '@/router'
import store from '@/store.js';


// instanca axios-a za potrebe myOrder backenda
let Api = axios.create({
    baseURL: 'http://localhost:5000/',
    //baseURL: 'https://my-order.herokuapp.com/',
    timeout: 20000, 
});


Api.interceptors.request.use((request) => {
    try {
        request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
    } catch (e) {
        console.error(e);
    }
    //dodaje token u header i returna odnoso šalje dalje na backend
    return request;
});


//Dodan i ovaj interceptor jer se može desiti da dodamo token i token ide prema backendu, backend skuži da je token isteko i vrati 401 grešku, pa da nas rerouta na login
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
        //pass ide preko SSL-a pa ga nije nužno heshirati
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
            //prvi put spremamo radi tokena
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
        //javascript setteri - get ispred nekog atributa - taj atribut pretvaraju u funkciju, funkcija koja se predstavlja da je varijabla i može se čitati kao atribut, ne treba pozivati funkciju iz drugog modula nego varijablu kao i prije

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
        get loaderState() {
            return store.showLoader
        },
    },
}

// naš objekt za sve pozive koji se dotiču `Post`ova
let Products = {

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

    async addSubscriber(email){
        const response = await Api.post('/subscribe', email)
        
        if(!response) return false

        else if(response.data) return true
        
    },
    async getOne(id) {
        
        let response = await Api.get(`/food_list/${id}`);
        let doc = response.data;
    
        return {
            //ovo premapirati i vidjeti koji podaci jos trebaju za jelo
            id: doc._id,
            name: doc.name,
            price: doc.price,
            subCategory: doc.subCategory,
            category: doc.category,
            type: doc.type
            //posted_at: Number(doc.postedAt),
            
        };
    },
    async getProductTypes() {
        let response = await Api.get(`/product_types`);

        let doc = response.data;
        return doc
        
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

        //sazeti u options.params
        //   options.categories = {
        //     type,
        //     category,
        //     subCategory: subcategory,

        // }

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

export { Api, Products, Auth, Employees }; // exportamo Api za ručne pozive ili Products za metode.
