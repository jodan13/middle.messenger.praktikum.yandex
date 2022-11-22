import './buttonSendMessage.css';
import Block from 'src/utils/Block';

interface Props {
  onClick?: (event: Event) => void;
  events: Record<string, ((event: Event) => void) | undefined>;
}

export class ButtonSendMessage extends Block<Props> {
  constructor({onClick}: Props) {
    super({events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
        <button class="reset-button send-message">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="30" rx="6" fill="var(--link-color)"/>
                <rect x="9" y="14.2" width="11" height="1.6" stroke="white"/>
                <path d="M16 10L20 15L16 20" stroke="white" stroke-width="1.6"/>
            </svg>
        </button>
    `;
  }
}
