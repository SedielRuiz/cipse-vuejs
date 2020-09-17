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

// users views
const UserProfile = () => import('Views/users/UserProfile')
const UsersList = () => import('Views/users/UsersList')
const UsersManage = () => import('Views/users/UsersManage')

// session views
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
					name: "Users list",
					path: '/users/consult',
					component: UsersList,
					meta: {
						requiresAuth: true,
						title: 'message.users',
						breadcrumb: 'message.usersmanageUsers'
					}
                },

                {
					name: "Users create",
					path: '/users/create',
					component: UsersManage,
					meta: {
						requiresAuth: true,
						title: 'message.addNew',
						breadcrumb: 'message.usersNewUsers'
					}
                },

                {
					name: "Users actualizar",
					path: '/users/update/:id',
					component: UsersManage,
					meta: {
						requiresAuth: true,
						title: 'message.edit',
						breadcrumb: 'message.usersUpdateUser'
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