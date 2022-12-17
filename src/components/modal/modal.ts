import Block from 'src/utils/Block';
import { validation } from 'src/utils/validation';
import { regExpLogin } from 'src/utils/const';
import styles from './styles.module.css';

export class Modal extends Block<unknown> {
  constructor() {
    super({styles});
    window.addEventListener('click', (event) => {
      if (this._element && event.target === this._element) {
        this._element.style.display = 'none';
      }
    });

    this.setProps({
      submit: (event: Event) => {
        event.preventDefault();
        const form = document.getElementById('modalForm') as HTMLFormElement;
        const login = form.elements.namedItem('login') as HTMLInputElement;
        if (validation(login, regExpLogin)) {
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          console.log(data);
        }
      },
      onBlurLogin: ({target}: HTMLInputEvent) => {
        validation(target, regExpLogin);
      },
      onFocusLogin: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.classList.remove('visible');
      },

    });
  }

  render() {
    // language=hbs
    return `
        <div id="myModal" class="{{styles.modal}}">
            <div class="{{styles.modal-content}}">
                <h3>Добавить пользователя</h3>
                <form id="modalForm">
                    {{{InputWrapper
                            type="text"
                            name="login"
                            placeholder="Логин"
                            onBlur=onBlurLogin
                            onFocus=onFocusLogin
                            textError="от 3 до 20 символов, латиница, цифры"
                    }}}
                    {{{Button value="Войти" type="submit" onClick=submit}}}
                </form>
            </div>
        </div>
    `;
  };
}
