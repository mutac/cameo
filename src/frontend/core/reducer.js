import {curry} from 'fjs';

import {
  start,

  applyToCamera,
  waitingForNewImage,
  newImageAvailable,
  cameraFailure
} from './state';

import {
  TAKE_PICTURE_REQUEST,
  TAKE_PICTURE_SUCCESS,
  TAKE_PICTURE_FAILURE
} from './constants';

const INITIAL_STATE = start();

const reduceCamera = curry( (action, state) => {
  switch(action.type) {
    case TAKE_PICTURE_REQUEST:
      return waitingForNewImage;
    case TAKE_PICTURE_SUCCESS:
      return newImageAvailable(action.newImage);
    case TAKE_PICTURE_FAILURE:
      return cameraFailure(action.ex);
  }

  return state;
});

export default function reducer(state = INITIAL_STATE, action) {
  console.log("Handling " + action.type);

  state = applyToCamera(reduceCamera(action))(state);

  return state;
}