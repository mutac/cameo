import {List, Map} from 'immutable';

export function start() {
  return Map();
}

export function slidesAvailable(state, slides) {
  return state.set('slides', List(slides));
}

export function waitingForSlides(state) {
  return state.set('slides', null);
}

export function isWaitingForSlides(state) {
  return state.has('slides') && state.get('slides') == null;
}