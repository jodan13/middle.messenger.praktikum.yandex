import Block from 'src/utils/Block';
import registerComponent from 'src/utils/registerComponent';
import InputChat from 'src/components/inputChat/inputChat';
import ContactCard from 'src/components/contactCard/contactCard';
import styles from './styles.module.css';
import { getFormattedTime } from 'src/utils/getFormattedTime';
import chatsResponse from 'src/data/chatsResponse.json';
import { withStore } from 'src/hocs/withStore';
import { ChatInfo } from 'src/api/ChatsAPI';
import { Link } from 'src/components/link/link';
import ChatsController from 'src/controllers/ChatsController';
import { Dropdown } from 'src/components/dropdown/dropdown';

registerComponent('InputChat', InputChat);
registerComponent('ContactCard', ContactCard);

const modifiedChatsReply = getFormattedTime(chatsResponse);

interface Props {
  modifiedChatsReply?: typeof chatsResponse;
  styles?: typeof styles;
  chats: ChatInfo[];
  isLoaded: boolean;
}

class SidebarBase extends Block<Props> {
  constructor({chats, isLoaded}: Props) {
    super({modifiedChatsReply, styles, chats, isLoaded});
  }

  protected init() {

    this.children.contactCards = this.createContactCards(this.props);
    this.children.link = new Link({label: 'Профиль 🡢', to: '/settings'});
    this.children.dropdown = new Dropdown({id: 'myDropdownChat', chat: true});
    this.children.inputChat = new InputChat({
      placeholder: 'Поиск',
      iconSearch: true,
      name: 'search',
    });
  }

  protected componentDidUpdate(_oldProps: Props, newProps: Props): boolean {
    this.children.contactCards = this.createContactCards(newProps);

    return true;
  }

  private createContactCards(props: Props) {
    if (props.chats) {
      return props.chats.map((data: { id: number; }) => {
        return new ContactCard({
          item: data,
          events: {
            click: () => {
              ChatsController.selectChat(data.id);
            },
          },
        });
      });
    }
    return [];
  }

  render() {
    // language=hbs
    return `
        <aside class="{{styles.chat-list}}">
            <div class="{{styles.profile-link}}">
                {{{dropdown}}}
                {{{link}}}
            </div>
            <form>
                {{{inputChat}}}
            </form>
            <div class="{{styles.contact-card-list-wrapper}}">
                {{#if isLoaded }}
                    <ul class="{{styles.contact-card-list}}">
                        {{#each contactCards}}
                            {{{this}}}
                        {{/each}}
                    </ul>
                {{else}}
                    Loading...
                {{/if}}
            </div>
        </aside>
    `;
  }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

const Sidebar = withChats(SidebarBase);

export default Sidebar;
