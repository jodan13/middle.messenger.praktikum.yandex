import Handlebars from "handlebars/dist/handlebars.runtime";

import templateFunction from './login.hbs';
import button from '../../components/button/button.hbs';
import input from '../../components/input/input.hbs';

import './login.css';
import '../../components/input/input.css';
import '../../components/button/button.css';

Handlebars.registerPartial('button/button', button)
Handlebars.registerPartial('input/input', input)

export const login = templateFunction()