import API, { ChangePasswordRequest, UsersAPI, UserUpdateRequest } from 'src/api/UsersAPI';
import store from '../utils/Store';
import ChatsController from 'src/controllers/ChatsController';

export class UserController {
  private readonly api: UsersAPI;

  constructor() {
    this.api = API;
  }

  async putUser(data: UserUpdateRequest) {
    try {
      const user = await this.api.update(data);
      store.set('user', user);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async putUserPass(data: ChangePasswordRequest) {
    try {
      await this.api.updatePass(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async putUserAvatar(data: FormData) {
    const modal = document.getElementById('myModal') as HTMLElement;
    try {
      const user = await this.api.updateAvatar(data);
      store.set('user', user);
      ChatsController.openModal('');
    } catch (e: any) {
      const titleModal = modal.querySelector('h3');
      titleModal?.setAttribute('style', 'color: #FF2F2F');
      titleModal!.textContent = 'Ошибка, попробуйте ещё раз';
      console.error(e.message);
    }
  }

  async searchUser(login: string) {
    try {
      const user = await this.api.search(login);
      store.set('searchUser', user);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new UserController();
