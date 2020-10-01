import Vue from 'vue';

const state = {
  units: [],
  unit: "",
  //Paginación
  page_size:"",
  total_items:"",
  total_pages:"",
  prefix:"admin/"
};

const actions = {
    getUnit:({commit}, id) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.get(state.prefix+'units/'+id).then(
            response =>{
                var data = response.data;
                commit('setUnit',data);
                resolve(data)
            }).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },
    getUnits:({commit}, data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.get(state.prefix+'units', data).then(
            response =>{
                var data = response.data;
                commit('setUnits',data);
                resolve(data)
            }).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },
    create:({commit},data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.post(state.prefix+'units',data).then(
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
        Vue.http.put(state.prefix+'units',data).then(
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
        Vue.http.delete(state.prefix+'units', {_id: data}).then(
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
    setUnits: (state, list) => {
        state.units = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },
    setUnit: (state, response) => {
        state.unit = response.data
    },

};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
