import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import LoginPage from 'src/pages/login/login';

describe('LoginPage', () => {
  let signinFake: sinon.SinonSpy<any[], any>;
  let Login: LoginPage;

  beforeEach(() => {
    signinFake = sinon.fake();
    const module = proxyquire('./login', {
      '../../controllers/AuthController': {
        signin: signinFake,
        '@noCallThru': true,
      },
    });
    Login = module.default;
  });

  it('should call AuthController.signin on click', () => {

    // @ts-ignore
    const page = new Login();

    const element = page.element;
    const login: HTMLInputElement | null = element.querySelector('input[name="login"]');
    const password: HTMLInputElement | null = element.querySelector('input[name="password"]');
    login!.value = 'test';
    password!.value = '12345678Ff';
    page.children.formLogin!.element.submit({target: page.children.formLogin!.element});
    expect(signinFake.callCount).to.eq(1);
  });
});
