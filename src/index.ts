import { getFormattedTime } from 'src/utils/getFormattedTime';
import Block from 'src/utils/Block';
import { Login } from 'src/pages/login/login';
import { Signup } from 'src/pages/signup/signup';
import { HomePage } from 'src/pages/home/home';
import { ProfilePage } from 'src/pages/profile/profile';
import { ErrorPage } from 'src/pages/error/error';

import chatsResponse from 'src/data/chatsResponse.json';
import './normalize.css';
import './styles.css';
import './components/inputWrapper/input.css';
import './components/button/button.css';
import img from 'static/img/default-user.png';
import registerComponent from 'src/utils/registerComponent';
import { ButtonDropdownFile } from 'src/components/buttonDropdownFile/buttonDropdownFile';
import { ButtonDropdownDots } from 'src/components/buttonDropdownDots/buttonDropdownDots';
import { ButtonOpenModal } from 'src/components/buttonOpenModal/buttonOpenModal';


registerComponent('ButtonDropdownFile', ButtonDropdownFile);
registerComponent('ButtonDropdownDots', ButtonDropdownDots);
registerComponent('ButtonOpenModal', ButtonOpenModal);

const modifiedChatsReply = getFormattedTime(chatsResponse);

class View {
  home() {
    return new HomePage({img, modifiedChatsReply});
  }

  login() {
    return new Login({});
  }

  signup() {
    return new Signup({});
  }

  profile() {
    return new ProfilePage({});
  }

  error404() {
    return new ErrorPage({title: '404', text: 'Не туда попали'});
  }

  error500() {
    return new ErrorPage({title: '500', text: 'Мы уже фиксим'});
  }
}

const pages = new View();

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root && block) {
    root.appendChild(block.getContent());
  }
  return root;
}

const checkPage = () => {
  const pathname = window.location.pathname.slice(1);
  return pathname in pages ? pathname : 'error404';
};

document.addEventListener('DOMContentLoaded', () => {
  render('#app', pages[checkPage() as keyof typeof pages]());
});
