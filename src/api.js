// import Vue from 'vue'
import axios from 'axios';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios, axios);

export const SERVER_URL = 'http://csse-s365.canterbury.ac.nz:4001/api/v1/';

let instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000,
});

export const apiPetition = {
    getAllPetitions: (categoryId, sortBy, q) => instance.get('/petitions', {
        params: {
            categoryId: categoryId,
            sortBy: sortBy,
            q: q,
        }
    }),

    getOnePetition: (petitionId) => instance.get('/petitions/' + petitionId),

    getAllCategories: () => instance.get('/petitions/categories'),
};

export const apiUser = {
    login: (email, password) => instance.post('/users/login', {
        email: email,
        password: password
    }),

    register: (name, email, password, city, country) => instance.post('users/register', {
        name: name,
        email: email,
        password: password,
        city: city,
        country: country
    }),
};