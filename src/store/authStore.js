import {observable, action} from 'mobx';
import Api from '~/api';

class AuthStore {
  @observable authToken;
  @observable user;
  @observable accounts;

  constructor() {
    this.authToken = null;
    this.user = null;
    this.accounts = null;
  }

  @action
  setUser = id => {
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
  };

  @action
  setAuthToken = session => {
    console.log(session);
    this.authToken = session;
  };

  @action
  reset = () => {
    this.authToken = null;
    this.user = null;
  };
}

const authStore = new AuthStore();

export default authStore;
export {AuthStore};
