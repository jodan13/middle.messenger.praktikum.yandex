import Block from 'src/utils/Block';
import styles from './styles.module.css';

interface Props {
  type: string;
  value?: string;
  name: string;
  onBlur?: Record<string, (event: Event) => void>;
  onFocus?: Record<string, (event: Event) => void>;
  styles?: typeof styles;
  events: {
    blur?: ({target}: HTMLInputEvent) => void;
    focus?: ({target}: HTMLInputEvent) => void;
    change?: ({target}: HTMLInputEvent) => void;
  };
}

export default class Input extends Block<Props> {
  constructor({type, name, events, value}: Props) {
    super({type, name, events, styles, value});
  }

  render() {
    // language=hbs
    return `
        <input class="{{styles.input}}" type="{{type}}" name="{{name}}" value="{{value}}">
    `;
  }
}
