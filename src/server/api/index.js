
import express from 'express';
import logAll from './logAll';

import images from './images';
import capture from './camera/capture';

function addRoute(path, method, handler) {
  if (method == 'get') {
    routes.get(path, handler);
  } else if (method == 'post') {
    routes.post(path, handler);
  } else if (!method || method == '*') {
    if (path) {
      routes.use(path, handler);
    } else {
      routes.use(handler);
    }
  }
}

var routes = express.Router();

addRoute('*', logAll.method, logAll.handler);
addRoute('/image', images.method, images.handler);
addRoute('/camera/capture', capture.method, capture.handler);

export default routes;
