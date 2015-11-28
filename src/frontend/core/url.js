
export function base() {
  return 'http://localhost';
}

export function makeUrl(path) {
  return [base(), trimSlashes(path)].join('/');
}

function trimSlashes(path) {
  if (path.charAt(0) == '/')
    return path.substr(1);
  else
    return path;
}