/**
  endpoint: api/images
  method: get
  returns: [
    {
      src: url
      h: height
      w: width
    }
  ]
*/

import image from '../database/image';
import path from 'path';

var Image = image.Model;

function images(req, res) {
  var server = req.app.locals.server;

  Image.find( {}, (err, images) => {
    if (!err) {
      var response = [];

      images.forEach( (image) => {
        // TODO: Paths and urls
        var imagePath = path.join(server.path.static, image.filename);
        var imageUrl = server.url.resolveFromPath(imagePath);

        response.push({
          src: imageUrl,
          h: image.h,
          w: image.w
        });
      });

      res.json(response);
    } else {
      res.json({
        error: err
      });
    }
  });
}

export default {
  method: 'get',
  handler: images
};
