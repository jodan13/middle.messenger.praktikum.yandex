import Block from 'src/utils/Block';
import styles from './styles.module.css';
import ChatsController from 'src/controllers/ChatsController';
import { withStore } from 'src/hocs/withStore';
import { ModalForm } from 'src/components/modalForm/modalForm';

interface Props {
  file?: boolean;
  styles?: typeof styles;
  title?: string;
  modal: string;
  display?: string;
  events?: {
    click: (event: Event) => void;
  };
}

class ModalBase extends Block<Props> {
  constructor(props: Props) {
    super({...props, styles});
    this.setProps({
      events: {
        click: (event: Event) => {
          if (this.element && event.target === this.element) {
            ChatsController.openModal('');
            this.props.display = 'none';
          }
        },
      },
    });
  }

  protected init() {
    this.setProps({display: 'none'});
    this.children.modalForm = new ModalForm({});
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {

    if (newProps.modal && !oldProps.modal) {
      this.props.display = 'flex';
    } else if (!newProps.modal && oldProps.modal) {
      this.props.display = 'none';
    }
    if (newProps.modal === 'openModalAddChat' && oldProps.modal !== 'openModalAddChat') {
      this.props.title = 'Добавить Чат';
    }
    if (newProps.modal === 'openModalDelChat' && oldProps.modal !== 'openModalDelChat') {
      this.props.title = 'Удалить чат';
    }
    if (newProps.modal === 'openModalAddUser' && oldProps.modal !== 'openModalAddUser') {
      this.props.title = 'Добавить пользователя';
    }
    if (newProps.modal === 'openModalDelUser' && oldProps.modal !== 'openModalDelUser') {
      this.props.title = 'Удалить пользователя';
    }
    if (newProps.modal === 'openModalUploadAvatar' && oldProps.modal !== 'openModalUploadAvatar') {
      this.props.title = 'Загрузить файл';
    }

    return true;
  }

  render() {
    // language=hbs
    return `
        <div class="{{styles.modal}}" style="display: {{display}}">
            <div class="{{styles.modal-content}}">
                <h3>{{title}}</h3>
                {{{modalForm}}}

            </div>
        </div>
    `;
  };
}

const withUsers = withStore((state) => ({
  modal: state.modal || '',
}));

export const Modal = withUsers(ModalBase);
