import Block from 'src/utils/Block';
import styles from './styles.module.css';
import { iconAdd, iconDel, iconUpload } from 'src/components/icons/icons';

interface Props {
  type: string;
  openModal?: (event: Event) => void;
  events: Record<string, ((event: Event) => void) | undefined>;
  styles: typeof styles;
  iconAdd: string;
  iconDel: string;
  iconUpload: string;
}

export class ButtonOpenModal extends Block<Props> {
  constructor({type, openModal}: Props) {
    super({type, events: {click: openModal}, styles, iconAdd, iconDel, iconUpload});
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
                {{{iconUpload}}}
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
