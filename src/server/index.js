import express from 'express';
import database from './database';
import api from './api';
import environment from './environment';

const app = express();
environment.configure(app);

app.use(app.locals.server.url.api, api);

database.bind(app, (err) => {
  app.listen(app.locals.server.port.backend, (err) => {
    if (err)
      return console.log(err);
    console.log('running on localhost:' + app.locals.server.port.backend);
  });
});
