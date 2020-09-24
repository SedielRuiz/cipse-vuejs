import Vue from 'vue';

const state = {
    categories: [],
    positions: [],
    ranks: [],
    typesContacts: [],
    typesDocuments: [],
    term: "",
    //Paginación
    page_size:"",
    total_items:"",
    total_pages:"",
    prefix:"admin/"
};

const actions = {
    getTerm:({commit}, id) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
            Vue.http.get(state.prefix+'terms/'+id).then(
                response =>{
                    var data = response.data;
                    commit('setTerm',data);
                    resolve(data)
                }).catch(error=>{
                    commit('setError', error, { root: true });
                    reject(error)
                }).finally(()=>{
                    commit('stopProcessing', null, { root: true });
                })
        });
    },
    getTerms:({commit}, key) => {
        commit('startProcessing', null, { root: true });
        var json = {
            params: {"key":key}
        }
        return new Promise((resolve, reject) => {
            Vue.http.get(state.prefix+'terms/list', json).then(
                response =>{
                    var data = response.data;
                    switch (key) {
                        case "CATEGORIAS":
                            commit('setCategories',data);       
                            break;
                        case "POSITIONS":
                            commit('setPositions',data);       
                            break;
                        case "RANGOS":
                            commit('setRanks',data);       
                            break;
                        case "TIPOS_CONTACTO":
                            commit('setTypesContact',data);
                            break;
                        case "TIPOS_DE_DOCUMENTO":
                            commit('setTypesDocument',data);
                            break;
                    }
                    resolve(data)
                }).catch(error=>{
                    commit('setError', error, { root: true });
                    reject(error)
                }).finally(()=>{
                    // commit('stopProcessing', null, { root: true });
                })
            });
    },
    create:({commit},data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
            Vue.http.post(state.prefix+'terms',data).then(
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
            Vue.http.post(state.prefix+'terms',data).then(
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
        Vue.http.delete(state.prefix+'terms', {_id: data}).then(
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
    setCategories: (state, list) => {
        state.categories = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setPositions: (state, list) => {
        state.positions = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setRanks: (state, list) => {
        state.ranks = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setTypesContact: (state, list) => {
        state.typesContacts = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setTypesDocument: (state, list) => {
        state.typesDocuments = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setTerm: (state, list) => {
        state.term = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
