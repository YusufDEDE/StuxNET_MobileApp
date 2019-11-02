//import {API_URL} from 'react-native-dotenv';
import {create} from 'apisauce';
//import authStore from '~/store/authStore';

const client = create({
  baseURL: 'https://stuxnetapi.herokuapp.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Sends HTTP request
 */
export function request(method, path, params = {}, headers = {}) {
  return client[method](path, params, {
    headers,
  }).then(response => {
    if (response.ok) {
      console.log(response);
      return Promise.resolve(response.data);
    } else {
      console.log(response);
      return Promise.reject(response);
    }
  });
}
