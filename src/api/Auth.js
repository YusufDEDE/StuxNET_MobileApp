import {request} from './Client';

export function login(data) {
  return request('post', 'login', data);
}

export function register(data) {
  return request('post', 'register', data);
}

export function forgotPassword(data) {
  return request('post', 'auth/forgot', data);
}
