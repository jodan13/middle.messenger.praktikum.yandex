import Block from 'src/utils/Block';
import styles from './styles.module.css';

interface Props {
  events?: {
    click: (event: Event) => void;
  };
  styles?: typeof styles;
}

export class ButtonSendMessage extends Block<Props> {
  constructor(props: Props) {
    super({...props, styles});
  }

  render() {
    // language=hbs
    return `
        <button type="submit" class="{{styles.send-message}}">
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
