
import {
  start,
  slidesAvailable,
  waitingForSlides
} from './state';

import {
  SET_SLIDES,
  FETCH_SLIDES_REQUEST,
  FETCH_SLIDES_SUCCESS,
  FETCH_SLIDES_FAILURE,
  TAKE_PICTURE_REQUEST,
  TAKE_PICTURE_SUCCESS,
  TAKE_PICTURE_FAILURE
} from './constants';

const INITIAL_STATE = start();

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_SLIDES:
      return slidesAvailable(state, action.slides);
    case FETCH_SLIDES_REQUEST:
      return waitingForSlides(state);
    case TAKE_PICTURE_REQUEST:
      return waitingForSlides(state);
  }

  return state;
}