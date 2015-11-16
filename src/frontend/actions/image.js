import 'whatwg-fetch'; //polyfill
import { RECEIVED_ITEMS } from '../constants';

export function fetchImages() {
  return dispatch => {
    fetch('/api/image')
      .then(resp => resp.json())
      .then(json => dispatch({
          type: RECEIVED_ITEMS,
          items: json
      })
    );
  }
}
