import {expect} from '../util/chai-use-immutable';
import {List, fromJS} from 'immutable';
import {someSlides} from '../util/helpers';

import {makeStore} from '../../src/frontend/core/store';
import {start} from '../../src/frontend/core/state';
import {setSlides} from '../../src/frontend/core/actions';

describe('store', () => {
  it ('has start state', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(start());
  });

  it ('is connected to reducer', () => {
    const store = makeStore();
    store.dispatch(setSlides(someSlides()));
    expect(store.getState()).to.equal(fromJS({
      slides: List(someSlides())
    }));
  });
});