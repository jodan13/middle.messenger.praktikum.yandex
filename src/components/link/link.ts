import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from 'src/hocs/withRouter';

import styles from './styles.module.css';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  linkSidebar?: boolean;
  events?: {
    click: () => void;
  };
  styles?: typeof styles;
}

export class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
      styles,
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    if (this.props.linkSidebar) {
      // language=hbs
      return `
          <span class="{{styles.profile-sidebar}}">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="var(--link-color)"/>
                  <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"
                        stroke="white"/>
                  <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/>
              </svg>
          </span>
      `;
    }
    // language=hbs
    return `<span class="{{styles.link}}">{{ label }}</span>`;
  }
}

export const Link = withRouter(BaseLink);
