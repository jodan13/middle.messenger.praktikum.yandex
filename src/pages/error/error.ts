import './error.css';
import Block from 'src/utils/Block';

interface Props {
  title: string;
  text: string;
}

export class ErrorPage extends Block {
  constructor({title, text}: Props) {
    super({title, text});
  }

  render() {
    // language=hbs
    return `
        <div class="error-wrapper">
            <h1>{{title}}</h1>
            <p>{{text}}</p>
            <a href="home">Назад к чатам</a>
        </div>
    `;
  }
}

