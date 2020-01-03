import { observable, action, reaction, computed } from 'mobx';
import {promisedComputed} from 'computed-async-mobx';
import agent from '../agent';

export default class CommonStore {
  @observable appName = 'Event Manager';
  @observable navigationOpen = false;
  @observable token = window.localStorage.getItem('jwt');

  constructor(rootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

	@computed get email() {
    return this.observableUser.value.email;
  }

  observableUser = promisedComputed({ email: '' }, () => agent.Users.current());

  @action login(email, password) {
    return agent.Auth.login(email, password)
      .then(res => {
        this.setToken(res.token);
      })
  }

  @action register(email, password) {
    return agent.Auth.register(email, password).then(res => {
      this.login(res.email, password)
    })
  }

  @action logout() {
    this.setToken(undefined);
  }


  @action toggleNavigation() {
    this.navigationOpen = !this.navigationOpen;
  }
  
  @action setToken(token) {
    this.token = token;
  }
  
};