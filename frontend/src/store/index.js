import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function getCurrentUser(){
  const exp = localStorage.getItem('CWP_EXP') ? localStorage.getItem('CWP_EXP') : 0;
  if(Date.now() > exp){
    localStorage.removeItem('CWP_EXP');
    localStorage.removeItem('CWP_USER');
    localStorage.removeItem('CWP_TOKEN');
    return null;
  }
  return localStorage.getItem('CWP_USER') ? JSON.parse(localStorage.getItem('CWP_USER')):null;
}

export default new Vuex.Store({
  state: {
    user: getCurrentUser(),
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    login({ commit }, payload ) {
      if(payload == null){
        localStorage.removeItem("CWP_TOKEN");
        localStorage.removeItem("CWP_USER");
        localStorage.removeItem("CWP_EXP");
        commit("setUser",null);
      }else{
        localStorage.setItem("CWP_TOKEN", payload.token);
        localStorage.setItem("CWP_EXP", payload.expiresAt);
        localStorage.setItem("CWP_USER", JSON.stringify(payload.user));
        commit("setUser",payload.user);
      }
    }
  }
})
