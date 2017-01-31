import {curry, compose as fjsCompose, chain as fjsChain} from 'fjs';
import {List, Map} from 'immutable';

export function start() {
  return Map();
}

/*
export function slidesAvailable(state, slides) {
  return state.set('slides', List(slides));
}

export function waitingForSlides(state) {
  return state.set('slides', null);
}

export function isWaitingForSlides(state) {
  return state.has('slides') && state.get('slides') == null;
}

export function fetchSlidesFailed(state, ex) {
  return state.set('failure', ex);
}
*/



export const camera = curry( (transition, state) => {
  return state.update('camera', Map(), transition);
});

export const waitingForNewImage = state => {
  return state.set('newImage', null);
};

export const notWaitingForNewImage = state => {
  return state.delete('newImage');
};

export const newImageAvailable = curry( (newImage, state) => {
  return state.set('newImage', Map(newImage));
});

export const noImageAvailable = notWaitingForNewImage;

export const hasFailed = curry( (ex, state) => {
  return state.set('failure', Map(ex));
});

export const noFailure = state => {
  return state.delete('failure');
};

export function isWaitingForNewImage(state) {
  return state.has('newImage') && state.get('newImage') == null;
};

export function newImage(state) {
  return state.get('newImage');
};

export function failure(state) {
  return state.get('failure');
}

export const compose = fjsCompose;
export const chain = fjsChain;