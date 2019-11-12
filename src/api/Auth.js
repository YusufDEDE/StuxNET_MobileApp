import {request} from './Client';

export function login(data) {
  return request('post', 'login', data);
}

export function register(data) {
  return request('post', 'register', data);
}

export function newAccount(data) {
  return request('post', 'api/account/newAccount', data);
}

export function deleteAccount(data) {
  return request('post', 'api/account/deleteAccount', data);
}

export function listAccount(data) {
  return request('post', 'api/account', data);
}

export function depositMoney(data) {
  return request('post', 'api/account/deposit', data);
}

export function drawMoney(data) {
  return request('post', 'api/account/withdraw', data);
}

export function virman(data) {
  return request('post', 'api/account/virman', data);
}

export function havale(data) {
  return request('post', 'api/account/eft', data);
}

export function updateUserList(data) {
  return request('post', 'api/customer/updateUserList ', data);
}

export function updateUser(data) {
  return request('post', 'api/customer/updateUser ', data);
}

export function moneyTransferList(data) {
  return request('post', 'api/account/listofmoneytransfers ', data);
}

export function moneyTransferPopup(data) {
  return request('post', 'api/account/popupmoneytransfer', data);
}

export function paymentBank(data) {
  return request('post', 'api/payment', data);
}

export function paymentTransactions(data) {
  return request('post', 'api/payment/listofpaymenttransactions', data);
}

export function paymentTransactionsPopup(data) {
  return request('post', 'api/payment/popuppaymenttransaction', data);
}

export function payment(data) {
  return request('post', 'payment', data, true);
}

export function paymentReq(data) {
  return request('post', 'pay', data, true);
}

export function exchangeRates() {
  return new Promise((resolve, reject) => {
    fetch('https://api.exchangeratesapi.io/latest?base=TRY')
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
}
