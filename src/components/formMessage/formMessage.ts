import ChatsController from 'src/controllers/ChatsController';
import Block from 'src/utils/Block';
import styles from './styles.module.css';
import InputChat from 'src/components/inputChat/inputChat';
import { ButtonSendMessage } from 'src/components/buttonSendMessage/buttonSendMessage';

interface Props {
  styles?: string;
  events: {
    submit: (event: Event) => void;
  };
}

export class FormMessage extends Block<Props> {
  constructor(props: Props) {
    super({...props, styles});

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(String(prop)),
    }) as URLSearchParams & { [key: string]: string };
    if (params.id) {
      ChatsController.selectChat(Number(params.id));
    }
  }

  protected init() {
    this.children.inputChat = new InputChat({
      placeholder: 'Сообщение',
      name: 'message',
      iconSearch: false,
    });
    this.children.buttonSendMessage = new ButtonSendMessage({});
  }

  render() {
    // language=hbs
    return `
        <form id="formMessage" class="{{styles.form}}">
            {{{inputChat}}}
            {{{buttonSendMessage}}}
        </form>
    `;
  }
}
