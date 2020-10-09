/**
 * Helpers Functions
 */

// Function to convert hex to rgba
export function hexToRgbA(hex, alpha) {
	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
	}
	throw new Error('Bad Hex');
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
	if (length == null) {
		length = 100;
	}
	if (ending == null) {
		ending = '...';
	}
	if (str.length > length) {
		return str.substring(0, length - ending.length) + ending;
	} else {
		return str;
	}
}

export function getFlag(language){
    var flag = "";
    switch (language) {
        case "ESPANOL":
            flag = "es";
            break;
        case "INGLES":
            flag = "en";
            break;
        default:
            flag = "en";
            break;
    }

    return flag;
}

/**
 * DataTable base
 */
export function dataTable(id, language) {
	$('#'+id).DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/"+language
        },
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        search:false
    });
}

/**
 * Meses 
 */
export let months = [
                        {
                            id:1,
                            name:"january",
                        },
                        {
                            id:2,
                            name:"february",
                        },
                        {
                            id:3,
                            name:"march",
                        },
                        {
                            id:4,
                            name:"april",
                        },
                        {
                            id:5,
                            name:"may",
                        },
                        {
                            id:6,
                            name:"june",
                        },
                        {
                            id:7,
                            name:"july",
                        },
                        {
                            id:8,
                            name:"august",
                        },
                        {
                            id:9,
                            name:"september",
                        },
                        {
                            id:10,
                            name:"october",
                        },
                        {
                            id:11,
                            name:"november",
                        },
                        {
                            id:12,
                            name:"december",
                        },
                    ];

export function getMonth(month){
    var name = "";
    switch (month) {
        case 1:
            name = "Enero";
            break;
        case 2:
            name = "Febrero";
            break;
        case 3:
            name = "Abril";
            break;
        case 4:
            name = "Marzo";
            break;
        case 5:
            name = "Mayo";
            break;
        case 6:
            name = "Junio";
            break;
        case 7:
            name = "Julio";
            break;
        case 8:
            name = "Agosto";
            break;
        case 9:
            name = "Septiembre";
            break;
        case 10:
            name = "Octubre";
            break;
        case 11:
            name = "Noviembre";
            break;
        case 12:
            name = "Diciembre";
            break;
    }
    return name;
}