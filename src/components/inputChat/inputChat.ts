import Block from 'src/utils/Block';
import styles from './styles.module.css';

interface Props {
  placeholder: string;
  iconSearch: boolean;
  name: string;
  styles?: typeof styles;
}

export default class InputChat extends Block<Props> {
  constructor(props: Props) {
    super({...props, styles});
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.search-input}}" data-icon-search="{{iconSearch}}">
            <input class="{{styles.search-input__input}}" type="text" name="{{name}}" placeholder="{{placeholder}}">
        </div>
    `;
  }
}
