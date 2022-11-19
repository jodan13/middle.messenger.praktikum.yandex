import Block from 'src/utils/Block';

interface ButtonProps {
  value: string;
  type: string;
  onClick?: Record<string, (event: Event) => void>;
}

export default class Button extends Block {
  constructor({type, value, onClick}: ButtonProps) {
    super({type, value, events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `<input type={{type}} value={{value}}>`;
  }
}
