import MessagesController from 'src/controllers/MessagesController';
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
      await this.fetchUser();

      await router.go('/messenger');
    } catch (e: unknown) {
      console.error((e as { message: string }).message);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();

      await router.go('/messenger');
    } catch (e: unknown) {
      console.error((e as { message: string }).message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    await store.set('user', user);
  }

  async logout() {
    try {
      MessagesController.closeAll();

      await this.api.logout();

      router.go('/');
    } catch (e: unknown) {
      console.error((e as { message: string }).message);
    }
  }
}

export default new AuthController();
