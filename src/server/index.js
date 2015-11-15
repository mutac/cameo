import express from 'express';

// datbase must be imported before any other module
// that uses the database.  This is due to the way
// that tungus 'hooks' into mongodb...
import database from './database';

import environment from './environment';
import image from './database/image';
import api from './api';

const app = express();
environment.configure(app);

app.use(app.locals.server.url.api, api);

database.bind(app, (err) => {
  var Image = image.Model;
  
  Image.synchronizeWithDirectory(app.locals.server.path.static, (err, staleFiles) => {
    if (staleFiles) {
      app.locals.log.log("Synchronized image db.  Removed: " + staleFiles);
    }
    if (err) {
      app.locals.log.log("Error synchronizing image db: " + err);
    }    

    app.listen(app.locals.server.port.backend, (err) => {
      if (err) {
        app.locals.log.log(err);
      } else {
        app.locals.log.log('running on localhost:' + app.locals.server.port.backend);
      }
    });
  });
});
