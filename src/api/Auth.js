import {request} from './Client';

export function login(data) {
  return request('post', 'auth/token', data);
}

export function register(data) {
  return request('post', 'auth/register', data);
}

export function forgotPassword(data) {
  return request('post', 'auth/forgot', data);
}
