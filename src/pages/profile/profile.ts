import Handlebars from 'handlebars/dist/handlebars.runtime';

import './profile.css';
import templateFunction from './profile.hbs';
import modal from '../../components/modal/modal.hbs';
import '../../components/modal/modal.css';

Handlebars.registerPartial('modal', modal);
export const profileCheckSate = () => {
  const changeData = document.querySelector('#changeData');
  const formChangeData = document.querySelector('#formChangeData');
  const changePassword = document.querySelector('#changePassword');
  const formChangePassword = document.querySelector('#formChangePassword');
  const profileBodyInfo = document.querySelector('.profile-body-info');

  if (changeData && formChangeData && profileBodyInfo) {
    changeData.addEventListener('click', (e) => {
      e.preventDefault();
      profileBodyInfo.classList.add('display-none');
      formChangeData.classList.remove('display-none');
    });
  }

  if (changePassword && formChangePassword && profileBodyInfo) {
    changePassword.addEventListener('click', (e) => {
      e.preventDefault();
      profileBodyInfo.classList.add('display-none');
      formChangePassword.classList.remove('display-none');
    });
  }
};

export const profile = templateFunction();


