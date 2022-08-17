//instancira vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from "vue";

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

createApp(App).use(router).mount('#app')

// const app = createApp(App);
// app.use(router)
// app.mount("#app");

//Vue.config.productionTip = false;

// new Vue({
//   render: h => h(App)
// }).$mount("#app");
