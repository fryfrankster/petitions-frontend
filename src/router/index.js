import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Petitions from "../views/Petitions";
import Petition from "../views/Petition";

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
    path: '/petitions/:id',
    name: 'Petition',
    component: Petition
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
