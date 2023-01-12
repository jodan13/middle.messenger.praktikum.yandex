import { expect } from 'chai';
import { Store } from './Store';

describe('Store', () => {
  let store: Store | null;

  beforeEach(() => {
    store = new Store();
  });

  it('should be empty on startup', () => {
    expect(store!.getState()).to.be.empty;
  });

  it('should set value to store', () => {
    store!.set('currentUser', 'value');

    const state = store!.getState();
    expect(state.currentUser).to.eq('value');
  });
});
