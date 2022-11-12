import './styles.css';

import './components/input/input.css';
import './components/button/button.css';
import { home } from './pages/home/home';
import { login } from './pages/login/login';
import { signup } from './pages/signup/signup';
import { profile, profileCheckSate } from './pages/profile/profile';
import { chatMessage } from './pages/chatMessage/chatMessage';
import { locationChange } from './utils/locationChange';
import { error404, error500 } from './pages/error/error';
import { contactCard } from './components/contactCard/contactCard';
import { dropdown } from './components/dropdown/dropdown';
import { openModal } from './components/modal/modal';

const pages = {
  home: () => {
    setTimeout(contactCard, 0);
    return home;
  },
  login: () => login,
  signup: () => signup,
  profile: () => {
    setTimeout(profileCheckSate, 0);
    setTimeout(openModal, 0);
    return profile;
  },
  chatMessage: () => {
    setTimeout(contactCard, 0);
    setTimeout(dropdown, 0);
    setTimeout(openModal, 0);
    return chatMessage;
  },
  error404: () => error404,
  error500: () => error500,
};

locationChange();
window.addEventListener('DOMContentLoaded', () => {
  const checkPage = () => {
    const pathname = window.location.pathname.slice(1);
    return pages.hasOwnProperty(pathname) ? pathname : 'error404';
  };
  const root = document.querySelector('#app');
  if (root) {
    root.innerHTML = pages[checkPage()]() || pages.home();
  }
  const linksFunc = () => {
    const links = document.querySelectorAll('a:not(.disableEvent)');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        let page;
        if (event.target instanceof Element) {
          const linkTarget = event.target.closest('a:not(.disableEvent)');
          page = linkTarget?.getAttribute('href');
        }
        if (root) {
          root.innerHTML = pages[page ? page.split('?')[0] : pages.home]();
        }
        history.pushState(null, '', page);
        linksFunc();
      });
    });
  };
  linksFunc();
  window.addEventListener('popstate', () => {
    if (root) {
      root.innerHTML = pages[checkPage()]() || pages.home();
    }
    linksFunc();
  });
});

