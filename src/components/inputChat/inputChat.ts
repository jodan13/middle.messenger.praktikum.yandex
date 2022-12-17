import Block from 'src/utils/Block';
import styles from './styles.module.css';

interface Props {
  placeholder: string;
  iconSearch: boolean;
  name: string;
  styles: typeof styles;
}

export default class InputChat extends Block<Props> {
  constructor({placeholder, iconSearch, name}: Props) {
    super({placeholder, iconSearch, name, styles});
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
