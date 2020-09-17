import Vue from 'vue'
import Router from 'vue-router'

// components
import Full from '@/container/Full'

// dashboard views
const DashboardOne = () => import('Views/dashboard/DashboardOne')
const DashboardTwo = () => import('Views/dashboard/DashboardTwo')
const CRM = () => import('Views/dashboard/CRM')
const Crypto = () => import('Views/dashboard/Crypto')


//CRM
const Projects = () => import('Views/crm/Projects')
const ProjectDetails = () => import('Views/crm/ProjectDetails')
const Reports = () => import('Views/crm/Reports')
const Clients = () => import('Views/crm/Clients')

//Crypto
const MarketCap = () => import('Views/crypto/MarketCap')
const Wallet = () => import('Views/crypto/Wallet')
const Trade = () => import('Views/crypto/Trade')

// ui elements views
const Buttons = () => import('Views/ui-elements/Buttons')
const ProgressBar = () => import('Views/ui-elements/ProgressBar')
const Tabs = () => import('Views/ui-elements/Tabs')
const Accordions = () => import('Views/ui-elements/Accordions')
const Pagination = () => import('Views/ui-elements/Pagination')
const Tooltip = () => import('Views/ui-elements/Tooltip')
const Badges = () => import('Views/ui-elements/Badges')
const Cards = () => import('Views/ui-elements/Cards')
const Alerts = () => import('Views/ui-elements/Alerts')
const Carousel = () => import('Views/ui-elements/Carousel')

// editors views
const QuillEditor = () => import('Views/editor/QuillEditor')
const WYSIWYG = () => import('Views/editor/WYSIWYG')

// drag and drop views
const Vuedraggable = () => import('Views/drag-drop/Vuedraggable')
const Vue2Dragula = () => import('Views/drag-drop/Vue2Dragula')
const VueDraggableResizable = () => import('Views/drag-drop/VueDraggableResizable')

// icons views
const Themify = () => import('Views/icons/Themify')
const Material = () => import('Views/icons/Material')
const FontAwesome = () => import('Views/icons/FontAwesome')

// charts views
const VueChartjs = () => import('Views/charts/VueChartjs')
const VueEcharts = () => import('Views/charts/VueEcharts')

// maps views
const GoogleMaps = () => import('Views/maps/GoogleMaps')
const LeafletMaps = () => import('Views/maps/LeafletMaps')

// tables views
const BasicTable = () => import('Views/tables/Basic')
const ResponsiveTable = () => import('Views/tables/Responsive')

// pages views
const Gallery = () => import('Views/pages/Gallery')
const Pricing = () => import('Views/pages/Pricing')
const Blank = () => import('Views/pages/Blank')

// users views
const UserProfile = () => import('Views/users/UserProfile')
const UsersList = () => import('Views/users/UsersList')

// session views
const Login = () => import('Views/session/Login')
const SignUp = () => import('Views/session/SignUp')
const LockScreen = () => import('Views/session/LockScreen')
const ForgotPassword = () => import('Views/session/ForgotPassword')

// features views
const ImageCropper = () => import('Views/features/ImageCropper')
const VideoPlayer = () => import('Views/features/VideoPlayer')
const Dropzone = () => import('Views/features/Dropzone')

const Auth0CallBack = () => import('Components/Auth0Callback/Auth0Callback');

Vue.use(Router)

