import axios from 'axios';
import $router from '@/router'
import store from '@/store.js';

// instanca axios-a za potrebe myOrder backenda
let Api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000, 
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
            //prvi put put spremamo radi tokena
            localStorage.setItem('user', JSON.stringify(user));

            return true
        }
    },

    async changePassword(userData){
        return await Api.patch('/change_password', userData);
    },
    logout() {
        localStorage.removeItem('user');
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
        let response = await Api.get(`/get_product_types`);

        let doc = response.data;
        return doc
        
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
        return response.data.map((doc) => {
            return {
                id: doc._id,
                url: doc.url,
                name: doc.name,
                price: doc.price,
                type: doc.type,
                category: doc.category,
                subCategory: doc.subCategory,
                discount: doc.discount
                //posted_at: Number(doc.postedAt), buduci created at
            };
        });
    },

    async fetchProducts(term) {  
        term = term || store.searchTerm; 
        let result = await Products.getAll(term, store.type, store.category, store.selectedSubCategory )

        //this.cards = Array.isArray(result) ? result.sort((a, b) => a.posted_at.localeCompare(b.posted_at)) : result;
        return  _.sortBy( result, 'price' ).reverse();
  
    },
};

export { Api, Products, Auth }; // exportamo Api za ručne pozive ili Products za metode.
