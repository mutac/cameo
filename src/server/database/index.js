var tungus = require('tungus');
var mongoose = require('mongoose');

var Metadata = require('./metadata').Model;

function bind(app, cb) {
  var uri = app.locals.server.url.database;
  var log = app.locals.log;

  mongoose.connect(
    uri,
    (err) => {
      if (!err) {
        Metadata.updateInstance(
          (err, previous, meta) => {
            log.log('Database start: successful - ' + uri);
            if (meta) {
              log.log('  Started on: ' + meta.startTime);
            }
            if (previous) {
              log.log('  Last started on: ' + previous.startTime);
            }
          }
        );
      } else {
        log.log('Database start: failed - ' + uri + ' - ' + err);
      }

      if (cb) {
        cb(err);
      }
    }
  );
}

export default {
  bind: bind
}
