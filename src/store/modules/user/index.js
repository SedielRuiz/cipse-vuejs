import Vue from 'vue';

const state = {
    users : [],
    user: "",
    //Paginación
    page_size:"",
    total_items:"",
    total_pages:"",
    prefix:"admin/"
};

const actions = {
    getUser:({commit}, id) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
            Vue.http.get(state.prefix+'users/'+id).then(
                response =>{
                    var data = response.data;
                    commit('setUser',data);
                    resolve(data)
                }
            ).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },
    getUsers:({commit}, data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
            Vue.http.get(state.prefix+'users', data).then(
                response =>{
                    var data = response.data;
                    commit('setUsers', data);
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
            Vue.http.post('users',data).then(
                response =>{
                    var data = actions.processResponse(response.data, false);
                    resolve(data)
                }
            ).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },
    
    update:({commit},data) => {
        // commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
            Vue.http.put(state.prefix+'users',data).then(
                response =>{
                    var data = actions.processResponse(response.data, false);
                    resolve(data)
                }
            ).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },

    resetPassword:({commit},data) => {
        // commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
            Vue.http.post('reset_password_admin', data).then(
                response =>{
                    var data = actions.processResponse(response.data, false);
                    resolve(data)
                }
            ).catch(error=>{
                commit('setError', error, { root: true });
                reject(error)
            }).finally(()=>{
                commit('stopProcessing', null, { root: true });
            })
        });
    },

    processResponse:(body, pag) => {
        if(body){
            if(body.warning){
                store.setWarning(body.warning);
            }
        }
        if(pag){
            return {"result_set":body.result_set, "page_size":body.page_size, "total_items":body.total_items, "total_pages":body.total_pages};
        }else{return !Array.isArray(body.result_set) ? body.result_set : body.result_set[0];}
    },
  
};
const getters = {
};

const mutations = {
    setUsers: (state, list) => {
        state.users = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },
    setUser: (state, response) => {
        state.user = response.data;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
