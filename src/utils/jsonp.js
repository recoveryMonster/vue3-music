import OriginalJSONP from 'jsonp'
import { isPlainObject } from './util'

// jaonp
function jsonp (url, data, options) {
  url += (url.includes('?') ? '&' : '?') + serializeParams(data)
  return new Promise(function (resolve, reject) {
    if (!isPlainObject(data)) {
      reject(new Error('Invalid query parameters'));
    }
    OriginalJSONP(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

function serializeParams (data) {
  let query = ''
  if (isPlainObject(data)) {
    Object.keys(data).forEach(key => {
      const value = data[key] ? data[key] : ''
      query += '&' + key + '=' + encodeURIComponent(value)
    })
  }
  return query.slice(1)
}


export {
  jsonp
}