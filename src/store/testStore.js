import { observable, action } from 'mobx';

class TestStore {
  @observable value;

  constructor() {
    this.value = 'Store Test works!';
  }

  @action
  setValue(value) {
    this.value = value;
  }
}

const testStore = new TestStore();

export default testStore;
export { TestStore };
