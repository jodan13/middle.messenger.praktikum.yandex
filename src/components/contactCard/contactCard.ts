import './contactCard.css';
import Block from 'src/utils/Block';
import Handlebars from 'handlebars';

Handlebars.registerHelper('activeContactCard', function (value: string) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(String(prop)),
  }) as URLSearchParams & { [key: string]: string };
  return String(value) === params.id;
});

interface Props {
  img: string;
  item: Record<string, unknown>;
}

export class ContactCard extends Block<Props> {
  constructor({img, item}: Props) {
    super({img, item});
  }

  render() {
    // language=hbs
    return `
        <li class="contact-card-list__item">
            <a class="contact-card {{#if (activeContactCard item.id)}}active{{/if}}" href="home?id={{item.id}}"
            data-id="{{item.id}}">
            <img class="contact-card__avatar" src="{{img}}" alt="avatar">
            <div class="contact-card__name-wrapper">
                <p class="contact-card__name">{{item.title}}</p>
            </div>
            <p class="contact-card__last-message">{{item.last_message.content}}</p>
            <span class="contact-card__updated">{{item.last_message.time}}</span>
            {{#if item.unread_count}}
                <span class="contact-card__counter-messages">
                    {{item.unread_count}}
                </span>
            {{/if}}
            </a>
        </li>
    `;
  }
}
