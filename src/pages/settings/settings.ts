import 'src/components/modal/styles.module.css';
import Block from 'src/utils/Block';
import AuthController from 'src/controllers/AuthController';
import styles from 'src/pages/settings/styles.module.css';
import { Link } from 'src/components/link/link';
import { ButtonOpenModal } from 'src/components/buttonOpenModal/buttonOpenModal';
import { Modal } from 'src/components/modal/modal';
import { withStore } from 'src/hocs/withStore';
import { User } from 'src/api/AuthAPI';
import InputWrapper from 'src/components/inputWrapper/input';
import { validation } from 'src/utils/validation';
import { regExpEmail, regExpLogin, regExpName, regExpPassword, regExpPhone } from 'src/utils/const';
import Button from 'src/components/button/button';
import { ChangePasswordRequest, UserUpdateRequest } from 'src/api/UsersAPI';
import UserController from 'src/controllers/UserController';

type Props = {
  user: User,
  styles?: typeof styles
}

// this.setProps({
//   submit: (event: Event) => {
//     event.preventDefault();
//     const form = document.getElementById('formChangeData') as HTMLFormElement;
//     const login = form.elements.namedItem('login') as HTMLInputElement;
//     const email = form.elements.namedItem('email') as HTMLInputElement;
//     const firstName = form.elements.namedItem('first_name') as HTMLInputElement;
//     const secondName = form.elements.namedItem('second_name') as HTMLInputElement;
//     const displayName = form.elements.namedItem('display_name') as HTMLInputElement;
//     const phone = form.elements.namedItem('phone') as HTMLInputElement;
//     const validForm = validation(email, regExpEmail) &&
//       validation(login, regExpLogin) &&
//       validation(firstName, regExpName) &&
//       validation(secondName, regExpName) &&
//       validation(displayName, regExpName) &&
//       validation(phone, regExpPhone);
//     if (validForm) {
//       const formData = new FormData(form);
//       const data = Object.fromEntries(formData.entries());
//       console.log(data);
//       const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
//       const formChangeData = document.querySelector('#formChangeData');
//       profileBodyInfo!.classList.remove(styles['display-none']);
//       formChangeData!.classList.add(styles['display-none']);
//     }
//   },
//   submitPass: (event: Event) => {
//     event.preventDefault();
//     const form = document.getElementById('formChangePassword') as HTMLFormElement;
//     const oldPassword = form.elements.namedItem('oldPassword') as HTMLInputElement;
//     const newPassword = form.elements.namedItem('newPassword') as HTMLInputElement;
//     const repeatPassword = form.elements.namedItem('repeatPassword') as HTMLInputElement;
//     const errorNewPassword = newPassword.parentElement!.nextElementSibling;
//     const errorRepeatPassword = repeatPassword.parentElement!.nextElementSibling;
//     const validForm = validation(oldPassword, regExpPassword) &&
//       validation(newPassword, regExpPassword) &&
//       validation(repeatPassword, regExpPassword) && newPassword.value === repeatPassword.value;
//     if (newPassword.value !== repeatPassword.value) {
//       errorNewPassword!.textContent = 'Пароли не совпадают';
//       errorRepeatPassword!.textContent = 'Пароли не совпадают';
//       errorNewPassword!.classList.add('visible');
//       errorRepeatPassword!.classList.add('visible');
//     } else {
//       errorNewPassword!.textContent = 'от 8 до 40 символов, одна заглавная буква и цифра';
//       errorRepeatPassword!.textContent = 'от 8 до 40 символов, одна заглавная буква и цифра';
//     }
//     if (validForm) {
//       const formData = new FormData(form);
//       const data = Object.fromEntries(formData.entries());
//       console.log(data);
//
//       const formChangePassword = document.querySelector('#formChangePassword');
//       const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
//       profileBodyInfo!.classList.remove(styles['display-none']);
//       formChangePassword!.classList.add(styles['display-none']);
//     }
//   },
//   cancel: (event: Event) => {
//     event.preventDefault();
//     const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
//     const formChangeData = document.querySelector('#formChangeData');
//     const formChangePassword = document.querySelector('#formChangePassword');
//     profileBodyInfo!.classList.remove(styles['display-none']);
//     formChangeData!.classList.add(styles['display-none']);
//     formChangePassword!.classList.add(styles['display-none']);
//   },
//   changePassword: () => {
//     const formChangePassword = document.querySelector('#formChangePassword');
//     const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
//     console.log(formChangePassword, profileBodyInfo);
//     if (formChangePassword && profileBodyInfo) {
//       profileBodyInfo.classList.add(styles['display-none']);
//       formChangePassword.classList.remove(styles['display-none']);
//     }
//   },
//   exit: () => {
//     AuthController.logout();
//   },
//
//   onFocus: ({target}: HTMLInputEvent) => {
//     const error = target!.parentElement!.nextElementSibling;
//     error!.classList.remove('visible');
//   },
//   onBlurEmail: ({target}: HTMLInputEvent) => {
//     validation(target, regExpEmail);
//   },
//   onBlurLogin: ({target}: HTMLInputEvent) => {
//     validation(target, regExpLogin);
//   },
//   onBlurName: ({target}: HTMLInputEvent) => {
//     validation(target, regExpName);
//   },
//   onBlurPhone: ({target}: HTMLInputEvent) => {
//     validation(target, regExpPhone);
//   },
//   onBlurPassword: ({target}: HTMLInputEvent) => {
//     validation(target, regExpPassword);
//   },
// });


