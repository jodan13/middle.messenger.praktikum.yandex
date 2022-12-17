import Block from 'src/utils/Block';
import registerComponent from 'src/utils/registerComponent';
import InputChat from 'src/components/inputChat/inputChat';
import ContactCard from 'src/components/contactCard/contactCard';
import styles from './styles.module.css';

registerComponent('InputChat', InputChat);
registerComponent('ContactCard', ContactCard);

interface Props {
  img: string;
  modifiedChatsReply: Record<string, unknown>[];
  styles?: typeof styles;
}

export class Sidebar extends Block<Props> {
  constructor({img, modifiedChatsReply}: Props) {
    super({img, modifiedChatsReply, styles});
  }

  render() {
    // language=hbs
    return `
        <aside class="{{styles.chat-list}}">
            <div class="{{styles.profile-link}}">{{{Link label='Профиль 🡢' to='/settings'}}}</div>
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
