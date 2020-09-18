import Vue from 'vue';

const state = {
  contents: [],
  role: "",
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
    getContents:({commit}, type) => {
        var json = {
            params: {"type":type}
        }
        return new Promise((resolve, reject) => {
            Vue.http.get(state.prefix+'contents', json).then(
                response =>{
                    var data = response.data;
                    commit('setContents',data);
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
            Vue.http.post(state.prefix+'edit_role',data).then(
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
    setContents: (state, list) => {
        state.contents = list.data;
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
