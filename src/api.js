// import Vue from 'vue'
import axios from 'axios';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios, axios);

const SERVER_URL = 'http://csse-s365.canterbury.ac.nz:4001/api/v1/';

let instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000,
    headers: {'X-Authorization': null}
});

export const apiPetition = {
    getAllPetitions: () => instance.get('/petitions'),

    getOnePetition: (petitionId) => instance.get('/petitions/' + petitionId),
};

export const apiUser = {
    login: (email, password) => instance.post('/users/login', {
        email: email,
        password: password
    }),
};