import './normalize.css';
import './styles.css';
import 'src/components/inputWrapper/styles.module.css';
// import 'src/components/button/styles.module.css';
import registerComponent from 'src/utils/registerComponent';
import { ButtonDropdownFile } from 'src/components/buttonDropdownFile/buttonDropdownFile';
import { ButtonDropdownDots } from 'src/components/buttonDropdownDots/buttonDropdownDots';
import { ButtonOpenModal } from 'src/components/buttonOpenModal/buttonOpenModal';
import { Login } from 'src/pages/login/login';
import { SettingsPage } from 'src/pages/settings/settings';
import AuthController from 'src/controllers/AuthController';
import Router from 'src/utils/Router';
import { SignUp } from 'src/pages/sign-up/sign-up';
import { MessengerPage } from 'src/pages/messenger/messenger';
import { ErrorPage } from 'src/pages/error/error';
import { Link } from 'src/components/Link/link';


registerComponent('ButtonDropdownFile', ButtonDropdownFile);
registerComponent('ButtonDropdownDots', ButtonDropdownDots);
registerComponent('ButtonOpenModal', ButtonOpenModal);
registerComponent('Link', Link);

enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
  Error404 = '/error404',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, Login)
    .use(Routes.Signup, SignUp)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Error404, ErrorPage, {title: '404', text: 'Страница не найдена'});

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Signup:
      isProtectedRoute = false;
      break;
  }

  try {
    const data = await AuthController.fetchUser();
    console.log(data);
    Router.start();
    if (!isProtectedRoute) {
      console.log('ROUTER START');
      Router.go(Routes.Messenger);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

});
