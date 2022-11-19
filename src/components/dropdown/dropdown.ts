import Block from 'src/utils/Block';
import registerComponent from 'src/utils/registerComponent';
import { ButtonDropdownFile } from '../buttonDropdownFile/buttonDropdownFile';
import { ButtonDropdownDots } from '../ButtonDropdownDots/ButtonDropdownDots';
import { ButtonOpenModal } from '../buttonOpenModal/buttonOpenModal';

registerComponent('ButtonDropdownFile', ButtonDropdownFile);
registerComponent('ButtonDropdownDots', ButtonDropdownDots);
registerComponent('ButtonOpenModal', ButtonOpenModal);

interface Props {
  id: string;
  message: string;
  top: string;
}

export class Dropdown extends Block {
  constructor({id, message, top}: Props) {
    super({id, message, top});
    window.addEventListener('click', (event) => {
      if (event.target instanceof Element && !event.target.closest('.menu-dots')) {
        const myDropdown = document.getElementById('myDropdown');
        if (myDropdown && myDropdown.classList.contains('show')) {
          myDropdown.classList.remove('show');
        }
      }
      if (event.target instanceof Element && !event.target.closest('.attach-file')) {
        const myDropdownFile = document.getElementById('myDropdownFile');
        if (myDropdownFile && myDropdownFile.classList.contains('show')) {
          myDropdownFile.classList.remove('show');
        }
      }
    });
    this.setProps({
      onClickFile: (event: Event) => {
        event.preventDefault();
        const myDropdownFile = document.getElementById('myDropdownFile');
        if (myDropdownFile) {
          myDropdownFile.classList.toggle('show');
        }
      },
      onClick: (event: Event) => {
        event.preventDefault();
        const myDropdown = document.getElementById('myDropdown');
        if (myDropdown) {
          myDropdown.classList.toggle('show');
        }
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
        <div class="dropdown">
            {{#if message}}
                {{{ButtonDropdownFile onClickFile=onClickFile}}}
            {{else}}
                {{{ButtonDropdownDots onClick=onClick}}}
            {{/if}}
            <div id="{{id}}" class="dropdown-content {{top}}">
                {{#if message}}
                    <a href="#">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V14L14.5194 12.4052C13.5108 12.1362 12.4714 12 11.4275 12H10.5725C9.52864 12 8.48921 12.1362 7.48057 12.4052L1.5 14V4C1.5 2.61929 2.61929 1.5 4 1.5ZM0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V18C22 20.2091 20.2091 22 18 22H4C1.79086 22 0 20.2091 0 18V4ZM8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z"
                                  fill="var(--link-color)"/>
                        </svg>

                        <span>Фото или Видео</span>
                    </a>
                    <a href="#">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V12H16C13.7909 12 12 13.7909 12 16V20.5H4C2.61929 20.5 1.5 19.3807 1.5 18V4C1.5 2.61929 2.61929 1.5 4 1.5ZM12 22H4C1.79086 22 0 20.2091 0 18V4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V12V18C22 20.2091 20.2091 22 18 22H12Z"
                                  fill="var(--link-color)"/>
                        </svg>

                        <span>Файл</span>
                    </a>
                    <a href="#">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M20.5 11C20.5 16.2467 16.2467 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z"
                                  fill="var(--link-color)"/>
                        </svg>
                        <span>Локация</span>
                    </a>
                {{else}}
                    {{{ButtonOpenModal type='openModalAddUser' openModal=openModalAddUser}}}
                    {{{ButtonOpenModal type='openModalDelUser' openModal=openModalDelUser}}}
                {{/if}}
            </div>
        </div>
    `;
  }

}
