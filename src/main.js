import {createApp} from 'vue'
import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
// import axios from 'axios'
// import {BootstrapVue} from "bootstrap-vue"
import router from './router'

let app = createApp(App).use(router).mount('#app')
// app.config.globalProperties.axios=axios
