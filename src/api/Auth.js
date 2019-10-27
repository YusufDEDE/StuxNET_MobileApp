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

export function newAccount(data) {
  return request('post', 'account/newAccount', data);
}

export function deleteAccount(data) {
  return request('post', 'account/deleteAccount', data);
}

export function listAccount(data) {
  return request('post', 'account/', data);
}

export function depositMoney(data) {
  return request('post', 'account/deposit', data);
}

export function drawMoney(data) {
  return request('post', 'account/withdraw', data);
}
