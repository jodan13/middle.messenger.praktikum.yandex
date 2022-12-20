import Block from 'src/utils/Block';

import styles from './styles.module.css';
import { Link } from 'src/components/link/link';

export class ErrorPage extends Block {
  constructor() {
    super({title: '404', text: 'Страница не найдена', styles});
  }

  init() {
    this.children.link = new Link({
      label: 'Назад к чатам',
      to: '/messenger',
    });
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.error-wrapper}}">
            <h1>{{title}}</h1>
            <p>{{text}}</p>
            {{{link}}}
        </div>
    `;
  }
}

