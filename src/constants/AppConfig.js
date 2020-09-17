/**
 * App Config File
 */

const dev_enviroment = 'http://localhost:8007/api/';
const production_enviroment = 'http://localhost:8007/api/';
  
let enviroment;

if(process.env.NODE_ENV === 'production'){
    enviroment = production_enviroment;	
}else{
    enviroment = dev_enviroment;	
}

let enviromen = {}
export default {
    enableUserTour: process.env.NODE_ENV === 'production' ? true : false,   // Enable User Tour
    ROOT_API: enviroment 
}
