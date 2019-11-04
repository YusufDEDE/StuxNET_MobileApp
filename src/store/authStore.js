import {observable, action} from 'mobx';
import Api from '~/api';

class AuthStore {
  @observable authToken;
  @observable user;
  @observable accounts;
  @observable userInfo;
  @observable moneyTransferList = null;

  // constructor() {
  //   this.authToken = null;
  //   this.user = null;
  //   this.accounts = null;
  // }

  @action
  setUser = (id, token) => {
    this.authToken = token;
    this.user = id;
  };

  @action
  setAccountList = id => {
    Api.Auth.listAccount({
      tc: id,
    })
      .then(res => {
        this.accounts = res;
      })
      .catch(err => {
        console.log(err);
      });
    Api.Auth.updateUserList({tc: id})
      .then(res => {
        this.userInfo = res[0];
      })
      .catch(err => {
        console.log(err);
      });
  };
  @action
  setMoneyTransferList = id => {
    Api.Auth.moneyTransferList({tc: id})
      .then(res => {
        this.moneyTransferList = res.recordset;
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action
  setAuthToken = session => {
    console.log(session);
    this.authToken = session;
  };

  // @action
  // reset = () => {
  //   this.authToken = null;
  //   this.user = null;
  // };
}

const authStore = new AuthStore();

export default authStore;
export {AuthStore};
