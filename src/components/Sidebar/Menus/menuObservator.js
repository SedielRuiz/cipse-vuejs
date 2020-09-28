export default {
	"routes": [
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