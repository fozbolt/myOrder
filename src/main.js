//instancira vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from "vue";

global.jQuery = require('jquery');
let $ = global.jQuery;
window.$ = $;

createApp(App).use(router).mount('#app')


// for using Vue.use()
// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

