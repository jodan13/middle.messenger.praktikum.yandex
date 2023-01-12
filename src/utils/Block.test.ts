import Block from './Block';

describe('Block', () => {
  class ComponentMock extends Block {

    render() {
      return '<div></div>';
    }
  }

  it('should fire init event on initialization', () => {
    new ComponentMock({});
  });
});
