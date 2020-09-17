export default {
	"routes": [
		{
			"menu_title": "message.dashboard",
			"menu_icon": "zmdi zmdi-view-dashboard",
			"active": false,
			"child_routes": [
				{
					"path": "/dashboard/dashboard-v1",
					"menu_title": "message.dashboard1"
				},
				{
					"route_name": "dashboard-v2",
					"path": "/dashboard/dashboard-v2",
					"menu_title": "message.dashboard2"
				},
				{
					"route_name": "crm",
					"path": "/dashboard/crm",
					"menu_title": "message.crm"
				},
				{
					"route_name": "crypto",
					"path": "/dashboard/crypto",
					"menu_title": "message.crypto"
				}
			]
        },
        {
			"menu_title": "message.manageUsers",
			"menu_icon": "zmdi zmdi-accounts",
			"active": false,
			"child_routes": [
                {
					"route_name": "users",
					"path": "/users/consult",
					"menu_title": "message.consult"
				},
				{
					"path": "/users/user-profile",
					"menu_title": "message.userProfile"
				},
                {
					"route_name": "projectDetails",
					"path": "/crm/projectDetails/01",
					"menu_title": "message.projectDetails"
				},
			]
		},
		{
			"menu_title": "message.session",
			"menu_icon": "zmdi zmdi-time-countdown",
			"active": false,
			"child_routes": [
				{
					"path": "/session/login",
					"menu_title": "message.login"
				},
				{
					"path": "/session/sign-up",
					"menu_title": "message.signUp"
				},
				{
					"path": "/session/lock-screen",
					"menu_title": "message.lockScreen"
				},
				{
					"path": "/session/forgot-password",
					"menu_title": "message.forgotPassword"
				}
			]
		},
	]
}