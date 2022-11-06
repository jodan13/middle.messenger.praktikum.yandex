import Handlebars from "handlebars/dist/handlebars.runtime";
import templateFunction from './chatMessage.hbs';
import {getFormattedTime} from '../../utils/getFormattedTime';
import chatsResponse from '../../data/chatsResponse.json';
import img from '../../../static/img/default-user.png';
import './chatMessage.css';
import dropdown from "../../components/dropdown/dropdown.hbs";
import '../../components/dropdown/dropdown.css';

Handlebars.registerPartial('dropdown', dropdown)

const modifiedChatsReply = getFormattedTime(chatsResponse);
export const chatMessage = templateFunction({img, modifiedChatsReply})
