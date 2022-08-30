//instancira vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from "vue";
import mitt from 'mitt'

global.jQuery = require('jquery');
let $ = global.jQuery;
window.$ = $;


//$emit
export const emitter = mitt();


createApp(App).use(router).mount('#app')


// for using Vue.use()
// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

