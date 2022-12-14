import './normalize.css';
import './styles.css';
import './components/inputWrapper/input.css';
import './components/button/button.css';
import registerComponent from 'src/utils/registerComponent';
import { ButtonDropdownFile } from 'src/components/buttonDropdownFile/buttonDropdownFile';
import { ButtonDropdownDots } from 'src/components/buttonDropdownDots/buttonDropdownDots';
import { ButtonOpenModal } from 'src/components/buttonOpenModal/buttonOpenModal';
import { Login } from 'src/pages/login/login';
import { ProfilePage } from 'src/pages/profile/profile';
import AuthController from 'src/controllers/AuthController';
import Router from 'src/utils/Router';
import { Signup } from 'src/pages/signup/signup';


registerComponent('ButtonDropdownFile', ButtonDropdownFile);
registerComponent('ButtonDropdownDots', ButtonDropdownDots);
registerComponent('ButtonOpenModal', ButtonOpenModal);

enum Routes {
  Index = '/',
  Signup = '/signup',
  Profile = '/profile'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, Login)
    .use(Routes.Signup, Signup)
    .use(Routes.Profile, ProfilePage);

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
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

});
