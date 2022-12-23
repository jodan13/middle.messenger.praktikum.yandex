import Block from '../../utils/Block';
import styles from './styles.module.css';

interface MessageProps {
  content: string;
  isMine: boolean;
  styles?: typeof styles;
  time: string;
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({...props, styles});
  }

  protected render() {
    // language=hbs
    return `
        <div class="{{styles.message}}" data-my="{{#if isMine}}true{{/if}}">
            <div class="{{styles.message-content}}" data-my="true">
                <p>{{ content }}</p>
            </div>
            <div class="{{styles.message-time}}">
                {{ time }}
            </div>
        </div>
    `;
  }
}
