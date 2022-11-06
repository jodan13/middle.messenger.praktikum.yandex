import './error.css';
import templateFunction from './error.hbs';

export const error404 = templateFunction({title: '404', text: 'Не туда попали'});
export const error500 = templateFunction({title: '500', text: 'Мы уже фиксим'});