import axios from 'axios';

export default
   axios.create({
      baseURL: 'http://bebo.theironnetwork.org/data/',
      timeout: 1000
   });