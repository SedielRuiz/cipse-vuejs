// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import Nprogress from "nprogress";
import BootstrapVue from "bootstrap-vue";
import App from "./App";
import router from "./router";
import wysiwyg from "vue-wysiwyg";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import VueBreadcrumbs from "vue2-breadcrumbs";
import VueQuillEditor from "vue-quill-editor";
import { Vue2Dragula } from "vue2-dragula";
import * as VueGoogleMaps from "vue2-google-maps";
import VueVideoPlayer from "vue-video-player";
import fullscreen from "vue-fullscreen";
import Croppa from "vue-croppa";
import VueTour from 'vue-tour';
import VueI18n from "vue-i18n";
import Vuelidate from "vuelidate";
import VueSweetalert2 from 'vue-sweetalert2';
import BlockUI from 'vue-blockui';
import AppConfig from "Constants/AppConfig";
import numeral from 'numeral';
 
Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0");
});


//vue resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.root = AppConfig.ROOT_API;
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
    next();
});

// adminify scripts
import "./lib/adminifyScripts";

//global components
import GlobalComponents from "./globalComponents";

// store
import { store } from "./store/store";

// firebase
import "./firebase"

// include all css files
import "./lib/adminifycss";

// messages
import messages from "./lang";

// navigation guards before each
router.beforeEach((to, from, next) => {
	Nprogress.start();
  	if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (localStorage.getItem('user') === null) {
            next({
            path: "/session/login",
            query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
   }
});

// navigation guard after each
router.afterEach((to, from) => {
    Nprogress.done();
    setTimeout(() => {
        const contentWrapper = document.querySelector(".base-container");
        if (contentWrapper !== null) {
        contentWrapper.scrollTop = 0;
        }
    }, 200);
});

Vue.use(BlockUI);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(wysiwyg, {});
Vue.use(Notifications, { velocity });
Vue.use(VueBreadcrumbs);
Vue.use(VueQuillEditor);
Vue.use(Vue2Dragula);
Vue.use(VueVideoPlayer);
Vue.use(Croppa);
Vue.use(VueTour);
Vue.use(VueI18n);
Vue.use(fullscreen);
Vue.use(Vuelidate);

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'
    }
});
Vue.use(GlobalComponents);

Vue.config.productionTip = false;

// Create VueI18n instance with options
const i18n = new VueI18n({
	locale: store.getters.selectedLocale.locale, // set locale
	messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
	store,
  	i18n,
	router,
	render: h => h(App),
	components: { App }
}).$mount('#app')
