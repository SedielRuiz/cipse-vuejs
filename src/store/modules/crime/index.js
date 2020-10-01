import Vue from 'vue';

const state = {
    crimes: [],
    crime: "",
    //Paginación
    page_size:"",
    total_items:"",
    total_pages:"",
    prefix:"admin/"
};

const actions = {
    getCrime:({commit}, id) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.post(state.prefix+'crimes/'+id).then(
            response =>{
                var data = response.data;
                commit('setCrime',data);
                resolve(data)
            }).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },
    getCrimes:({commit}, data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.get(state.prefix+'crimes', data).then(
            response =>{
                var data = response.data;
                commit('setCrimes',data);
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
        Vue.http.post(state.prefix+'crimes',data).then(
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
        Vue.http.put(state.prefix+'crimes',data).then(
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
        Vue.http.delete(state.prefix+'crimes', {_id: data}).then(
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
    setCrimes: (state, list) => {
        state.crimes = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },
    setCrime: (state, rl) => {
        state.crime = rl
    },

};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
