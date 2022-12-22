import Block from 'src/utils/Block';
import { withStore } from 'src/hocs/withStore';
import Button from 'src/components/button/button';
import { validation } from 'src/utils/validation';
import { regExpId, regExpLogin } from 'src/utils/const';
import ChatsController from 'src/controllers/ChatsController';
import InputWrapper from 'src/components/inputWrapper/input';
import UserController from 'src/controllers/UserController';
import { UserResponse } from 'src/api/UsersAPI';

type Props = {
  modal: string;
  searchUser: UserResponse[];
  selectedChat: number;
  events?: {
    submit: (event: Event) => void;
  }
}

class ModalFormBase extends Block<Props> {
  constructor(props: Props) {
    super({...props});
  }

  protected init() {
    this.children.button = new Button({
      value: 'Добавить',
      type: 'submit',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const form = this.element as HTMLFormElement;
          const login = form.elements.namedItem('login') as HTMLInputElement;
          const loginDel = form.elements.namedItem('loginDel') as HTMLInputElement;
          const title = form.elements.namedItem('title') as HTMLInputElement;
          const chatId = form.elements.namedItem('chatId') as HTMLInputElement;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          if (login && validation(login, regExpLogin)) {
            UserController.searchUser(data.login as string).finally(() => {
              if (this.props.searchUser?.[0] && this.props.selectedChat) {
                ChatsController.addUserToChat(this.props.selectedChat, this.props.searchUser[0].id);
              }
            });
            ChatsController.openModal('');
          }
          if (loginDel && validation(loginDel, regExpLogin) && this.props.selectedChat) {
            ChatsController.getChatUsers(this.props.selectedChat).finally(() => {
              if (this.props.searchUser?.[0] && this.props.selectedChat) {
                ChatsController.deleteUserFromChat(this.props.selectedChat, this.props.searchUser[0].id);
              }
            });
            ChatsController.openModal('');
          }
          if (title && validation(title, regExpLogin)) {
            ChatsController.create(data.title as string);
            ChatsController.openModal('');
            title.value = '';
          }
          if (chatId) {
            ChatsController.delete(Number(data.chatId));
            ChatsController.openModal('');
            chatId.value = '';
          }
          const file = form.elements.namedItem('avatar') as HTMLInputElement;
          if (file) {
            if (file!.files!.length === 0) {
              const error = file!.parentElement!.nextElementSibling;
              error!.setAttribute('data-error', 'true');
            } else {
              const formData = new FormData(form);
              UserController.putUserAvatar(formData);
            }
          }
        },
      },
    });

    this.children.inputWrapper = new InputWrapper({
      type: 'text',
      name: 'avatar',
      placeholder: 'Выбрать файл на компьютере',
      textError: 'Файл не выбран',
    });
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const onBlur = ({target}: HTMLInputEvent) => {
      validation(target, regExpLogin);
    };
    const onBlurId = ({target}: HTMLInputEvent) => {
      validation(target, regExpId);
    };
    const onFocus = ({target}: HTMLInputEvent) => {
      const error = target!.parentElement!.nextElementSibling;
      error!.setAttribute('data-error', 'false');
    };
    const onChange = ({target}: HTMLInputEvent) => {
      const span = target!.parentElement!.firstElementChild;
      span!.setAttribute('data-file', 'selected');
      span!.textContent = target!.files![0].name;
    };
    if (newProps.modal === 'openModalAddChat' && oldProps.modal !== 'openModalAddChat') {
      (this.children.inputWrapper as InputWrapper).setProps({
        placeholder: 'Введите название чата',
        name: 'title',
        textError: 'от 3 до 20 символов, латиница, цифры',
        type: 'text',
        onBlur,
        onFocus,
      });
      (this.children.button as Button).setProps({
        value: 'Добавить',
      });
    }
    if (newProps.modal === 'openModalDelChat' && oldProps.modal !== 'openModalDelChat') {
      (this.children.inputWrapper as InputWrapper).setProps({
        placeholder: 'Введите id чата',
        name: 'chatId',
        textError: 'от 1 до 20 цифры',
        type: 'text',
        onBlur: onBlurId,
        onFocus,
      });
      (this.children.button as Button).setProps({
        value: 'Удалить',
      });
    }
    if (newProps.modal === 'openModalAddUser' && oldProps.modal !== 'openModalAddUser') {
      (this.children.inputWrapper as InputWrapper).setProps({
        placeholder: 'Введите логин пользователя',
        name: 'login',
        textError: 'от 3 до 20 символов, латиница, цифры',
        type: 'text',
        onBlur,
        onFocus,
      });
      (this.children.button as Button).setProps({
        value: 'Добавить',
      });
    }
    if (newProps.modal === 'openModalDelUser' && oldProps.modal !== 'openModalDelUser') {
      (this.children.inputWrapper as InputWrapper).setProps({
        placeholder: 'Логин',
        name: 'loginDel',
        textError: 'от 3 до 20 символов, латиница, цифры',
        type: 'text',
        onBlur,
        onFocus,
      });
      (this.children.button as Button).setProps({
        value: 'Удалить',
      });
    }
    if (newProps.modal === 'openModalUploadAvatar' && oldProps.modal !== 'openModalUploadAvatar') {
      (this.children.inputWrapper as InputWrapper).setProps({
        placeholder: 'Выбрать файл на компьютере',
        name: 'avatar',
        textError: 'Выберите файл',
        type: 'file',
        file: true,
        onChange,
      });

      (this.children.button as Button).setProps({
        value: 'Загрузить',
      });
    }

    return true;
  }


  render() {
    // language=hbs
    return `
        <form>
            {{{inputWrapper}}}
            {{{button}}}
        </form>
    `;
  }
}

const withModalForm = withStore((state) => ({
  selectedChat: state.selectedChat || [],
  searchUser: state.searchUser || [],
  modal: state.modal,
}));

export const ModalForm = withModalForm(ModalFormBase);
