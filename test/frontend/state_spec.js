import {expect} from '../util/chai-use-immutable';
import {List, Map} from 'immutable';
import {someSlides} from '../util/helpers';

import {
  start,
  slidesAvailable,
  waitingForSlides,
  isWaitingForSlides
} from '../../src/frontend/core/state';

describe('state', () => {
  describe('start state', () => {
    it('empty initial state', () => {
      let initialState = start();

      expect(initialState).to.equal(Map());
    });
  });

  describe('setSlides', () => {
    it('waiting for slides', () => {
      const state = Map();
      const nextState = waitingForSlides(state);
      expect(nextState).to.equal(Map({
        slides: null
      }));

      expect(isWaitingForSlides(state)).to.be.false;
      expect(isWaitingForSlides(nextState)).to.be.true;
    });

    it('begin viewing slides', () => {
      const state = Map();
      const slides = someSlides();
      const nextState = slidesAvailable(state, slides);
      expect(nextState).to.equal(Map({
        slides: List(someSlides())
      }));
    });
  });
});