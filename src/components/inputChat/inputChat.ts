import Block from 'src/utils/Block';

interface Props {
  placeholder: string;
  iconSearch: string;
  name: string;
}

export default class InputChat extends Block {
  constructor({placeholder, iconSearch, name}: Props) {
    super({placeholder, iconSearch, name});
  }

  render() {
    // language=hbs
    return `
        <div class="search-input {{iconSearch}}">
            <input class="search-input__input" type="text" name="{{name}}" placeholder="{{placeholder}}">
        </div>
    `;
  }
}
