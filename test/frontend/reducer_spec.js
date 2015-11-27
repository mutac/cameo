import {expect} from '../util/chai-use-immutable';
import {Map, fromJS} from 'immutable';
import {someSlides} from '../util/helpers';

import {VIEW_SLIDES} from '../../src/frontend/core/constants';
import {start} from '../../src/frontend/core/state';
import reducer from '../../src/frontend/core/reducer';

describe('reducer', () => {
  it('sets initial state', () => {
    const initialState = start();
    const nextState = reducer(undefined, {type: 'invalid'});
    expect(nextState).to.equal(initialState);
  });

  it('handles VIEW_SLIDES', () => {
    const initialState = start();
    const action = { type: VIEW_SLIDES, slides: someSlides() };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      slides: someSlides()
    }));
  });
});