import {expect} from '../util/chai-use-immutable';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';

const middlewares = [ thunk ];

import * as url from '../../src/frontend/core/url';
import {someSlides, aSingleSlide} from '../util/helpers';

import {
  setSlides,
  fetchSlides,
  fetchSlidesRequest,
  takePicture,
  takePictureRequest
} from '../../src/frontend/core/actions';

import {
  SET_SLIDES,
  FETCH_SLIDES_REQUEST,
  FETCH_SLIDES_SUCCESS,
  FETCH_SLIDES_FAILURE,
  TAKE_PICTURE_REQUEST,
  TAKE_PICTURE_SUCCESS,
  TAKE_PICTURE_FAILURE
} from '../../src/frontend/core/constants';

describe('async actions', (done) => {
  function mockStore(expectedActions, done)
  {
    function createStore() {
      return {
        subscribe: () => {},
        getState: () => {
          return {};
        },
        dispatch: (action) => {
          const expectedAction = expectedActions.shift();

          try {
            expect(action).to.eql(expectedAction);
            if (done && !expectedActions.length) {
              done();
            }
            return action;
          } catch (e) {
            done(e);
          }
        }
      };
    }

    const mockStoreWithMiddleware = applyMiddleware(
      ...middlewares
    )(createStore);

    return mockStoreWithMiddleware();
  }

  afterEach(() => {
    nock.cleanAll();
  });

  it('fetchSlides makes async API call with intermediate dispatch', (done) => {
    nock(url.base())
      .get('/api/image')
      .reply(200, someSlides() );

    const expectedActions = [
      { type: FETCH_SLIDES_REQUEST },
      { type: FETCH_SLIDES_SUCCESS, slides: someSlides() }
    ];

    const store = mockStore(expectedActions, done);
    store.dispatch(fetchSlides());
  });

  it('takePicture makes async API call with intermediate dispatch', (done) => {
    nock(url.base())
      .get('/api/camera/capture')
      .reply(200, aSingleSlide() );

    const expectedActions = [
      { type: TAKE_PICTURE_REQUEST },
      { type: TAKE_PICTURE_SUCCESS, slides: [ aSingleSlide() ] }
    ];

    const store = mockStore(expectedActions, done);
    store.dispatch(takePicture());
  });
});