import './profile.css';
import '../../components/modal/modal.css';
import Block from 'src/utils/Block';
import { validation } from 'src/utils/validation';
import { regExpEmail, regExpLogin, regExpName, regExpPassword, regExpPhone } from 'src/utils/const';
import AuthController from 'src/controllers/AuthController';

export class ProfilePage extends Block {
  constructor() {
    super({});
    this.setProps({
      submit: (event: Event) => {
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
          console.log(data);
          const profileBodyInfo = document.querySelector('.profile-body-info');
          const formChangeData = document.querySelector('#formChangeData');
          profileBodyInfo!.classList.remove('display-none');
          formChangeData!.classList.add('display-none');
        }
      },
      submitPass: (event: Event) => {
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

          const formChangePassword = document.querySelector('#formChangePassword');
          const profileBodyInfo = document.querySelector('.profile-body-info');
          profileBodyInfo!.classList.remove('display-none');
          formChangePassword!.classList.add('display-none');
        }
      },

      changeData: () => {
        const formChangeData = document.querySelector('#formChangeData');
        const profileBodyInfo = document.querySelector('.profile-body-info');
        if (formChangeData && profileBodyInfo) {
          profileBodyInfo.classList.add('display-none');
          formChangeData.classList.remove('display-none');
        }
      },
      changePassword: () => {
        const formChangePassword = document.querySelector('#formChangePassword');
        const profileBodyInfo = document.querySelector('.profile-body-info');
        console.log(formChangePassword, profileBodyInfo);
        if (formChangePassword && profileBodyInfo) {
          profileBodyInfo.classList.add('display-none');
          formChangePassword.classList.remove('display-none');
        }
      },
      exit: () => {
        AuthController.logout();
      },
      openModal: () => {
        const modal = document.getElementById('myModal');
        if (modal) {
          modal.style.display = 'flex';

          const modalH3 = modal.querySelector('h3');
          if (modalH3) {
            modalH3.textContent = 'Загрузить файл';
          }
          const modalP = modal.querySelector('.text-field__message');
          if (modalP) {
            modalP.textContent = '';
          }

          const modalForm = modal.querySelector('input[type=text]') as HTMLInputElement;
          if (modalForm) {
            modalForm.setAttribute('type', 'file');
          }

          const modalLabel = modal.querySelector('label span');
          if (modalLabel) {
            modalLabel.textContent = 'Выбрать файл на компьютере';
          }

          const modalLabelSpan = modal.querySelector('label span');
          if (modalLabelSpan) {
            modalLabelSpan.classList.add('file');
          }
          const modalFormSubmit = modal.querySelector('input[type=submit]') as HTMLInputElement;
          if (modalFormSubmit) {
            modalFormSubmit.value = 'Поменять';
          }
        }
      },

      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.classList.remove('visible');
      },
      onBlurEmail: ({target}: HTMLInputEvent) => {
        validation(target, regExpEmail);
      },
      onBlurLogin: ({target}: HTMLInputEvent) => {
        validation(target, regExpLogin);
      },
      onBlurName: ({target}: HTMLInputEvent) => {
        validation(target, regExpName);
      },
      onBlurPhone: ({target}: HTMLInputEvent) => {
        validation(target, regExpPhone);
      },
      onBlurPassword: ({target}: HTMLInputEvent) => {
        validation(target, regExpPassword);
      },
    });
  }

  render() {
    // language=hbs
    return `
        <div class="profile">
            <aside class="profile-sidebar">
                <a href="home" class="profile-sidebar">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="var(--link-color)"/>
                        <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"
                              stroke="white"/>
                        <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/>
                    </svg>
                </a>
            </aside>
            <div class="profile-body">

                {{{ButtonOpenModal type="openModalUploadAvatar" openModal=openModal}}}
                <div class="profile-body-info">
                    <h2>Иван</h2>
                    <div class="info">
                        <p class="white">Почта</p>
                        <p class="gray">pochta@yandex.ru</p>
                    </div>
                    <div class="info">
                        <p class="white">Логин</p>
                        <p class="gray">IvanIvanov</p>
                    </div>
                    <div class="info">
                        <p class="white">Имя</p>
                        <p class="gray">Иван</p>
                    </div>
                    <div class="info">
                        <p class="white">Фамилия</p>
                        <p class="gray">Иванов</p>
                    </div>
                    <div class="info">
                        <p class="white">Имя в чате</p>
                        <p class="gray">Иван</p>
                    </div>
                    <div class="info last">
                        <p class="white">Телефон</p>
                        <p class="gray">+7 (909) 967 30 30</p>
                    </div>
                    <div class="link">{{{ButtonOpenModal type='changeData' openModal=changeData}}}</div>
                    <!--                    <div class="link"><a id="changeData">Изменить данные</a></div>-->
                    <div class="link">{{{ButtonOpenModal type='changePassword' openModal=changePassword}}}</div>
                    <div class="link last">{{{ButtonOpenModal type='exit' openModal=exit}}}</div>
                </div>
                <form id="formChangeData" class="display-none">
                    {{{InputWrapper
                            type="email"
                            name="email"
                            placeholder="Почта"
                            onBlur=onBlurEmail
                            onFocus= onFocus
                            textError="Введите email"
                    }}}
                    {{{InputWrapper
                            type="text"
                            name="login"
                            placeholder="Логин"
                            onBlur=onBlurLogin
                            onFocus=onFocus
                            textError="от 3 до 20 символов, латиница, цифры"
                    }}}
                    {{{InputWrapper
                            type="text"
                            name="first_name"
                            placeholder="Имя"
                            onBlur=onBlurName
                            onFocus= onFocus
                            textError="Латиница или Кирилица, первая буква Заглавная"
                    }}}
                    {{{InputWrapper
                            type="text"
                            name="second_name"
                            placeholder="Фамилия"
                            onBlur=onBlurName
                            onFocus= onFocus
                            textError="Латиница или Кирилица, первая буква Заглавная"
                    }}}
                    {{{InputWrapper
                            type="text"
                            name="display_name"
                            placeholder="Имя в чате"
                            onBlur=onBlurName
                            onFocus= onFocus
                            textError="Латиница или Кирилица, первая буква Заглавная"
                    }}}
                    {{{InputWrapper
                            type="tel"
                            name="phone"
                            placeholder="Телефон"
                            onBlur=onBlurPhone
                            onFocus= onFocus
                            textError="Введите телефон"
                    }}}
                    {{{Button value="Сохранить" type="submit" onClick=submit}}}
                </form>
                <form id="formChangePassword" class="display-none">
                    {{{InputWrapper
                            type="password"
                            name="oldPassword"
                            placeholder="Старый пароль"
                            onBlur=onBlurPassword
                            onFocus=onFocus
                            textError="от 8 до 40 символов, одна заглавная буква и цифра"
                    }}}
                    {{{InputWrapper
                            type="password"
                            name="newPassword"
                            placeholder="Новый пароль"
                            onBlur=onBlurPassword
                            onFocus=onFocus
                            textError="от 8 до 40 символов, одна заглавная буква и цифра"
                    }}}
                    {{{InputWrapper
                            type="password"
                            name="repeatPassword"
                            placeholder="Новый пароль (еще раз)"
                            onBlur=onBlurPassword
                            onFocus=onFocus
                            textError="от 8 до 40 символов, одна заглавная буква и цифра"
                    }}}
                    {{{Button value="Сохранить" type="submit" onClick=submitPass}}}
                </form>
            </div>
            {{{Modal}}}
        </div>
    `;
  }
}
