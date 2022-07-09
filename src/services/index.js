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
let Posts = {
    Comments: {
        async addComment(postId, comment) {
            await Api.post(`/posts/${postId}/comments/`, comment);
        },
        async addReply(postId, comment, commentId) {
            await Api.patch(`/posts/${postId}/comments/${commentId}`, comment);
        },
        async changeComment(postId, comment, commentId) {
            //quickfix zbog dvije identicne rute je na backendu
            await Api.patch(`/posts/${postId}/comments/${commentId}`, comment);
        },
        async changeReply(postId, comment, commentId, replyId) {
            await Api.patch(`/posts/${postId}/comments/${commentId}/replies/${replyId}`, comment);
        },
        async deleteComment(postId, commentId) {
            await Api.delete(`/posts/${postId}/comments/${commentId}`);
        },
        async deleteReply(postId, commentId, replyId) {
            await Api.delete(`/posts/${postId}/comments/${commentId}/replies/${replyId}`);
        },
        
    },
    async validateImage(base64_img) {
        //prema SO je najbolje koristiti put ?? ako ne prolazi upit povecati axios timeout
        let resp = await Api.put(`/posts`, {img: base64_img});

        return resp.data
    },
    create(post) {
        return Api.post('/posts', post);
    },
    async getOne(id) {
        let response = await Api.get(`/posts/${id}`);

        let doc = response.data;

        return {
            id: doc._id,
            url: doc.source,
            username: doc.createdBy,
            title: doc.title,
            posted_at: Number(doc.postedAt),
            comments: (doc.comments || []).map((c) => {
                c.id = c._id;
                delete c._id;
                return c;
            }),
        };
    },
    async test() {
        let response = await Api.get(`/test`);

        let doc = response.data;
        return doc
        
    },
    async getAll(searchTerm) {
        let options = {};

        if (searchTerm) {
            options.params = {
                _any: searchTerm,
            };
        }

        let response = await Api.get('/posts', options);
        return response.data.map((doc) => {
            return {
                id: doc._id,
                url: doc.url,
                name: doc.name,
                price: doc.price,
                //posted_at: Number(doc.postedAt), buduci created at
            };
        });
    },
};

export { Api, Posts, Auth }; // exportamo Api za ručne pozive ili Posts za metode.
