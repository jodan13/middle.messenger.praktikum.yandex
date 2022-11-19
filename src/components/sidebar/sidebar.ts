import Block from 'src/utils/Block';
import registerComponent from 'src/utils/registerComponent';
import InputChat from 'src/components/inputChat/inputChat';
import { ContactCard } from 'src/components/contactCard/contactCard';

registerComponent('InputChat', InputChat);
registerComponent('ContactCard', ContactCard);

interface Props {
  img: string;
  modifiedChatsReply: Record<string, unknown>[];
}

export class Sidebar extends Block {
  constructor({img, modifiedChatsReply}: Props) {
    super({img, modifiedChatsReply});
  }

  render() {
    // language=hbs
    return `
        <aside class="chat-list">
            <a href="profile" class="profile-link">Профиль 🡢</a>
            <form>
                {{{InputChat placeholder="Поиск" iconSearch="icon-search" name="search" }}}
            </form>
            <div class="contact-card-list-wrapper">
                <ul class="contact-card-list">
                    {{#each modifiedChatsReply}}
                        {{{ContactCard img=../img item=this}}}
                    {{/each}}
                </ul>
            </div>
        </aside>
    `;
  }
}
