<template>
	<header class="app-header">
		<div class="d-flex justify-content-between align-items-center nav-wrap">
			<div class="d-flex align-items-center">
				<div class="ham-icon">
					<button type="button" class="c-hamburger c-hamburger--rot  v-step-0" name="button" @click="collapseSidebarHandler">
						<span class="ham-line"></span>
					</button>
				</div>
                <a href="#!" @click="redirectHome">
				    <img src="/static/img/foot_logo.jpeg" width="250" alt="Escudos" class="logo-ponal " />
                </a>
			</div>
			<b-navbar-nav class="navbar-right">
				<b-nav-item class="v-step-2 zoom-out" href="#" @click="toggleScreenFull"><i class="zmdi zmdi-fullscreen"></i>
				</b-nav-item>
				<b-nav-item-dropdown right no-caret class="custom-dropdown quick-link-wrap">
					<template slot="button-content">
						<i class="zmdi zmdi-apps"></i>
					</template>
					<b-dropdown-header class="gradient-primary text-white">{{$t('message.quickLinks')}}</b-dropdown-header>
					<b-dropdown-item :to="link.path" v-for="link in quickLinks" :key="link.path">
						<div class="icon-area">
							<i :class="link.icon"></i>
						</div>
						<small>{{link.title}}</small>
					</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-nav-item-dropdown right no-caret class="notification-wrap">
					<template slot="button-content">
						<span class="zmdi infinite wobble zmdi-hc-fw">
							<i class="zmdi zmdi-notifications-active"></i>
							<b-badge pill variant="success" class="badge-sm badge-top-right">{{notifications.length}}</b-badge>
						</span>
					</template>
					<b-dropdown-header class="gradient-primary text-white">{{$t('message.notifications')}}
					</b-dropdown-header>
					<b-dropdown-item href="#" class="mb-10 notification" v-for="notification in notifications"
						:key="notification.img">
						<div class="media">
							<div class="d-flex pos-relative avatar-wrap">
								<img :src="notification.img" class="rounded-circle" width="60" height="60">
								<span class="badge badge-label-sm badge-thumb-top-right badge-pill fa-notify"
									:class="notification.badgeColor">&nbsp;</span>
							</div>
							<div class="media-body pt-10">
								<h6 class="fw-bold">{{notification.name}}</h6>
								<p class="m-0 small">{{notification.message}}</p>
							</div>
						</div>
					</b-dropdown-item>
				</b-nav-item-dropdown>
				<language-provider></language-provider>
				<b-nav-item @click="toggleRightSidebar" class="customizer">
					<i class="zmdi zmdi-tune"></i>
				</b-nav-item>
			</b-navbar-nav>
		</div>
		<!-- <tour :data="tourData"></tour> -->
		<right-sidebar :sidebarOpen="rightSidebar"></right-sidebar>
		<mobile-search-form></mobile-search-form>
	</header>
</template>

<script>
	import SearchForm from "./SearchForm.vue";
	import RightSidebar from "./RightSidebar.vue";
	import screenfull from "screenfull";
	import MobileSearchForm from "./MobileSearchForm";
	import LanguageProvider from "./LanguageProvider";
	import { mapGetters } from "vuex";

	// import "tour-component/vue";
	// import "vue-class-component";
	// import "tour-component/tour.min.css";


	export default {
		data: function () {
			return {
				quickLinks: [
					{
						title: "Dashboard 2",
						path: "/dashboard/dashboard-v2",
						icon: "ti-layout-grid2-alt"
					},
					{
						title: "Pricing",
						path: "/pages/pricing",
						icon: "ti-money"
					},
					{
						title: "Lock Screen",
						path: "/session/lock-screen",
						icon: "ti-lock"
					},
				],
				notifications: [
					{
						name: "Nueva Noticia",
						message: "LOS SOCIOS.",
						img: "/static/img/notices/notice-1.jpg",
						badgeColor: "badge-success"
					},
				],
				// tourData: {
				// 	steps: [
				// 		{
				// 			left: "115px",
				// 			top: "50px",
				// 			direction: "bottom",
				// 			content: "Use this to collapse sidebar",
				// 			next: "Next",
				// 			targetElementId: "step_1"
				// 		},
				// 		{
				// 			left: "250px",
				// 			top: "60px",
				// 			direction: "bottom",
				// 			content: "Enjoying Search box with sugestion and many more things",
				// 			next: "Next",
				// 			targetElementId: "step_2"
				// 		},
				// 		{
				// 			right: "30px",
				// 			top: "82px",
				// 			direction: "bottom",
				// 			content: "Toggle Full Screen Mode",
				// 			next: "End",
				// 			targetElementId: "step_3"
				// 		}
				// 	],
				// 	localStorageKey: "adminify-tour",
				// 	index: 0
				// }
			};
		},
		computed: {
			...mapGetters([
				"collapsedSidebar",
				"fullScreen",
				"rightSidebar",
			]),
			fullScreenView: function () {
				return this.fullScreen;
			}
		},
		components: {
			SearchForm,
			RightSidebar,
			LanguageProvider,
			MobileSearchForm
		},
		methods: {
            redirectHome(){
                this.$router.push('/contents/consult/NOTICIA');
            },
			// method to right Sidebar event
			toggleRightSidebar() {
				this.$store.dispatch('toggleRightSidebar');
			},
			// method to screenFull event
			toggleScreenFull() {
				this.$store.dispatch('toggleFullscreen', screenfull.isFullscreen);
				screenfull.toggle();
			},
			// method to collapsedSidebar event
			collapseSidebarHandler() {
				if ((window.innerWidth < 1265)) {
					document.querySelector('.app-container').classList.remove('collapsed-sidebar');
					document.querySelector('.sidebarOverlay').classList.add('active');
				}
				else {
					this.$store.dispatch('collapsedSidebar')
				}
			},
		}
	};
</script>