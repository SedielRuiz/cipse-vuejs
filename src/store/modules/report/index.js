import Vue from 'vue';

const state = {
    crimes: [],
    countries: [],
    reports: [],
    report: "",
    //Paginación
    page_size:"",
    total_items:"",
    total_pages:"",
    prefix:"admin/"
};

const actions = {
    getReport:({commit}, data) => {
        commit('startProcessing', null, { root: true });
        var json = {
            params: {
                        "country":data.country,
                        "crime":data.crime,
                    }   
        }
        return new Promise((resolve, reject) => {
            Vue.http.get(state.prefix+'reports/'+data.year, json).then(
                response =>{
                    var data = response.data;
                    commit('setReport',data);
                    resolve(data)
                }).catch(error=>{
                    commit('setError', error, { root: true });
                    reject(error)
                }).finally(()=>{
                    commit('stopProcessing', null, { root: true });
                })
            });
    },
    getReports:({commit}, data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.get(state.prefix+'reports', data).then(
            response =>{
                var data = response.data;
                commit('setReports',data);
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
        Vue.http.post(state.prefix+'reports',data).then(
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
        Vue.http.put(state.prefix+'reports',data).then(
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

    getCountries:({commit}, data) => {
        commit('startProcessing', null, { root: true });
        return new Promise((resolve, reject) => {
        Vue.http.get(state.prefix+'countries/reports', data).then(
            response =>{
                var data = response.data;
                commit('setCountries',data);
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
    setCountries: (state, response) => {
        state.countries = response.data;
    },
    setReports: (state, list) => {
        state.reports = list.data;
        state.page_size = list.page_size;
        state.total_pages = list.total_pages;
        state.total_items = list.total_items;
    },
    setReport: (state, response) => {
        state.report = response.data
    },
    setReportCrimes: (state, rl) => {
        state.crimes = rl
    },

};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
