import Block from 'src/utils/Block';
import styles from './styles.module.css';

interface ButtonProps {
  value: string;
  type: string;
  onClick?: Record<string, (event: Event) => void>;
  events: Record<string, Record<string, (event: Event) => void> | undefined>;
  styles: typeof styles;
}

export default class Button extends Block<ButtonProps> {
  constructor({type, value, onClick}: ButtonProps) {
    super({type, value, styles, events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `<input class="{{styles.button}}" type="{{type}}" value="{{value}}">`;
  }
}
