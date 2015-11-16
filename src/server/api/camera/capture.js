/**
  endpoint: api/camera/capture
  method: get
  params: { h: <height>, w: <width> }
  returns: {
    src: <url to image>,
    h: <height>,
    w: <width>,
    error: undefined | {
      killed: true | false,
      code: <status code>,
      signal: null | <signal used to kill>
      description: '' | 'some description of what happened'
    }
  }
*/

import path from 'path';
import child_process from 'child_process';
import image from '../../database/image';

var exec = child_process.exec;
var Image = image.Model;

function capture(req, res) {
  req.setTimeout(0);

  var server = req.app.locals.server;
  var captureScript = path.join(server.path.script, 'capture.sh');

  var h = 768;
  var w = 1024;

  Image.create(h, w, 'capture', 'png', (err, image) => {
    // TODO: Paths and urls
    var pathToImage = path.join(server.path.static, image.filename);
    var url = server.url.resolveFromPath(pathToImage);

    var cmd = [captureScript, w, h, pathToImage].join(' ');

    var child = exec(cmd, (error, stdout, stderr) => {
      if (error) {
        error.description = stderr;
        res.json({ error: error });
      } else {
        res.json({ src: url, h: image.h, w: image.w });
      }
    });
  });
}

export default {
  method: 'get',
  handler: capture
};
