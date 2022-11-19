import Block from 'src/utils/Block';

import './login.css';
import '../../components/inputWrapper/input.css';
import '../../components/button/button.css';
import registerComponent from 'src/utils/registerComponent';
import Button from 'src/components/button/button';
import InputWrapper from 'src/components/inputWrapper/input';
import { regExpLogin, regExpPassword } from 'src/utils/const';
import { validation } from 'src/utils/validation';

registerComponent('Button', Button);
registerComponent('InputWrapper', InputWrapper);

export class Login extends Block {
  constructor(props: {}) {
    super(props);

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
          let delay = 5;
          console.log(`переход на страницу home через:`);
          console.log(delay);

          const timer = setInterval(function () {
            console.log(--delay);
            if (!delay) {
              clearInterval(timer);
              window.location.href = 'home';
            }
          }, 1000);
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
        <div class="wrapper">
            <div class="sign-in">
                <h1 class="title">Вход</h1>
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
                    <a href="signup">Регистрация</a>
                </form>
            </div>
        </div>`;
  }
}
