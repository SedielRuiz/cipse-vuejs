/**
 * Auth Module
 */
import Vue from 'vue'
import firebase from 'firebase/app';
import Nprogress from 'nprogress';
import router from '../../../router';
import {
	facebookAuthProvider,
	googleAuthProvider,
	twitterAuthProvider,
	githubAuthProvider
} from '../../../firebase';

const state = {
	user: localStorage.getItem('user'),
	isUserSigninWithAuth0: Boolean(localStorage.getItem('isUserSigninWithAuth0'))
}

// getters
const getters = {
	getUser: state => {
		return state.user;
	},
	isUserSigninWithAuth0: state => {
		return state.isUserSigninWithAuth0;
	}
}

// actions
const actions = {
	signinUserInFirebase(context, payload) {
		const { user } = payload;
		context.commit('loginUser');
		firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			.then(user => {
				context.commit('loginUserSuccess', user);
			})
			.catch(error => {
				context.commit('loginUserFailure', error);
			});
	},
	logoutUserFromFirebase(context) {
		Nprogress.start();
		firebase.auth().signOut()
			.then(() => {
				Nprogress.done();
				context.commit('logoutUser');
			})
			.catch(error => {
				context.commit('loginUserFailure', error);
			})
	},
	signinUserWithFacebook(context) {
		context.commit('loginUser');
		firebase.auth().signInWithPopup(facebookAuthProvider).then((result) => {
			context.commit('loginUserSuccess', result.user);
		}).catch(error => {
			context.commit('loginUserFailure', error);
		});
	},
	signinUserWithGoogle(context) {
		context.commit('loginUser');
		firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
			context.commit('loginUserSuccess', result.user);
		}).catch(error => {
			context.commit('loginUserFailure', error);
		});
	},
	signinUserWithTwitter(context) {
		context.commit('loginUser');
		firebase.auth().signInWithPopup(twitterAuthProvider).then((result) => {
			context.commit('loginUserSuccess', result.user);
		}).catch(error => {
			context.commit('loginUserFailure', error);
		});
	},
	signinUserWithGithub(context) {
		context.commit('loginUser');
		firebase.auth().signInWithPopup(githubAuthProvider).then((result) => {
			context.commit('loginUserSuccess', result.user);
		}).catch(error => {
			context.commit('loginUserFailure', error);
		});
	},
	signupUserInFirebase(context, payload) {
		let { userDetail } = payload;
		context.commit('signUpUser');
		firebase.auth().createUserWithEmailAndPassword(userDetail.email, userDetail.password)
			.then(() => {
				Nprogress.done();
				setTimeout(() => {
					context.commit('signUpUserSuccess', userDetail);
				}, 500)
			})
			.catch(error => {
				context.commit('signUpUserFailure', error);
			})
	},
	signInUserWithAuth0(context, payload) {
		context.commit('signInUserWithAuth0Success', payload);
	},
	signOutUserFromAuth0(context) {
		context.commit('signOutUserFromAuth0Success');
	}
}

// mutations
const mutations = {
	loginUser(state) {
		Nprogress.start();
	},
	loginUserSuccess(state, user) {
		state.user = user;
		localStorage.setItem('user', JSON.stringify(user));
		state.isUserSigninWithAuth0 = false
		router.push("/dashboard/dashboard-v1");
		setTimeout(function () {
			Vue.notify({
				group: 'loggedIn',
				type: 'success',
				text: 'User Logged In Success!'
			});
		}, 1500);
		Nprogress.done();
	},
	loginUserFailure(state, error) {
		Nprogress.done();
		Vue.notify({
			group: 'loggedIn',
			type: 'error',
			text: error.message
		});
	},
	logoutUser(state) {
		state.user = null
		localStorage.removeItem('user');
		router.push("/session/login");
		Vue.notify({
			group: 'loggedIn',
			type: 'success',
			text: 'User Logged Out Success!'
		});
	},
	signUpUser(state) {
		Nprogress.start();
	},
	signUpUserSuccess(state, user) {
		state.user = localStorage.setItem('user', user);
		router.push("/dashboard/dashboard-v1");
		Vue.notify({
			group: 'loggedIn',
			type: 'success',
			text: 'Account Created!'
		});
	},
	signUpUserFailure(state, error) {
		Nprogress.done();
		Vue.notify({
			group: 'loggedIn',
			type: 'error',
			text: error.message
		});
	},
	signInUserWithAuth0Success(state, user) {
		state.user = user;
		localStorage.setItem('user', JSON.stringify(user));
		state.isUserSigninWithAuth0 = true;
	},
	signOutUserFromAuth0Success(state) {
		state.user = null
		localStorage.removeItem('user')
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
