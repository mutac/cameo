var path = require('path');

// Where everything ends up
var buildDirectory = 'build';

var server = {
  port: {
    backend: 8080,
    frontend: 3000
  },

  url: {
    api: '/api',
    static: '/static',
    database: 'tingodb://' + path.join(buildDirectory, 'db'),

    resolveFromPath: resolveUrlFromPath
  },

  path: {
    build: absoluteServerPath(buildDirectory),
    static: absoluteServerPath(path.join(buildDirectory, 'static')),
    database: absoluteServerPath(path.join(buildDirectory, 'db')),
    script: absoluteServerPath('scripts')
  }
};

var client = {
};

function clientUrlBase() {
  return '';
}

function rootPath() {  
  var root = __dirname;

  // HACK: babel transpiling puts __dirname at the build directory
  if (root.match(buildDirectory + '$') == buildDirectory)
    root = path.resolve(path.join(root, '..'));

  return root;
}

function absoluteServerPath(location) {
  var root = rootPath();

  if (location)
    return path.normalize(path.join(root, location));
  else
    return path.normalize(root);
}

function resolveUrlFromPath(location) {
  var url = clientUrlBase();

  if (location.indexOf(server.path.build) >= 0)
    return path.join(url, location.replace(server.path.build, ''));
  else
    throw 'Unable to resolve URL from path ' + location;
}

function makeImagePath(filename) {
}

module.exports = {
  server: server,
  client: client
}