import {expect} from './chai-use-immutable';
import {List, Map} from 'immutable';

import {
  start,
  viewSlides,
  waitingForSlides,
  isWaitingForSlides
} from '../../src/frontend/core/state';

describe('application logic', () => {
  describe('start state', () => {
    it('empty initial state', () => {
      let initialState = start();

      expect(initialState).to.equal(Map());
    });
  });

  describe('viewSlides', () => {
    function aSlide() {
      return {
        src: '/path/to/newImage.jpg',
        h: 100,
        w: 200
      };
    }

    function someSlides() {
      return [
        {
          src: '/path/to/img1.jpg',
          h: 100,
          w: 200
        },
        {
          src: '/path/to/img2.jpg',
          h: 100,
          w: 200
        },
        {
          src: '/path/to/img3.jpg',
          h: 100,
          w: 200
        }
      ];
    }

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
      const nextState = viewSlides(state, slides);
      expect(nextState).to.equal(Map({
        slides: List(someSlides())
      }));
    });
  });
});