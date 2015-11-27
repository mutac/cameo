
import {start, viewSlides} from './state';
import {VIEW_SLIDES} from './constants';

const INITIAL_STATE = start();

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case VIEW_SLIDES:
      return viewSlides(state, action.slides);
  }

  return state;
}