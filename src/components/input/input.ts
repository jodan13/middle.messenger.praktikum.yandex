import Block from 'src/utils/Block';

interface Props {
  type: string;
  name: string;
  onBlur?: Record<string, (event: Event) => void>;
  onFocus?: Record<string, (event: Event) => void>;
  events: Record<string, Record<string, (event: Event) => void> | undefined>;
}

export default class Input extends Block<Props> {
  constructor({type, name, onBlur, onFocus}: Props) {
    super({type, name, events: {blur: onBlur, focus: onFocus}});
  }

  render() {
    // language=hbs
    return `
        <input class="text-field__input" type={{{type}}} name={{{name}}}>
    `;
  }
}
