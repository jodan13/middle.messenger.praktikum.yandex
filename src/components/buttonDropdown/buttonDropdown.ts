import Block from 'src/utils/Block';
import styles from './styles.module.css';
import { iconClip, iconDots } from 'src/components/icons/icons';

interface Props {
  onClick?: (event: Event) => void;
  styles?: typeof styles;
  iconClip?: string;
  iconDots?: string;
  message?: boolean;
  events: {
    click: () => void;
  };
}

export class ButtonDropdown extends Block<Props> {
  constructor(props: Props) {
    super({...props, iconClip, iconDots, styles});
  }

  render() {
    // language=hbs
    return `
        {{#if message}}
            <button class="{{styles.attach-file}}">
                {{{iconClip}}}
            </button>
        {{else}}
            <button class="{{styles.menu-dots}}">
                {{{iconDots}}}
            </button>
        {{/if}}
    `;
  }
}
