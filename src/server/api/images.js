
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

function images(req, res) {
  res.json([
    {
      src: 'https://placekitten.com/1200/900',
      h: 900,
      w: 1200
    },
    {
      src: 'https://placekitten.com/1200/800',
      h: 800,
      w: 1200
    }
  ]);
}

export default {
  method: 'get',
  handler: images
};
