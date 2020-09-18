import Vue from 'vue';

const state = {
  roles: [],
  role: "",
  //Paginación
  page_size:"",
  total_items:"",
  total_pages:"",
  prefix:"admin/"
};

const actions = {
    getRol:({commit}, id) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.post(state.prefix+'roles/'+id).then(
            response =>{
                var data = response.data;
                commit('setRole',data);
                resolve(data)
            }).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },
    getRoles:({commit}, data) => {
        return new Promise((resolve, reject) => {
        Vue.http.get(state.prefix+'roles', data).then(
            response =>{
                var data = response.data;
                commit('setRoles',data);
                resolve(data)
            }).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
            })
        });
    },
    create:({commit},data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.post(state.prefix+'roles',data).then(
            response =>{
                var data = response.data;
                resolve(data)
            }).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },
    
    update:({commit},data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.put(state.prefix+'roles',data).then(
            response =>{
                var data = response.data;
                resolve(data)
            }).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },

    delete:({commit},data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.delete(state.prefix+'roles', {_id: data}).then(
            response =>{
                var data = response.data;
                resolve(data)
            }).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },
  
};

const getters = {
};

const mutations = {
    setRoles: (state, list) => {
        state.roles = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },
    setRole: (state, rl) => {
        state.role = rl
    },

};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
