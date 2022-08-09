//instancira vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import Vue from "vue";
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


//createApp(App).use(router).mount('#app')

const app = createApp(App);

app.use(router)
// app.use(BootstrapVue)
// app.use(IconsPlugin)

app.mount("#app");

//Vue.config.productionTip = false;

// new Vue({
//   render: h => h(App)
// }).$mount("#app");
