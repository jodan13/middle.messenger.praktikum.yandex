import Block from 'src/utils/Block';

import styles from './styles.module.css';

interface Props {
  title: string;
  text: string;
  styles?: typeof styles;
}

export class ErrorPage extends Block<Props> {
  constructor({title, text}: Props) {
    super({title, text, styles});
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.error-wrapper}}">
            <h1>{{title}}</h1>
            <p>{{text}}</p>
            {{{Link label='Назад к чатам' to='/messenger'}}}
        </div>
    `;
  }
}

