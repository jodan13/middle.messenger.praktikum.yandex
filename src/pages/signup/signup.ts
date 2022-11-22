import Block from 'src/utils/Block';
import { validation } from 'src/utils/validation';
import { regExpEmail, regExpLogin, regExpName, regExpPassword, regExpPhone } from 'src/utils/const';

export class Signup extends Block<unknown> {
  constructor(props: {}) {
    super(props);
    this.setProps({
      submit: (event: Event) => {
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
          const data = Object.fromEntries(formData.entries());
          console.log(data);
        }
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
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.classList.remove('visible');
      },
    });
  }

  render() {
    // language=hbs
    return `
        <div class="wrapper">
            <div class="sign-in">
                <h1 class="title">Регистрация</h1>
                <form id="registryForm">
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
                            type="tel"
                            name="phone"
                            placeholder="Телефон"
                            onBlur=onBlurPhone
                            onFocus= onFocus
                            textError="Введите телефон"
                    }}}
                    {{{InputWrapper
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            onBlur=onBlurPassword
                            onFocus=onFocus
                            textError="от 8 до 40 символов, одна заглавная буква и цифра"
                    }}}
                    {{{InputWrapper
                            type="password"
                            name="repeatPassword"
                            placeholder="Пароль (еще раз)"
                            onBlur=onBlurPassword
                            onFocus=onFocus
                            textError="от 8 до 40 символов, одна заглавная буква и цифра"
                    }}}
                    {{{Button value="Регистрация" type="submit" onClick=submit}}}
                    <a href="login">Войти</a>
                </form>
            </div>
        </div>

    `;
  }
}
