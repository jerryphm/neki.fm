import axios from 'axios';
const client = axios.create({
   baseURL: 'https://ws.audioscrobbler.com/2.0',
   params: {
      format: 'json',
      api_key: 'fad3f80f9f436c3798263b87553f645d',
   },
});
export default client;
