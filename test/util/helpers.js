import jsdom from 'jsdom';

export function someSlides() {
  return [
    {
      src: '/path/to/img1.jpg',
      h: 100,
      w: 200
    },
    {
      src: '/path/to/img2.jpg',
      h: 100,
      w: 200
    },
    {
      src: '/path/to/img3.jpg',
      h: 100,
      w: 200
    }
  ];
}

export function aSingleSlide() {
  return {
    src: '/path/to/newImage.jpg',
    h: 100,
    w: 200
  };
}

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});