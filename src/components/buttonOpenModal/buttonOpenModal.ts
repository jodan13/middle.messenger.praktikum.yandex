import Block from 'src/utils/Block';
import styles from './styles.module.css';
import { iconAdd, iconDel, iconUpload } from 'src/components/icons/icons';
import { withStore } from 'src/hocs/withStore';
import { User } from 'src/api/AuthAPI';

interface Props {
  user: User,
  type: string;
  openModal?: (event: Event) => void;
  events: {
    click: () => void;
  };
  styles?: typeof styles;
  iconAdd?: string;
  iconDel?: string;
  iconUpload?: string;
}

class ButtonOpenModalBase extends Block<Props> {
  constructor(props: Props) {
    super({...props, styles, iconAdd, iconDel, iconUpload});
  }

  render() {
    switch (this.props.type) {
      case 'openModalAddUser':
        // language=hbs
        return `
            <a class="disableEvent" id="openModalAddUser">
                {{{iconAdd}}}
                <span>Добавить пользователя</span>
            </a>
        `;
      case 'openModalDelUser':
        // language=hbs
        return `
            <a class="disableEvent" id="openModalDelUser">
                {{{iconDel}}}
                <span>Удалить пользователя</span>
            </a>
        `;
      case 'openModalAddChat':
        // language=hbs
        return `
            <a class="disableEvent" id="openModalAddUser">
                {{{iconAdd}}}
                <span>Добавить чат</span>
            </a>
        `;
      case 'openModalDelChat':
        // language=hbs
        return `
            <a class="disableEvent" id="openModalDelUser">
                {{{iconDel}}}
                <span>Удалить чат</span>
            </a>
        `;
      case 'openModalUploadAvatar':
        // language=hbs
        return `
            <div class="{{styles.profile-img-circle}}" id="openModalUploadAvatar">
                {{#if user.avatar}}
                    <img src="https://ya-praktikum.tech/api/v2/resources{{user.avatar}}" alt="avatar">
                {{else}}
                    {{{iconUpload}}}
                {{/if}}
                <p>Поменять аватар</p>
            </div>`;
      case 'changeData':
        // language=hbs
        return `<a id="changeData">Изменить данные</a>`;
      case 'changePassword':
        // language=hbs
        return `<a id="changePassword">Изменить пароль</a>`;
      case 'exit':
        // language=hbs
        return `<a id="exit">Выйти</a>`;
      default:
        return '<div>default</div>';
    }
  }
}

const withUser = withStore((state) => ({user: state.user || {}}));

export const ButtonOpenModal = withUser(ButtonOpenModalBase);
