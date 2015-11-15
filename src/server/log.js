
var logger = console;

function preamble() {
  var now = new Date();
  return '[ ' + now.toUTCString() + ' ] ';
}

function log(msg) {
  logger.log(preamble() + msg);
}

export default {
  log: log
};
