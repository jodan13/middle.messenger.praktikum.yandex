import './profile.css';
import templateFunction from './profile.hbs';

export const profileCheckSate = () => {
  const changeData = document.querySelector('#changeData');
  const formChangeData = document.querySelector('#formChangeData');
  const changePassword = document.querySelector('#changePassword');
  const formChangePassword = document.querySelector('#formChangePassword');
  const profileBodyInfo = document.querySelector('.profile-body-info');

  if (changeData) {
    changeData.addEventListener('click', (e) => {
      e.preventDefault();
      profileBodyInfo.classList.add('display-none');
      formChangeData.classList.remove('display-none');
    });
  }

  if (changePassword) {
    changePassword.addEventListener('click', (e) => {
      e.preventDefault();
      profileBodyInfo.classList.add('display-none');
      formChangePassword.classList.remove('display-none');
    });
  }
}

export const profile = templateFunction();


