import {expect} from '../util/chai-use-immutable';
import {someSlides} from '../util/helpers';

import {
  setSlides,
  fetchSlidesRequest,
  takePictureRequest
} from '../../src/frontend/core/actions';

import {
  start,
  waitingForSlides,
  slidesAvailable
} from '../../src/frontend/core/state';

import reducer from '../../src/frontend/core/reducer';

describe('reducer', () => {
  it('sets initial state', () => {
    const initialState = start();
    const nextState = reducer(undefined, {type: 'invalid'});
    expect(nextState).to.equal(initialState);
  });

  it('handles SET_SLIDES', () => {
    const initialState = start();
    const action = setSlides(someSlides());
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      slidesAvailable(initialState, someSlides())
    );
  });

  it('handles FETCH_SLIDES_REQUEST', () => {
    const initialState = start();
    const action = fetchSlidesRequest();
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      waitingForSlides(initialState)
    );
  });

  it('handles TAKE_PICTURE_REQUEST', () => {
    const initialState = start();
    const action = takePictureRequest();
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      waitingForSlides(initialState)
    );
  });
});