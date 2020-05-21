import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Petitions from "../views/Petitions";
import Petition from "../views/Petition";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../views/Profile";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/petitions',
        name: 'Petitions',
        component: Petitions
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/petitions/:id',
        name: 'Petition',
        component: Petition
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
