//instancira vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

global.jQuery = require('jquery');
let $ = global.jQuery;
window.$ = $;


//$emit
export const emitter = mitt();


createApp(App).use(router).mount('#app')





