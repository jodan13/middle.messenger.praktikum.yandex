import Block from 'src/utils/Block';
import styles from './styles.module.css';
import { iconClip, iconDots } from 'src/components/icons/icons';

interface Props {
  onClick?: (event: Event) => void;
  events: Record<string, ((event: Event) => void) | undefined>;
  styles: typeof styles;
  iconClip: string;
  iconDots: string;
  message: string;
}

export class ButtonDropdown extends Block<Props> {
  constructor({onClick, message}: Props) {
    super({events: {click: onClick}, styles, iconClip, iconDots, message});
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
