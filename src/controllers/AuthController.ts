import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      router.go('/messenger');
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/messenger');
    } catch (e: any) {
      throw new Error('signup', e);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();

      store.set('user', user);
    } catch (e: any) {
      throw new Error('fetchUser', e);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }

}

export default new AuthController();