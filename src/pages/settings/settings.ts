import 'src/components/modal/styles.module.css';
import Block from 'src/utils/Block';
import { validation } from 'src/utils/validation';
import { regExpEmail, regExpLogin, regExpName, regExpPassword, regExpPhone } from 'src/utils/const';
import AuthController from 'src/controllers/AuthController';
import styles from 'src/pages/settings/styles.module.css';

export class SettingsPage extends Block {
  constructor() {
    super({styles});
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
          const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
          const formChangeData = document.querySelector('#formChangeData');
          profileBodyInfo!.classList.remove(styles['display-none']);
          formChangeData!.classList.add(styles['display-none']);
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
          const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
          profileBodyInfo!.classList.remove(styles['display-none']);
          formChangePassword!.classList.add(styles['display-none']);
        }
      },
      cancel: (event: Event) => {
        event.preventDefault();
        const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
        const formChangeData = document.querySelector('#formChangeData');
        const formChangePassword = document.querySelector('#formChangePassword');
        profileBodyInfo!.classList.remove(styles['display-none']);
        formChangeData!.classList.add(styles['display-none']);
        formChangePassword!.classList.add(styles['display-none']);
      },
      changeData: () => {
        const formChangeData = document.querySelector('#formChangeData');
        const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
        if (formChangeData && profileBodyInfo) {
          profileBodyInfo.classList.add(styles['display-none']);
          formChangeData.classList.remove(styles['display-none']);
        }
      },
      changePassword: () => {
        const formChangePassword = document.querySelector('#formChangePassword');
        const profileBodyInfo = document.getElementsByClassName(styles['profile-body-info'])[0];
        console.log(formChangePassword, profileBodyInfo);
        if (formChangePassword && profileBodyInfo) {
          profileBodyInfo.classList.add(styles['display-none']);
          formChangePassword.classList.remove(styles['display-none']);
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
            //data-file
            modalLabelSpan.setAttribute('data-file', 'file');
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
        <div class="{{styles.profile}}">
            <aside class="{{styles.profile-sidebar}}">
                {{{Link label='Войти' to='/messenger' linkSidebar=true }}}
            </aside>
            <div class="{{styles.profile-body}}">

                {{{ButtonOpenModal type="openModalUploadAvatar" openModal=openModal}}}
                <div class="{{styles.profile-body-info}}">
                    <h2>Иван</h2>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Почта</p>
                        <p class="{{styles.gray}}">pochta@yandex.ru</p>
                    </div>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Логин</p>
                        <p class="{{styles.gray}}">IvanIvanov</p>
                    </div>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Имя</p>
                        <p class="{{styles.gray}}">Иван</p>
                    </div>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Фамилия</p>
                        <p class="{{styles.gray}}">Иванов</p>
                    </div>
                    <div class="{{styles.info}}">
                        <p class="{{styles.white}}">Имя в чате</p>
                        <p class="{{styles.gray}}">Иван</p>
                    </div>
                    <div class="{{styles.info}}" data-last="true">
                        <p class="{{styles.white}}">Телефон</p>
                        <p class="{{styles.gray}}">+7 (909) 967 30 30</p>
                    </div>
                    <div class="{{styles.link}}">{{{ButtonOpenModal type='changeData' openModal=changeData}}}</div>
                    <!--                    <div class="link"><a id="changeData">Изменить данные</a></div>-->
                    <div class="{{styles.link}}">{{{ButtonOpenModal type='changePassword'
                                                                    openModal=changePassword}}}</div>
                    <div class="{{styles.link}}" data-last="true">{{{ButtonOpenModal type='exit' openModal=exit}}}</div>
                </div>
                <form id="formChangeData" class="{{styles.display-none}}">
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
                    {{{Button value="Отмена" type="button" onClick=cancel}}}
                </form>
                <form id="formChangePassword" class="{{styles.display-none}}">
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
                    {{{Button value="Отмена" type="button" onClick=cancel}}}
                </form>
            </div>
            {{{Modal}}}
        </div>
    `;
  }
}
