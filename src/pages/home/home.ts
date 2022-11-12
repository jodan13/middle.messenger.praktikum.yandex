import Handlebars from 'handlebars/dist/handlebars.runtime';

import inputChat from '../../components/inputChat/inputChat.hbs';
import sidebar from '../../components/sidebar/sidebar.hbs';
import contactCardHbs from '../../components/contactCard/contactCard.hbs';
import templateFunction from './home.hbs';
import chatsResponse from '../../data/chatsResponse.json';
import { getFormattedTime } from 'src/utils/getFormattedTime';
import img from '../../../static/img/default-user.png';

import './home.css';
import '../../components/inputChat/inputChat.css';
import '../../components/sidebar/sidebar.css';


Handlebars.registerPartial('contactCard', contactCardHbs);
Handlebars.registerPartial('inputChat', inputChat);
Handlebars.registerPartial('sidebar', sidebar);

const modifiedChatsReply = getFormattedTime(chatsResponse);
export const home = templateFunction({img, modifiedChatsReply});
