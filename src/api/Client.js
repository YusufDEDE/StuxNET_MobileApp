//import {API_URL} from 'react-native-dotenv';
import {create} from 'apisauce';
import authStore from '~/store/authStore';

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
export function request(method, path, params = {}, subdomain) {
  subdomain === true
    ? client.setBaseURL('https://stuxnet-payment.herokuapp.com/')
    : client.setBaseURL('https://stuxnetapi.herokuapp.com/');

  return client[method](path, params, {
    headers: {
      token: authStore.authToken,
    },
  }).then(response => {
    if (response.data.status === 500) {
      console.log('hata', response);
      return Promise.reject('Yanlış tc veya şifre!!!!');
    } else {
      console.log('aaa', response);
      return Promise.resolve(response.data);
    }
  });
}
