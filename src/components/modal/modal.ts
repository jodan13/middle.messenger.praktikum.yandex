import Block from 'src/utils/Block';
import { validation } from 'src/utils/validation';
import { regExpLogin } from 'src/utils/const';
import styles from './styles.module.css';
import InputWrapper from 'src/components/inputWrapper/input';
import Button from 'src/components/button/button';
import UserController from 'src/controllers/UserController';
import ChatsController from 'src/controllers/ChatsController';

interface Props {
  file?: boolean;
  styles?: typeof styles;
  title?: string;
}

export class Modal extends Block<Props> {
  constructor(props: Props) {
    super({...props, styles});
    window.addEventListener('click', (event) => {
      if (this.element && event.target === this.element) {
        this.element.style.display = 'none';
      }
    });
  }

  protected init() {
    this.children.inputWrapper = new InputWrapper({
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
      textError: 'от 3 до 20 символов, латиница, цифры',
      onBlur: ({target}: HTMLInputEvent) => {
        validation(target, regExpLogin);
      },
      onFocus: ({target}: HTMLInputEvent) => {
        const error = target!.parentElement!.nextElementSibling;
        error!.setAttribute('data-error', 'false');
      },
    });
    this.children.button = new Button({
      value: 'Войти',
      type: 'submit',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const form = document.getElementById('modalForm') as HTMLFormElement;
          const login = form.elements.namedItem('login') as HTMLInputElement;
          const title = form.elements.namedItem('title') as HTMLInputElement;
          const chatId = form.elements.namedItem('chatId') as HTMLInputElement;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          if (login && validation(login, regExpLogin)) {
            console.log(data);
          }
          if (title && validation(title, regExpLogin)) {
            ChatsController.create(data.title as string);
            this.element!.style.display = 'none';
            title.value = '';
          }
          if (chatId) {
            ChatsController.delete(Number(data.chatId));
            this.element!.style.display = 'none';
            login.value = '';
          }
        },
      },
    });
    this.children.inputWrapperFile = new InputWrapper({
      type: 'file',
      name: 'avatar',
      placeholder: 'Выбрать файл на компьютере',
      textError: 'Нужно выбрать файл',
      onChange: ({target}: HTMLInputEvent) => {
        const span = target!.parentElement!.firstElementChild;
        span!.setAttribute('data-file', 'selected');
        span!.textContent = target!.files![0].name;
      },
    });
    this.children.buttonFile = new Button({
      value: 'Поменять',
      type: 'submit',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const form = document.getElementById('modalForm') as HTMLFormElement;
          const file = form.elements.namedItem('avatar') as HTMLInputElement;
          if (file!.files!.length === 0) {
            const error = file!.parentElement!.nextElementSibling;
            error!.setAttribute('data-error', 'true');
          } else {
            const formData = new FormData(form);
            UserController.putUserAvatar(formData);
          }
        },
      },
    });

  }

  render() {
    if (this.props.file) {
      // language=hbs
      return `
          <div id="myModal" class="{{styles.modal}}">
              <div class="{{styles.modal-content}}">
                  <h3>Загрузить файл</h3>
                  <form id="modalForm">
                      {{{inputWrapperFile}}}
                      {{{buttonFile}}}
                  </form>
              </div>
          </div>
      `;
    }

    // language=hbs
    return `
        <div id="myModal" class="{{styles.modal}}">
            <div class="{{styles.modal-content}}">
                <h3>Добавить пользователя</h3>
                <form id="modalForm">
                    {{{inputWrapper}}}
                    {{{button}}}
                </form>
            </div>
        </div>
    `;
  };
}