class SettingsPage extends Block<Props> {
  constructor(props: { user: User }) {
    super({...props, styles});
  }

  protected init() {
    this.children.link = new Link({
      label: 'Войти',
      to: '/messenger',
      linkSidebar: true,
    });
    this.children.buttonOpenModal = new ButtonOpenModal({
      type: 'openModalUploadAvatar',
      events: {
        click: () => {
          const modal = document.getElementById('myModal');
          if (modal) {
            modal.style.display = 'flex';
          }
        },
      },
    });
    this.children.buttonOpenModalChangeData = new ButtonOpenModal({
      type: 'changeData',
      events: {
        click: () => {
          const formChangeData = document.querySelector('#formChangeData');
          const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
          if (formChangeData && profileBodyInfo) {
            profileBodyInfo.classList.add(styles['display-none']);
            formChangeData.classList.remove(styles['display-none']);
          }
        },
      },
    });
    this.children.buttonOpenModalChangePassword = new ButtonOpenModal({
      type: 'changePassword',
      events: {
        click: () => {
          const formChangePassword = document.querySelector('#formChangePassword');
          const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
          if (formChangePassword && profileBodyInfo) {
            profileBodyInfo.classList.add(styles['display-none']);
            formChangePassword.classList.remove(styles['display-none']);
          }
        },
      },
    });
    this.children.buttonOpenModalExit = new ButtonOpenModal({
      type: 'exit',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
    this.children.inputEmail = new InputWrapper({
      type: 'email',
      name: 'email',
      placeholder: 'Почта',
      value: this.props.user.email,
      textError: 'Введите email',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpEmail);
      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });
    this.children.inputLogin = new InputWrapper({
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
      value: this.props.user.login,
      textError: 'от 3 до 20 символов, латиница, цифры',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpLogin);
      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });
    this.children.inputName = new InputWrapper({
      type: 'text',
      name: 'first_name',
      placeholder: 'Имя',
      value: this.props.user.first_name,
      textError: 'Латиница или Кирилица, первая буква Заглавная',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpName);
      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });

