import {observable, action} from 'mobx';
import Api from '~/api';

class AuthStore {
  @observable authToken;
  @observable user;
  @observable accounts;
  @observable userInfo = null;
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
  setAccountList = async id => {
    await Api.Auth.listAccount({
      tc: id,
    })
      .then(res => {
        this.accounts = res;
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
    await Api.Auth.updateUserList({tc: id})
      .then(res => {
        this.userInfo = res[0];
      })
      .catch(err => {
        console.log(err);
      });
  };
  @action
  setMoneyTransferList = async id => {
    await Api.Auth.moneyTransferList({tc: id})
      .then(res => {
        this.moneyTransferList = res.recordset;
        console.log('33333', res, id);
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
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
