import registerComponent from 'src/utils/registerComponent';
import Button from 'src/components/button/button';
import InputWrapper from 'src/components/inputWrapper/input';
import { regExpLogin, regExpPassword } from 'src/utils/const';
import { validation } from 'src/utils/validation';
import Block from 'src/utils/Block';
import AuthController from 'src/controllers/AuthController';
import { SignupData } from 'src/api/AuthAPI';
import styles from './styles.module.css';

registerComponent('Button', Button);
registerComponent('InputWrapper', InputWrapper);


export class Login extends Block {
  constructor() {
    super({styles});

    this.setProps({
      submit: (event: Event) => {
        event.preventDefault();
        const form = document.getElementById('loginForm') as HTMLFormElement;
        const login = form.elements.namedItem('login') as HTMLInputElement;
        const password = form.elements.namedItem('password') as HTMLInputElement;
        if (validation(login, regExpLogin) && validation(password, regExpPassword)) {
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          console.log(data);
          AuthController.signin(data as unknown as SignupData);
          // let delay = 5;
          // console.log(`переход на страницу messenger через:`);
          // console.log(delay);
          //
          // const timer = setInterval(function () {
          //   console.log(--delay);
          //   if (!delay) {
          //     clearInterval(timer);
          //     window.location.href = 'messenger';
          //   }
          // }, 1000);
        }
      },
      onBlurLogin: ({target}: HTMLInputEvent) => {
        validation(target, regExpLogin);
      },
      onFocusLogin: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.classList.remove('visible');
      },
      onBlurPassword: ({target}: HTMLInputEvent) => {
        validation(target, regExpPassword);
      },
      onFocusPassword: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.classList.remove('visible');
      },
    });
  }

  init() {
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.wrapper}}">
            <div class="{{styles.sign-in}}">
                <h1 class="{{styles.title}}">Вход</h1>
                <form id="loginForm">
                    {{{InputWrapper
                            type="text"
                            name="login"
                            placeholder="Логин"
                            onBlur=onBlurLogin
                            onFocus=onFocusLogin
                            textError="от 3 до 20 символов, латиница, цифры"
                    }}}
                    {{{InputWrapper
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            onBlur=onBlurPassword
                            onFocus=onFocusPassword
                            textError="от 8 до 40 символов, одна заглавная буква и цифра"
                    }}}
                    {{{Button value="Войти" type="submit" onClick=submit}}}
                    {{{Link label='Регистрация' to='/sign-up'}}}
                </form>
            </div>
        </div>`;
  }
}
