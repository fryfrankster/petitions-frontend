// import Vue from 'vue'
import axios from 'axios';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios, axios);

export const SERVER_URL = 'http://csse-s365.canterbury.ac.nz:4001/api/v1/';

let instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000,
    // headers: {
    //     'X-Authorization': localStorage.getItem('authToken')
    // }
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

    getUserPetitions: () => instance.get('/petitions', {
        params: {
            authorId: localStorage.getItem('userId'),
        }
    }),

    signPetition: (petitionId) => instance.post('/petitions/' + petitionId + '/signatures', {},{
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),
};

export const apiUser = {
    login: (email, password) => instance.post('/users/login', {
        email: email,
        password: password
    }),

    logout: () => instance.post('users/logout', {},{
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    register: (registrationRequest) => instance.post('/users/register', registrationRequest),

    getUser: () => instance.get('/users/' + localStorage.getItem('userId'), {
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    setPhoto: (userId, image) => instance.put('/users/' + userId + '/photo', image),
};