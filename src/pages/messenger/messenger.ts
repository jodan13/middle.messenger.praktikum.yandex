import Block from 'src/utils/Block';

import 'src/components/inputChat/styles.module.css';
import 'src/components/sidebar/styles.module.css';
import 'src/components/dropdown/styles.module.css';
import 'src/components/modal/styles.module.css';
import Sidebar from 'src/components/sidebar/sidebar';
import { Dropdown } from 'src/components/dropdown/dropdown';
import { Modal } from 'src/components/modal/modal';
import { ButtonSendMessage } from 'src/components/buttonSendMessage/buttonSendMessage';
import styles from 'src/pages/messenger/styles.module.css';
import ChatsController from 'src/controllers/ChatsController';
import InputChat from 'src/components/inputChat/inputChat';

export class MessengerPage extends Block {
  constructor() {
    super({styles});
    window.addEventListener('popstate', () => {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(String(prop)),
      }) as URLSearchParams & { [key: string]: string };
      this.setProps({getIdChat: !!params.id});
    });
    this.setProps({
      getIdChat: () => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(String(prop)),
        }) as URLSearchParams & { [key: string]: string };
        return !!params.id;
      },
      onclickMessage: (event: Event) => {
        event.preventDefault();
        const form = document.getElementById('formMessage') as HTMLFormElement;
        const input = form.elements.namedItem('message') as HTMLInputElement;
        if (input.value) {
          const message = input.value;
          console.log(input.value);
          input.value = '';
          const chat = document.querySelector('#chat-message-content-text') as HTMLElement;
          const date = new Date();
          const time = `${date.getHours()}:${date.getMinutes()}`;
          const div = document.createElement('div');
          div.classList.add(styles.message);
          div.dataset.my = 'true';
          div.innerHTML = `
            <div class="${styles['message-content']}" data-my="true">
                <p>${message}</p>
            </div>
            <div class="${styles['message-time']}">
                ${time}
            </div>
        `;
          chat.appendChild(div);
        } else {
          console.log('empty');
        }
      },
    });
  }

  protected init() {
    this.children.sidebar = new Sidebar({isLoaded: false});
    ChatsController.fetchChats().finally(() => {
      (this.children.sidebar as Block).setProps({
        isLoaded: true,
      });
    });
    this.children.modal = new Modal({});
    this.children.dropdown = new Dropdown({
      id: 'myDropdown',
    });
    this.children.dropdownFile = new Dropdown({
      id: 'myDropdownFile',
      message: true,
    });
    this.children.inputChat = new InputChat({
      placeholder: 'Сообщение',
      name: 'message',
      iconSearch: false,
    });
    this.children.buttonSendMessage = new ButtonSendMessage({
      events: {
        click: this.props.onclickMessage,
      },
    });
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(String(prop)),
    }) as URLSearchParams & { [key: string]: string };
    this.setProps({getIdChat: !!params.id});

  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.chat}}">
            {{{sidebar}}}
            {{#if getIdChat}}
                <div class="{{styles.chat-message}}">
                    <div class="{{styles.chat-message-header}}">
                        <div class="{{styles.chat-message-name}}">
                            <img class="{{styles.message-avatar}}" src="{{img}}" alt="avatar">
                            <p>Вадим</p>
                        </div>
                        {{{dropdown}}}
                    </div>
                    <div class="{{styles.chat-message-content}}">
                        <div class="{{styles.chat-message-content-text}}" id="chat-message-content-text">
                            <div class="{{styles.date}}">19 июня</div>
                            <div class="{{styles.message}}">
                                <div class="{{styles.message-content}}">
                                    <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в
                                        какой-то момент попросила
                                        Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что
                                        астронавты летали с
                                        моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на
                                        поверхности Луны, так как
                                        астронавты с собой забрали только кассеты с пленкой.

                                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на
                                        ракету они так никогда и не
                                        попали. Всего их было произведено 25 штук, одну из них недавно продали на
                                        аукционе за 45000 евро.</p>
                                </div>
                                <div class="{{styles.message-time}}">
                                    10:49
                                </div>
                            </div>
                            <div class="{{styles.message}}" data-my="true">
                                <div class="{{styles.message-content}}" data-my="true">
                                    <p>Привет, как дела?</p>
                                </div>
                                <div class="{{styles.message-time}}">
                                    10:49
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="{{styles.chat-message-footer}}">
                        {{{dropdownFile}}}
                        <form id="formMessage">
                            {{{inputChat}}}
                            {{{buttonSendMessage}}}
                        </form>
                    </div>
                </div>
            {{else}}
                <div class="{{styles.message-select-chat}}">
                    <p class="{{styles.text-message-select-chat}}">Выберите чат чтобы отправить сообщение</p>
                </div>
            {{/if}}
            {{{modal}}}
        </div>
    `;
  }
}
