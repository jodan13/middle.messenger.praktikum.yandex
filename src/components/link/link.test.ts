import { expect } from 'chai';
import sinon from 'sinon';
import { BaseLink as Link } from './link';
import { Router } from 'src/utils/Router';

describe('Link', () => {
  let routerMock: { go: any };

  beforeEach(() => {
    routerMock = {go: sinon.fake()};
  });

  it('should call Router.go on click', () => {
    const instance = new Link({
      label: 'test',
      to: '/',
      router: routerMock as any,
    });
    const element = instance.element;
    element.click();
    expect(routerMock.go.callCount).to.eq(1);
  });

  it('should call Router.go test on click', () => {
    const path = '/test';
    const instance = new Link({
      label: 'test',
      to: path,
      router: routerMock as Router,
    });
    const element = instance.element;
    element.click();
    expect(routerMock.go.firstArg as any).to.eq(path);
  });
});
