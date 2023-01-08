import Block from 'src/utils/Block';
import { SignupData } from 'src/api/AuthAPI';
import { FormLogin } from 'src/components/formLogin/formLogin';
import { regExpLogin, regExpPassword } from 'src/utils/const';
import { validation } from 'src/utils/validation';
import AuthController from '../../controllers/AuthController';
import styles from './styles.module.css';

export default class Login extends Block {
  constructor() {
    super({styles});
  }

  init() {
    const submit = (event: Event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;

      const login = form.querySelector('input[name="login"]') as HTMLInputElement;
      const password = form.querySelector('input[name="password"]') as HTMLInputElement;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      if (validation(login, regExpLogin) && validation(password, regExpPassword)) {
        AuthController.signin(data as unknown as SignupData);
      }
    };
    this.children.formLogin = new FormLogin({
      events: {
        submit,
      },
    });
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.wrapper}}">
            <div class="{{styles.sign-in}}">
                <h1 class="{{styles.title}}">Вход</h1>
                {{{formLogin}}}
            </div>
        </div>`;
  }
}
