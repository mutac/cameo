import '../core/polyfill-fetch';
import {
  SET_SLIDES,
  FETCH_SLIDES_REQUEST,
  FETCH_SLIDES_SUCCESS,
  FETCH_SLIDES_FAILURE,
  TAKE_PICTURE_REQUEST,
  TAKE_PICTURE_SUCCESS,
  TAKE_PICTURE_FAILURE
} from '../core/constants';

import * as url from '../core/url';

export function fetchSlidesRequest() {
  return {
    type: FETCH_SLIDES_REQUEST
  }
}

export function fetchSlidesSuccess(slides) {
  return {
    type: FETCH_SLIDES_SUCCESS,
    slides: slides
  }
}

export function fetchSlidesFailure(ex) {
  return {
    type: FETCH_SLIDES_SUCCESS,
    ex
  }
}

export function takePictureRequest() {
  return {
    type: TAKE_PICTURE_REQUEST
  };
}

export function takePictureSuccess(slide) {
  return {
    type: TAKE_PICTURE_SUCCESS,
    slides: [slide]
  }
}

export function takePictureFailure(ex) {
  return {
    type: TAKE_PICTURE_FAILURE,
    ex
  }
}

/*
 *
 *
 *
 *
 */

export function fetchSlides() {
  return dispatch => {
    dispatch(fetchSlidesRequest());
    return fetch(url.makeUrl('/api/image'))
      .then(res => res.json())
      .then(json => dispatch(fetchSlidesSuccess(json)))
      .catch(ex => dispatch(fetchSlidesFailure(ex)));
  };
}

export function takePicture() {
  return dispatch => {
    dispatch(takePictureRequest());
    return fetch(url.makeUrl('/api/camera/capture'))
      .then(res => res.json())
      .then(json => dispatch(takePictureSuccess(json)))
      .catch(ex => dispatch(takePictureFailure(ex)));
  }
}

export function waitForSlides() {
  return {
    type: SET_SLIDES,
    slides: null
  };
}

export function setSlides(slides) {
  return {
    type: SET_SLIDES,
    slides: slides
  }
}