import axios from 'axios';
const client = axios.create({
   baseURL: 'https://ws.audioscrobbler.com/2.0',
   params: {
      format: 'json',
      api_key: 'e316df1ddbb64cad4e645286042b7d5d',
   },
});
export default client;
