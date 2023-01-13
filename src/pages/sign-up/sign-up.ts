import Block from 'src/utils/Block';
import { validation } from 'src/utils/validation';
import { regExpEmail, regExpLogin, regExpName, regExpPassword, regExpPhone } from 'src/utils/const';
import { SignupData } from 'src/api/AuthAPI';
import AuthController from 'src/controllers/AuthController';
import styles from './styles.module.css';
import InputWrapper from 'src/components/inputWrapper/input';
import Button from 'src/components/button/button';
import { Link } from 'src/components/link/link';

export class SignUp extends Block {
  constructor() {
    super({styles});
  }

  protected init() {
    const onBlurEmail = ({target}: HTMLInputEvent) => {
      validation(target, regExpEmail);
    };
    const onBlurLogin = ({target}: HTMLInputEvent) => {
      validation(target, regExpLogin);
    };
    const onBlurName = ({target}: HTMLInputEvent) => {
      validation(target, regExpName);
    };
    const onBlurPhone = ({target}: HTMLInputEvent) => {
      validation(target, regExpPhone);
    };
    const onBlurPassword = ({target}: HTMLInputEvent) => {
      validation(target, regExpPassword);
    };
    const onFocus = ({target}: HTMLInputEvent) => {
      const error = target!.parentElement!.nextElementSibling;
      error!.classList.remove('visible');
    };
    this.children.email = new InputWrapper({
      name: 'email',
      type: 'email',
      textError: 'Введите email',
      placeholder: 'Почта',
      onBlur: onBlurEmail,
      onFocus: onFocus,
    });
    this.children.login = new InputWrapper({
      name: 'login',
      type: 'text',
      textError: 'от 3 до 20 символов, латиница, цифры',
      placeholder: 'Логин',
      onBlur: onBlurLogin,
      onFocus: onFocus,
    });
    this.children.firstName = new InputWrapper({
      name: 'first_name',
      type: 'text',
      textError: 'Латиница или Кирилица, первая буква Заглавная',
      placeholder: 'Имя',
      onBlur: onBlurName,
      onFocus: onFocus,
    });
    this.children.secondName = new InputWrapper({
      name: 'second_name',
      type: 'text',
      textError: 'Латиница или Кирилица, первая буква Заглавная',
      placeholder: 'Фамилия',
      onBlur: onBlurName,
      onFocus: onFocus,
    });
    this.children.phone = new InputWrapper({
      name: 'phone',
      type: 'tel',
      textError: 'Введите телефон',
      placeholder: 'Телефон',
      onBlur: onBlurPhone,
      onFocus: onFocus,
    });
    this.children.password = new InputWrapper({
      name: 'password',
      type: 'password',
      textError: 'от 8 до 40 символов, одна заглавная буква и цифра',
      placeholder: 'Пароль',

      onBlur: onBlurPassword,
      onFocus: onFocus,
    });
    this.children.repeatPassword = new InputWrapper({
      name: 'repeatPassword',
      type: 'password',
      textError: 'от 8 до 40 символов, одна заглавная буква и цифра',
      placeholder: 'Пароль (ещё раз)',
      onBlur: onBlurPassword,
      onFocus: onFocus,
    });
    this.children.button = new Button({
      value: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const form = document.getElementById('registryForm') as HTMLFormElement;
          const email = form.elements.namedItem('email') as HTMLInputElement;
          const login = form.elements.namedItem('login') as HTMLInputElement;
          const firstName = form.elements.namedItem('first_name') as HTMLInputElement;
          const secondName = form.elements.namedItem('second_name') as HTMLInputElement;
          const phone = form.elements.namedItem('phone') as HTMLInputElement;
          const password = form.elements.namedItem('password') as HTMLInputElement;
          const repeatPassword = form.elements.namedItem('repeatPassword') as HTMLInputElement;
          const errorPassword = password.parentElement!.nextElementSibling;
          const errorRepeatPassword = repeatPassword.parentElement!.nextElementSibling;
          const validForm = validation(email, regExpEmail) &&
            validation(login, regExpLogin) &&
            validation(firstName, regExpName) &&
            validation(secondName, regExpName) &&
            validation(phone, regExpPhone) &&
            validation(password, regExpPassword) &&
            validation(repeatPassword, regExpPassword) &&
            password.value === repeatPassword.value;

          if (password.value !== repeatPassword.value) {
            errorPassword!.textContent = 'Пароли не совпадают';
            errorRepeatPassword!.textContent = 'Пароли не совпадают';
            errorPassword!.classList.add('visible');
            errorRepeatPassword!.classList.add('visible');
          } else {
            errorPassword!.textContent = 'от 8 до 40 символов, одна заглавная буква и цифра';
            errorRepeatPassword!.textContent = 'от 8 до 40 символов, одна заглавная буква и цифра';
          }

          if (validForm) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            delete data.repeatPassword;
            AuthController.signup(data as unknown as SignupData);
          }
        },
      },
    });
    this.children.link = new Link({
      label: 'Войти',
      to: '/',
    });
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.wrapper}}">
            <div class="{{styles.sign-in}}">
                <h1 class="{{styles.title}}">Регистрация</h1>
                <form id="registryForm">
                    {{{email}}}
                    {{{login}}}
                    {{{firstName}}}
                    {{{secondName}}}
                    {{{phone}}}
                    {{{password}}}
                    {{{repeatPassword}}}
                    {{{button}}}
                    {{{link}}}
                </form>
            </div>
        </div>

    `;
  }
}
