import { RECEIVED_ITEMS } from '../constants';
import { default as captureSlide } from '../assets/capture.html';

const initialState = [
  {
    html: captureSlide
  }
];

const actionMap = {
  [RECEIVED_ITEMS]: receivedItems
};

function receivedItems(state, action) {
  var items = action.items;

  if (typeof(state) !== undefined && state.length > 0) {
    items = state.concat(action.items);
  }

  return items;
}

export default function items(state = initialState, action) {
  const fn = actionMap[action.type];
  if (!fn) {
    return state;
  }

  return fn(state, action);
}