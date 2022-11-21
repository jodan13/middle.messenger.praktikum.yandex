import Block from 'src/utils/Block';

interface Props {
  onClick?: (event: Event) => void;
  events: Record<string, ((event: Event) => void) | undefined>;
}

export class ButtonDropdownDots extends Block<Props> {
  constructor({onClick}: Props) {
    super({events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
        <button class="reset-button menu-dots">
            <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1.5" cy="2" r="1.5" fill="var(--color-icon-2)"/>
                <circle cx="1.5" cy="8" r="1.5" fill="var(--color-icon-2)"/>
                <circle cx="1.5" cy="14" r="1.5" fill="var(--color-icon-2)"/>
            </svg>
        </button>
    `;
  }
}
