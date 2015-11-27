import 'whatwg-fetch'; //polyfill
import { VIEW_SLIDES } from '../core/constants';

export function getSlides() {
  return dispatch => {
    fetch('/api/image')
      .then(resp => resp.json())
      .then(json => dispatch({
          type: VIEW_SLIDES,
          slides: json
      })
    );
  }
}

export function captureImage() {
  return dispatch => {
    fetch('/api/camera/capture')
      .then(resp => resp.json())
      .then(json => dispatch({
          type: VIEW_SLIDES,
          slides: [ json ]
      })
    );
  }
}