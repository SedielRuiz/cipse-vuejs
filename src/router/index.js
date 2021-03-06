import Vue from 'vue'
import Router from 'vue-router'

// components
import Full from '@/container/Full'

// vistas para dashboard
const DashboardOne = () => import('Views/dashboard/DashboardOne')
const DashboardTwo = () => import('Views/dashboard/DashboardTwo')
const CRM = () => import('Views/dashboard/CRM')
const Crypto = () => import('Views/dashboard/Crypto')

// vistas de unidades
const UnitsList = () => import('Views/units/UnitsList')
const UnitsManage = () => import('Views/units/UnitsManage')

// vistas de usuarios
const UserProfile = () => import('Views/users/UserProfile')
const UsersList = () => import('Views/users/UsersList')
const UsersManage = () => import('Views/users/UsersManage')

// vista de contenidos
const ContentsList = () => import('Views/contents/ContentsList')
const ContentsManage = () => import('Views/contents/ContentsManage')
const ContentsDetail = () => import('Views/contents/ContentsDetail')

// vista de solicitudes
const RequestsList = () => import('Views/requests/RequestsList')
const RequestsManage = () => import('Views/requests/RequestsManage')
const RequestsDetail = () => import('Views/requests/RequestsDetail')

// vista de observatorio
const ObservatoriesList = () => import('Views/observatories/ObservatoriesList')
const ObservatoriesManage = () => import('Views/observatories/ObservatoriesManage')
const ObservatoriesDetail = () => import('Views/observatories/ObservatoriesDetail')
const ObservatoriesAssignCrime = () => import('Views/observatories/ObservatoriesAssignCrime')

// vista de observatorio
const Dashboard = () => import('Views/dashboard/Dashboard')

// vista de sesiones
const Login = () => import('Views/session/Login')
const SignUp = () => import('Views/session/SignUp')
const LockScreen = () => import('Views/session/LockScreen')
const ForgotPassword = () => import('Views/session/ForgotPassword')


const Auth0CallBack = () => import('Components/Auth0Callback/Auth0Callback');

Vue.use(Router)

