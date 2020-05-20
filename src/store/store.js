import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userId: null,
    authToken: null,
    isLoggedIn: localStorage.getItem('authToken'),
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    SET_AUTH_TOKEN(state, authToken) {
      state.authToken = authToken;
    },
    SET_LOGGED_IN(state, status) {
      state.isLoggedIn = status;
    },
  },
  getters: {
    getUserId: state => {
      return state.userId;
    },
    getAuthToken: state => {
      return state.authToken;
    },
    getIsLoggedIn: state => {
      return state.isLoggedIn;
    },
  },
  actions: {
    async loginUser({ commit }, data) {
      commit('SET_USER_ID', data.userId);
      commit('SET_AUTH_TOKEN', data.token);
      commit('SET_LOGGED_IN', true);
    },

    logout({ commit }, data) {
      commit('SET_USER_ID', data.userId);
      commit('SET_AUTH_TOKEN', data.token);
      commit('SET_LOGGED_IN', false);
    }
  },
});
