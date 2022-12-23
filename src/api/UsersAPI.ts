import BaseAPI from './BaseAPI';
import { User } from 'src/api/AuthAPI';

export interface UserUpdateRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export class UsersAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  update(data: UserUpdateRequest): Promise<User> {
    return this.http.put('/profile', data);
  }

  updatePass(data: ChangePasswordRequest): Promise<undefined> {
    return this.http.put('/password', data);
  }

  updateAvatar(data: FormData): Promise<User> {
    return this.http.put('/profile/avatar', data);
  }

  search(login: string): Promise<UserResponse[]> {
    return this.http.post(`/search/`, {login});
  }

  create = undefined;
  delete = undefined;
  read = undefined;
}

export default new UsersAPI();
