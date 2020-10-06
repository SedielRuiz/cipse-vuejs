export default {
	"routes": [
		{
            "menu_icon": "fas fa-tachometer-alt",
            "route_name": "dashboard",
            "path": "/dashboard",
            "menu_title": "message.dashboard",
            "child_routes":null,
        },
        {
			"menu_title": "message.manageUnits",
			"menu_icon": "fas fa-users-cog",
			"active": false,
			"child_routes": [
                {
					"route_name": "units",
					"path": "/units/consult",
					"menu_title": "message.consult"
				},
                {
					"route_name": "createUnit",
					"path": "/units/create",
					"menu_title": "message.addNew"
				},
			]
        },
        {
			"menu_title": "message.manageUsers",
			"menu_icon": "fas fa-users-cog",
			"active": false,
			"child_routes": [
                {
					"route_name": "users",
					"path": "/users/consult",
					"menu_title": "message.consult"
				},
                {
					"route_name": "createUser",
					"path": "/users/create",
					"menu_title": "message.addNew"
				},
			]
        },
        {
			"menu_title": "message.manageContents",
			"menu_icon": "fas fa-folder-open",
			"active": false,
			"child_routes": [
                {
					"route_name": "notices",
					"path": "/contents/consult/NOTICIA",
					"menu_title": "message.notices"
				},
                {
					"route_name": "doctrinal",
					"path": "/contents/consult/DOCTRINAL",
					"menu_title": "message.doctrinal"
                },
                {
					"route_name": "memories",
					"path": "/contents/consult/MEMORIAS",
					"menu_title": "message.memories"
                },
                {
					"route_name": "us",
					"path": "/contents/consult/NOSOTROS",
					"menu_title": "message.us"
                },
			]
        },
        
        {
			"menu_title": "message.manageRequest",
			"menu_icon": "fas fa-file-contract",
			"active": false,
			"child_routes": [
                {
					"route_name": "requests",
					"path": "/requests/consult",
					"menu_title": "message.consult"
				},
                {
					"route_name": "createRequest",
					"path": "/requests/create",
					"menu_title": "message.addNew"
				},
			]
        },
        {
			"menu_title": "message.observatory",
            "menu_icon": "fas fa-eye",
			"active": false,
			"child_routes": [
                {
					"path": "/observatories/assign-crime",
					"menu_title": "message.assignCrime"
				},
                {
					"path": "/observatories/consult",
					"menu_title": "message.consult"
				},
                {
					"path": "/observatories/create",
					"menu_title": "message.addNew"
				},
			]
        },
		{
			"menu_title": "message.session",
			"menu_icon": "fas fa-sign-out-alt",
			"active": false,
			"child_routes": [
				{
					"path": "/session/login",
					"menu_title": "message.login"
				},
				// {
				// 	"path": "/session/lock-screen",
				// 	"menu_title": "message.lockScreen"
				// },
			]
		},
	]
}