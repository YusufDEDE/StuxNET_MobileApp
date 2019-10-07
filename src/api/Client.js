import { API_URL } from 'react-native-dotenv';
import { create } from 'apisauce';
import authStore from '~/store/authStore';

const client = create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Sends HTTP request
 */
export function request(method, path, params = {}, headers = {}) {
  if (authStore.authToken) {
    headers.Authorization = `Bearer ${authStore.authToken}`;
  }

  return client[method](path, params, {
    headers,
  }).then(response => {
    if (response.ok) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  });
}
