const _toString = Object.prototype.toString

export function isPlainObject (obj) {
  return _toString(obj) === '[object Object]';
}