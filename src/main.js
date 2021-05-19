import {createApp} from 'vue'
import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
// import axios from 'axios'
// import {BootstrapVue} from "bootstrap-vue"
import router from './router'
import i18n from './lang/lang'


let app = createApp(App).use(router).use(i18n).mount('#app')
// app.config.globalProperties.axios=axios
