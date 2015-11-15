import path from 'path';

function logAll(req, res, next) {
  var log = req.app.locals.log;

  log.log(req.ip + ' -> ' + path.join(req.baseUrl, req.path) + ' ' + JSON.stringify(req.params));
  next();
}

export default {
  handler: logAll
};
