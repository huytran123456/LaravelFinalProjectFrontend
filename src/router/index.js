import {createWebHistory, createRouter, createWebHashHistory} from 'vue-router'
import Test from '../components/Test.vue'
import Login from '../components/Login.vue'
import Signup from "../components/Signup.vue";
import FilmForRent from "../components/FilmForRent.vue";
import HomePage from "../components/HomePage.vue";
import ChangeSocialPassword from '../components/ChangeSocialPassword.vue'
import ChangePassword from "../components/ChangePassword.vue";
import SendMailChP from "../components/SendMailChP.vue"
import EditUser from "../components/EditUser.vue";
// Define some routes
// Each route should map to a component.
const routes = [
    {path: '/about/:id?', component: Test, meta: {title: 'About'}, name: 'about'},
    {path: '/login', component: Login, meta: {title: 'Login'}, name: 'login'},
    {path: '/signup', component: Signup, meta: {title: 'Signup'}, name: 'signup'},
    {path: '/rentalFilmList', component: FilmForRent, meta: {title: 'Rent Film'}, name: 'rentalFilmList'},
    {path: '/', component: HomePage, meta: {title: 'Home'}, name: 'home'},
    {
        path: '/changeSocialPassword',
        component: ChangeSocialPassword,
        meta: {title: 'Change Social Password'},
        name: 'changeSocialPassword',
    },
    {
        path: '/changePassword/:id',
        component: ChangePassword,
        meta: {title: 'Change Password'},
        name: 'changePassword',
    },
    {
        path: '/sendMailChP',
        component: SendMailChP,
        meta: {title: 'Confirm your email.'},
        name: 'sendMailChP',
    },
    {
        path: '/editUser',
        component: EditUser,
        meta: {title: 'Edit User'},
        name: 'editUser',
    },
    {
        path: '/:catchAll(.*)',
        component: Test,
        name: 'NotFound'
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    //history: createWebHistory(),
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