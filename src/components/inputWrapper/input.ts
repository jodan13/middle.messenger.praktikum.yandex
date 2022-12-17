import Block from 'src/utils/Block';
import registerComponent from 'src/utils/registerComponent';
import Input from 'src/components/input/input';
import styles from './styles.module.css';

registerComponent('Input', Input);

interface Props {
  type: string;
  name: string;
  placeholder: string;
  textError?: string;
  onBlur?: Record<string, (event: Event) => void>;
  onFocus?: Record<string, (event: Event) => void>;
  styles?: typeof styles;
}

export default class InputWrapper extends Block<Props> {
  constructor({type, name, onBlur, onFocus, placeholder, textError}: Props) {
    super({type, name, onBlur, onFocus, placeholder, textError, styles});
  }

  render() {
    // language=hbs
    return `
        <div>
            <label class="{{styles.label}}">
                <span>{{{placeholder}}}</span>
                {{{Input type=type name=name onBlur=onBlur onFocus=onFocus}}}
            </label>
            <div class="{{styles.message}}">{{{textError}}}</div>
        </div>
    `;
  }
}
