import Block from 'src/utils/Block';
import registerComponent from 'src/utils/registerComponent';
import InputChat from 'src/components/inputChat/inputChat';
import ContactCard from 'src/components/contactCard/contactCard';
import styles from './styles.module.css';
import { getFormattedTime } from 'src/utils/getFormattedTime';
import chatsResponse from 'src/data/chatsResponse.json';
import img from 'static/img/default-user.png';
import { withStore } from 'src/hocs/withStore';
import { ChatInfo } from 'src/api/ChatsAPI';

registerComponent('InputChat', InputChat);
registerComponent('ContactCard', ContactCard);

const modifiedChatsReply = getFormattedTime(chatsResponse);

interface Props {
  img?: string;
  modifiedChatsReply?: Record<string, unknown>[];
  styles?: typeof styles;
  chats: ChatInfo[];
  isLoaded: boolean;
}

class SidebarBase extends Block<Props> {
  constructor({chats, isLoaded}: Props) {
    super({img, modifiedChatsReply, styles, chats, isLoaded});
  }

  render() {
    // language=hbs
    return `
        <aside class="{{styles.chat-list}}">

            <div class="{{styles.profile-link}}">
                {{{Dropdown id="myDropdownChat" chat="true"}}}
                {{{Link label='Профиль 🡢' to='/settings'}}}
            </div>
            <form>
                {{{InputChat placeholder="Поиск" iconSearch="true" name="search" }}}
            </form>
            <div class="{{styles.contact-card-list-wrapper}}">
                <ul class="{{styles.contact-card-list}}">
                    {{#each modifiedChatsReply}}
                        {{{ContactCard img=../img item=this}}}
                    {{/each}}
                </ul>
            </div>
        </aside>
    `;
  }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

const Sidebar = withChats(SidebarBase);

export default Sidebar;
