import 'src/components/contactCard/styles.module.css';
import Block from 'src/utils/Block';
import Handlebars from 'handlebars';
import { PropsWithRouter, withRouter } from 'src/hocs/withRouter';
import styles from './styles.module.css';

Handlebars.registerHelper('activeContactCard', function (value: string) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(String(prop)),
  }) as URLSearchParams & { [key: string]: string };
  return String(value) === params.id;
});

interface Props extends PropsWithRouter {
  img: string;
  item: Record<string, unknown>;
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
    });
  }

  navigate() {
    [...this.element.parentElement!.children].forEach((child) => {
      child.removeAttribute('data-active');
    });
    this.element.dataset.active = 'true';
    this.props.router.go('messenger' + `?id=${this.props.item.id}`);
  }

  render() {
    // language=hbs
    return `
        <li class="{{styles.contact-card}}">
            <img class="{{styles.contact-card__avatar}}" src="{{img}}" alt="avatar">
            <div class="{{styles.contact-card__name-wrapper}}">
                <p class="{{styles.contact-card__name}}">{{item.title}}</p>
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
