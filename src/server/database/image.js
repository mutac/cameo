var mongoose = require('mongoose');
var fs = require('fs');

var sequence = require('./sequence');

var Schema = mongoose.Schema;
var Sequence = sequence.Model;

var imageSchema = new Schema({
  filename: String,
  timestamp: Date,
  h: Number,
  w: Number,
  seq: Number
});

imageSchema.statics.create = function(h, w, baseName, ext, cb) {
  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  Sequence.createNext('image', function(err, sequence) {
    if (err)
      if (cb)
        cb(err);

    var curSeq = sequence.seq - 1;

    var image = new Image({
      'timestamp':  new Date(),
      'seq':        curSeq,
      'filename':   baseName + '-' + zeroPad(curSeq, 6) + '.' + ext,
      'h':          h,
      'w':          w
    });

    image.save(cb);
  });
};

imageSchema.statics.synchronizeWithImageDirectory = function(app, cb) {
  var imageFiles = fs.readdirSync(app.locals.paths.image);

  if (imageFiles) {
    Image.find(
      { filename: { $not: { $in: imageFiles } } },
      function(err, stale) {
        if (!err && stale) {
          stale.forEach(function(image) {
            image.remove();
          });
        }

        cb(err, stale ? stale && stale.length > 0 : undefined);
      }
    );
  } else {
    cb();
  }
};

var Image = mongoose.model('Image', imageSchema);

module.exports = {
  schema: imageSchema,
  Model: Image
};
