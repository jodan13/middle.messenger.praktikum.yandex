import Block from 'src/utils/Block';

import './home.css';
import '../../components/inputChat/inputChat.css';
import '../../components/sidebar/sidebar.css';
import '../../components/dropdown/dropdown.css';
import '../../components/modal/modal.css';

import registerComponent from 'src/utils/registerComponent';
import { Sidebar } from 'src/components/sidebar/sidebar';
import { Dropdown } from 'src/components/dropdown/dropdown';
import { Modal } from 'src/components/modal/modal';
import { ButtonSendMessage } from 'src/components/buttonSendMessage/buttonSendMessage';

registerComponent('Sidebar', Sidebar);
registerComponent('Dropdown', Dropdown);
registerComponent('Modal', Modal);
registerComponent('ButtonSendMessage', ButtonSendMessage);

interface Props {
  img?: string;
  modifiedChatsReply?: Record<string, unknown>[];
  getIdChat?: (event: Event) => void;
  onclickMessage?: (event: Event) => void;
}

export class HomePage extends Block<Props> {
  constructor({img, modifiedChatsReply}: Props) {
    super({img, modifiedChatsReply});
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
          const chat = document.querySelector('.chat-message-content-text') as HTMLElement;
          const date = new Date();
          const time = `${date.getHours()}:${date.getMinutes()}`;
          const div = document.createElement('div');
          div.classList.add('message');
          div.classList.add('your');
          div.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-time">
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

  render() {
    // language=hbs
    return `
        <div class="chat">
            {{{Sidebar img=img modifiedChatsReply=modifiedChatsReply}}}
            {{#if getIdChat}}
                <div class="chat-message">
                    <div class="chat-message-header">
                        <div class="chat-message-name">
                            <img class="message-avatar" src={{img}} alt="avatar">
                            <p>Вадим</p>
                        </div>
                        {{{Dropdown id="myDropdown"}}}
                    </div>
                    <div class="chat-message-content">
                        <div class="chat-message-content-text">
                            <div class="date">19 июня</div>
                            <div class="message">
                                <div class="message-content">
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
                                <div class="message-time">
                                    10:49
                                </div>
                            </div>
                            <div class="message your">
                                <div class="message-content">
                                    <p>Привет, как дела?</p>
                                </div>
                                <div class="message-time">
                                    10:49
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-message-footer">
                        {{{ Dropdown  id="myDropdownFile" message=true top="top"}}}
                        <form id="formMessage">
                            {{{ InputChat placeholder="Сообщение" name="message"}}}
                            {{{ ButtonSendMessage onClick=onclickMessage }}}
                        </form>
                    </div>
                </div>
            {{else}}
                <div class="message">
                    <p>Выберите чат чтобы отправить сообщение</p>
                </div>
            {{/if}}
            {{{Modal}}}
        </div>
    `;
  }
}