// define your routes here
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Full,
			redirect: '/contents/consult/NOTICIA',
			children: [
				{
					name: "Dashboard One",
					path: '/dashboard/dashboard-v1',
					component: DashboardOne,
					meta: {
						requiresAuth: false,
						title: 'message.dashboard1',
						breadcrumb: 'message.dashboardDashboard1'
					}
				},
				{
					name: "Dashboard Two",
					path: '/dashboard/dashboard-v2',
					component: DashboardTwo,
					meta: {
						requiresAuth: false,
						title: 'message.dashboard2',
						breadcrumb: 'message.dashboardDashboard2'
					}
				},
				{
					name: "Dashboard CRM",
					path: '/dashboard/crm',
					component: CRM,
					meta: {
						requiresAuth: false,
						title: 'message.crm',
						breadcrumb: 'message.dashboardCrm'
					}
				},
				{
					name: "Dashboard Crypto",
					path: '/dashboard/crypto',
					component: Crypto,
					meta: {
						requiresAuth: false,
						title: 'message.crypto',
						breadcrumb: 'message.dashboardCrypto'
					}
                },
                //Rutas para unidades
                {
					name: "Units list",
					path: '/units/consult',
					component: UnitsList,
					meta: {
						requiresAuth: false,
						title: 'message.units',
						breadcrumb: 'message.unitManageUnit'
					}
                },

                {
					name: "Units create",
					path: '/units/create',
					component: UnitsManage,
					meta: {
						requiresAuth: false,
						title: 'message.addNew',
						breadcrumb: 'message.unitNewUnit'
					}
                },

                {
					name: "Units update",
					path: '/units/update/:id',
					component: UnitsManage,
					meta: {
						requiresAuth: false,
						title: 'message.edit',
						breadcrumb: 'message.unitUpdateUnit'
					}
                },

                //Rutas para usuarios
                {
					name: "Users list",
					path: '/users/consult',
					component: UsersList,
					meta: {
						requiresAuth: false,
						title: 'message.users',
						breadcrumb: 'message.usersmanageUsers'
					}
                },

                {
					name: "Users create",
					path: '/users/create',
					component: UsersManage,
					meta: {
						requiresAuth: false,
						title: 'message.addNew',
						breadcrumb: 'message.usersNewUsers'
					}
                },

                {
					name: "Users update",
					path: '/users/update/:id',
					component: UsersManage,
					meta: {
						requiresAuth: false,
						title: 'message.edit',
						breadcrumb: 'message.usersUpdateUser'
					}
                },

                {
					name: "User Profile",
					path: '/users/user-profile/:id',
					component: UserProfile,
					meta: {
						requiresAuth: false,
						title: 'message.userProfile',
						breadcrumb: 'message.usersUserProfile'
					}
                },
                
                //Fin utas para usuarios
                //Rutas para contenidos
                {
					name: "Content list",
					path: '/contents/consult/:type',
					component: ContentsList,
					meta: {
						requiresAuth: false,
						title: 'message.contents',
						breadcrumb: 'message.contentsmanageContents'
					}
                },

                {
					name: "Content detail",
					path: '/contents/detail/:type/:id',
					component: ContentsDetail,
					meta: {
						requiresAuth: false,
						title: 'message.contents',
						breadcrumb: 'message.contentsDetailContents'
					}
                },

                {
					name: "Content create",
					path: '/contents/create/:type',
					component: ContentsManage,
					meta: {
						requiresAuth: false,
						title: 'message.addNew',
						breadcrumb: 'message.contentsNewContents'
					}
                },

                {
					name: "Content update",
					path: '/contents/update/:type/:id',
					component: ContentsManage,
					meta: {
						requiresAuth: false,
						title: 'message.edit',
						breadcrumb: 'message.contentsUpdateContents'
					}
                },
                
                //Fin rutas para contenidos
                //Rutas para solicitudes
                {
					name: "Requests list",
					path: '/requests/consult',
					component: RequestsList,
					meta: {
						requiresAuth: false,
						title: 'message.requests',
						breadcrumb: 'message.requestsManageRequests'
					}
                },

                {
					name: "Request detail",
					path: '/requests/detail/:id',
					component: RequestsDetail,
					meta: {
						requiresAuth: false,
						title: 'message.requests',
						breadcrumb: 'message.requestDetailRequest'
					}
                },

                {
					name: "Requests create",
					path: '/requests/create',
					component: RequestsManage,
					meta: {
						requiresAuth: false,
						title: 'message.addNew',
						breadcrumb: 'message.requestsNewRequest'
					}
                },

                {
					name: "Requests update",
					path: '/requests/update/:id',
					component: RequestsManage,
					meta: {
						requiresAuth: false,
						title: 'message.edit',
						breadcrumb: 'message.requestsUpdateRequest'
					}
                },
                //Rutas para observatorio
                {
					name: "Observatory assign crime",
					path: '/observatories/assign-crime',
					component: ObservatoriesAssignCrime,
					meta: {
						requiresAuth: false,
						title: 'message.observatories',
						breadcrumb: 'message.obaservatoriesManage'
					}
                },

                {
					name: "Observatory list",
					path: '/observatories/consult',
					component: ObservatoriesList,
					meta: {
						requiresAuth: false,
						title: 'message.observatories',
						breadcrumb: 'message.obaservatoriesManage'
					}
                },

                {
					name: "Observatory detail",
					path: '/observatories/detail/:year/:crime/:country',
					component: ObservatoriesDetail,
					meta: {
						requiresAuth: false,
						title: 'message.detail',
						breadcrumb: 'message.obaservatoriesNewObservatory'
					}
                },

                {
					name: "Observatory create",
					path: '/observatories/create',
					component: ObservatoriesManage,
					meta: {
						requiresAuth: false,
						title: 'message.addNew',
						breadcrumb: 'message.obaservatoriesNewObservatory'
					}
                },

                {
					name: "Observatory update",
					path: '/observatories/update/:year/:crime/:country',
					component: ObservatoriesManage,
					meta: {
						requiresAuth: false,
						title: 'message.edit',
						breadcrumb: 'message.obaservatoriesUpdateObservatory'
					}
				},
				//Rutas para dashobaored
				{
					name: "Dashboard update",
					path: '/dashboard',
					component: Dashboard,
					meta: {
						requiresAuth: false,
						title: 'message.edit',
						breadcrumb: 'message.obaservatoriesUpdateObservatory'
					}
				},
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