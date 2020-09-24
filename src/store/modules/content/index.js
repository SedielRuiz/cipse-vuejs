import Vue from 'vue';

const state = {
  notices: [],
  doctrinal: [],
  memories: [],
  us: [],
  content: "",
  //Paginación
  page_size:"",
  total_items:"",
  total_pages:"",
  prefix:"clients/"
};

const actions = {
    getContent:({commit}, id) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
            Vue.http.get(state.prefix+'contents/'+id).then(
                response =>{
                    var data = response.data;
                    commit('setContent',data);
                    resolve(data)
                }).catch(error=>{
                    commit('setError', error, { root: true });
                    reject(error)
                }).finally(()=>{
                    commit('stopProcessing', null, { root: true });
                })
        });
    },
    getContents:({commit}, type) => {
        commit('startProcessing', null, { root: true });
        var json = {
            params: {"type":type}
        }
        return new Promise((resolve, reject) => {
            Vue.http.get(state.prefix+'contents', json).then(
                response =>{
                    var data = response.data;
                    switch (type) {
                        case "NOTICIA":
                            commit('setNotices',data);       
                            break;
                        case "DOCTRINAL":
                            commit('setDoctrinal',data);       
                            break;
                        case "MEMORIAS":
                            commit('setMemories',data);       
                            break;
                        case "NOSOTROS":
                            commit('setUS',data);       
                            break;
                    }
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
            Vue.http.post(state.prefix+'contents',data).then(
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
            Vue.http.post(state.prefix+'contents',data).then(
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
        Vue.http.delete(state.prefix+'contents', {_id: data}).then(
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
    setNotices: (state, list) => {
        state.notices = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setDoctrinal: (state, list) => {
        state.doctrinal = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setMemories: (state, list) => {
        state.memories = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setUS: (state, list) => {
        state.us = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },

    setContent: (state, list) => {
        state.content = list.data;
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