    this.children.inputSecondName = new InputWrapper({
      type: 'text',
      name: 'second_name',
      placeholder: 'Фамилия',
      value: this.props.user.second_name,
      textError: 'Латиница или Кирилица, первая буква Заглавная',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpName);
      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });
    // inputDisplayName
    this.children.inputDisplayName = new InputWrapper({
      type: 'text',
      name: 'display_name',
      placeholder: 'Имя в чате',
      value: this.props.user.display_name,
      textError: 'Латиница или Кирилица, первая буква Заглавная',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpName);

      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });

    this.children.inputPhone = new InputWrapper({
      type: 'text',
      name: 'phone',
      placeholder: 'Телефон',
      textError: 'Введите телефон',
      value: this.props.user.phone,
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpPhone);

      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });

    this.children.buttonChangeData = new Button({
      type: 'submit',
      value: 'Сохранить',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const form = document.getElementById('formChangeData') as HTMLFormElement;
          const login = form.elements.namedItem('login') as HTMLInputElement;
          const email = form.elements.namedItem('email') as HTMLInputElement;
          const firstName = form.elements.namedItem('first_name') as HTMLInputElement;
          const secondName = form.elements.namedItem('second_name') as HTMLInputElement;
          const displayName = form.elements.namedItem('display_name') as HTMLInputElement;
          const phone = form.elements.namedItem('phone') as HTMLInputElement;
          const validForm = validation(email, regExpEmail) &&
            validation(login, regExpLogin) &&
            validation(firstName, regExpName) &&
            validation(secondName, regExpName) &&
            validation(displayName, regExpName) &&
            validation(phone, regExpPhone);
          if (validForm) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            UserController.putUser(data as unknown as UserUpdateRequest);
            const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
            const formChangeData = document.querySelector('#formChangeData');
            profileBodyInfo!.classList.remove(styles['display-none']);
            formChangeData!.classList.add(styles['display-none']);
          }
        },
      },
    });
    this.children.buttonCancelChangeData = new Button({
      type: 'button',
      value: 'Отмена',
      events: {
        click: () => {
          const formChangeData = document.querySelector('#formChangeData');
          const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
          if (formChangeData && profileBodyInfo) {
            profileBodyInfo.classList.remove(styles['display-none']);
            formChangeData.classList.add(styles['display-none']);
          }
        },
      },
    });

    this.children.inputOldPassword = new InputWrapper({
      type: 'password',
      name: 'oldPassword',
      placeholder: 'Старый пароль',
      textError: 'от 8 до 40 символов, одна заглавная буква и цифра',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpPassword);
      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },

    });
    this.children.inputNewPassword = new InputWrapper({
      type: 'password',
      name: 'newPassword',
      placeholder: 'Новый пароль',
      textError: 'от 8 до 40 символов, одна заглавная буква и цифра',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpPassword);
      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });
    this.children.inputRepeatPassword = new InputWrapper({
      type: 'password',
      name: 'repeatPassword',

      placeholder: 'Повторите пароль',
      textError: 'Пароли не совпадают',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpPassword);
      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });
    this.children.buttonChangePassword = new Button({
      type: 'submit',
      value: 'Сохранить',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const form = document.getElementById('formChangePassword') as HTMLFormElement;
          const oldPassword = form.elements.namedItem('oldPassword') as HTMLInputElement;
          const newPassword = form.elements.namedItem('newPassword') as HTMLInputElement;
          const repeatPassword = form.elements.namedItem('repeatPassword') as HTMLInputElement;
          const errorNewPassword = newPassword.parentElement!.nextElementSibling;
          const errorRepeatPassword = repeatPassword.parentElement!.nextElementSibling;
          const validForm = validation(oldPassword, regExpPassword) &&
            validation(newPassword, regExpPassword) &&
            validation(repeatPassword, regExpPassword) && newPassword.value === repeatPassword.value;
          if (newPassword.value !== repeatPassword.value) {
            errorNewPassword!.textContent = 'Пароли не совпадают';
            errorRepeatPassword!.textContent = 'Пароли не совпадают';
            errorNewPassword!.classList.add('visible');
            errorRepeatPassword!.classList.add('visible');
          } else {
            errorNewPassword!.textContent = 'от 8 до 40 символов, одна заглавная буква и цифра';
            errorRepeatPassword!.textContent = 'от 8 до 40 символов, одна заглавная буква и цифра';
          }
          if (validForm) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log(data);
            UserController.putUserPass(data as unknown as ChangePasswordRequest);
            const formChangePassword = document.querySelector('#formChangePassword');
            const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
            profileBodyInfo!.classList.remove(styles['display-none']);
            formChangePassword!.classList.add(styles['display-none']);
          }
        },
      },
    });
    this.children.buttonCancelChangeDataPass = new Button({
      type: 'button',
      value: 'Отмена',
      events: {
        click: () => {
          const formChangePassword = document.querySelector('#formChangePassword');
          const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
          if (formChangePassword && profileBodyInfo) {
            profileBodyInfo.classList.remove(styles['display-none']);
            formChangePassword.classList.add(styles['display-none']);
          }
        },
      },
    });
    this.children.modal = new Modal({file: true});
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.profile}}">
            <aside class="{{styles.profile-sidebar}}">
                {{{link}}}
            </aside>
            <div class="{{styles.profile-body}}">
                {{{buttonOpenModal}}}
                <div class="{{styles.profile-body-info}}">
                    <h2>Иван</h2>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Почта</p>
                        <p class="{{styles.gray}}">{{user.email}}</p>
                    </div>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Логин</p>
                        <p class="{{styles.gray}}">{{user.login}}</p>
                    </div>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Имя</p>
                        <p class="{{styles.gray}}">{{user.first_name}}</p>
                    </div>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Фамилия</p>
                        <p class="{{styles.gray}}">{{user.second_name}}</p>
                    </div>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Имя в чате</p>
                        <p class="{{styles.gray}}">{{user.display_name}}</p>
                    </div>
                    <div class="{{styles.info}}" data-last="true">
                        <p class="{{styles.white}}">Телефон</p>
                        <p class="{{styles.gray}}">{{user.phone}}</p>
                    </div>
                    <div class="{{styles.link}}">
                        {{{buttonOpenModalChangeData}}}
                    </div>
                    <div class="{{styles.link}}">
                        {{{buttonOpenModalChangePassword}}}
                    </div>
                    <div class="{{styles.link}}" data-last="true">
                        {{{buttonOpenModalExit}}}
                    </div>
                </div>
                <form id="formChangeData" class="{{styles.display-none}}">
                    {{{inputEmail}}}
                    {{{inputLogin}}}
                    {{{inputName}}}
                    {{{inputSecondName}}}
                    {{{inputDisplayName}}}
                    {{{inputPhone}}}

                    {{{buttonChangeData}}}
                    {{{buttonCancelChangeData}}}
                </form>
                <form id="formChangePassword" class="{{styles.display-none}}">
                    {{{inputOldPassword}}}
                    {{{inputNewPassword}}}
                    {{{inputRepeatPassword}}}
                    {{{buttonChangePassword}}}
                    {{{buttonCancelChangeDataPass}}}
                </form>
            </div>
            {{{modal}}}
        </div>
    `;
  }
}

const withUser = withStore((state) => ({user: state.user || {}}));

export const Settings = withUser(SettingsPage);
