<template>
	<div id="app">
		<router-view :auth="auth" :authenticated="authenticated"></router-view>
		<tour></tour>
		<notifications group="loggedIn" position="top right" animation-type="velocity" />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	import AuthService from "./auth/AuthService";
	import Tour from "Components/Tour/Tour";
	import AppConfig from "Constants/AppConfig";

	const auth = new AuthService();

	const { login, logout, authenticated, authNotifier } = auth;

	export default {
		components: {
			Tour
		},
		mounted() {
			setTimeout(() => {
		      this.loading = false;
		      setTimeout(() => {
		        if (AppConfig.enableUserTour) {
		          this.$tours["vuelyTour"].start();
		        }
		      }, 1000);
		    }, 2000);
		},
		data() {
			authNotifier.on("authChange", authState => {
				this.authenticated = authState.authenticated;
			});
			return {
				auth,
				authenticated,
				animation: {
					enter: {
						opacity: [1, 0],
						translateX: [0, -300],
						scale: [1, 0.2]
					},
					leave: {
						opacity: 0,
						height: 0
					}
				}
			};
		}
	};
</script>