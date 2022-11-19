import Block from 'src/utils/Block';

interface Props {
  type: string;
  openModal: (event: Event) => void;
}

export class ButtonOpenModal extends Block {
  constructor({type, openModal}: Props) {
    super({type, events: {click: openModal}});
  }

  render() {
    switch (this.props.type) {
      case 'openModalAddUser':
        // language=hbs
        return `
            <a class="disableEvent" id="openModalAddUser">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="10.25" stroke="var(--link-color)" stroke-width="1.5"/>
                    <line x1="10.9999" y1="5.5" x2="10.9999" y2="16.5" stroke="#3369F3" stroke-width="1.5"/>
                    <line x1="5.49988" y1="11" x2="16.4999" y2="11" stroke="#3369F3" stroke-width="1.5"/>
                </svg>
                <span>Добавить пользователя</span>
            </a>
        `;
      case 'openModalDelUser':
        // language=hbs
        return `
            <a class="disableEvent" id="openModalDelUser">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="10.25" stroke="var(--link-color)" stroke-width="1.5"/>
                    <line x1="7.11077" y1="7.11103" x2="14.8889" y2="14.8892" stroke="#3369F3"
                          stroke-width="1.5"/>
                    <line x1="7.11078" y1="14.8891" x2="14.889" y2="7.11093" stroke="#3369F3"
                          stroke-width="1.5"/>
                </svg>
                <span>Удалить пользователя</span>
            </a>
        `;
      case 'openModalUploadAvatar':
        // language=hbs
        return `
            <div class="profile-img-circle" id="openModalUploadAvatar">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z"
                          fill="var(--color-icon-3)"/>
                </svg>
                <p>Поменять аватар</p>
            </div>`;
      case 'changeData':
        // language=hbs
        return `<a id="changeData">Изменить данные</a>`;
      case 'changePassword':
        // language=hbs
        return `<a id="changePassword">Изменить пароль</a>`;
      default:
        return '<div>default</div>';
    }
  }
}
