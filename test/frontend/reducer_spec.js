import {expect} from './chai-use-immutable';
import {Map, fromJS} from 'immutable';

import {VIEW_SLIDES} from '../../src/frontend/core/constants';
import reducer from '../../src/frontend/core/reducer';

describe('reducer', () => {
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

  it('handles VIEW_SLIDES', () => {
    const initialState = Map();
    const action = { type: VIEW_SLIDES, slides: someSlides() };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      slides: someSlides()
    }));
  });
});