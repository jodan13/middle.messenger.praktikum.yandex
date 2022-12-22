import Block from 'src/utils/Block';

import Sidebar from 'src/components/sidebar/sidebar';
import { Dropdown } from 'src/components/dropdown/dropdown';
import { Modal } from 'src/components/modal/modal';
import styles from 'src/pages/messenger/styles.module.css';
import ChatsController from 'src/controllers/ChatsController';
import { withStore } from 'src/hocs/withStore';
import img from 'static/img/default-user.png';
import { ChatInfo } from 'src/api/ChatsAPI';
import MessagesController, { Message as MessageInfo } from 'src/controllers/MessagesController';
import { Message } from 'src/components/message/message';
import { funToTime } from 'src/utils/getFormattedTime';
import { FormMessage } from 'src/components/formMessage/formMessage';

interface MessengerProps {
  selectedChat: number;
  chats: ChatInfo[];
  isLoaded: boolean;
  userId: number;
  messages: MessageInfo[];
  selectedChatItem: ChatInfo;
}

class MessengerPageBase extends Block {
  constructor(props: MessengerProps) {
    super({...props, img, styles});

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(String(prop)),
    }) as URLSearchParams & { [key: string]: string };
    if (params.id) {
      ChatsController.selectChat(Number(params.id));
    }
  }

  protected init() {
    this.children.formMessage = new FormMessage({
      events: {
        submit: (event: HTMLElementEvent<HTMLFormElement>) => {
          event.preventDefault();
          const {target} = event;
          const data = new FormData(target);
          const message = data.get('message') as string;
          MessagesController.sendMessage(this.props.selectedChat!, message);
          target.reset();
        },
      },
    });
    this.children.messages = this.createMessages(this.props);
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
  }

  protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    this.children.messages = this.createMessages(newProps);
    if (oldProps.selectedChat !== newProps.selectedChat && newProps.chats && newProps.chats.length > 0) {
      this.setProps({
        selectedChatItem: newProps.chats.find((chat: ChatInfo) => chat.id === newProps.selectedChat),
      });
    }

    return true;
  }

  private createMessages(props: MessengerProps) {

    return props.messages.filter(item => item.type === 'message').map(data => {

      return new Message({...data, time: funToTime(data.time), isMine: props.userId === data.user_id});
    });
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
                            {{#each messages}}
                                {{{this}}}
                            {{/each}}
                        </div>
                    </div>
                    <div class="{{styles.chat-message-footer}}">
                        {{{dropdownFile}}}
                        {{{formMessage}}}
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

const withChat = withStore((state) => {
  const selectedChatId = state.selectedChat;
  if (!selectedChatId) {

    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    chats: state.chats,
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const MessengerPage = withChat(MessengerPageBase);
