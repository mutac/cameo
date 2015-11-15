var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sequenceSchema = new Schema({
  name: String,
  seq: { type: Number, default: 1 }
});

sequenceSchema.statics.createNext = function(name, cb) {
  Sequence.findOneAndUpdate(
    { 'name': name },
    { $inc: { seq: 1 } },
    function(err, sequence) {
      if (!sequence) {
        (new Sequence({name: name})).save(cb);
      } else {
        cb(err, sequence);
      }
    }
  );
};

var Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = {
  schema: sequenceSchema,
  Model: Sequence
};
