
import {viewSlides} from './state';
import {VIEW_SLIDES} from './constants';

export default function reducer(state, action) {
  switch(action.type) {
    case VIEW_SLIDES:
      return viewSlides(state, action.slides);
  }

  return state;
}