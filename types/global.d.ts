declare module '*.hbs' {
  const content: <T>(props?: T) => string;
  export default content;
}
declare module 'handlebars/dist/handlebars.runtime';
declare module '*.png';
declare module '*.json';
