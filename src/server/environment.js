
import path from 'path';
import log from './log';
import config from '../../app.config';

function configure(app) {
  app.locals.server = config.server;
  app.locals.client = config.client;

  app.locals.log = log;
}

export default {
  configure: configure
};
