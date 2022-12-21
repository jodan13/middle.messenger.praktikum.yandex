import Block from 'src/utils/Block';
// import registerComponent from 'src/utils/registerComponent';
import Input from 'src/components/input/input';
import styles from './styles.module.css';

// registerComponent('Input', Input);

interface Props {
  type: string;
  name: string;
  placeholder: string;
  textError?: string;
  onBlur?: ({target}: HTMLInputEvent) => void;
  onFocus?: ({target}: HTMLInputEvent) => void;
  onChange?: ({target}: HTMLInputEvent) => void;
  styles?: typeof styles;
  value?: string;
  file?: boolean;
}

export default class InputWrapper extends Block<Props> {
  constructor(props: Props) {
    super({...props, styles});
    this.setProps({...props, styles, file: this.props.type === 'file'});
  }

  protected init() {
    // Input
    this.children.input = new Input({
      type: this.props.type,
      name: this.props.name,
      value: this.props.value,
      events: {
        ...(this.props.onBlur ? {blur: this.props.onBlur} : {}),
        ...(this.props.onFocus ? {focus: this.props.onFocus} : {}),
        ...(this.props.onChange ? {change: this.props.onChange} : {}),
      },

    });
  }

  protected componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    (this.children.input as Input).setProps({
      type: this.props.type,
      name: this.props.name,
      value: this.props.value,
      events: {
        ...(this.props.onBlur ? {blur: this.props.onBlur} : {}),
        ...(this.props.onFocus ? {focus: this.props.onFocus} : {}),
        ...(this.props.onChange ? {change: this.props.onChange} : {}),
      },
    });
    return true;
  }

  render() {
    // language=hbs
    return `
        <div>
            <label class="{{styles.label}}">
                <span {{#if file}}data-file="file"{{/if}}>{{{placeholder}}}</span>
                {{{input}}}
            </label>
            <div class="{{styles.message}}" data-error="false">{{{textError}}}</div>
        </div>
    `;
  }
}
