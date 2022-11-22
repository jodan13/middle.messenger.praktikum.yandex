import EventBus from 'src/utils/EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  _element: Nullable<HTMLElement> = null;
  _meta: {
    props: P,
  };
  public id = nanoid(6);
  protected props: P;
  eventBus: () => EventBus;
  protected children: Record<string, Block>;

  /** JSDoc
   * @param propsWithChildren
   * @returns {void}
   */
  constructor(propsWithChildren: P) {
    const eventBus = new EventBus();
    const {props, children} = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      props,
    };
    this.children = children;
    this.props = this._makePropsProxy(props || {} as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block> } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> = {};
    if (childrenAndProps) {
      Object.entries(childrenAndProps).forEach(([key, value]) => {
        if (value instanceof Block) {
          children[key as string] = value;
        } else {
          props[key] = value;
        }
      });
    }
    return {props: props as P, children};
  }

  _addEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(_oldProps?: unknown) {
  }

  dispatchComponentDidMoun() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(_oldProps: unknown, _newProps: unknown) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props as object, nextProps);
  };

  get element() {
    if (this._element) {
      return this._element;
    }
    throw new Error('Element is not created');
  }

  _render() {
    const template = this.render();
    const fragment = this.compile(template, {...this.props, children: this.children});
    const newElement = fragment.firstElementChild as HTMLElement;
    this._element?.replaceWith(newElement);
    this._element = newElement;
    this._addEvents();
  }

  protected compile(template: string, context: Record<string, unknown>) {
    const contextAndStubs = {...context};
    const compiled = Handlebars.compile(template);

    const temp = document.createElement('template');
    temp.innerHTML = compiled(contextAndStubs);
    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(component.getContent()!);

      component.getContent()?.append(...Array.from(stub.childNodes));

    });
    return temp.content;

  };

  render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy = (props: P) => {
    return new Proxy(props as object, {
        get: (target: { [x: string]: unknown; }, prop: string) => {
          const value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;

        },
        set: (target: { [x: string]: unknown; }, prop: string, value: unknown) => {
          target[prop] = value;
          this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
          return true;
        },
        deleteProperty: () => {
          throw new Error('Нет доступа');
        },
      },
    ) as P;
  };

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

}
