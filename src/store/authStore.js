import {observable, action} from 'mobx';

class AuthStore {
  @observable authToken;
  @observable user;

  constructor() {
    this.authToken = null;
    this.user = null;
  }

  @action
  setUser = user => {
    console.log(user);
    this.user = user;
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
