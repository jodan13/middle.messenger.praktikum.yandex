declare module '*.hbs' {
  const content: <T>(props?: T) => string;
  export default content;
}
declare module 'handlebars/dist/handlebars.runtime';
declare module 'handlebars';
declare module '*.png';
declare module '*.json';
declare module '*.css';

declare type Nullable<T> = T | null;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
