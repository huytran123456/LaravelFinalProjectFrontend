import {createWebHistory, createRouter} from 'vue-router'
import Test from '../components/Test.vue'
import Login from '../components/Login.vue'
import Signup from "../components/Signup.vue";
import FilmForRent from "../components/FilmForRent.vue";
import HomePage from "../components/HomePage.vue";
// Define some routes
// Each route should map to a component.
const routes = [
    {path: '/about', component: Test,meta: { title: 'About' }},
    {path: '/login', component: Login,meta: { title: 'Login' }},
    {path: '/signup', component: Signup,meta: { title: 'Signup' }},
    {path: '/rentalFilmList', component: FilmForRent,meta: { title: 'Rent Film' }},
    {path: '/', component: HomePage,meta: { title: 'Home' }},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})
// router.afterEach((to, from) => {
//     // if (to.path == '/login' && to.path=='/' && to.path== '/signup') next()
//     // else next({path:'/login'})
//     Vue.nextTick(()=>{
//         document.title=to.meta.title|| DEFAULT_TITLE
//     })
// })
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});
export default router