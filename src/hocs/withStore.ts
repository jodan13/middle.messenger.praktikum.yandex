import Block from 'src/utils/Block';
import store, { StoreEvents } from 'src/utils/Store';
import { User } from 'src/api/AuthAPI';
import { ChatInfo } from 'src/api/ChatsAPI';
import { Message } from 'src/controllers/MessagesController';
import { UserResponse } from 'src/api/UsersAPI';

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
  searchUser?: UserResponse[];
  modal?: string;
}

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {

    return class WithStore extends Component {

      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({...(props as P), ...previousState});

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({...(stateProps as Partial<SP & P>)});
        });

      }

    };

  };
}
