import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userId: null,
    authToken: null,
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    SET_AUTH_TOKEN(state, authToken) {
      state.authToken = authToken;
    },
  },
  getters: {
    getUserId: state => {
      return state.userId;
    },
    getAuthToken: state => {
      return state.authToken;
    },
  },
  actions: {
    loginUser({ commit }, data) {
      commit('SET_USER_ID', data.userId);
      commit('SET_AUTH_TOKEN', data.token);
    }
  },
});
