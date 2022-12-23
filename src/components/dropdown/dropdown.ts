import Block from 'src/utils/Block';
import styles from './styles.module.css';
import { iconClip, iconDots, iconFile, iconLocation, iconPhoto } from 'src/components/icons/icons';
import { ButtonDropdown } from 'src/components/buttonDropdown/buttonDropdown';
import { ButtonOpenModal } from 'src/components/buttonOpenModal/buttonOpenModal';
import ChatsController from 'src/controllers/ChatsController';

interface Props {
  id: string;
  message?: boolean;
  chat?: boolean;
  onClickFile?: (event: Event) => void;
  onClick?: (event: Event) => void;
  openModalAddUser?: (event: Event) => void;
  openModalDelUser?: (event: Event) => void;
  styles?: typeof styles;
  iconFile?: string;
  iconPhoto?: string;
  iconLocation?: string;
  iconDots?: string;
  iconClip?: string;
}

export class Dropdown extends Block<Props> {
  constructor({id, message, chat}: Props) {
    super({id, message, styles, chat, iconFile, iconPhoto, iconLocation, iconDots, iconClip});
    window.addEventListener('click', (event) => {
      if (event.target instanceof Element && !event.target.closest('button')) {
        const myDropdown = document.getElementById(id);
        if (myDropdown && myDropdown.dataset.active) {
          myDropdown.removeAttribute('data-active');
        }
      }
    });
  }

  protected init() {
    this.children.buttonDropdown = new ButtonDropdown({
      onClick: this.props.onClick,
      message: this.props.message,
      events: {
        click: () => {
          const myDropdown = document.getElementById(this.props.id);
          myDropdown!.dataset.active = 'true';
        },
      },
    });
    this.children.buttonOpenModalAddChat = new ButtonOpenModal({
      type: 'openModalAddChat',
      openModal: this.props.openModalAddUser,
      events: {
        click: () => {
          ChatsController.openModal('openModalAddChat');
        },
      },
    });
    this.children.buttonOpenModalDelChat = new ButtonOpenModal({
      type: 'openModalDelChat',
      openModal: this.props.openModalDelUser,
      events: {
        click: () => {
          ChatsController.openModal('openModalDelChat');
        },
      },
    });
    this.children.buttonOpenModalAddUser = new ButtonOpenModal({
      type: 'openModalAddUser',
      openModal: this.props.openModalAddUser,
      events: {
        click: () => {
          ChatsController.openModal('openModalAddUser');
        },
      },
    });
    this.children.buttonOpenModalDelUser = new ButtonOpenModal({
      type: 'openModalDelUser',
      openModal: this.props.openModalDelUser,
      events: {
        click: () => {
          ChatsController.openModal('openModalDelUser');
        },
      },
    });
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.dropdown}}">
            {{{buttonDropdown}}}
            {{#if message}}
                <div id="{{id}}" class="{{styles.dropdown-content-top}}">
                    <a href="#">
                        {{{iconPhoto}}}
                        <span>Фото или Видео</span>
                    </a>
                    <a href="#">
                        {{{iconFile}}}
                        <span>Файл</span>
                    </a>
                    <a href="#">
                        {{{iconLocation}}}
                        <span>Локация</span>
                    </a>
                </div>
            {{else if chat}}
                <div id="{{id}}" class="{{styles.dropdown-content-left}}">
                    {{{buttonOpenModalAddChat}}}
                    {{{buttonOpenModalDelChat}}}
                </div>
            {{else}}
                <div id="{{id}}" class="{{styles.dropdown-content}}">
                    {{{buttonOpenModalAddUser}}}
                    {{{buttonOpenModalDelUser}}}
                </div>
            {{/if}}
        </div>
        </div>
    `;
  }
}