// define your routes here
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Full,
			redirect: '/dashboard/dashboard-v1',
			children: [
				{
					name: "Dashboard One",
					path: '/dashboard/dashboard-v1',
					component: DashboardOne,
					meta: {
						requiresAuth: true,
						title: 'message.dashboard1',
						breadcrumb: 'message.dashboardDashboard1'
					}
				},
				{
					name: "Dashboard Two",
					path: '/dashboard/dashboard-v2',
					component: DashboardTwo,
					meta: {
						requiresAuth: true,
						title: 'message.dashboard2',
						breadcrumb: 'message.dashboardDashboard2'
					}
				},
				{
					name: "Dashboard CRM",
					path: '/dashboard/crm',
					component: CRM,
					meta: {
						requiresAuth: true,
						title: 'message.crm',
						breadcrumb: 'message.dashboardCrm'
					}
				},
				{
					name: "Dashboard Crypto",
					path: '/dashboard/crypto',
					component: Crypto,
					meta: {
						requiresAuth: true,
						title: 'message.crypto',
						breadcrumb: 'message.dashboardCrypto'
					}
				},
				{
					name: "Reports",
					path: '/crm/reports',
					component: Reports,
					meta: {
						requiresAuth: true,
						title: 'message.reports',
						breadcrumb: 'message.crmReports'
					}
				},

				{
					name: "Projects",
					path: '/crm/projects',
					component: Projects,
					meta: {
						requiresAuth: true,
						title: 'message.projects',
						breadcrumb: 'message.crmProjects'
					}
				},
				{
					name: "Project Details",
					path: '/crm/projectDetails/:id',
					component: ProjectDetails,
					meta: {
						requiresAuth: true,
						title: 'message.projectDetails',
						breadcrumb: 'message.crmProjectDetails'
					}
				},
				{
					name: "Clients",
					path: '/crm/clients',
					component: Clients,
					meta: {
						requiresAuth: true,
						title: 'message.clients',
						breadcrumb: 'message.crmClients'
					}
				},
				{
					name: "MarketCap",
					path: '/crypto/market-cap',
					component: MarketCap,
					meta: {
						requiresAuth: true,
						title: 'message.marketCap',
						breadcrumb: 'message.cryptoMarketCap'
					}
				},
				{
					name: "Wallet",
					path: '/crypto/wallet',
					component: Wallet,
					meta: {
						requiresAuth: true,
						title: 'message.wallet',
						breadcrumb: 'message.cryptoWallet'
					}
				},
				{
					name: "Trade",
					path: '/crypto/trade',
					component: Trade,
					meta: {
						requiresAuth: true,
						title: 'message.trade',
						breadcrumb: 'message.cryptoTrade'
					}
				},

				{
					name: "Buttons",
					path: '/ui-elements/buttons',
					component: Buttons,
					meta: {
						requiresAuth: true,
						title: 'message.buttons',
						breadcrumb: 'message.uiElementsButtons'
					}
				},
				{
					name: "ProgressBar",
					path: '/ui-elements/progress-bar',
					component: ProgressBar,
					meta: {
						requiresAuth: true,
						title: 'message.progressBar',
						breadcrumb: 'message.uiElementsProgressBar'
					}
				},
				{
					name: "Tabs",
					path: '/ui-elements/tabs',
					component: Tabs,
					meta: {
						requiresAuth: true,
						title: 'message.tabs',
						breadcrumb: 'message.uiElementsTabs'
					}
				},
				{
					name: "Accordions",
					path: '/ui-elements/accordions',
					component: Accordions,
					meta: {
						requiresAuth: true,
						title: 'message.accordions',
						breadcrumb: 'message.uiElementsAccordions'
					}
				},
				{
					name: "Pagination",
					path: '/ui-elements/pagination',
					component: Pagination,
					meta: {
						requiresAuth: true,
						title: 'message.pagination',
						breadcrumb: 'message.uiElementsPagination'
					}
				},
				{
					name: "Tooltip",
					path: '/ui-elements/tooltip',
					component: Tooltip,
					meta: {
						requiresAuth: true,
						title: 'message.tooltip',
						breadcrumb: 'message.uiElementsTooltip'
					}
				},
				{
					name: "Badges",
					path: '/ui-elements/badges',
					component: Badges,
					meta: {
						requiresAuth: true,
						title: 'message.badges',
						breadcrumb: 'message.uiElementsBadges'
					}
				},
				{
					name: "Cards",
					path: '/ui-elements/cards',
					component: Cards,
					meta: {
						requiresAuth: true,
						title: 'message.cards',
						breadcrumb: 'message.uiElementsCards'
					}
				},
				{
					name: "Alerts",
					path: '/ui-elements/alerts',
					component: Alerts,
					meta: {
						requiresAuth: true,
						title: 'message.alerts',
						breadcrumb: 'message.uiElementsAlerts'
					}
				},
				{
					name: "Carousel",
					path: '/ui-elements/carousel',
					component: Carousel,
					meta: {
						requiresAuth: true,
						title: 'message.carousel',
						breadcrumb: 'message.uiElementsCarousel'
					}
				},
				{
					name: "QuillEditor",
					path: '/editor/quill-editor',
					component: QuillEditor,
					meta: {
						requiresAuth: true,
						title: 'message.quillEditor',
						breadcrumb: 'message.editorQuillEditor'
					}
				},
				{
					name: "WySiwyg",
					path: '/editor/wysiwyg',
					component: WYSIWYG,
					meta: {
						requiresAuth: true,
						title: 'message.wysiwyg',
						breadcrumb: 'message.editorWYSIWYG'
					}
				},
				{
					name: "Vue Draggable",
					path: '/drag-drop/vuedraggable',
					component: Vuedraggable,
					meta: {
						requiresAuth: true,
						title: 'message.vueDraggable',
						breadcrumb: 'message.dragAndDropVueDraggable'
					}
				},
				{
					name: "Vue2 Dragula",
					path: '/drag-drop/vue2-dragula',
					component: Vue2Dragula,
					meta: {
						requiresAuth: true,
						title: 'message.vue2Dragula',
						breadcrumb: 'message.dragAndDropVue2Dragula'
					}
				},
				{
					name: "Draggable Resziable",
					path: '/drag-drop/draggable-resizable',
					component: VueDraggableResizable,
					meta: {
						requiresAuth: true,
						title: 'message.draggableResizable',
						breadcrumb: 'message.dragAndDropDraggableResizable'
					}
				},
				{
					name: "Themify",
					path: '/icons/themify',
					component: Themify,
					meta: {
						requiresAuth: true,
						title: 'message.themify',
						breadcrumb: 'message.iconsThemify'
					}
				},
				{
					name: "Material",
					path: '/icons/material',
					component: Material,
					meta: {
						requiresAuth: true,
						title: 'message.material',
						breadcrumb: 'message.iconsMaterial'
					}
				},
				{
					name: "Font Awesome",
					path: '/icons/font-awesome',
					component: FontAwesome,
					meta: {
						requiresAuth: true,
						title: 'message.fontAwesome',
						breadcrumb: 'message.iconsFontAwesome'
					}
				},
				{
					name: "Vue Chartjs",
					path: '/charts/vue-chartjs',
					component: VueChartjs,
					meta: {
						requiresAuth: true,
						title: 'message.vueChartjs',
						breadcrumb: 'message.chartsVueChartjs'
					}
				},
				{
					name: "Vue Echarts",
					path: '/charts/vue-echarts',
					component: VueEcharts,
					meta: {
						requiresAuth: true,
						title: 'message.vueEcharts',
						breadcrumb: 'message.chartsVueEcharts'
					}
				},
				{
					name: "Google Maps",
					path: '/maps/google-maps',
					component: GoogleMaps,
					meta: {
						requiresAuth: true,
						title: 'message.googleMaps',
						breadcrumb: 'message.mapsGoogleMaps'
					}
				},
				{
					name: "Leaflet Maps",
					path: '/maps/leaflet-maps',
					component: LeafletMaps,
					meta: {
						requiresAuth: true,
						title: 'message.leafletMaps',
						breadcrumb: 'message.mapsLeafletMaps'
					}
				},
				{
					name: "Basic Table",
					path: '/tables/basic',
					component: BasicTable,
					meta: {
						requiresAuth: true,
						title: 'message.tables',
						breadcrumb: 'message.tablesTables'
					}
				},
				{
					name: "Responsive Table",
					path: '/tables/responsive',
					component: ResponsiveTable,
					meta: {
						requiresAuth: true,
						title: 'message.responsiveTable',
						breadcrumb: 'message.tablesResponsiveTable'
					}
				},
				{
					name: "Gallery",
					path: '/pages/gallery',
					component: Gallery,
					meta: {
						requiresAuth: true,
						title: 'message.gallery',
						breadcrumb: 'message.pagesGallery'
					}
				},
				{
					name: "Pricing",
					path: '/pages/pricing',
					component: Pricing,
					meta: {
						requiresAuth: true,
						title: 'message.pricing',
						breadcrumb: 'message.pagesPricing'
					}
				},
				{
					name: "Blank",
					path: '/pages/blank',
					component: Blank,
					meta: {
						requiresAuth: true,
						title: 'message.blank',
						breadcrumb: 'message.pagesBlank'
					}
				},
				{
					name: "User Profile",
					path: '/users/user-profile',
					component: UserProfile,
					meta: {
						requiresAuth: true,
						title: 'message.userProfile',
						breadcrumb: 'message.usersUserProfile'
					}
				},
				{
					name: "Users List",
					path: '/users/users-list',
					component: UsersList,
					meta: {
						requiresAuth: true,
						title: 'message.usersList',
						breadcrumb: 'message.usersUsersList'
					}
				},
				{
					name: "Image Cropper",
					path: '/features/image-cropper',
					component: ImageCropper,
					meta: {
						requiresAuth: true,
						title: 'message.imageCropper',
						breadcrumb: 'message.featuresImageCropper'
					}
				},
				{
					name: "Video Player",
					path: '/features/video-player',
					component: VideoPlayer,
					meta: {
						requiresAuth: true,
						title: 'message.videoPlayer',
						breadcrumb: 'message.featuresVideoPlayer'
					}
				},
				{
					name: "Dropzone",
					path: '/features/dropzone',
					component: Dropzone,
					meta: {
						requiresAuth: true,
						title: 'message.dropzone',
						breadcrumb: 'message.featuresDropzone'
					}
				}
			]
		},
		{
			path: '/callback',
			component: Auth0CallBack
		},
		{
			path: '/session/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/session/sign-up',
			name: 'Sign Up',
			component: SignUp
		},
		{
			path: '/session/lock-screen',
			name: 'Lock Screen',
			component: LockScreen
		},
		{
			path: '/session/forgot-password',
			name: 'Forgot Password',
			component: ForgotPassword
		}
	]
})