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
import { withStore } from 'src/hocs/withStore';
import img from 'static/img/default-user.png';
import { ChatInfo } from 'src/api/ChatsAPI';

interface Props {
  selectedChat: number;
  chats: ChatInfo[];
  isLoaded: boolean;
  title: string;
  avatar: string;
  id: number;
  messages: [];
  isModal: boolean;
  isDropdown: boolean;
  isInput: boolean;
  selectedChatItem: ChatInfo;
}

class MessengerPageBase extends Block {
  constructor({selectedChat, chats}: Props) {
    super({
      styles,
      selectedChat,
      img,
      chats,
      selectedChatItem: {},
    });

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(String(prop)),
    }) as URLSearchParams & { [key: string]: string };
    if (params.id) {
      ChatsController.selectChat(Number(params.id));


    }
    // this.setProps({
    //   onclickMessage: (event: Event) => {
    //     event.preventDefault();
    //     const form = document.getElementById('formMessage') as HTMLFormElement;
    //     const input = form.elements.namedItem('message') as HTMLInputElement;
    //     if (input.value) {
    //       const message = input.value;
    //       console.log(input.value);
    //       input.value = '';
    //       const chat = document.querySelector('#chat-message-content-text') as HTMLElement;
    //       const date = new Date();
    //       const time = `${date.getHours()}:${date.getMinutes()}`;
    //       const div = document.createElement('div');
    //       div.classList.add(styles.message);
    //       div.dataset.my = 'true';
    //       div.innerHTML = `
    //         <div class="${styles['message-content']}" data-my="true">
    //             <p>${message}</p>
    //         </div>
    //         <div class="${styles['message-time']}">
    //             ${time}
    //         </div>
    //     `;
    //       chat.appendChild(div);
    //     } else {
    //       console.log('empty');
    //     }
    //   },
    // });
  }

  protected init() {
    this.children.sidebar = new Sidebar({isLoaded: false});
    ChatsController.fetchChats().finally(() => {
      (this.children.sidebar as Block).setProps({
        isLoaded: true,
      });
      if (this.props.chats) {
        this.props.selectedChatItem = this.props.chats.find((chat: ChatInfo) => chat.id === this.props.selectedChat);
      }
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
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.selectedChat !== newProps.selectedChat && newProps.chats && newProps.chats.length > 0) {
      this.setProps({
        selectedChatItem: newProps.chats.find((chat: ChatInfo) => chat.id === newProps.selectedChat),
      });
    }
    return true;
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.chat}}">
            {{{sidebar}}}
            {{#if selectedChat}}
                <div class="{{styles.chat-message}}">
                    <div class="{{styles.chat-message-header}}">
                        <div class="{{styles.chat-message-name}}">
                            <img
                                    class="{{styles.message-avatar}}"
                                    src="{{#if
                                            selectedChatItem.avatar}}{{selectedChatItem.avatar}}{{else}}{{img}}{{/if}}"
                                    alt="avatar">
                            <p>{{selectedChatItem.title}}</p>
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

const withChat = withStore((state) => ({
  selectedChat: state.selectedChat,
  chats: state.chats,
}));

export const MessengerPage = withChat(MessengerPageBase);
