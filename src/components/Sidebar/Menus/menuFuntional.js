export default {
	"routes": [
        {
            "menu_icon": "fas fa-newspaper",
            "route_name": "notices",
            "path": "/contents/consult/NOTICIA",
            "menu_title": "message.notices",
            "child_routes":null,
        },
        {
            "menu_icon": "fas fa-star-of-life",
            "route_name": "doctrinal",
            "path": "/contents/consult/DOCTRINAL",
            "menu_title": "message.doctrinal",
            "child_routes":null,
        },
        {
            "menu_icon": "fas fa-file-contract",
            "route_name": "requests",
            "path": "/requests/consult",
            "menu_title": "message.requests",
            "child_routes":null,
        },
        {
            "menu_icon": "fas fa-object-group",
            "route_name": "observatories",
            "path": "/observatories/create",
            "menu_title": "message.observatory",
            "child_routes":null,
        },
        {
            "menu_icon": "fas fa-sd-card",
            "route_name": "memories",
            "path": "/contents/consult/MEMORIAS",
            "menu_title": "message.memories",
            "child_routes":null,
        },
        {
            "menu_icon": "fas fa-question-circle",
            "route_name": "us",
            "path": "/contents/consult/NOSOTROS",
            "menu_title": "message.us",
            "child_routes":null,
        },
        {
            "menu_icon": "fas fa-users",
            "route_name": "contact",
            "path": "/users/consult",
            "menu_title": "message.contact",
            "child_routes":null,
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