import {expect} from '../util/chai-use-immutable';
import {List, Map} from 'immutable';
import {someSlides} from '../util/helpers';

import {
  compose,
  chain,
  start,
  camera,
  waitingForNewImage,
  notWaitingForNewImage,
  isWaitingForNewImage,
  hasFailed,
  noFailure,
  failure
} from '../../src/frontend/core/state';

describe('state', () => {
  describe('start state', () => {
    it('empty initial state', () => {
      let initialState = start();

      expect(initialState).to.equal(Map());
    });
  });


  describe('camera', () => {
    it('what should this look like?', () => {
      const state = start();

      let transition = camera(compose(notWaitingForNewImage, waitingForNewImage));
      let nextState = transition(state);
    });

    /*
    it('is waiting for new image', () => {
      const state = start();
      const nextState = appliesToCamera(waitingForNewImage)(state);

      expect(chain(camera, isWaitingForNewImage)(state)).to.be.false;
      expect(chain(camera, isWaitingForNewImage)(nextState)).to.be.true;
    });

    it('is not waiting for new image', () => {
      const state = start();
      const nextState = appliesToCamera(compose(notWaitingForNewImage, waitingForNewImage))(state);

      expect(chain(camera, isWaitingForNewImage)(state)).to.be.false;
      expect(chain(camera, isWaitingForNewImage)(nextState)).to.be.false;
    });

    it('has failure', () => {
      const exception = {
        message: 'Timed out'
      };

      const state = start();
      const nextState = appliesToCamera(hasFailed(exception))(state);

      expect(nextState).to.equal(Map({
        camera: {
          failure: {
            message: 'Timed out'
          }
        }
      }));
    });

    it('has no failure', () => {
      const exception = {
        message: 'Timed out'
      };

      const state = start();
      const nextState = appliesToCamera(compose(noFailure, hasFailed(exception)))(state);

      expect(chain(camera, failure)(nextState)).to.equal(undefined);
    });
    */
  });

  /*
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
*/
});