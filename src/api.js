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

    createPetition: (data) => instance.post('/petitions', data, {
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    updatePetition: (petitionId, data) => instance.patch('/petitions/' + petitionId, data, {
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    deletePetition: (petitionId) => instance.delete('/petitions/' + petitionId, {
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    getAllCategories: () => instance.get('/petitions/categories'),

    getUserPetitions: () => instance.get('/petitions', {
        params: {
            authorId: localStorage.getItem('userId'),
        }
    }),

    addSignature: (petitionId) => instance.post('/petitions/' + petitionId + '/signatures', {},{
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    getSignatures: (petitionId) => instance.get('/petitions/' + petitionId + '/signatures'),

    removeSignature: (petitionId) => instance.delete('/petitions/' + petitionId + '/signatures', {
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    setPhoto: (petitionId, image) => instance.put('/petitions/' + petitionId + '/photo', image, {
        headers: {
            'Content-Type': image.type,
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

    editUser: (data, userId) => instance.patch('/users/' + userId, data, {
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    setPhoto: (userId, image) => instance.put('/users/' + userId + '/photo', image, {
        headers: {
            'Content-Type': image.type,
            'X-Authorization': localStorage.getItem('authToken')
        }
    }),

    // getPhoto: (userId) => instance.get("/users/" + userId + "/photo"),

    deletePhoto: (userId) => instance.delete('/users/' + userId + '/photo', {
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    })
};