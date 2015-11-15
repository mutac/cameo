var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var metaSchema = new Schema({
  startTime: Date
});

metaSchema.statics.default = function() {
  return {
    startTime: new Date()
  }
};

metaSchema.statics.getInstance = function(cb) {
  return Metadata.findOne({}, function(err, previousMeta) {
    if (!previousMeta) {
      var meta = new Metadata(Metadata.default());
      console.log('saving new');
      console.log(meta);
      meta.save(function(err, m) { console.log('saved'); console.log(m); console.log(err); });
    } else {
      if (cb) {
        cb(err, previousMeta);
      }
    }
  });
};

metaSchema.statics.updateInstance = function() {
  var meta;
  var cb;

  if (arguments.length == 2) {
    meta = arguments[0];
    cb = arguments[1];
  } else if (arguments.length == 1) {
    cb = arguments[0];
  }

  return Metadata.getInstance(function(err, previous) {
    if (!meta) {
      meta = Metadata.default();
    }

    Metadata.findByIdAndUpdate(previous, meta, function(err, newMeta) {
      if (cb) {
        cb(err, previous, newMeta);
      }
    });
  });
};

var Metadata = mongoose.model('Metadata', metaSchema);

module.exports = {
  schema: metaSchema,
  Model: Metadata
};
