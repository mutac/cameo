function noop() {
  return null;
}

require.extensions['.styl'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.css'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.html'] = noop;
