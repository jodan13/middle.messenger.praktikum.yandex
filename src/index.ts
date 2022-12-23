import './normalize.css';
import './styles.css';
import { Login } from 'src/pages/login/login';
import { Settings } from 'src/pages/settings/settings';
import AuthController from 'src/controllers/AuthController';
import Router from 'src/utils/Router';
import { SignUp } from 'src/pages/sign-up/sign-up';
import { MessengerPage } from 'src/pages/messenger/messenger';
import { ErrorPage } from 'src/pages/error/error';

enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
  Error404 = '/error',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, Login)
    .use(Routes.Signup, SignUp)
    .use(Routes.Settings, Settings)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Error404, ErrorPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Signup:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();
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
