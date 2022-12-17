import Block from 'src/utils/Block';
import styles from './styles.module.css';

interface Props {
  type: string;
  name: string;
  onBlur?: Record<string, (event: Event) => void>;
  onFocus?: Record<string, (event: Event) => void>;
  events: Record<string, Record<string, (event: Event) => void> | undefined>;
  styles: typeof styles;
}

export default class Input extends Block<Props> {
  constructor({type, name, onBlur, onFocus}: Props) {
    super({type, name, events: {blur: onBlur, focus: onFocus}, styles});
  }

  render() {
    // language=hbs
    return `
        <input class="{{styles.input}}" type="{{type}}" name="{{name}}">
    `;
  }
}
