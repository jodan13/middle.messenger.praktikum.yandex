import { getFormattedTime } from 'src/utils/getFormattedTime';
import Block from 'src/utils/Block';
import { Login } from 'src/pages/login/login';
import { Signup } from 'src/pages/signup/signup';
import { HomePage } from 'src/pages/home/home';
import { ProfilePage } from 'src/pages/profile/profile';
import { ErrorPage } from 'src/pages/error/error';

import chatsResponse from 'src/data/chatsResponse.json';
import './styles.css';
import './components/inputWrapper/input.css';
import './components/button/button.css';
import img from 'static/img/default-user.png';

const modifiedChatsReply = getFormattedTime(chatsResponse);

const pages = {
  home: () => new HomePage({img, modifiedChatsReply}),
  login: () => new Login({}),
  signup: () => new Signup({}),
  profile: () => new ProfilePage({}),
  error404: () => new ErrorPage({title: '404', text: 'Не туда попали'}),
  error500: () => new ErrorPage({title: '500', text: 'Мы уже фиксим'}),
};

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root && block) {
    root.appendChild(block.getContent());
  }
  return root;
}

const checkPage = () => {
  const pathname = window.location.pathname.slice(1);
  return pages.hasOwnProperty(pathname) ? pathname : 'error404';
};

document.addEventListener('DOMContentLoaded', () => {
  render('#app', pages[checkPage() as keyof typeof pages]());
});
