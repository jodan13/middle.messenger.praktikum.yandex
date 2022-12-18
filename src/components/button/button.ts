import Block from 'src/utils/Block';
import styles from './styles.module.css';

interface ButtonProps {
  value: string;
  type: string;
  onClick?: Record<string, (event: Event) => void>;
  // events: Record<string, Record<string, (event: Event) => void> | undefined>;
  styles?: typeof styles;
  events: {
    click: (event: Event) => void;
  };
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({...props, styles});
  }

  render() {
    // language=hbs
    return `<input class="{{styles.button}}" type="{{type}}" value="{{value}}">`;
  }
}
