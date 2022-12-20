import 'src/components/contactCard/styles.module.css';
import Block from 'src/utils/Block';
import Handlebars from 'handlebars';
import { PropsWithRouter, withRouter } from 'src/hocs/withRouter';
import img from 'static/img/default-user.png';
import styles from './styles.module.css';
import ChatsController from 'src/controllers/ChatsController';
import { ChatInfo } from 'src/api/ChatsAPI';

Handlebars.registerHelper('activeContactCard', function (value: string) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(String(prop)),
  }) as URLSearchParams & { [key: string]: string };
  return String(value) === params.id;
});

interface Props extends PropsWithRouter {
  img: string;
  item: ChatInfo;
  events?: {
    click: () => void;
  };
  styles: typeof styles;
}

class BaseContactCard extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props, styles, events: {
        click: () => this.navigate(),
      },
      img,
    });
  }

  navigate() {
    [...this.element.parentElement!.children].forEach((child) => {
      child.setAttribute('data-active', 'false');
    });
    this.element.setAttribute('data-active', 'true');
    this.props.router.go('/messenger' + `?id=${this.props.item.id}`);
    ChatsController.selectChat(this.props.item.id);
  }

  render() {
    // language=hbs
    return `
        <li class="{{styles.contact-card}}" data-active="{{#if (activeContactCard item.id)}}true{{else}}false{{/if}}">
            <img class="{{styles.contact-card__avatar}}" src="{{img}}" alt="avatar">
            <div class="{{styles.contact-card__name-wrapper}}">
                <p class="{{styles.contact-card__name}}">{{item.title}} (id: {{item.id}})</p>
            </div>
            <p class="{{styles.contact-card__last-message}}">{{item.last_message.content}}</p>
            <span class="{{styles.contact-card__updated}}">{{item.last_message.time}}</span>
            {{#if item.unread_count}}
                <span class="{{styles.contact-card__counter-messages}}">
                    {{item.unread_count}}
                </span>
            {{/if}}
        </li>
    `;
  }
}

const ContactCard = withRouter(BaseContactCard);

export default ContactCard;
