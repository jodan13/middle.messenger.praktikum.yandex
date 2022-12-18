import registerComponent from 'src/utils/registerComponent';
import Button from 'src/components/button/button';
import InputWrapper from 'src/components/inputWrapper/input';
import { regExpLogin, regExpPassword } from 'src/utils/const';
import { validation } from 'src/utils/validation';
import Block from 'src/utils/Block';
import AuthController from 'src/controllers/AuthController';
import { SignupData } from 'src/api/AuthAPI';
import styles from './styles.module.css';
import { Link } from 'src/components/link/link';

registerComponent('Button', Button);
registerComponent('InputWrapper', InputWrapper);


export class Login extends Block {
  constructor() {
    super({styles});
  }

  init() {
    const submit = (event: Event) => {
      event.preventDefault();
      const form = document.getElementById('loginForm') as HTMLFormElement;
      const login = form.elements.namedItem('login') as HTMLInputElement;
      const password = form.elements.namedItem('password') as HTMLInputElement;
      if (validation(login, regExpLogin) && validation(password, regExpPassword)) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        AuthController.signin(data as unknown as SignupData);
      }
    };
    const onBlurLogin = ({target}: HTMLInputEvent) => {
      validation(target, regExpLogin);
    };
    const onFocusLogin = ({target}: HTMLInputEvent) => {
      const error = target!.parentElement!.nextElementSibling;
      error!.classList.remove('visible');
    };
    const onBlurPassword = ({target}: HTMLInputEvent) => {
      validation(target, regExpPassword);
    };
    const onFocusPassword = ({target}: HTMLInputEvent) => {
      const error = target!.parentElement!.nextElementSibling;
      error!.classList.remove('visible');
    };
    this.children.login = new InputWrapper({
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
      textError: 'от 3 до 20 символов, латиница, цифры',
      onBlur: onBlurLogin,
      onFocus: onFocusLogin,
    });
    this.children.password = new InputWrapper({
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      textError: 'от 6 до 20 символов, латиница, цифры',
      onBlur: onBlurPassword,
      onFocus: onFocusPassword,
    });
    this.children.button = new Button({
      value: 'Войти',
      type: 'submit',
      events: {
        click: submit,
      },
    });
    this.children.link = new Link({
      label: 'Регистрация',
      to: '/sign-up',
    });

  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.wrapper}}">
            <div class="{{styles.sign-in}}">
                <h1 class="{{styles.title}}">Вход</h1>
                <form id="loginForm">
                    {{{login}}}
                    {{{password}}}
                    {{{button}}}
                    {{{link}}}
                </form>
            </div>
        </div>`;
  }
}
