import EventBus from './EventBus';
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
  // _meta: {
  //   props: P,
  // };
  public id = nanoid(6);
  protected props: P;
  eventBus: () => EventBus;
  protected children: Record<string, Block | Block[]>;

  /** JSDoc
   * @param propsWithChildren
   * @returns {void}
   */
  constructor(propsWithChildren: P) {
    const eventBus = new EventBus();
    const {props, children} = this._getChildrenAndProps(propsWithChildren);
    // this._meta = {
    //   props,
    // };
    this.children = children;
    this.props = this._makePropsProxy(props || {} as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};
    if (childrenAndProps) {
      // Object.entries(childrenAndProps).forEach(([key, value]) => {
      //   if (value instanceof Block) {
      //     children[key as string] = value;
      //   } else {
      //     props[key] = value;
      //   }
      // });
      Object.entries(childrenAndProps).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
          children[key as string] = value;
        } else if (value instanceof Block) {
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

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(_oldProps?: unknown) {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(ch => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    // this._render();
  }

  protected componentDidUpdate(_oldProps: unknown, _newProps: unknown) {
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
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

  private _render() {
    const template = this.render();
    const fragment = this.compile(template, {...this.props});
    const newElement = fragment.firstElementChild as HTMLElement;
    this._element?.replaceWith(newElement);
    this._element = newElement;
    this._addEvents();
  }

  protected compile(template: string, context: any) {
    const contextAndStubs = {...context};
    const compiled = Handlebars.compile(template);
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = compiled(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  protected render(): string {
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
          const oldTarget = {...target};
          target[prop] = value;
          this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
          return true;
        },
        deleteProperty: () => {
          throw new Error('Нет доступа');
        },
      },
    ) as P;
  };
}
