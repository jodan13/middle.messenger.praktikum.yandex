import Block from 'src/utils/Block';
import styles from './styles.module.css';
import { validation } from 'src/utils/validation';
import { regExpLogin, regExpPassword } from 'src/utils/const';
import InputWrapper from 'src/components/inputWrapper/input';
import Button from 'src/components/button/button';
import { Link } from 'src/components/link/link';

interface Props {
  styles?: string;
  events: {
    submit: (event: Event) => void;
  };
}

export class FormLogin extends Block<Props> {
  constructor(props: Props) {
    super({...props, styles});
  }

  protected init() {
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
      // events: {
      //   click: (event) => {
      //     this.props.events.submit(event);
      //   },
      // },
    });
    this.children.link = new Link({
      label: 'Регистрация',
      to: '/sign-up',
    });
  }

  render() {
    // language=hbs
    return `
        <form id="loginForm">
            {{{login}}}
            {{{password}}}
            {{{button}}}
            {{{link}}}
        </form>
    `;
  }
}
