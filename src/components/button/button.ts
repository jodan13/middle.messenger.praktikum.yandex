import Block from 'src/utils/Block';

interface ButtonProps {
  value: string;
  type: string;
  onClick?: Record<string, (event: Event) => void>;
  events: Record<string, Record<string, (event: Event) => void> | undefined>;
}

export default class Button extends Block<ButtonProps> {
  constructor({type, value, onClick}: ButtonProps) {
    super({type, value, events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `<input type={{type}} value={{value}}>`;
  }
}
