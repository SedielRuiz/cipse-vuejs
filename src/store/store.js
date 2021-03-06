import Vue from 'vue'
import Vuex from 'vuex'

import settings from './modules/settings';
import auth from './modules/auth';
import user from './modules/user';
import role from './modules/role';
import content from './modules/content';
import request from './modules/request';
import term from './modules/term';
import unit from './modules/unit';
import language from './modules/language';
import country from './modules/country';
import crime from './modules/crime';
import report from './modules/report';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        processing: false,
        warning: null,
        error: null,
    },
    mutations: {
        startProcessing (state) {
          state.processing = true;
        },
        stopProcessing (state) {
          state.processing = false;
        },
        setError (state, responseApi) {
            if(responseApi.data){
                let data = responseApi.data;
                if(data.error){
                    state.error = data.msg;
                }
            }else{
                state.error = responseApi;
            }
            setTimeout(() => {
                state.error = null
            },3000)
        }
    },
    actions: {
        setWarning ({state}, value) {
            state.warning = value
            return new Promise((resolve) => {
                setTimeout(function () {
                    state.warning = null
                    resolve()
                }, 2000)
            })
        }
    },
	modules: {
		settings,
        auth,
        user,
        role,
        content,
        request,
        term,
        unit,
        country,
        language,
        crime,
        report
	}
})