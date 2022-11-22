import Block from './Block';
import Handlebars, { HelperOptions } from 'handlebars';

interface BlockConstructable<Props> {
  new(props: Props): Block;
}

export default function registerComponent<Props>(name: string, Component: BlockConstructable<Props>) {

  Handlebars.registerHelper(name, function ({data, fn, hash}: HelperOptions) {
    if (!data.root.children) {
      data.root.children = {};
    }

    const component = new Component(hash);

    data.root.children[component.id] = component;

    const contents = fn ? fn(this) : '';

    return `<div data-id="${component.id}">${contents}</div>`;
  });
}
