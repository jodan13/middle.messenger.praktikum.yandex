import Block from 'src/utils/Block';
import styles from './styles.module.css';
import { iconClip, iconDots, iconFile, iconLocation, iconPhoto } from 'src/components/icons/icons';


interface Props {
  id: string;
  message?: string;
  chat?: string;
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
      console.log(event.target);
      if (event.target instanceof Element && !event.target.closest('button')) {
        const myDropdown = document.getElementById(id);
        if (myDropdown && myDropdown.dataset.active) {
          myDropdown.removeAttribute('data-active');
        }
      }
    });
    this.setProps({
      onClick: (event: Event) => {
        event.preventDefault();
        const myDropdown = document.getElementById(id);
        myDropdown!.dataset.active = 'true';
      },
      openModalAddUser: (event: Event) => {
        event.preventDefault();
        const modal = document.getElementById('myModal');
        if (modal) {
          modal.style.display = 'flex';
          const modalH3 = modal.querySelector('h3');
          if (modalH3) {
            modalH3.textContent = 'Добавить пользователя';
          }
          const modalForm = modal.querySelector('input[type=submit]') as HTMLInputElement;
          if (modalForm) {
            modalForm.value = 'Добавить';
          }
        }
      },
      openModalDelUser: (event: Event) => {
        event.preventDefault();
        const modal = document.getElementById('myModal');
        if (modal) {
          modal.style.display = 'flex';
          const modalH3 = modal.querySelector('h3');
          if (modalH3) {
            modalH3.textContent = 'Удалить пользователя';
          }
          const modalForm = modal.querySelector('input[type=submit]') as HTMLInputElement;
          if (modalForm) {
            modalForm.value = 'Удалить';
          }
        }
      },
    });
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.dropdown}}">
            {{{ButtonDropdown message=message onClick=onClick}}}
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
                    {{{ButtonOpenModal type='openModalAddChat' openModal=openModalAddUser}}}
                    {{{ButtonOpenModal type='openModalDelChat' openModal=openModalDelUser}}}
                </div>
            {{else}}
                <div id="{{id}}" class="{{styles.dropdown-content}}">
                    {{{ButtonOpenModal type='openModalAddUser' openModal=openModalAddUser}}}
                    {{{ButtonOpenModal type='openModalDelUser' openModal=openModalDelUser}}}
                </div>
            {{/if}}
        </div>
        </div>
    `;
  }

}
